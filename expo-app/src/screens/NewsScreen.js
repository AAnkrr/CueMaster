import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SportPicker from '../components/SportPicker';
import { FilterBar } from '../components/TournamentCard';
import { NewsSkeleton } from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { fetchNews } from '../services/newsService';
import { theme } from '../theme';

const FILTERS = [
  { key: 'all', label: '全部' },
  { key: '赛事', label: '赛事' },
  { key: '球员', label: '球员' },
  { key: '排名', label: '排名' },
];

export default function NewsScreen({ selectedSport, onSelectSport }) {
  const [filter, setFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  const loadNews = useCallback(async () => {
    try {
      const items = await fetchNews({ category: 'all' });
      setNews(items);
    } catch { /* keep existing data */ }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadNews().finally(() => setLoading(false));
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  }, [loadNews]);

  const filtered = useMemo(() => {
    return filter === 'all' ? news : news.filter(n => n.cat === filter);
  }, [filter, news]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>发现</Text>
      </View>
      <SportPicker selected={selectedSport} onSelect={onSelectSport} />
      <FilterBar options={FILTERS} selected={filter} onSelect={setFilter} color={theme.color.green} />

      {loading ? (
        <ScrollView style={styles.scroll}><NewsSkeleton /></ScrollView>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="📰"
          title="暂无新闻"
          message="该分类下暂无新闻。请尝试切换分类或下拉刷新。"
          actionLabel="查看全部新闻"
          onAction={() => setFilter('all')}
        />
      ) : (
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.color.green} colors={[theme.color.green]} />
          }
        >
          {filtered.map(item => (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
              <View style={styles.meta}>
                <View style={styles.catBadge}>
                  <Text style={styles.catText}>{item.cat}</Text>
                </View>
                <Text style={styles.src}>{item.src} · {item.timeAgo || item.time}</Text>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
            </TouchableOpacity>
          ))}
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
  card: { backgroundColor: theme.bg.surface, borderRadius: theme.radius.sm, padding: 14, marginBottom: 12 },
  meta: { flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'center' },
  catBadge: { backgroundColor: theme.color.green + '15', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  catText: { fontSize: 10, fontWeight: '700', color: theme.color.greenLight },
  src: { fontSize: 10, color: theme.text.tertiary },
  cardTitle: { fontSize: 14, fontWeight: '600', color: theme.text.primary, lineHeight: 20, marginBottom: 6 },
  summary: { fontSize: 12, color: theme.text.secondary, lineHeight: 18 },
});
