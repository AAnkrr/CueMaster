import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { theme } from '../theme';

// Shimmer animation
function useShimmer() {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);
  return anim.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.35] });
}

function SkeletonBlock({ width, height, style }) {
  const opacity = useShimmer();
  return (
    <Animated.View
      style={[
        styles.block,
        { width, height, opacity },
        style,
      ]}
    />
  );
}

export function TournamentSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <SkeletonBlock width={60} height={18} style={{ borderRadius: 10 }} />
        <SkeletonBlock width={80} height={18} style={{ borderRadius: 10 }} />
      </View>
      <SkeletonBlock width="80%" height={20} style={{ borderRadius: 4, marginTop: 10 }} />
      <SkeletonBlock width="60%" height={14} style={{ borderRadius: 4, marginTop: 8 }} />
      <View style={[styles.row, { marginTop: 12 }]}>
        <SkeletonBlock width={100} height={14} style={{ borderRadius: 4 }} />
        <SkeletonBlock width={60} height={24} style={{ borderRadius: 12 }} />
      </View>
    </View>
  );
}

export function RankingSkeleton() {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      {[1,2,3,4,5,6,7,8].map(i => (
        <View key={i} style={styles.rankRow}>
          <SkeletonBlock width={24} height={14} style={{ borderRadius: 4, marginRight: 10 }} />
          <SkeletonBlock width={32} height={32} style={{ borderRadius: 16, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <SkeletonBlock width="70%" height={14} style={{ borderRadius: 4 }} />
            <SkeletonBlock width="40%" height={10} style={{ borderRadius: 2, marginTop: 6 }} />
          </View>
          <SkeletonBlock width={60} height={14} style={{ borderRadius: 4 }} />
        </View>
      ))}
    </View>
  );
}

export function NewsSkeleton() {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      {[1,2,3].map(i => (
        <View key={i} style={styles.card}>
          <View style={styles.row}>
            <SkeletonBlock width={50} height={18} style={{ borderRadius: 10 }} />
            <SkeletonBlock width={80} height={12} style={{ borderRadius: 4 }} />
          </View>
          <SkeletonBlock width="90%" height={18} style={{ borderRadius: 4, marginTop: 10 }} />
          <SkeletonBlock width="100%" height={14} style={{ borderRadius: 4, marginTop: 8 }} />
          <SkeletonBlock width="70%" height={14} style={{ borderRadius: 4, marginTop: 4 }} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  block: { backgroundColor: theme.text.tertiary },
  card: {
    backgroundColor: theme.bg.surface,
    borderRadius: theme.radius.lg,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  row: { flexDirection: 'row', gap: 8 },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: theme.bg.surface,
    borderRadius: 8,
    marginBottom: 2,
  },
});
