import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import AssignmentsScreen from '../screens/AssignmentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {colors} from '../theme';

const Tab = createBottomTabNavigator();

const ICONS = {
  Home: '🏠',
  Subjects: '📚',
  Schedule: '🗓️',
  Assignments: '📝',
  Profile: '👤',
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerStyle: {backgroundColor: colors.card},
        headerTitleStyle: {fontWeight: '800', color: colors.text},
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.sub,
        tabBarLabelStyle: {fontSize: 10, fontWeight: '700'},
        tabBarStyle: {backgroundColor: colors.card},
        tabBarIcon: ({focused}) => (
          <Text style={{fontSize: 20, opacity: focused ? 1 : 0.5}}>
            {ICONS[route.name]}
          </Text>
        ),
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Tổng quan', tabBarLabel: 'Tổng quan'}}
      />
      <Tab.Screen
        name="Subjects"
        component={SubjectsScreen}
        options={{title: 'Môn học', tabBarLabel: 'Môn học'}}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{title: 'Thời khóa biểu', tabBarLabel: 'TKB'}}
      />
      <Tab.Screen
        name="Assignments"
        component={AssignmentsScreen}
        options={{title: 'Bài tập', tabBarLabel: 'Bài tập'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Cá nhân và kết quả học tập', tabBarLabel: 'Cá nhân'}}
      />
    </Tab.Navigator>
  );
}
