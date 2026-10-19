import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {useApp} from '../context/AppContext';
import {getSubject} from '../data/mockData';
import {dueInfo, formatDateTime} from '../utils/date';
import {colors} from '../theme';
import Card from '../components/Card';
import Badge from '../components/Badge';
import InfoRow from '../components/InfoRow';
import EmptyState from '../components/EmptyState';

export default function AssignmentDetailScreen({route, navigation}) {
  const {assignments, setAssignmentDone} = useApp();
  const assignment = assignments.find(a => a.id === route.params.assignmentId);

  if (!assignment) {
    return <EmptyState icon="⚠️" title="Không tìm thấy bài tập" />;
  }

  const subject = getSubject(assignment.subjectId);
  const due = dueInfo(assignment.dueDate, assignment.done);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <Badge label={due.label} tone={due.tone} />
        <Text style={styles.title}>{assignment.title}</Text>
        <Text style={styles.desc}>{assignment.description}</Text>
      </Card>

      <Card style={{marginTop: 12}}>
        <InfoRow label="Môn học" value={subject ? subject.name : '-'} />
        <InfoRow label="Hạn nộp" value={formatDateTime(assignment.dueDate)} />
        <InfoRow label="Mức ưu tiên" value={assignment.priority} />
        <InfoRow
          label="Trạng thái"
          value={assignment.done ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
          last
        />
      </Card>

      <Pressable
        style={[styles.btn, assignment.done ? styles.btnUndo : styles.btnDone]}
        onPress={() => setAssignmentDone(assignment.id, !assignment.done)}>
        <Text style={[styles.btnText, assignment.done && {color: colors.text}]}>
          {assignment.done ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
        </Text>
      </Pressable>

      {subject ? (
        <Pressable
          style={styles.link}
          onPress={() => navigation.navigate('SubjectDetail', {subjectId: subject.id})}>
          <Text style={styles.linkText}>Xem môn học: {subject.name}</Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg},
  content: {padding: 16, paddingBottom: 32},
  title: {fontSize: 20, fontWeight: '800', color: colors.text, marginTop: 12},
  desc: {fontSize: 14, color: colors.sub, lineHeight: 21, marginTop: 10},
  btn: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnDone: {backgroundColor: colors.success},
  btnUndo: {backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border},
  btnText: {color: '#FFFFFF', fontWeight: '700', fontSize: 15},
  link: {alignItems: 'center', paddingVertical: 16},
  linkText: {color: colors.primary, fontWeight: '600'},
});
