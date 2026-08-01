import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SportPicker from '../components/SportPicker';
import TournamentCard, { FilterBar } from '../components/TournamentCard';
import { TournamentSkeleton } from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { snookerSeasons, chinese8Tournaments, nineballTournaments } from '../data/mockData';
import { theme } from '../theme';

const FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'triple-crown', label: '顶级赛', color: theme.color.tripleCrown },
  { key: 'ranking', label: '排名赛', color: theme.color.gold },
  { key: 'invitational', label: '邀请赛', color: theme.color.invitational },
];

const SEASONS = ['2026/27', '2025/26', '2024/25'];

function getTournamentsForSport(sport, season) {
  if (sport === 'snooker') return snookerSeasons[season] || [];
  if (sport === 'chinese8') return chinese8Tournaments;
  if (sport === 'nineball') return nineballTournaments;
  return [];
}

export default function ScheduleScreen({ selectedSport, onSelectSport, onTournamentPress }) {
  const [filter, setFilter] = useState('all');
  const [season, setSeason] = useState('2026/27');
  const [showSeasonPicker, setShowSeasonPicker] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, [selectedSport, season]);

  const onRefresh = useCallback(async () => { setRefreshing(true); await new Promise(r => setTimeout(r, 600)); setRefreshing(false); }, []);

  const tournaments = useMemo(() => getTournamentsForSport(selectedSport, season), [selectedSport, season]);
  const filtered = useMemo(() => filter === 'all' ? tournaments : tournaments.filter(t => t.cat === filter || t.cat === 'triple-crown'), [filter, tournaments]);
  const live = filtered.filter(t => t.status === 'live');
  const upcoming = filtered.filter(t => t.status === 'upcoming');
  const completed = filtered.filter(t => t.status === 'completed');
  const hasData = filtered.length > 0;

  // Show season picker only for snooker
  const showSeasonUI = selectedSport === 'snooker';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>赛程</Text>
        {showSeasonUI ? (
          <TouchableOpacity style={styles.seasonBtn} onPress={() => setShowSeasonPicker(true)}>
            <Text style={styles.seasonText}>{season} ▾</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <SportPicker selected={selectedSport} onSelect={onSelectSport} />
      <FilterBar options={FILTERS} selected={filter} onSelect={setFilter} color={theme.color.green} />

      {/* Season Picker Modal */}
      <Modal visible={showSeasonPicker} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowSeasonPicker(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>选择赛季</Text>
            {SEASONS.map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.modalOption, season === s && styles.modalOptionActive]}
                onPress={() => { setSeason(s); setShowSeasonPicker(false); }}
              >
                <Text style={[styles.modalOptionText, season === s && styles.modalOptionTextActive]}>{s} 赛季</Text>
                {season === s && <Text style={{ color: theme.color.green, fontSize: 16 }}>✓</Text>}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowSeasonPicker(false)}>
              <Text style={{ color: theme.text.secondary, fontSize: 15 }}>取消</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {loading ? (
        <ScrollView style={styles.scroll}>{[1,2,3,4].map(i => <TournamentSkeleton key={i} />)}</ScrollView>
      ) : !hasData ? (
        <EmptyState icon="🏎️" title="暂无赛事" message="该分类下暂无比赛。请尝试切换赛季或筛选条件。" actionLabel="查看全部赛事" onAction={() => { setFilter('all'); }} />
      ) : (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.color.green} colors={[theme.color.green]} />}>
          {live.length > 0 && <><Text style={[styles.section, { color: '#FF4444' }]}>● 进行中</Text>{live.map(t => <TournamentCard key={t.id} tournament={t} onPress={onTournamentPress} sportType={selectedSport} />)}</>}
          {upcoming.length > 0 && <><Text style={[styles.section, { color: theme.color.gold }]}>📅 即将到来</Text>{upcoming.map(t => <TournamentCard key={t.id} tournament={t} onPress={onTournamentPress} sportType={selectedSport} />)}</>}
          {completed.length > 0 && <><Text style={[styles.section, { color: theme.text.tertiary }]}>✓ 已结束</Text>{completed.map(t => <TournamentCard key={t.id} tournament={t} compact onPress={onTournamentPress} sportType={selectedSport} />)}</>}
          <View style={{ height: 20 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg.primary },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  title: { fontSize: 32, fontWeight: '800', color: theme.text.primary, letterSpacing: -0.5 },
  seasonBtn: { backgroundColor: theme.bg.surface, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: theme.color.green + '40' },
  seasonText: { fontSize: 14, color: theme.color.greenLight, fontWeight: '600' },
  scroll: { flex: 1, paddingHorizontal: 16 },
  section: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginTop: 20, marginBottom: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: theme.bg.surface, borderRadius: 20, padding: 20, width: 260, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: theme.text.primary, textAlign: 'center', marginBottom: 16 },
  modalOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, marginBottom: 4 },
  modalOptionActive: { backgroundColor: theme.color.green + '15' },
  modalOptionText: { fontSize: 16, color: theme.text.secondary },
  modalOptionTextActive: { color: theme.color.greenLight, fontWeight: '700' },
  modalCancel: { alignItems: 'center', paddingTop: 12, marginTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
});
