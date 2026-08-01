import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getMainPlayer } from '../utils/storage';
import PlayerAvatar from './PlayerAvatar';
import { snookerPlayers, formatPrize } from '../data/mockData';
import { theme } from '../theme';

export default function MainPlayerBanner({ onPress }) {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    getMainPlayer().then(setPlayer);
    // Re-check periodically
    const interval = setInterval(() => getMainPlayer().then(setPlayer), 2000);
    return () => clearInterval(interval);
  }, []);

  if (!player) return null;

  return (
    <TouchableOpacity style={styles.banner} activeOpacity={0.7} onPress={() => onPress && onPress(player)}>
      <View style={styles.left}>
        <PlayerAvatar player={player} size={44} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.greeting}>
            {player.flag} 你的主球员 · {player.name}
          </Text>
          {player.rank && (
            <Text style={styles.rank}>
              当前世界排名 <Text style={{ color: theme.color.gold, fontWeight: '700' }}>No.{player.rank}</Text>
              {player.change && player.change > 0 ? (
                <Text style={{ color: '#44CC44', fontSize: 11 }}> ↑{player.change}</Text>
              ) : player.change && player.change < 0 ? (
                <Text style={{ color: '#FF4444', fontSize: 11 }}> ↓{Math.abs(player.change)}</Text>
              ) : null}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.right}>
        {player.points && (
          <Text style={styles.points}>{formatPrize(player.points)}</Text>
        )}
        <Text style={{ color: theme.text.tertiary, fontSize: 9, marginTop: 2 }}>查看详情 ›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    backgroundColor: theme.color.gold + '08',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.color.gold + '20',
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  greeting: { fontSize: 13, fontWeight: '600', color: theme.text.primary },
  rank: { fontSize: 12, color: theme.text.secondary, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  points: { fontSize: 14, fontWeight: '700', color: theme.color.gold },
});
