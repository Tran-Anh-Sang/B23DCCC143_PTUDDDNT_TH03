import React, {useMemo} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useApp} from '../context/AppContext';
import {getGrade, getSubject, schedule} from '../data/mockData';
import {DAY_LABELS} from '../utils/date';
import {toLetter, totalScore} from '../utils/grade';
import {colors} from '../theme';
import Card from '../components/Card';
import Badge from '../components/Badge';
import InfoRow from '../components/InfoRow';
import SectionTitle from '../components/SectionTitle';
import AssignmentItem from '../components/AssignmentItem';
import EmptyState from '../components/EmptyState';
import type {RootStackScreenProps} from '../navigation/types';

export default function SubjectDetailScreen({
  route,
  navigation,
}: RootStackScreenProps<'SubjectDetail'>) {
  const {subjectId} = route.params;
  const subject = getSubject(subjectId);
  const {assignments, toggleAssignment} = useApp();

  const lessons = useMemo(
    () =>
      schedule
        .filter(l => l.subjectId === subjectId)
        .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start)),
    [subjectId],
  );
  const related = useMemo(
    () => assignments.filter(a => a.subjectId === subjectId),
    [assignments, subjectId],
  );

  if (!subject) {
    return <EmptyState icon="⚠️" title="Không tìm thấy môn học" />;
  }

  const total = totalScore(getGrade(subjectId));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <Text style={styles.code}>{subject.code}</Text>
        <Text style={styles.name}>{subject.name}</Text>
        <View style={styles.badges}>
          <Badge label={`${subject.credits} tín chỉ`} tone="info" />
          <Badge label={subject.type} tone="neutral" style={{marginLeft: 8}} />
        </View>
        <Text style={styles.desc}>{subject.description}</Text>
      </Card>

      <View style={{height: 12}} />
      <Card>
        <InfoRow label="Giảng viên" value={subject.lecturer} />
        <InfoRow label="Học kỳ" value={subject.semester} />
        <InfoRow
          label="Điểm tổng kết"
          value={
            total == null
              ? 'Chưa có'
              : `${total.toFixed(1)} (${toLetter(total).letter})`
          }
          last
        />
      </Card>

      <Pressable
        style={styles.gradeBtn}
        onPress={() => navigation.navigate('GradeDetail', {subjectId})}>
        <Text style={styles.gradeBtnText}>Xem chi tiết kết quả học tập</Text>
      </Pressable>

      <SectionTitle title="Lịch học trong tuần" />
      {lessons.length === 0 ? (
        <EmptyState icon="🗓️" title="Môn học chưa có lịch" />
      ) : (
        lessons.map(l => (
          <Card
            key={l.id}
            style={styles.row}
            onPress={() => navigation.navigate('LessonDetail', {lessonId: l.id})}>
            <Text style={styles.rowTitle}>
              {DAY_LABELS[l.day]} • {l.start} - {l.end}
            </Text>
            <Text style={styles.rowSub}>
              📍 {l.room} • {l.type}
            </Text>
          </Card>
        ))
      )}

      <SectionTitle title="Bài tập của môn học" />
      {related.length === 0 ? (
        <EmptyState icon="📝" title="Môn học chưa có bài tập" />
      ) : (
        related.map(a => (
          <View key={a.id} style={styles.row}>
            <AssignmentItem
              assignment={a}
              onPress={() =>
                navigation.navigate('AssignmentDetail', {assignmentId: a.id})
              }
              onToggle={() => toggleAssignment(a.id)}
            />
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg},
  content: {padding: 16, paddingBottom: 32},
  code: {fontSize: 13, fontWeight: '800', color: colors.primary},
  name: {fontSize: 21, fontWeight: '800', color: colors.text, marginTop: 4},
  badges: {flexDirection: 'row', marginTop: 10},
  desc: {fontSize: 14, color: colors.sub, lineHeight: 21, marginTop: 12},
  gradeBtn: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  gradeBtnText: {color: '#FFFFFF', fontWeight: '700', fontSize: 14},
  row: {marginBottom: 10},
  rowTitle: {fontSize: 14, fontWeight: '700', color: colors.text},
  rowSub: {fontSize: 13, color: colors.sub, marginTop: 4},
});
