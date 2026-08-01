import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  FAVORITES: '@cuemaster/favorites',
  MAIN_PLAYER: '@cuemaster/mainPlayer',
  SETTINGS: '@cuemaster/settings',
  SELECTED_SPORT: '@cuemaster/selectedSport',
  LAST_REFRESH: '@cuemaster/lastRefresh',
  WIDGET_CONFIG: '@cuemaster/widgetConfig',
};

// ----- Favorites -----
export async function getFavorites() {
  try { const raw = await AsyncStorage.getItem(KEYS.FAVORITES); return raw ? JSON.parse(raw) : []; }
  catch { return []; }
}
export async function saveFavorites(ids) {
  try { await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(ids)); } catch {}
}
export async function toggleFavorite(playerId) {
  const favs = await getFavorites();
  const updated = favs.includes(playerId) ? favs.filter(id => id !== playerId) : [...favs, playerId];
  await saveFavorites(updated);
  return updated;
}

// ----- Main Player (主球员) -----
export async function getMainPlayer() {
  try { const raw = await AsyncStorage.getItem(KEYS.MAIN_PLAYER); return raw ? JSON.parse(raw) : null; }
  catch { return null; }
}
export async function setMainPlayer(player) {
  try { await AsyncStorage.setItem(KEYS.MAIN_PLAYER, JSON.stringify(player)); } catch {}
}
export async function clearMainPlayer() {
  try { await AsyncStorage.removeItem(KEYS.MAIN_PLAYER); } catch {}
}

// ----- Settings -----
const DEFAULT_SETTINGS = {
  notifications: true, matchReminder: true, breakingNews: true,
  calendarSync: true, language: 'zh', defaultSport: 'snooker',
  widgetStyle: 'rankings', // 'countdown' | 'rankings' | 'mainPlayer'
};
export async function getSettings() {
  try { const raw = await AsyncStorage.getItem(KEYS.SETTINGS); return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS; }
  catch { return DEFAULT_SETTINGS; }
}
export async function saveSetting(key, value) {
  try { const settings = await getSettings(); settings[key] = value; await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings)); } catch {}
}

// ----- Sport -----
export async function getSelectedSport() {
  try { const raw = await AsyncStorage.getItem(KEYS.SELECTED_SPORT); return raw || 'snooker'; }
  catch { return 'snooker'; }
}
export async function saveSelectedSport(sport) {
  try { await AsyncStorage.setItem(KEYS.SELECTED_SPORT, sport); } catch {}
}

// ----- Widget Config -----
const DEFAULT_WIDGET = { type: 'countdown', showMainPlayer: true, showRankings: true };
export async function getWidgetConfig() {
  try { const raw = await AsyncStorage.getItem(KEYS.WIDGET_CONFIG); return raw ? { ...DEFAULT_WIDGET, ...JSON.parse(raw) } : DEFAULT_WIDGET; }
  catch { return DEFAULT_WIDGET; }
}
export async function saveWidgetConfig(config) {
  try { await AsyncStorage.setItem(KEYS.WIDGET_CONFIG, JSON.stringify(config)); } catch {}
}

// ----- Last Refresh -----
export async function getLastRefresh(screen) {
  try { const raw = await AsyncStorage.getItem(`${KEYS.LAST_REFRESH}_${screen}`); return raw ? new Date(raw) : null; }
  catch { return null; }
}
export async function saveLastRefresh(screen) {
  try { await AsyncStorage.setItem(`${KEYS.LAST_REFRESH}_${screen}`, new Date().toISOString()); } catch {}
}
