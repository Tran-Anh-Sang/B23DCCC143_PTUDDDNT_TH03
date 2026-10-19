import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';

export default function EmptyState({icon = '📭', title, message}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {alignItems: 'center', justifyContent: 'center', padding: 32},
  icon: {fontSize: 40, marginBottom: 10},
  title: {fontSize: 16, fontWeight: '700', color: colors.text, textAlign: 'center'},
  message: {fontSize: 13, color: colors.sub, textAlign: 'center', marginTop: 6},
});
