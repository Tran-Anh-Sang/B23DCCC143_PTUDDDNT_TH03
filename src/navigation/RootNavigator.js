import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SubjectDetailScreen from '../screens/SubjectDetailScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import AssignmentDetailScreen from '../screens/AssignmentDetailScreen';
import GradeDetailScreen from '../screens/GradeDetailScreen';
import {colors} from '../theme';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.card},
        headerTintColor: colors.primary,
        headerTitleStyle: {fontWeight: '800', color: colors.text},
        headerBackTitle: 'Quay lại',
        contentStyle: {backgroundColor: colors.bg},
      }}>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubjectDetail"
        component={SubjectDetailScreen}
        options={{title: 'Chi tiết môn học'}}
      />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{title: 'Chi tiết buổi học'}}
      />
      <Stack.Screen
        name="AssignmentDetail"
        component={AssignmentDetailScreen}
        options={{title: 'Chi tiết bài tập'}}
      />
      <Stack.Screen
        name="GradeDetail"
        component={GradeDetailScreen}
        options={{title: 'Chi tiết kết quả học tập'}}
      />
    </Stack.Navigator>
  );
}
