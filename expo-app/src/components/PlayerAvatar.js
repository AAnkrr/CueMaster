import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function PlayerAvatar({ player, size = 40, showFlag = true, flagSize = 14 }) {
  const [imgError, setImgError] = useState(false);
  const hasAvatar = player.avatar && !imgError;
  const initials = player.name
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      {hasAvatar ? (
        <Image
          source={{ uri: player.avatar }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
          onError={() => setImgError(true)}
        />
      ) : (
        <View style={[styles.fallback, {
          width: size, height: size, borderRadius: size / 2,
          backgroundColor: (theme.sport[player.sport]?.primary || theme.color.green) + '25',
        }]}>
          <Text style={[styles.initials, { fontSize: size * 0.38, color: theme.sport[player.sport]?.primary || theme.color.green }]}>
            {initials}
          </Text>
        </View>
      )}
      {showFlag && player.flag ? (
        <View style={[styles.flagWrap, { width: flagSize, height: flagSize, borderRadius: flagSize / 2, bottom: -2, right: -2 }]}>
          <Text style={{ fontSize: flagSize * 0.7 }}>{player.flag}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative' },
  image: { resizeMode: 'cover' },
  fallback: { alignItems: 'center', justifyContent: 'center' },
  initials: { fontWeight: '800' },
  flagWrap: {
    position: 'absolute',
    backgroundColor: theme.bg.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: theme.bg.primary,
  },
});
