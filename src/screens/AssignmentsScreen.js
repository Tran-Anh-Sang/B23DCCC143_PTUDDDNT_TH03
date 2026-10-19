import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useApp} from '../context/AppContext';
import {colors} from '../theme';
import FilterChips from '../components/FilterChips';
import AssignmentItem from '../components/AssignmentItem';
import EmptyState from '../components/EmptyState';

export default function AssignmentsScreen({navigation}) {
  const {assignments, toggleAssignment} = useApp();
  const [filter, setFilter] = useState('all');

  const todoCount = assignments.filter(a => !a.done).length;
  const doneCount = assignments.length - todoCount;

  const options = [
    {key: 'all', label: `Tất cả (${assignments.length})`},
    {key: 'todo', label: `Chưa hoàn thành (${todoCount})`},
    {key: 'done', label: `Đã hoàn thành (${doneCount})`},
  ];

  const data = useMemo(() => {
    const list = assignments.filter(a =>
      filter === 'all' ? true : filter === 'done' ? a.done : !a.done,
    );
    // Chưa hoàn thành lên trước, sau đó sắp xếp theo hạn nộp
    return list.sort((a, b) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }, [assignments, filter]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <FilterChips options={options} value={filter} onChange={setFilter} />
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
            icon="✅"
            title="Không có bài tập nào"
            message="Không có bài tập phù hợp với bộ lọc hiện tại."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg},
  top: {paddingHorizontal: 16, paddingTop: 12},
  list: {padding: 16, paddingTop: 12},
  separator: {height: 10},
});
