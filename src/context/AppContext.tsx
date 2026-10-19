import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseAssignments, student as defaultStudent} from '../data/mockData';
import type {Assignment, Student} from '../types';

const PROFILE_KEY = '@study/profile';
const STATUS_KEY = '@study/assignment-status';

type StatusMap = Record<string, boolean>;

interface AppContextValue {
  loaded: boolean;
  profile: Student;
  assignments: Assignment[];
  setAssignmentDone: (id: string, done: boolean) => void;
  toggleAssignment: (id: string) => void;
  updateProfile: (changes: Partial<Student>) => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const initialStatus = (): StatusMap =>
  baseAssignments.reduce<StatusMap>((acc, a) => {
    acc[a.id] = a.done;
    return acc;
  }, {});

export function AppProvider({children}: {children: ReactNode}) {
  const [profile, setProfile] = useState<Student>(defaultStudent);
  const [statusMap, setStatusMap] = useState<StatusMap>(initialStatus);
  const [loaded, setLoaded] = useState(false);

  // Đọc dữ liệu đã lưu khi mở ứng dụng
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [p, s] = await Promise.all([
          AsyncStorage.getItem(PROFILE_KEY),
          AsyncStorage.getItem(STATUS_KEY),
        ]);
        if (!active) {
          return;
        }
        if (p) {
          setProfile({...defaultStudent, ...(JSON.parse(p) as Partial<Student>)});
        }
        if (s) {
          setStatusMap({...initialStatus(), ...(JSON.parse(s) as StatusMap)});
        }
      } catch (e) {
        // Bỏ qua lỗi đọc, dùng dữ liệu mẫu
      } finally {
        if (active) {
          setLoaded(true);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Tự động lưu khi dữ liệu thay đổi
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile)).catch(() => {});
    }
  }, [profile, loaded]);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STATUS_KEY, JSON.stringify(statusMap)).catch(() => {});
    }
  }, [statusMap, loaded]);

  const assignments = useMemo<Assignment[]>(
    () => baseAssignments.map(a => ({...a, done: !!statusMap[a.id]})),
    [statusMap],
  );

  const setAssignmentDone = useCallback((id: string, done: boolean) => {
    setStatusMap(prev => ({...prev, [id]: done}));
  }, []);

  const toggleAssignment = useCallback((id: string) => {
    setStatusMap(prev => ({...prev, [id]: !prev[id]}));
  }, []);

  const updateProfile = useCallback((changes: Partial<Student>) => {
    setProfile(prev => ({...prev, ...changes}));
  }, []);

  const resetData = useCallback(() => {
    setProfile(defaultStudent);
    setStatusMap(initialStatus());
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      loaded,
      profile,
      assignments,
      setAssignmentDone,
      toggleAssignment,
      updateProfile,
      resetData,
    }),
    [
      loaded,
      profile,
      assignments,
      setAssignmentDone,
      toggleAssignment,
      updateProfile,
      resetData,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp phải được dùng bên trong AppProvider');
  }
  return ctx;
}
