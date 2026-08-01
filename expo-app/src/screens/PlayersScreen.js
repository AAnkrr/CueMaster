import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SportPicker from '../components/SportPicker';
import { FilterBar } from '../components/TournamentCard';
import PlayerAvatar from '../components/PlayerAvatar';
import { RankingSkeleton } from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../hooks/useFavorites';
import { snookerPlayers, chinese8Players, nineballPlayers, formatPrize, formatPrizeCN, formatPrizeUSD } from '../data/mockData';
import { theme } from '../theme';

const FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'top16', label: 'Top 16' },
  { key: 'chinese', label: '🇨🇳 中国' },
  { key: 'fav', label: '★ 关注' },
];

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

export default function PlayersScreen({ selectedSport, onSelectSport, onPlayerPress }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { favorites, loading: favLoading, toggle } = useFavorites();

  const allPlayers = useMemo(() => getPlayersForSport(selectedSport), [selectedSport]);

  useEffect(() => {
    if (!favLoading) { setLoading(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }
  }, [favLoading, selectedSport]);

  const onRefresh = useCallback(async () => { setRefreshing(true); await new Promise(r => setTimeout(r, 600)); setRefreshing(false); }, []);

  const filteredPlayers = useMemo(() => {
    let result = allPlayers;
    if (search.trim()) { const q = search.toLowerCase(); result = result.filter(p => p.name.toLowerCase().includes(q) || (p.zh||'').includes(q)); }
    if (filter === 'top16') result = result.slice(0, 16);
    else if (filter === 'chinese') result = result.filter(p => p.nation === 'CHN');
    else if (filter === 'fav') result = result.filter(p => favorites.includes(p.id));
    return result;
  }, [search, filter, favorites, allPlayers]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}><Text style={styles.title}>球员</Text></View>
      <SportPicker selected={selectedSport} onSelect={onSelectSport} />
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput style={styles.searchInput} placeholder="搜索球员..." placeholderTextColor={theme.text.tertiary} value={search} onChangeText={setSearch} returnKeyType="search" />
        {search ? <TouchableOpacity onPress={() => setSearch('')}><Text style={{ color: theme.text.tertiary, fontSize: 16, padding: 4 }}>✕</Text></TouchableOpacity> : null}
      </View>
      <FilterBar options={FILTERS} selected={filter} onSelect={setFilter} color={theme.color.green} />

      {loading ? <RankingSkeleton /> : filteredPlayers.length === 0 ? (
        <EmptyState icon="👤" title={filter === 'fav' ? '暂无关注球员' : '未找到球员'}
          message={filter === 'fav' ? '点击球员右侧 ★ 关注你喜爱的球员' : '请尝试其他搜索词或筛选条件'}
          actionLabel={filter === 'fav' ? '查看全部球员' : '清除搜索'} onAction={() => { setFilter('all'); setSearch(''); }} />
      ) : (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.color.green} colors={[theme.color.green]} />}>
          {filteredPlayers.map(p => {
            const fav = favorites.includes(p.id);
            return (
              <TouchableOpacity key={p.id} style={styles.row} activeOpacity={0.7} onPress={() => onPlayerPress && onPlayerPress(p)}>
                <PlayerAvatar player={p} size={40} showFlag={false} />
                <View style={styles.info}>
                  <Text style={styles.name}>{p.flag}  {p.name}</Text>
                  <Text style={styles.zh}>{p.zh}{p.zh !== p.name ? '' : ''} · {p.nation}</Text>
                </View>
                <Text style={styles.points}>{formatPoints(p.points, selectedSport)}</Text>
                <TouchableOpacity onPress={() => toggle(p.id)} style={styles.starBtn}>
                  <Text style={{ fontSize: 20, color: fav ? '#FFD700' : theme.text.tertiary }}>{fav ? '★' : '☆'}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
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
  searchBar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, backgroundColor: theme.bg.surface, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 4, gap: 8 },
  searchIcon: { fontSize: 14 }, searchInput: { flex: 1, color: theme.text.primary, fontSize: 14, paddingVertical: 0 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 6 },
  info: { flex: 1, marginLeft: 10 },
  name: { fontSize: 14, fontWeight: '600', color: theme.text.primary },
  zh: { fontSize: 11, color: theme.text.tertiary, marginTop: 1 },
  points: { fontSize: 12, color: theme.color.gold, fontWeight: '600', marginRight: 8 },
  starBtn: { padding: 8 },
});
