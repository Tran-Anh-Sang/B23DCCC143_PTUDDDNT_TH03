// 2 = Thứ 2 ... 7 = Thứ 7, 8 = Chủ nhật
export type DayKey = 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Tone = 'success' | 'warn' | 'danger' | 'info' | 'neutral';

export interface Student {
  id: string;
  name: string;
  className: string;
  major: string;
  faculty: string;
  year: string;
  email: string;
  phone: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
  semester: string;
  type: 'Bắt buộc' | 'Tự chọn';
  description: string;
}

export type LessonType = 'Lý thuyết' | 'Thực hành';

export interface Lesson {
  id: string;
  subjectId: string;
  day: DayKey;
  start: string;
  end: string;
  room: string;
  type: LessonType;
  note: string;
}

export type Priority = 'Cao' | 'Trung bình' | 'Thấp';

export interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  dueDate: string; // ISO string
  done: boolean;
  priority: Priority;
  description: string;
}

// null = chưa có điểm
export interface Grade {
  subjectId: string;
  attendance: number | null;
  midterm: number | null;
  final: number | null;
}
