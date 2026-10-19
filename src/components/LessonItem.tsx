import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import Badge from './Badge';
import {getSubject} from '../data/mockData';
import {colors} from '../theme';
import type {Lesson} from '../types';

interface Props {
  lesson: Lesson;
  onPress: () => void;
}

export default function LessonItem({lesson, onPress}: Props) {
  const subject = getSubject(lesson.subjectId);
  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.timeBox}>
        <Text style={styles.time}>{lesson.start}</Text>
        <Text style={styles.timeEnd}>{lesson.end}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {subject ? subject.name : 'Môn học'}
        </Text>
        <Text style={styles.sub}>📍 {lesson.room}</Text>
      </View>
      <Badge
        label={lesson.type}
        tone={lesson.type === 'Thực hành' ? 'warn' : 'info'}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {flexDirection: 'row', alignItems: 'center'},
  timeBox: {
    borderRightWidth: 3,
    borderRightColor: colors.primary,
    paddingRight: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 58,
  },
  time: {fontSize: 15, fontWeight: '800', color: colors.text},
  timeEnd: {fontSize: 12, color: colors.sub, marginTop: 2},
  body: {flex: 1, marginRight: 8},
  name: {fontSize: 15, fontWeight: '700', color: colors.text},
  sub: {fontSize: 13, color: colors.sub, marginTop: 4},
});
