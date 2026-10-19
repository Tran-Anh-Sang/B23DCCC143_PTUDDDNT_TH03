import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useApp} from '../context/AppContext';
import {schedule, subjects} from '../data/mockData';
import {todayKey} from '../utils/date';
import {colors} from '../theme';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import AssignmentItem from '../components/AssignmentItem';
import EmptyState from '../components/EmptyState';

export default function HomeScreen({navigation}) {
  const {profile, assignments, toggleAssignment} = useApp();

  const pending = useMemo(
    () =>
      assignments
        .filter(a => !a.done)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
    [assignments],
  );
  const upcoming = pending.slice(0, 5);
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const todayCount = schedule.filter(l => l.day === todayKey()).length;

  const header = (
    <View>
      <View style={styles.hero}>
        <Text style={styles.hello}>Xin chào 👋</Text>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.meta}>
          MSSV: {profile.id} • {profile.className}
        </Text>
        <Text style={styles.today}>
          Hôm nay bạn có {todayCount} buổi học
        </Text>
      </View>

      <View style={styles.stats}>
        <Stat value={subjects.length} label="Môn học" />
        <Stat value={totalCredits} label="Tín chỉ" />
        <Stat value={pending.length} label="Bài tập chưa xong" warn />
      </View>

      <SectionTitle title="Môn học đang học" />
      <FlatList
        horizontal
        data={subjects}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Card
            style={styles.subjectCard}
            onPress={() => navigation.navigate('SubjectDetail', {subjectId: item.id})}>
            <Text style={styles.subjectCode}>{item.code}</Text>
            <Text style={styles.subjectName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.subjectCredits}>{item.credits} tín chỉ</Text>
          </Card>
        )}
        ListEmptyComponent={<EmptyState title="Chưa có môn học nào" />}
        contentContainerStyle={styles.subjectList}
      />

      <SectionTitle
        title="Bài tập sắp đến hạn"
        actionLabel="Xem tất cả"
        onAction={() => navigation.navigate('Assignments')}
      />
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={upcoming}
      keyExtractor={item => item.id}
      ListHeaderComponent={header}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item}) => (
        <AssignmentItem
          assignment={item}
          onPress={() => navigation.navigate('AssignmentDetail', {assignmentId: item.id})}
          onToggle={() => toggleAssignment(item.id)}
        />
      )}
      ListEmptyComponent={
        <EmptyState
          icon="🎉"
          title="Không có bài tập nào sắp đến hạn"
          message="Bạn đã hoàn thành tất cả bài tập."
        />
      }
    />
  );
}

function Stat({value, label, warn}) {
  return (
    <Card style={styles.stat}>
      <Text style={[styles.statValue, warn && {color: colors.warn}]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg},
  content: {padding: 16, paddingBottom: 28},
  separator: {height: 10},
  hero: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 18,
  },
  hello: {color: '#DBEAFE', fontSize: 14},
  name: {color: '#FFFFFF', fontSize: 22, fontWeight: '800', marginTop: 4},
  meta: {color: '#DBEAFE', fontSize: 13, marginTop: 4},
  today: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 12,
  },
  stats: {flexDirection: 'row', marginTop: 12},
  stat: {flex: 1, marginHorizontal: 4, alignItems: 'center', paddingVertical: 12},
  statValue: {fontSize: 22, fontWeight: '800', color: colors.primary},
  statLabel: {fontSize: 11, color: colors.sub, marginTop: 2, textAlign: 'center'},
  subjectList: {paddingBottom: 6, paddingRight: 8},
  subjectCard: {width: 160, marginRight: 10},
  subjectCode: {fontSize: 12, fontWeight: '800', color: colors.primary},
  subjectName: {fontSize: 14, fontWeight: '700', color: colors.text, marginTop: 6, minHeight: 36},
  subjectCredits: {fontSize: 12, color: colors.sub, marginTop: 8},
});
