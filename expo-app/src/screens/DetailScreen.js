import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { tournaments, rankings, formatPrize, formatDate } from '../data/mockData';

export default function DetailScreen({ route, onBack }) {
  const { type, id } = route.params || {};

  if (type === 'tournament') {
    return <TournamentDetail id={id} onBack={onBack} />;
  }
  if (type === 'player') {
    return <PlayerDetail id={id} onBack={onBack} />;
  }
  return null;
}

function TournamentDetail({ id, onBack }) {
  const t = tournaments.find(x => x.id === id);
  if (!t) return null;

  const isLive = t.status === 'live';
  const isUpcoming = t.status === 'upcoming';
  const catColor = t.cat === 'triple-crown' ? theme.color.tripleCrown : t.cat === 'ranking' ? theme.color.gold : theme.color.invitational;
  const catLabel = t.cat === 'triple-crown' ? '🏆 三重冠' : t.cat === 'ranking' ? '排名赛' : '邀请赛';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>← 返回</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <View style={[styles.badge, { backgroundColor: catColor + '25' }]}>
              <Text style={[styles.badgeText, { color: catColor }]}>{catLabel}</Text>
            </View>
            {t.cat === 'triple-crown' && <Text style={{ fontSize: 11, color: 'orange' }}>👑 Triple Crown</Text>}
            <Text style={{ marginLeft: 'auto', fontSize: 12, color: isLive ? '#FF4444' : isUpcoming ? theme.color.greenLight : theme.text.tertiary }}>
              {isLive ? '● 进行中' : isUpcoming ? '即将到来' : '已结束'}
            </Text>
          </View>
          <Text style={styles.heroName}>{t.name}</Text>
          <Text style={styles.heroLoc}>📍 {t.venue}, {t.city}, {t.country}</Text>
          <Text style={styles.heroDate}>📅 {formatDate(t.start)} - {formatDate(t.end)}</Text>
        </View>

        {/* Stats */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}><Text style={[styles.infoVal, { color: theme.color.gold }]}>{t.prize}</Text><Text style={styles.infoLbl}>总奖金</Text></View>
          <View style={styles.infoCard}><Text style={styles.infoVal}>{formatDate(t.start)}</Text><Text style={styles.infoLbl}>开始日期</Text></View>
          <View style={styles.infoCard}><Text style={styles.infoVal}>{t.city}</Text><Text style={styles.infoLbl}>举办城市</Text></View>
        </View>

        {/* Champion */}
        {t.champion ? (
          <View style={styles.championRow}>
            <Text style={{ color: theme.text.secondary }}>🏆 卫冕冠军</Text>
            <Text style={{ fontWeight: '700', color: theme.color.gold, fontSize: 15 }}>{t.champion}</Text>
          </View>
        ) : null}

        {/* Matches */}
        <Text style={styles.sectionTitle}>比赛对阵</Text>
        {isUpcoming ? (
          <View style={{ alignItems: 'center', padding: 30 }}>
            <Text style={{ color: theme.text.tertiary }}>赛事开始后将实时更新对阵</Text>
          </View>
        ) : (
          <>
            <View style={styles.match}>
              <Text style={styles.matchRound}>🏁 决赛</Text>
              <View style={styles.matchRow}>
                <Text style={styles.matchPlayer}>🏴󠁧󠁢󠁥󠁮󠁧󠁿 J.Trump</Text>
                <Text style={styles.matchScore}>18 - 15</Text>
                <Text style={[styles.matchPlayer, { textAlign: 'right' }]}>🇨🇳 赵心童</Text>
              </View>
            </View>
            <View style={styles.match}>
              <Text style={styles.matchRound}>🏁 半决赛</Text>
              <View style={styles.matchRow}>
                <Text style={styles.matchPlayer}>🇨🇳 赵心童</Text>
                <Text style={styles.matchScore}>17 - 12</Text>
                <Text style={[styles.matchPlayer, { textAlign: 'right' }]}>🇦🇺 N.Robertson</Text>
              </View>
            </View>
          </>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function PlayerDetail({ id, onBack }) {
  const p = rankings.find(x => x.id === id);
  if (!p) return null;
  const rank = rankings.findIndex(x => x.id === id) + 1;
  const init = p.name.charAt(0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>← 返回</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.pHero}>
          <View style={styles.pAvatar}><Text style={styles.pAvatarText}>{init}</Text></View>
          <Text style={styles.pName}>{p.name}</Text>
          <Text style={styles.pZh}>{p.zh}</Text>
          <Text style={styles.pFlag}>{p.flag}  {p.nation}</Text>
          <View style={styles.pRank}><Text style={{ color: theme.color.gold, fontWeight: '700', fontSize: 14 }}>🏆 世界第 {rank} 位</Text></View>
        </View>

        {/* Stats grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}><Text style={[styles.infoVal, { color: theme.color.greenLight }]}>No.{rank}</Text><Text style={styles.infoLbl}>当前排名</Text></View>
          <View style={styles.infoCard}><Text style={styles.infoVal}>{formatPrize(p.points)}</Text><Text style={styles.infoLbl}>奖金积分</Text></View>
          <View style={styles.infoCard}><Text style={styles.infoVal}>{rank <= 3 ? 'Top 3' : 'Top 16'}</Text><Text style={styles.infoLbl}>排名区间</Text></View>
        </View>

        {/* Season stats */}
        <View style={styles.statsBox}>
          <Text style={styles.sectionTitle}>2025/26 赛季数据</Text>
          <View style={styles.statGrid}>
            <StatItem label="参赛场次" value={`${55 + rank}`} />
            <StatItem label="胜场" value={`${40 + rank}`} />
            <StatItem label="胜率" value={`${60 + Math.floor(Math.random() * 20)}%`} />
            <StatItem label="破百" value={`${50 + rank * 2}`} />
            <StatItem label="最高分" value={rank === 3 ? '147 🔥' : `${130 + Math.floor(Math.random() * 16)}`} />
            <StatItem label="赛季奖金" value={`£${(p.points / 1000).toFixed(0)}K`} />
          </View>
        </View>

        {/* Recent matches */}
        <Text style={styles.sectionTitle}>近期比赛</Text>
        <RecentMatch outcome="loss" tour="世锦赛 决赛" opp="J.Trump" score="15 - 18" date="5/4" />
        <RecentMatch outcome="win" tour="世锦赛 半决赛" opp="N.Robertson" score="17 - 12" date="5/2" />
        <RecentMatch outcome="win" tour="世锦赛 1/4决赛" opp="M.Selby" score="13 - 10" date="4/28" />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatItem({ label, value }) {
  return (
    <View style={styles.si}>
      <Text style={styles.siVal}>{value}</Text>
      <Text style={styles.siLbl}>{label}</Text>
    </View>
  );
}

function RecentMatch({ outcome, tour, opp, score, date }) {
  const won = outcome === 'win';
  return (
    <View style={styles.rm}>
      <View style={[styles.rmDot, { backgroundColor: won ? '#44CC44' : '#FF4444' }]} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 13, fontWeight: '500', color: theme.text.primary }}>{tour}</Text>
        <Text style={{ fontSize: 10, color: theme.text.tertiary }}>vs {opp}</Text>
      </View>
      <Text style={{ fontWeight: '700', color: won ? '#44CC44' : '#FF4444', fontSize: 13 }}>{score}</Text>
      <Text style={{ fontSize: 10, color: theme.text.tertiary, width: 40, textAlign: 'right' }}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg.primary },
  backBtn: { paddingHorizontal: 16, paddingVertical: 12 },
  backText: { fontSize: 14, color: theme.color.greenLight, fontWeight: '500' },
  scroll: { flex: 1, paddingHorizontal: 16 },
  hero: { backgroundColor: theme.bg.surface, borderRadius: theme.radius.lg, padding: 20, marginBottom: 16 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, alignSelf: 'flex-start' },
  badgeText: { fontSize: 10, fontWeight: '700' },
  heroName: { fontSize: 20, fontWeight: '800', color: theme.text.primary, marginBottom: 6 },
  heroLoc: { fontSize: 13, color: theme.text.secondary },
  heroDate: { fontSize: 12, color: theme.text.tertiary, marginTop: 4 },
  infoGrid: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  infoCard: { flex: 1, backgroundColor: theme.bg.surface, borderRadius: 12, padding: 14, alignItems: 'center' },
  infoVal: { fontSize: 18, fontWeight: '800', color: theme.text.primary },
  infoLbl: { fontSize: 10, color: theme.text.tertiary, marginTop: 4 },
  championRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: theme.bg.surface, borderRadius: 10, padding: 14, marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.text.primary, marginBottom: 10 },
  match: { backgroundColor: theme.bg.surface, borderRadius: 10, padding: 14, marginBottom: 8 },
  matchRound: { fontSize: 11, color: theme.text.tertiary, marginBottom: 8 },
  matchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  matchPlayer: { fontSize: 14, fontWeight: '500', color: theme.text.primary, flex: 1 },
  matchScore: { fontSize: 20, fontWeight: '800', color: theme.text.primary, paddingHorizontal: 16 },
  // Player
  pHero: { alignItems: 'center', padding: 24, backgroundColor: theme.bg.surface, borderRadius: theme.radius.lg, marginBottom: 16 },
  pAvatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: theme.color.green + '25', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  pAvatarText: { fontSize: 28, fontWeight: '800', color: theme.color.green },
  pName: { fontSize: 20, fontWeight: '800', color: theme.text.primary },
  pZh: { fontSize: 14, color: theme.text.secondary, marginTop: 2 },
  pFlag: { fontSize: 18, marginTop: 4 },
  pRank: { marginTop: 10, paddingHorizontal: 16, paddingVertical: 6, backgroundColor: theme.color.gold + '10', borderRadius: 20 },
  statsBox: { backgroundColor: theme.bg.surface, borderRadius: 12, padding: 16, marginBottom: 16 },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  si: { width: '30%', backgroundColor: theme.bg.primary, borderRadius: 8, padding: 10, alignItems: 'center', marginBottom: 4 },
  siVal: { fontSize: 16, fontWeight: '800', color: theme.text.primary },
  siLbl: { fontSize: 10, color: theme.text.tertiary, marginTop: 2 },
  rm: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: theme.bg.surface, padding: 12, borderRadius: 8, marginBottom: 6 },
  rmDot: { width: 8, height: 8, borderRadius: 4 },
});
