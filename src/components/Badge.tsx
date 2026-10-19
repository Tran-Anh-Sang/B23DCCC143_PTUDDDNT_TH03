import React from 'react';
import {StyleSheet, Text, View, type StyleProp, type ViewStyle} from 'react-native';
import {colors} from '../theme';
import type {Tone} from '../types';

const TONES: Record<Tone, {bg: string; fg: string}> = {
  success: {bg: colors.successLight, fg: colors.success},
  warn: {bg: colors.warnLight, fg: colors.warn},
  danger: {bg: colors.dangerLight, fg: colors.danger},
  info: {bg: colors.primaryLight, fg: colors.primary},
  neutral: {bg: colors.border, fg: colors.sub},
};

interface Props {
  label: string;
  tone?: Tone;
  style?: StyleProp<ViewStyle>;
}

export default function Badge({label, tone = 'neutral', style}: Props) {
  const t = TONES[tone];
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
