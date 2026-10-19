import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseAssignments, student as defaultStudent} from '../data/mockData';

const PROFILE_KEY = '@study/profile';
const STATUS_KEY = '@study/assignment-status';

const AppContext = createContext(null);

const initialStatus = () =>
  baseAssignments.reduce((acc, a) => {
    acc[a.id] = a.done;
    return acc;
  }, {});

export function AppProvider({children}) {
  const [profile, setProfile] = useState(defaultStudent);
  const [statusMap, setStatusMap] = useState(initialStatus);
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
          setProfile({...defaultStudent, ...JSON.parse(p)});
        }
        if (s) {
          setStatusMap({...initialStatus(), ...JSON.parse(s)});
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

  const assignments = useMemo(
    () => baseAssignments.map(a => ({...a, done: !!statusMap[a.id]})),
    [statusMap],
  );

  const setAssignmentDone = useCallback((id, done) => {
    setStatusMap(prev => ({...prev, [id]: done}));
  }, []);

  const toggleAssignment = useCallback(id => {
    setStatusMap(prev => ({...prev, [id]: !prev[id]}));
  }, []);

  const updateProfile = useCallback(changes => {
    setProfile(prev => ({...prev, ...changes}));
  }, []);

  const resetData = useCallback(() => {
    setProfile(defaultStudent);
    setStatusMap(initialStatus());
  }, []);

  const value = useMemo(
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

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp phải được dùng bên trong AppProvider');
  }
  return ctx;
}
