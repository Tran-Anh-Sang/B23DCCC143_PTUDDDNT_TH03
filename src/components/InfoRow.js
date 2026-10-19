import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';

export default function InfoRow({label, value, last}) {
  return (
    <View style={[styles.row, !last && styles.border]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 11,
  },
  border: {borderBottomWidth: 1, borderBottomColor: colors.border},
  label: {fontSize: 14, color: colors.sub, marginRight: 12},
  value: {fontSize: 14, color: colors.text, fontWeight: '600', flex: 1, textAlign: 'right'},
});
