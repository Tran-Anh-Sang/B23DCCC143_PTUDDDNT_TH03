const pad = n => String(n).padStart(2, '0');

export const formatDate = iso => {
  const d = new Date(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

export const formatTime = iso => {
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const formatDateTime = iso => `${formatTime(iso)} - ${formatDate(iso)}`;

const startOfDay = d =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

// Trả về nhãn và tông màu hiển thị cho hạn nộp bài tập
export function dueInfo(iso, done) {
  if (done) {
    return {label: 'Đã hoàn thành', tone: 'success'};
  }
  const diff = Math.round(
    (startOfDay(new Date(iso)) - startOfDay(new Date())) / 86400000,
  );
  if (diff < 0) {
    return {label: `Quá hạn ${-diff} ngày`, tone: 'danger'};
  }
  if (diff === 0) {
    return {label: 'Hạn nộp hôm nay', tone: 'danger'};
  }
  if (diff <= 2) {
    return {label: `Còn ${diff} ngày`, tone: 'warn'};
  }
  return {label: `Còn ${diff} ngày`, tone: 'info'};
}

export const DAY_KEYS = [2, 3, 4, 5, 6, 7, 8];
export const DAY_LABELS = {
  2: 'Thứ 2',
  3: 'Thứ 3',
  4: 'Thứ 4',
  5: 'Thứ 5',
  6: 'Thứ 6',
  7: 'Thứ 7',
  8: 'Chủ nhật',
};
export const DAY_SHORT = {2: 'T2', 3: 'T3', 4: 'T4', 5: 'T5', 6: 'T6', 7: 'T7', 8: 'CN'};

// 2..7 = Thứ 2..Thứ 7, 8 = Chủ nhật
export const todayKey = () => {
  const g = new Date().getDay();
  return g === 0 ? 8 : g + 1;
};

// Ngày (Date) của một thứ trong tuần hiện tại (tuần bắt đầu từ Thứ 2)
export const dateOfDayKey = key => {
  const d = new Date();
  d.setDate(d.getDate() + (key - todayKey()));
  return d;
};

export const formatDayMonth = d => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;

// Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu
export const normalize = s =>
  String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
