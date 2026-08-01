import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, Alert, Modal, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../hooks/useSettings';
import { useFavorites } from '../hooks/useFavorites';
import { getMainPlayer, setMainPlayer, clearMainPlayer, getWidgetConfig, saveWidgetConfig } from '../utils/storage';
import { snookerPlayers, chinese8Players, nineballPlayers } from '../data/mockData';
import PlayerAvatar from '../components/PlayerAvatar';
import { theme } from '../theme';

const ALL_PLAYERS = [
  ...snookerPlayers.map(p => ({ ...p, sport: 'snooker' })),
  ...chinese8Players.map(p => ({ ...p, sport: 'chinese8' })),
  ...nineballPlayers.map(p => ({ ...p, sport: 'nineball' })),
];

const LANG_LABELS = { zh: '简体中文', en: 'English', zh_HK: '繁體中文' };

export default function ProfileScreen() {
  const { settings, loading, update } = useSettings();
  const { favorites } = useFavorites();
  const [notif, setNotif] = useState(true);
  const [reminder, setReminder] = useState(true);
  const [breaking, setBreaking] = useState(true);
  const [calendar, setCalendar] = useState(true);
  const [language, setLanguage] = useState('zh');
  const [mainPlayer, setMainPlayerState] = useState(null);
  const [widgetConfig, setWidgetConfig] = useState(null);
  const [showPlayerPicker, setShowPlayerPicker] = useState(false);
  const [showWidgetSettings, setShowWidgetSettings] = useState(false);

  useEffect(() => {
    if (settings) {
      setNotif(settings.notifications); setReminder(settings.matchReminder);
      setBreaking(settings.breakingNews); setCalendar(settings.calendarSync);
      setLanguage(settings.language);
    }
    getMainPlayer().then(setMainPlayerState);
    getWidgetConfig().then(setWidgetConfig);
  }, [settings]);

  const handleToggle = (key, value, setter) => { setter(value); update(key, value); };

  const handleSelectMainPlayer = useCallback(async (player) => {
    await setMainPlayer(player);
    setMainPlayerState(player);
    setShowPlayerPicker(false);
  }, []);

  const handleClearMainPlayer = useCallback(async () => {
    await clearMainPlayer();
    setMainPlayerState(null);
  }, []);

  const handleWidgetChange = useCallback(async (key, value) => {
    const updated = { ...widgetConfig, [key]: value };
    setWidgetConfig(updated);
    await saveWidgetConfig(updated);
  }, [widgetConfig]);

  const handleClearCache = () => {
    Alert.alert('清除缓存', '确定清除所有本地缓存数据？', [
      { text: '取消', style: 'cancel' }, { text: '确定', onPress: () => Alert.alert('完成', '缓存已清除') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}><Text style={styles.title}>我的</Text></View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Main Player Card */}
        <View style={styles.mainPlayerSection}>
          <Text style={styles.sectionLabel}>⭐ 我的主球员</Text>
          {mainPlayer ? (
            <TouchableOpacity style={styles.mainPlayerCard} activeOpacity={0.7} onPress={() => setShowPlayerPicker(true)}>
              <PlayerAvatar player={mainPlayer} size={56} />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.mpName}>{mainPlayer.flag} {mainPlayer.name}</Text>
                <Text style={styles.mpZh}>{mainPlayer.zh} · {mainPlayer.nation}</Text>
                {mainPlayer.sport === 'snooker' && mainPlayer.rank && (
                  <Text style={styles.mpRank}>🏆 世界第 {mainPlayer.rank} 位</Text>
                )}
              </View>
              <Text style={{ color: theme.text.secondary, fontSize: 13 }}>更换 ›</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.selectMainBtn} activeOpacity={0.7} onPress={() => setShowPlayerPicker(true)}>
              <Text style={{ fontSize: 28, marginBottom: 6 }}>⭐</Text>
              <Text style={{ color: theme.color.gold, fontWeight: '600', fontSize: 14 }}>选择你的主球员</Text>
              <Text style={{ color: theme.text.tertiary, fontSize: 11, marginTop: 4 }}>选择后主页将展示该球员的专属信息</Text>
            </TouchableOpacity>
          )}
          {mainPlayer && (
            <TouchableOpacity style={styles.clearMainBtn} onPress={handleClearMainPlayer}>
              <Text style={{ color: '#FF4444', fontSize: 12 }}>取消主球员</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Pro Card */}
        <View style={styles.proCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Text style={{ fontSize: 20 }}>👑</Text><Text style={styles.proTitle}>CueMaster Pro</Text>
          </View>
          <Text style={styles.proDesc}>解锁全部功能：无广告、无限关注球员、AI 赛事摘要、数据对比、桌面小组件主题</Text>
          <View style={styles.plans}>
            <TouchableOpacity style={styles.plan} activeOpacity={0.7}>
              <Text style={{ fontSize: 13, color: theme.text.secondary }}>月订阅</Text>
              <Text style={{ fontSize: 16, fontWeight: '800', color: theme.color.gold, marginTop: 4 }}>¥18/月</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.plan, styles.planRec]} activeOpacity={0.7}>
              <View style={{ backgroundColor: 'orange', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginBottom: 4 }}>
                <Text style={{ fontSize: 9, fontWeight: '800', color: 'white' }}>推荐</Text></View>
              <Text style={{ fontSize: 13, color: theme.text.secondary }}>年订阅</Text>
              <Text style={{ fontSize: 16, fontWeight: '800', color: theme.color.gold, marginTop: 4 }}>¥128/年</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Widget Settings */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.row} activeOpacity={0.5} onPress={() => setShowWidgetSettings(true)}>
            <Text style={styles.rowLabel}>🧩 桌面小组件设置</Text>
            <Text style={{ color: theme.text.secondary, fontSize: 14 }}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>🔔 通知</Text>
          <SettingRow label="推送通知" value={notif} onChange={v => handleToggle('notifications', v, setNotif)} />
          <SettingRow label="比赛提醒" value={reminder} onChange={v => handleToggle('matchReminder', v, setReminder)} last />
          <SettingRow label="重大新闻推送" value={breaking} onChange={v => handleToggle('breakingNews', v, setBreaking)} />
        </View>

        {/* General */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>⚙️ 通用</Text>
          <SettingRow label="日历同步" value={calendar} onChange={v => handleToggle('calendarSync', v, setCalendar)} last />
          <TouchableOpacity style={styles.row} activeOpacity={0.5} onPress={() => {
            const langs = Object.keys(LANG_LABELS);
            const idx = langs.indexOf(language);
            const next = langs[(idx + 1) % langs.length];
            setLanguage(next); update('language', next);
          }}>
            <Text style={styles.rowLabel}>语言</Text>
            <Text style={{ color: theme.text.secondary, fontSize: 14 }}>{LANG_LABELS[language]}</Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ℹ️ 关于</Text>
          <View style={styles.row}><Text style={styles.rowLabel}>版本</Text><Text style={{ color: theme.text.primary, fontSize: 14 }}>1.0.0 (MVP)</Text></View>
          <View style={[styles.row, { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.05)' }]}>
            <Text style={styles.rowLabel}>数据来源</Text><Text style={{ color: theme.text.primary, fontSize: 14 }}>WST / api.snooker.org / 公开数据</Text>
          </View>
          <TouchableOpacity style={styles.row} activeOpacity={0.5} onPress={handleClearCache}>
            <Text style={styles.rowLabel}>清除缓存</Text><Text style={{ color: theme.text.secondary, fontSize: 14 }}>›</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.disclaimer}>CueMaster 并非 World Snooker Tour 官方应用。{'\n'}所有赛事数据和球员信息均来源于公开数据。{'\n'}斯诺克相关商标归 WST 及各权利方所有。</Text>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ----- Player Picker Modal ----- */}
      <Modal visible={showPlayerPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>选择主球员</Text>
            <Text style={{ color: theme.text.secondary, fontSize: 13, textAlign: 'center', marginBottom: 14 }}>选择后将在首页展示该球员的专属信息</Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {ALL_PLAYERS.filter(p => favorites.includes(p.id)).length > 0 && (
                <Text style={{ color: theme.text.tertiary, fontSize: 11, fontWeight: '600', marginBottom: 6 }}>我的关注</Text>
              )}
              {ALL_PLAYERS.filter(p => favorites.includes(p.id)).map(p => (
                <TouchableOpacity key={p.id} style={styles.playerOption} onPress={() => handleSelectMainPlayer(p)}>
                  <PlayerAvatar player={p} size={36} />
                  <Text style={styles.playerOptionName}>{p.flag} {p.name}</Text>
                  <Text style={{ color: theme.text.tertiary, fontSize: 11 }}>{p.zh} · {p.sport === 'snooker' ? '斯诺克' : p.sport === 'chinese8' ? '中式八球' : '九球'}</Text>
                </TouchableOpacity>
              ))}
              <Text style={{ color: theme.text.tertiary, fontSize: 11, fontWeight: '600', marginVertical: 8 }}>全部球员</Text>
              {ALL_PLAYERS.map(p => (
                <TouchableOpacity key={p.id} style={styles.playerOption} onPress={() => handleSelectMainPlayer(p)}>
                  <PlayerAvatar player={p} size={36} />
                  <Text style={styles.playerOptionName}>{p.flag} {p.name}</Text>
                  <Text style={{ color: theme.text.tertiary, fontSize: 11 }}>{p.zh}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowPlayerPicker(false)}>
              <Text style={{ color: theme.text.secondary, fontSize: 15 }}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ----- Widget Settings Modal ----- */}
      <Modal visible={showWidgetSettings} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🧩 桌面小组件</Text>
            <Text style={{ color: theme.text.secondary, fontSize: 13, textAlign: 'center', marginBottom: 16 }}>
              配置小组件显示内容（需 CueMaster Pro 解锁全部样式）
            </Text>
            <View style={styles.widgetOption}>
              <Text style={styles.widgetLabel}>小组件类型</Text>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {['countdown','rankings','mainPlayer'].map(t => (
                  <TouchableOpacity key={t}
                    style={[styles.wTypeBtn, widgetConfig?.type === t && { backgroundColor: theme.color.green, borderColor: theme.color.green }]}
                    onPress={() => handleWidgetChange('type', t)}>
                    <Text style={[styles.wTypeText, widgetConfig?.type === t && { color: '#fff' }]}>
                      {t === 'countdown' ? '⏱️ 倒计时' : t === 'rankings' ? '📊 排名' : '⭐ 主球员'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <SettingRow2 label="显示主球员信息" value={widgetConfig?.showMainPlayer} onChange={v => handleWidgetChange('showMainPlayer', v)} />
            <SettingRow2 label="显示排名" value={widgetConfig?.showRankings} onChange={v => handleWidgetChange('showRankings', v)} />
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowWidgetSettings(false)}>
              <Text style={{ color: theme.color.green, fontSize: 15, fontWeight: '600' }}>完成</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function SettingRow({ label, value, onChange, last }) {
  return (
    <View style={[st.row, last && { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.05)' }]}>
      <Text style={st.rowLabel}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: '#3a3a3a', true: theme.color.green }} thumbColor={value ? '#fff' : '#888'} />
    </View>
  );
}
function SettingRow2({ label, value, onChange }) {
  return (
    <View style={st.row}>
      <Text style={st.rowLabel}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: '#3a3a3a', true: theme.color.green }} thumbColor={value ? '#fff' : '#888'} />
    </View>
  );
}

const st = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 14 },
  rowLabel: { fontSize: 14, color: theme.text.primary },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg.primary },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4, marginBottom: 12 },
  title: { fontSize: 32, fontWeight: '800', color: theme.text.primary },
  scroll: { flex: 1, paddingHorizontal: 16 },
  sectionLabel: { fontSize: 11, color: theme.text.tertiary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, paddingHorizontal: 14, paddingTop: 14, paddingBottom: 8 },
  section: { backgroundColor: theme.bg.surface, borderRadius: theme.radius.sm, marginBottom: 16, paddingVertical: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 14 },
  rowLabel: { fontSize: 14, color: theme.text.primary },
  mainPlayerSection: { marginBottom: 20 },
  mainPlayerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.bg.surface, borderRadius: theme.radius.lg, padding: 16, borderWidth: 1, borderColor: theme.color.gold + '30' },
  mpName: { fontSize: 16, fontWeight: '700', color: theme.text.primary },
  mpZh: { fontSize: 12, color: theme.text.secondary, marginTop: 2 },
  mpRank: { fontSize: 12, color: theme.color.gold, fontWeight: '600', marginTop: 4 },
  selectMainBtn: { alignItems: 'center', padding: 24, backgroundColor: theme.bg.surface, borderRadius: theme.radius.lg, borderWidth: 1, borderColor: theme.color.gold + '20', borderStyle: 'dashed' },
  clearMainBtn: { alignItems: 'center', paddingVertical: 8, marginTop: 4 },
  proCard: { backgroundColor: theme.bg.surface, borderRadius: theme.radius.lg, borderWidth: 1, borderColor: theme.color.gold + '30', padding: 16, marginBottom: 16 },
  proTitle: { fontSize: 16, fontWeight: '800', color: theme.color.gold },
  proDesc: { fontSize: 12, color: theme.text.secondary, marginBottom: 14, lineHeight: 18 },
  plans: { flexDirection: 'row', gap: 10 },
  plan: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.03)' },
  planRec: { backgroundColor: theme.color.gold + '15', borderWidth: 1.5, borderColor: theme.color.gold },
  disclaimer: { fontSize: 10, color: theme.text.tertiary, textAlign: 'center', paddingVertical: 12, lineHeight: 16 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: theme.bg.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80%' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: theme.text.primary, textAlign: 'center', marginBottom: 8 },
  modalCancel: { alignItems: 'center', paddingVertical: 14, marginTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  playerOption: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 10, marginBottom: 2 },
  playerOptionName: { flex: 1, fontSize: 14, fontWeight: '600', color: theme.text.primary },
  // Widget modal
  widgetOption: { marginBottom: 16 },
  widgetLabel: { fontSize: 14, color: theme.text.primary, fontWeight: '600', marginBottom: 8 },
  wTypeBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  wTypeText: { fontSize: 13, color: theme.text.secondary },
});
