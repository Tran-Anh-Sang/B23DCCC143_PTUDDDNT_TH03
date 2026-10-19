import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {colors} from '../theme';

interface Props<K extends string | number> {
  options: {key: K; label: string}[];
  value: K;
  onChange: (key: K) => void;
  style?: StyleProp<ViewStyle>;
}

export default function FilterChips<K extends string | number>({
  options,
  value,
  onChange,
  style,
}: Props<K>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={styles.row}>
      {options.map(o => {
        const active = o.key === value;
        return (
          <Pressable
            key={String(o.key)}
            onPress={() => onChange(o.key)}
            style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.text, active && styles.textActive]}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {paddingVertical: 2},
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  chipActive: {backgroundColor: colors.primary, borderColor: colors.primary},
  text: {fontSize: 13, fontWeight: '600', color: colors.sub},
  textActive: {color: '#FFFFFF'},
});
