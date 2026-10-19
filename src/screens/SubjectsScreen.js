import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {subjects} from '../data/mockData';
import {normalize} from '../utils/date';
import {colors} from '../theme';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import SubjectItem from '../components/SubjectItem';
import EmptyState from '../components/EmptyState';

const CREDIT_FILTERS = [
  {key: 'all', label: 'Tất cả'},
  {key: 2, label: '2 tín chỉ'},
  {key: 3, label: '3 tín chỉ'},
];

export default function SubjectsScreen({navigation}) {
  const [query, setQuery] = useState('');
  const [credit, setCredit] = useState('all');

  const data = useMemo(() => {
    const q = normalize(query);
    return subjects.filter(
      s =>
        (credit === 'all' || s.credits === credit) &&
        (q === '' || normalize(s.name).includes(q)),
    );
  }, [query, credit]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Tìm môn học theo tên..."
        />
        <FilterChips
          style={styles.chips}
          options={CREDIT_FILTERS}
          value={credit}
          onChange={setCredit}
        />
        <Text style={styles.count}>{data.length} môn học</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <SubjectItem
            subject={item}
            onPress={() => navigation.navigate('SubjectDetail', {subjectId: item.id})}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="🔎"
            title="Không tìm thấy môn học"
            message="Hãy thử từ khóa khác hoặc đổi bộ lọc tín chỉ."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg},
  top: {paddingHorizontal: 16, paddingTop: 12},
  chips: {marginTop: 10, flexGrow: 0},
  count: {fontSize: 12, color: colors.sub, marginTop: 10},
  list: {padding: 16, paddingTop: 10},
  separator: {height: 10},
});
