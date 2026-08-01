import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { formatPrize, formatPrizeCN, formatPrizeUSD, formatDate, getDaysUntil } from '../data/mockData';

const CAT_COLORS = { 'triple-crown': theme.color.tripleCrown, ranking: theme.color.gold, invitational: theme.color.invitational, major: '#FF8C00' };
const CAT_LABELS = { 'triple-crown': '🏆 顶级赛事', ranking: '排名赛', invitational: '邀请赛', major: '大赛' };

export default function TournamentCard({ tournament, compact, onPress, sportType = 'snooker' }) {
  const borderColor = CAT_COLORS[tournament.cat] || theme.color.gold;
  const days = getDaysUntil(tournament.start);
  const isLive = tournament.status === 'live';
  const isUpcoming = tournament.status === 'upcoming';

  const formatMoney = sportType === 'snooker' ? (v) => v : sportType === 'chinese8' ? (v) => formatPrizeCN(parseInt(v?.replace(/[^0-9]/g,'')||'0')) : (v) => formatPrizeUSD(parseInt(v?.replace(/[^0-9]/g,'')||'0'));

  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: borderColor }]} activeOpacity={0.85} onPress={() => onPress && onPress(tournament)}>
      <View style={styles.badges}>
        <View style={[styles.badge, { backgroundColor: borderColor + '25' }]}>
          <Text style={[styles.badgeText, { color: borderColor }]}>{CAT_LABELS[tournament.cat] || tournament.cat}</Text>
        </View>
        {!compact && <View style={[styles.badge, { backgroundColor: theme.color.gold + '15' }]}>
          <Text style={[styles.badgeText, { color: theme.color.gold }]}>{tournament.prize}</Text>
        </View>}
      </View>
      <Text style={styles.name}>{tournament.name}</Text>
      {!compact && <Text style={styles.location}>📍 {tournament.venue}, {tournament.city}, {tournament.country}</Text>}
      <View style={styles.footer}>
        <Text style={styles.date}>{formatDate(tournament.start)} - {formatDate(tournament.end)}</Text>
        {isLive ? (
          <View style={styles.countdownLive}><Text style={styles.countdownLiveText}>● 进行中</Text></View>
        ) : isUpcoming ? (
          <View style={styles.countdown}><Text style={styles.countdownText}>{days > 0 ? `${days}天后` : '即将开始'}</Text></View>
        ) : (
          <Text style={styles.done}>已结束</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export function FilterBar({ options, selected, onSelect, color }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ paddingRight: 16 }}>
      {options.map(opt => {
        const active = selected === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            style={[styles.filterPill, active && { backgroundColor: (color || theme.color.green) + '20', borderColor: color || theme.color.green }]}
            onPress={() => onSelect(opt.key)}
          >
            <Text style={[styles.filterText, active && { color: color || theme.color.greenLight, fontWeight: '600' }, opt.color && !active ? { color: opt.color } : null]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: theme.bg.surface, borderRadius: theme.radius.lg, padding: 16, marginBottom: 12, borderLeftWidth: 4 },
  badges: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  name: { fontSize: 16, fontWeight: '700', color: theme.text.primary, marginBottom: 4, lineHeight: 22 },
  location: { fontSize: 12, color: theme.text.secondary, marginBottom: 8 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: 12, color: theme.text.secondary },
  countdown: { backgroundColor: theme.color.green + '20', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  countdownText: { color: theme.color.greenLight, fontWeight: '700', fontSize: 12 },
  countdownLive: { backgroundColor: '#FF000020', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  countdownLiveText: { color: '#FF4444', fontWeight: '700', fontSize: 12 },
  done: { fontSize: 11, color: theme.text.tertiary },
  filterScroll: { paddingVertical: 4, marginBottom: 12 },
  filterPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  filterText: { fontSize: 13, color: theme.text.secondary },
});
