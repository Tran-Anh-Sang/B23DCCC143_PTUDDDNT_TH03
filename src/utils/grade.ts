import type {Grade, Subject, Tone} from '../types';

type ScoreKey = 'attendance' | 'midterm' | 'final';

export const WEIGHTS: {key: ScoreKey; label: string; weight: number}[] = [
  {key: 'attendance', label: 'Chuyên cần', weight: 0.1},
  {key: 'midterm', label: 'Giữa kỳ', weight: 0.3},
  {key: 'final', label: 'Cuối kỳ', weight: 0.6},
];

// Điểm tổng kết hệ 10, null nếu còn thiếu điểm thành phần
export function totalScore(g?: Grade): number | null {
  if (!g || WEIGHTS.some(w => g[w.key] == null)) {
    return null;
  }
  const sum = WEIGHTS.reduce((s, w) => s + (g[w.key] as number) * w.weight, 0);
  return Math.round(sum * 10) / 10;
}

export function toLetter(score: number | null): {letter: string; point: number | null} {
  if (score == null) {
    return {letter: '-', point: null};
  }
  if (score >= 8.5) return {letter: 'A', point: 4.0};
  if (score >= 8.0) return {letter: 'B+', point: 3.5};
  if (score >= 7.0) return {letter: 'B', point: 3.0};
  if (score >= 6.5) return {letter: 'C+', point: 2.5};
  if (score >= 5.5) return {letter: 'C', point: 2.0};
  if (score >= 5.0) return {letter: 'D+', point: 1.5};
  if (score >= 4.0) return {letter: 'D', point: 1.0};
  return {letter: 'F', point: 0};
}

// GPA hệ 4 và số tín chỉ tích lũy (chỉ tính môn đã có điểm tổng kết)
export function calcGPA(
  grades: Grade[],
  subjects: Subject[],
): {gpa: number | null; credits: number} {
  let credits = 0;
  let points = 0;
  grades.forEach(g => {
    const total = totalScore(g);
    const subject = subjects.find(s => s.id === g.subjectId);
    if (total == null || !subject) {
      return;
    }
    credits += subject.credits;
    points += (toLetter(total).point ?? 0) * subject.credits;
  });
  return {
    gpa: credits ? Math.round((points / credits) * 100) / 100 : null,
    credits,
  };
}

export function gradeTone(score: number | null): Tone {
  if (score == null) return 'neutral';
  if (score >= 8) return 'success';
  if (score >= 5.5) return 'info';
  if (score >= 4) return 'warn';
  return 'danger';
}
