import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {getGrade, getSubject} from '../data/mockData';
import {WEIGHTS, gradeTone, toLetter, totalScore} from '../utils/grade';
import {colors} from '../theme';
import Card from '../components/Card';
import Badge from '../components/Badge';
import InfoRow from '../components/InfoRow';
import EmptyState from '../components/EmptyState';

export default function GradeDetailScreen({route}) {
  const {subjectId} = route.params;
  const subject = getSubject(subjectId);
  const grade = getGrade(subjectId);

  if (!subject || !grade) {
    return <EmptyState icon="⚠️" title="Không tìm thấy kết quả học tập" />;
  }

  const total = totalScore(grade);
  const {letter, point} = toLetter(total);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.summary}>
        <Text style={styles.code}>{subject.code}</Text>
        <Text style={styles.name}>{subject.name}</Text>
        <Text style={styles.total}>{total == null ? '-' : total.toFixed(1)}</Text>
        <Text style={styles.totalLabel}>Điểm tổng kết (hệ 10)</Text>
        <Badge
          label={total == null ? 'Đang học' : `Điểm chữ ${letter}`}
          tone={gradeTone(total)}
          style={{marginTop: 10}}
        />
      </Card>

      <Text style={styles.section}>Điểm thành phần</Text>
      <Card>
        {WEIGHTS.map((w, i) => {
          const score = grade[w.key];
          return (
            <View
              key={w.key}
              style={[styles.scoreRow, i < WEIGHTS.length - 1 && styles.border]}>
              <View style={{flex: 1}}>
                <Text style={styles.scoreName}>{w.label}</Text>
                <Text style={styles.scoreWeight}>Trọng số {w.weight * 100}%</Text>
              </View>
              <Text
                style={[styles.score, score == null && {color: colors.sub}]}>
                {score == null ? 'Chưa có' : score.toFixed(1)}
              </Text>
            </View>
          );
        })}
      </Card>

      <Text style={styles.section}>Thông tin chung</Text>
      <Card>
        <InfoRow label="Số tín chỉ" value={`${subject.credits}`} />
        <InfoRow label="Học kỳ" value={subject.semester} />
        <InfoRow label="Giảng viên" value={subject.lecturer} />
        <InfoRow
          label="Điểm hệ 4"
          value={point == null ? 'Chưa có' : point.toFixed(1)}
          last
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg},
  content: {padding: 16, paddingBottom: 32},
  summary: {alignItems: 'center', paddingVertical: 20},
  code: {fontSize: 13, fontWeight: '800', color: colors.primary},
  name: {fontSize: 18, fontWeight: '800', color: colors.text, marginTop: 4, textAlign: 'center'},
  total: {fontSize: 48, fontWeight: '800', color: colors.primary, marginTop: 12},
  totalLabel: {fontSize: 12, color: colors.sub},
  section: {fontSize: 16, fontWeight: '800', color: colors.text, marginTop: 20, marginBottom: 10},
  scoreRow: {flexDirection: 'row', alignItems: 'center', paddingVertical: 12},
  border: {borderBottomWidth: 1, borderBottomColor: colors.border},
  scoreName: {fontSize: 15, fontWeight: '700', color: colors.text},
  scoreWeight: {fontSize: 12, color: colors.sub, marginTop: 2},
  score: {fontSize: 18, fontWeight: '800', color: colors.text},
});
