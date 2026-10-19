import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type TabParamList = {
  Home: undefined;
  Subjects: undefined;
  Schedule: undefined;
  Assignments: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  SubjectDetail: {subjectId: string};
  LessonDetail: {lessonId: string};
  AssignmentDetail: {assignmentId: string};
  GradeDetail: {subjectId: string};
};

// Props cho màn hình nằm trong Stack (màn hình chi tiết)
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Props cho màn hình nằm trong Tab (có thể điều hướng sang Stack)
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
