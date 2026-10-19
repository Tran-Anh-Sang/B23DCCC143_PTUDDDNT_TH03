import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import Badge from './Badge';
import {colors} from '../theme';

export default function SubjectItem({subject, onPress}) {
  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.codeBox}>
        <Text style={styles.code}>{subject.code}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {subject.name}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {subject.lecturer}
        </Text>
      </View>
      <Badge label={`${subject.credits} TC`} tone="info" />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {flexDirection: 'row', alignItems: 'center'},
  codeBox: {
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginRight: 12,
    minWidth: 68,
    alignItems: 'center',
  },
  code: {fontSize: 12, fontWeight: '800', color: colors.primary},
  body: {flex: 1, marginRight: 8},
  name: {fontSize: 15, fontWeight: '700', color: colors.text},
  sub: {fontSize: 12, color: colors.sub, marginTop: 3},
});
