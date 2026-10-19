import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import Badge from './Badge';
import {getSubject} from '../data/mockData';
import {formatDateTime, dueInfo} from '../utils/date';
import {colors} from '../theme';

export default function AssignmentItem({assignment, onPress, onToggle}) {
  const subject = getSubject(assignment.subjectId);
  const due = dueInfo(assignment.dueDate, assignment.done);
  return (
    <Card onPress={onPress} style={styles.card}>
      <Pressable
        onPress={onToggle}
        hitSlop={10}
        style={[styles.check, assignment.done && styles.checkDone]}>
        {assignment.done ? <Text style={styles.tick}>✓</Text> : null}
      </Pressable>
      <View style={styles.body}>
        <Text
          style={[styles.title, assignment.done && styles.titleDone]}
          numberOfLines={2}>
          {assignment.title}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {subject ? subject.name : ''}
        </Text>
        <Text style={styles.sub}>Hạn nộp: {formatDateTime(assignment.dueDate)}</Text>
        <Badge label={due.label} tone={due.tone} style={styles.badge} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {flexDirection: 'row', alignItems: 'flex-start'},
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: {backgroundColor: colors.success, borderColor: colors.success},
  tick: {color: '#FFFFFF', fontWeight: '800', fontSize: 14},
  body: {flex: 1},
  title: {fontSize: 15, fontWeight: '700', color: colors.text},
  titleDone: {textDecorationLine: 'line-through', color: colors.sub},
  sub: {fontSize: 12, color: colors.sub, marginTop: 3},
  badge: {marginTop: 8},
});
