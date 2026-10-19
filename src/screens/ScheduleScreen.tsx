import React, {useMemo, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {schedule} from '../data/mockData';
import {
  DAY_KEYS,
  DAY_LABELS,
  DAY_SHORT,
  dateOfDayKey,
  formatDayMonth,
  todayKey,
} from '../utils/date';
import {colors} from '../theme';
import LessonItem from '../components/LessonItem';
import EmptyState from '../components/EmptyState';
import type {TabScreenProps} from '../navigation/types';
import type {DayKey} from '../types';

export default function ScheduleScreen({navigation}: TabScreenProps<'Schedule'>) {
  const [day, setDay] = useState<DayKey>(todayKey());

  const lessons = useMemo(
    () =>
      schedule
        .filter(l => l.day === day)
        .sort((a, b) => a.start.localeCompare(b.start)),
    [day],
  );

  const counts = useMemo(() => {
    const map: Partial<Record<DayKey, number>> = {};
    schedule.forEach(l => {
      map[l.day] = (map[l.day] ?? 0) + 1;
    });
    return map;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.week}>
        {DAY_KEYS.map(k => {
          const active = k === day;
          const hasLesson = !!counts[k];
          return (
            <Pressable
              key={k}
              onPress={() => setDay(k)}
              style={[styles.dayBtn, active && styles.dayBtnActive]}>
              <Text style={[styles.dayShort, active && styles.dayTextActive]}>
                {DAY_SHORT[k]}
              </Text>
              <Text style={[styles.dayDate, active && styles.dayTextActive]}>
                {formatDayMonth(dateOfDayKey(k))}
              </Text>
              <View
                style={[
                  styles.dot,
                  hasLesson && styles.dotOn,
                  active && hasLesson && styles.dotActive,
                ]}
              />
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.heading}>
        {DAY_LABELS[day]}
        {day === todayKey() ? ' (Hôm nay)' : ''} • {lessons.length} buổi học
      </Text>

      <FlatList
        data={lessons}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <LessonItem
            lesson={item}
            onPress={() => navigation.navigate('LessonDetail', {lessonId: item.id})}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="🌤️"
            title="Không có lịch học"
            message="Bạn được nghỉ vào ngày này."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg},
  week: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dayBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 2,
    borderRadius: 12,
  },
  dayBtnActive: {backgroundColor: colors.primary},
  dayShort: {fontSize: 13, fontWeight: '800', color: colors.text},
  dayDate: {fontSize: 10, color: colors.sub, marginTop: 2},
  dayTextActive: {color: '#FFFFFF'},
  dot: {width: 6, height: 6, borderRadius: 3, marginTop: 6, backgroundColor: 'transparent'},
  dotOn: {backgroundColor: colors.primary},
  dotActive: {backgroundColor: '#FFFFFF'},
  heading: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  list: {padding: 16, paddingTop: 10},
  separator: {height: 10},
});
