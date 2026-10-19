import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {getLesson, getSubject} from '../data/mockData';
import {DAY_LABELS, dateOfDayKey, formatDate} from '../utils/date';
import {colors} from '../theme';
import Card from '../components/Card';
import Badge from '../components/Badge';
import InfoRow from '../components/InfoRow';
import EmptyState from '../components/EmptyState';
import type {RootStackScreenProps} from '../navigation/types';

export default function LessonDetailScreen({
  route,
  navigation,
}: RootStackScreenProps<'LessonDetail'>) {
  const lesson = getLesson(route.params.lessonId);
  const subject = lesson ? getSubject(lesson.subjectId) : undefined;

  if (!lesson || !subject) {
    return <EmptyState icon="⚠️" title="Không tìm thấy buổi học" />;
  }

  const date = formatDate(dateOfDayKey(lesson.day).toISOString());

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <Text style={styles.code}>{subject.code}</Text>
        <Text style={styles.name}>{subject.name}</Text>
        <Badge
          label={lesson.type}
          tone={lesson.type === 'Thực hành' ? 'warn' : 'info'}
          style={{marginTop: 10}}
        />
      </Card>

      <Card style={{marginTop: 12}}>
        <InfoRow label="Thứ" value={`${DAY_LABELS[lesson.day]} (${date})`} />
        <InfoRow label="Thời gian" value={`${lesson.start} - ${lesson.end}`} />
        <InfoRow label="Phòng học" value={lesson.room} />
        <InfoRow label="Giảng viên" value={subject.lecturer} />
        <InfoRow label="Số tín chỉ" value={`${subject.credits}`} last />
      </Card>

      <Card style={{marginTop: 12}}>
        <Text style={styles.noteTitle}>Ghi chú</Text>
        <Text style={styles.note}>
          {lesson.note ? lesson.note : 'Không có ghi chú cho buổi học này.'}
        </Text>
      </Card>

      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('SubjectDetail', {subjectId: subject.id})}>
        <Text style={styles.btnText}>Xem chi tiết môn học</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg},
  content: {padding: 16, paddingBottom: 32},
  code: {fontSize: 13, fontWeight: '800', color: colors.primary},
  name: {fontSize: 21, fontWeight: '800', color: colors.text, marginTop: 4},
  noteTitle: {fontSize: 14, fontWeight: '800', color: colors.text},
  note: {fontSize: 14, color: colors.sub, marginTop: 6, lineHeight: 21},
  btn: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  btnText: {color: '#FFFFFF', fontWeight: '700', fontSize: 14},
});
