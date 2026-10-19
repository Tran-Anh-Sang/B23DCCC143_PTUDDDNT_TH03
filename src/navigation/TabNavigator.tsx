import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 

import HomeScreen from '../screens/HomeScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import AssignmentsScreen from '../screens/AssignmentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {colors} from '../theme';
import type {TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<keyof TabParamList, string> = {
  Home: 'home',
  Subjects: 'book',
  Schedule: 'calendar',
  Assignments: 'document-text',
  Profile: 'person',
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
        tabBarStyle: {backgroundColor: colors.card, height: 60, paddingBottom: 8, paddingTop: 8},
        tabBarIcon: ({focused, color, size}) => {
          const iconName = TAB_ICONS[route.name];
          
          const finalIconName = focused ? iconName : `${iconName}-outline`;

          return <Icon name={finalIconName} size={size ? size : 22} color={color} />;
        },
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
