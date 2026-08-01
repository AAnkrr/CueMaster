#!/usr/bin/env node
// ============================================================
// CueMaster Data Pipeline
// Fetches snooker data from api.snooker.org → generates JS/JSON
//
// Usage:   node fetch-snooker.js
// Cron:    runs daily via Vercel Cron / GitHub Actions
// Rate:    10 req/min max (enforced with 6s delay between calls)
// ============================================================

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, 'output');
const JS_OUTPUT = resolve(OUTPUT_DIR, 'snooker-data.js');
const JSON_OUTPUT = resolve(OUTPUT_DIR, 'snooker-data.json');

const BASE_URL = 'https://api.snooker.org/';
const USER_AGENT = 'CueMaster-DataPipeline/1.0';
const CACHE_FILE = resolve(OUTPUT_DIR, '.cache.json');

// ---- helpers ----
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchJSON(endpoint) {
  const url = BASE_URL + endpoint;
  console.log(`  GET ${url}`);
  const resp = await fetch(url, {
    headers: { 'X-Requested-By': USER_AGENT, 'User-Agent': USER_AGENT },
    signal: AbortSignal.timeout(15000),
  });
  if (!resp.ok) {
    if (resp.status === 403) {
      console.warn(`  ⚠️ HTTP 403 Forbidden — api.snooker.org may block requests from China IPs`);
      console.warn(`  💡 Deploy this script on Vercel/Railway (non-China server) to bypass geo-blocking`);
    }
    throw new Error(`HTTP ${resp.status} for ${endpoint}`);
  }
  const text = await resp.text();
  try { return JSON.parse(text); } catch (e) {
    // Some endpoints may return JSONP or empty array
    if (text.trim().startsWith('[')) return JSON.parse(text);
    console.warn(`  ⚠️ Could not parse as JSON, first 100 chars: ${text.substring(0, 100)}`);
    return [];
  }
}

// ---- cache ----
function loadCache() {
  try { return JSON.parse(readFileSync(CACHE_FILE, 'utf-8')); } catch { return {}; }
}
function saveCache(data) {
  mkdirSync(dirname(CACHE_FILE), { recursive: true });
  writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('🎱 CueMaster Data Pipeline starting...');
  console.log(`  Time: ${new Date().toISOString()}`);
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const cache = loadCache();
  const seasons = [2026, 2025];  // try current season first, fall back to last completed
  const results = {
    generated: new Date().toISOString(),
    source: 'api.snooker.org',
    season: '',
    events: [],
    rankings: [],
    liveMatches: [],
  };

  try {
    // Try each season until we get data
    for (const season of seasons) {
      // 1) Fetch events
      console.log(`\n📅 Fetching events for season ${season}...`);
      const events = await fetchJSON(`?t=5&s=${season}`);
      if (Array.isArray(events) && events.length > 0) {
        results.events = events;
        results.season = `${season}/${String(season+1).slice(2)}`;
        console.log(`  ✅ Got ${events.length} events`);

        // 2) Fetch rankings
        console.log(`\n📊 Fetching rankings for season ${season}...`);
        await delay(7000);
        const rankings = await fetchJSON(`?rt=MoneyRankings&s=${season}`);
        if (Array.isArray(rankings) && rankings.length > 0) {
          results.rankings = rankings;
          console.log(`  ✅ Got ${rankings.length} ranked players`);
        } else {
          console.log(`  ⚠️ No rankings returned for season ${season}`);
        }

        // 3) Fetch live matches
        console.log('\n🔴 Fetching live matches...');
        await delay(7000);
        const live = await fetchJSON('?t=4');
        results.liveMatches = Array.isArray(live) ? live : [];
        console.log(`  ✅ Got ${results.liveMatches.length} live matches`);

        // 4) Fetch match details for upcoming/live events
        const upcomingOrLive = events.filter(e => {
          const endDate = e.EndDate || e.End || '';
          return !endDate || new Date(endDate) >= new Date();
        }).slice(0, 5);
        results.eventMatches = {};
        for (const evt of upcomingOrLive) {
          const evtId = evt.ID || evt.id;
          if (!evtId) continue;
          console.log(`\n🎯 Fetching matches for event #${evtId} (${evt.Name || evt.name || '?'})...`);
          await delay(7000);
          try {
            const matches = await fetchJSON(`?e=${evtId}`);
            results.eventMatches[evtId] = Array.isArray(matches) ? matches : [];
            console.log(`  ✅ Got ${results.eventMatches[evtId].length} matches`);
          } catch (e) {
            console.warn(`  ⚠️ Failed: ${e.message}`);
            results.eventMatches[evtId] = [];
          }
        }
        break; // Found data, stop trying more seasons
      } else {
        console.log(`  ⚠️ No events for season ${season}, trying next...`);
      }
      await delay(7000);
    }

    // If still no data after trying all seasons
    if (results.events.length === 0) {
      console.log('\n⚠️ No event data found for any season. API may be unavailable or season data not yet published.');
    }

    // Save cache
    cache.lastFetch = new Date().toISOString();
    cache.lastData = results;
    saveCache(cache);

  } catch (e) {
    console.error(`\n❌ Fetch error: ${e.message}`);
    console.log('📦 Falling back to cached data...');
    if (cache.lastData) {
      Object.assign(results, cache.lastData);
      results.generated = cache.lastFetch || 'from-cache';
      results.source = 'cache (api.snooker.org was unavailable)';
    }
  }

  // ---- Generate output ----
  console.log('\n📝 Generating output files...');

  // Generate JS file (can be included directly in HTML)
  const jsContent = `// Auto-generated by CueMaster Data Pipeline
// Generated: ${results.generated}
// Source: ${results.source}
// DO NOT EDIT MANUALLY — run "node fetch-snooker.js" to refresh

window.__SNOOKER_API_DATA__ = ${JSON.stringify(results, null, 2)};
`;
  writeFileSync(JS_OUTPUT, jsContent, 'utf-8');
  console.log(`  ✅ ${JS_OUTPUT}`);

  // Generate JSON file (for API consumption)
  writeFileSync(JSON_OUTPUT, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`  ✅ ${JSON_OUTPUT}`);

  // Summary
  console.log('\n📋 SUMMARY');
  console.log(`  Events:       ${results.events.length}`);
  console.log(`  Rankings:     ${results.rankings.length}`);
  console.log(`  Live matches: ${results.liveMatches.length}`);
  console.log(`  Event details: ${Object.keys(results.eventMatches || {}).length} events with match data`);
  console.log('\n✅ Done!');
}

main().catch(e => { console.error(e); process.exit(1); });
