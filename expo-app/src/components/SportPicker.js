import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

const SPORTS = [
  { key: 'snooker', emoji: '🎱', label: '斯诺克' },
  { key: 'chinese8', emoji: '🔴', label: '中式八球' },
  { key: 'nineball', emoji: '🔵', label: '九球' },
];

export default function SportPicker({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {SPORTS.map(sport => {
        const active = selected === sport.key;
        const colors = theme.sport[sport.key];
        return (
          <TouchableOpacity
            key={sport.key}
            style={[
              styles.option,
              active && { backgroundColor: colors.primary },
            ]}
            activeOpacity={0.7}
            onPress={() => onSelect(sport.key)}
          >
            <Text style={styles.emoji}>{sport.emoji}</Text>
            <Text style={[styles.label, active && styles.labelActive]}>
              {sport.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: theme.bg.surface,
    borderRadius: theme.radius.sm,
    padding: 4,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  emoji: { fontSize: 18, marginBottom: 2 },
  label: { fontSize: 13, fontWeight: '500', color: theme.text.secondary },
  labelActive: { color: '#FFFFFF', fontWeight: '700' },
});
