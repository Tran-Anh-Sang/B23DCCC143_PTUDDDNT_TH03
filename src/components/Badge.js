import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';

const TONES = {
  success: {bg: colors.successLight, fg: colors.success},
  warn: {bg: colors.warnLight, fg: colors.warn},
  danger: {bg: colors.dangerLight, fg: colors.danger},
  info: {bg: colors.primaryLight, fg: colors.primary},
  neutral: {bg: colors.border, fg: colors.sub},
};

export default function Badge({label, tone = 'neutral', style}) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <View style={[styles.badge, {backgroundColor: t.bg}, style]}>
      <Text style={[styles.text, {color: t.fg}]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: {fontSize: 12, fontWeight: '700'},
});
