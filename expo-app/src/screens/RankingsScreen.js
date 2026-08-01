import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SportPicker from '../components/SportPicker';
import PlayerAvatar from '../components/PlayerAvatar';
import { RankingSkeleton } from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { snookerPlayers, chinese8Players, nineballPlayers, formatPrize, formatPrizeCN, formatPrizeUSD } from '../data/mockData';
import { theme } from '../theme';

function getPlayersForSport(sport) {
  if (sport === 'snooker') return snookerPlayers.map(p => ({ ...p, sport: 'snooker' }));
  if (sport === 'chinese8') return chinese8Players.map(p => ({ ...p, sport: 'chinese8' }));
  if (sport === 'nineball') return nineballPlayers.map(p => ({ ...p, sport: 'nineball' }));
  return [];
}

function formatPoints(points, sport) {
  if (sport === 'snooker') return formatPrize(points);
  if (sport === 'chinese8') return `${points.toLocaleString()}分`;
  return `${points.toLocaleString()}分`;
}

export default function RankingsScreen({ selectedSport, onSelectSport, onPlayerPress }) {
  const [type, setType] = useState('official');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const players = useMemo(() => getPlayersForSport(selectedSport), [selectedSport]);

  React.useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 350); return () => clearTimeout(t); }, [selectedSport]);

  const onRefresh = useCallback(async () => { setRefreshing(true); await new Promise(r => setTimeout(r, 600)); setRefreshing(false); }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}><Text style={styles.title}>排名</Text></View>
      <SportPicker selected={selectedSport} onSelect={onSelectSport} />

      {loading ? <RankingSkeleton /> : players.length === 0 ? (
        <EmptyState icon="📊" title="暂无排名数据" message="排名数据将在赛季开始后更新" />
      ) : (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.color.green} colors={[theme.color.green]} />}>
          {players.map((p, i) => {
            const rank = i + 1;
            const rkColor = rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : theme.text.secondary;
            return (
              <TouchableOpacity key={p.id} style={[styles.row, rank <= 3 && styles.rowTop]} activeOpacity={0.7} onPress={() => onPlayerPress && onPlayerPress(p)}>
                <Text style={[styles.rankNum, { color: rkColor }]}>{rank}</Text>
                <PlayerAvatar player={p} size={38} showFlag={false} />
                <View style={styles.nameCol}>
                  <Text style={styles.name}>{p.name}</Text>
                  <Text style={styles.nation}>{p.flag} {p.nation} {p.zh && p.zh !== p.name ? `· ${p.zh}` : ''}</Text>
                </View>
                <Text style={styles.points}>{formatPoints(p.points, selectedSport)}</Text>
                <Text style={[styles.change, p.change > 0 ? { color: '#44CC44' } : p.change < 0 ? { color: '#FF4444' } : { color: theme.text.tertiary }]}>
                  {p.change > 0 ? `↑${p.change}` : p.change < 0 ? `↓${Math.abs(p.change)}` : '→'}
                </Text>
              </TouchableOpacity>
            );
          })}
          <Text style={styles.updated}>排名随赛事更新</Text>
          <View style={{ height: 20 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg.primary },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  title: { fontSize: 32, fontWeight: '800', color: theme.text.primary },
  scroll: { flex: 1, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, backgroundColor: theme.bg.surface, borderRadius: 10, marginBottom: 3 },
  rowTop: { backgroundColor: theme.color.green + '08' },
  rankNum: { width: 26, fontSize: 15, fontWeight: '700', textAlign: 'center' },
  nameCol: { flex: 1, marginLeft: 10 },
  name: { fontSize: 14, fontWeight: '600', color: theme.text.primary },
  nation: { fontSize: 10, color: theme.text.tertiary, marginTop: 1 },
  points: { fontSize: 12, color: theme.color.gold, fontWeight: '600', marginRight: 8 },
  change: { width: 36, fontSize: 12, fontWeight: '700', textAlign: 'center' },
  updated: { textAlign: 'center', fontSize: 10, color: theme.text.tertiary, paddingTop: 16 },
});
