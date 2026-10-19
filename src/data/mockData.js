// Dữ liệu mẫu dùng chung cho toàn bộ ứng dụng.
// Mọi màn hình đều tham chiếu theo id (subjectId) nên dữ liệu luôn nhất quán.

// Tạo mốc thời gian tương đối so với hôm nay để bài tập "sắp đến hạn" luôn có ý nghĩa.
const at = (offsetDays, hour = 23, minute = 59) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

export const student = {
  id: 'SV2022001',
  name: 'Nguyễn Minh Anh',
  className: 'CNTT-K64',
  major: 'Công nghệ thông tin',
  faculty: 'Khoa Công nghệ thông tin',
  year: 'Năm 4',
  email: 'anh.nm2022001@sv.edu.vn',
  phone: '0912345678',
};

export const subjects = [
  {
    id: 's1',
    code: 'IT3080',
    name: 'Mạng máy tính',
    credits: 3,
    lecturer: 'TS. Phạm Quang Huy',
    semester: 'HK1 2026-2027',
    type: 'Bắt buộc',
    description:
      'Các nguyên lý của mạng máy tính: mô hình phân tầng, giao thức TCP/IP, định tuyến, chuyển mạch và bảo mật mạng cơ bản.',
  },
  {
    id: 's2',
    code: 'IT3090',
    name: 'Cơ sở dữ liệu',
    credits: 3,
    lecturer: 'ThS. Lê Thu Hà',
    semester: 'HK1 2026-2027',
    type: 'Bắt buộc',
    description:
      'Mô hình quan hệ, thiết kế ERD, chuẩn hóa, ngôn ngữ SQL, giao dịch và tối ưu truy vấn.',
  },
  {
    id: 's3',
    code: 'IT3100',
    name: 'Lập trình hướng đối tượng',
    credits: 3,
    lecturer: 'PGS.TS. Trần Văn Khoa',
    semester: 'HK1 2026-2027',
    type: 'Bắt buộc',
    description:
      'Lớp, đối tượng, kế thừa, đa hình, trừu tượng hóa, các nguyên lý SOLID và mẫu thiết kế cơ bản.',
  },
  {
    id: 's4',
    code: 'IT4409',
    name: 'Công nghệ Web và dịch vụ trực tuyến',
    credits: 3,
    lecturer: 'ThS. Nguyễn Đức Long',
    semester: 'HK1 2026-2027',
    type: 'Tự chọn',
    description:
      'Xây dựng ứng dụng web hiện đại: HTML/CSS/JS, REST API, xác thực, triển khai và các dịch vụ trực tuyến.',
  },
  {
    id: 's5',
    code: 'IT4785',
    name: 'Phát triển ứng dụng di động',
    credits: 3,
    lecturer: 'TS. Vũ Thị Mai',
    semester: 'HK1 2026-2027',
    type: 'Tự chọn',
    description:
      'Phát triển ứng dụng đa nền tảng với React Native: điều hướng, quản lý trạng thái, lưu trữ cục bộ và giao tiếp API.',
  },
  {
    id: 's6',
    code: 'MI2020',
    name: 'Xác suất thống kê',
    credits: 2,
    lecturer: 'TS. Đỗ Hoàng Nam',
    semester: 'HK1 2026-2027',
    type: 'Bắt buộc',
    description:
      'Biến ngẫu nhiên, phân phối xác suất, ước lượng tham số, kiểm định giả thuyết và hồi quy tuyến tính.',
  },
  {
    id: 's7',
    code: 'FL1101',
    name: 'Tiếng Anh chuyên ngành',
    credits: 2,
    lecturer: 'ThS. Bùi Lan Phương',
    semester: 'HK1 2026-2027',
    type: 'Bắt buộc',
    description:
      'Từ vựng và kỹ năng đọc hiểu tài liệu kỹ thuật, viết báo cáo và thuyết trình bằng tiếng Anh trong lĩnh vực CNTT.',
  },
];

// day: 2 = Thứ 2 ... 7 = Thứ 7, 8 = Chủ nhật
export const schedule = [
  {id: 'l1', subjectId: 's5', day: 2, start: '07:00', end: '09:30', room: 'P.301-B1', type: 'Lý thuyết', note: 'Mang theo laptop để thực hành trên lớp.'},
  {id: 'l2', subjectId: 's2', day: 2, start: '13:00', end: '15:30', room: 'P.205-D3', type: 'Lý thuyết', note: 'Ôn lại chuẩn hóa dữ liệu trước giờ học.'},
  {id: 'l3', subjectId: 's4', day: 3, start: '09:00', end: '11:30', room: 'P.402-D5', type: 'Lý thuyết', note: ''},
  {id: 'l4', subjectId: 's6', day: 3, start: '13:30', end: '15:00', room: 'P.104-C2', type: 'Lý thuyết', note: 'Kiểm tra nhanh 15 phút đầu giờ.'},
  {id: 'l5', subjectId: 's3', day: 4, start: '07:00', end: '09:30', room: 'P.210-B1', type: 'Lý thuyết', note: ''},
  {id: 'l6', subjectId: 's1', day: 4, start: '13:00', end: '15:30', room: 'P.508-D9', type: 'Lý thuyết', note: 'Chuẩn bị Wireshark cho buổi sau.'},
  {id: 'l7', subjectId: 's5', day: 5, start: '07:00', end: '09:30', room: 'Lab 3-D3', type: 'Thực hành', note: 'Cài sẵn Node.js và Android Studio.'},
  {id: 'l8', subjectId: 's7', day: 5, start: '15:30', end: '17:00', room: 'P.303-C2', type: 'Lý thuyết', note: ''},
  {id: 'l9', subjectId: 's2', day: 6, start: '09:00', end: '11:30', room: 'Lab 1-D5', type: 'Thực hành', note: 'Thực hành truy vấn SQL nâng cao.'},
  {id: 'l10', subjectId: 's4', day: 6, start: '13:00', end: '15:30', room: 'Lab 2-D5', type: 'Thực hành', note: ''},
  {id: 'l11', subjectId: 's3', day: 7, start: '08:00', end: '10:30', room: 'Lab 4-B1', type: 'Thực hành', note: 'Bài thực hành về đa hình.'},
];

// done: trạng thái ban đầu (người dùng thay đổi sẽ được lưu bằng AsyncStorage)
export const baseAssignments = [
  {id: 'a1', subjectId: 's5', title: 'Xây dựng giao diện ứng dụng quản lý học tập', dueDate: at(2), done: false, priority: 'Cao', description: 'Dựng 5 màn hình chính bằng React Native, dùng Bottom Tab kết hợp Stack Navigation và dữ liệu mẫu nhất quán.'},
  {id: 'a2', subjectId: 's4', title: 'Báo cáo xây dựng REST API với Express', dueDate: at(4), done: false, priority: 'Trung bình', description: 'Viết báo cáo mô tả các endpoint CRUD, cách xác thực JWT và minh họa bằng Postman.'},
  {id: 'a3', subjectId: 's2', title: 'Thiết kế ERD cho hệ thống quản lý thư viện', dueDate: at(1), done: false, priority: 'Cao', description: 'Vẽ ERD, chuyển sang lược đồ quan hệ và chuẩn hóa tới dạng chuẩn 3NF.'},
  {id: 'a4', subjectId: 's3', title: 'Cài đặt mô hình kế thừa và đa hình', dueDate: at(6), done: false, priority: 'Trung bình', description: 'Cài đặt hệ thống hình học với lớp trừu tượng Shape và các lớp con, có kiểm thử đơn vị.'},
  {id: 'a5', subjectId: 's1', title: 'Phân tích gói tin bằng Wireshark', dueDate: at(9), done: false, priority: 'Thấp', description: 'Bắt và phân tích các gói DNS, HTTP, TCP handshake; nộp ảnh chụp và nhận xét.'},
  {id: 'a6', subjectId: 's6', title: 'Bài tập chương 4: Biến ngẫu nhiên', dueDate: at(-2), done: false, priority: 'Cao', description: 'Giải 10 bài tập về biến ngẫu nhiên rời rạc và liên tục trong giáo trình.'},
  {id: 'a7', subjectId: 's7', title: 'Thuyết trình chủ đề công nghệ mới', dueDate: at(12), done: false, priority: 'Thấp', description: 'Thuyết trình 10 phút bằng tiếng Anh về một công nghệ mới, kèm slide.'},
  {id: 'a8', subjectId: 's2', title: 'Bài tập SQL nâng cao', dueDate: at(-5), done: true, priority: 'Trung bình', description: 'Viết các truy vấn JOIN, GROUP BY, subquery và window function.'},
  {id: 'a9', subjectId: 's3', title: 'Bài tập lớn giữa kỳ', dueDate: at(-8), done: true, priority: 'Cao', description: 'Xây dựng chương trình quản lý sinh viên theo hướng đối tượng.'},
  {id: 'a10', subjectId: 's5', title: 'Quiz: React Navigation', dueDate: at(0, 23, 0), done: false, priority: 'Trung bình', description: 'Làm bài trắc nghiệm trực tuyến 15 câu về Stack, Tab và truyền tham số giữa các màn hình.'},
];

// Điểm thành phần: null = chưa có điểm
export const grades = [
  {subjectId: 's1', attendance: 9, midterm: 7.5, final: 8.0},
  {subjectId: 's2', attendance: 10, midterm: 8.5, final: 9.0},
  {subjectId: 's3', attendance: 8, midterm: 9.0, final: 8.5},
  {subjectId: 's4', attendance: 9, midterm: 8.0, final: null},
  {subjectId: 's5', attendance: 10, midterm: 9.0, final: null},
  {subjectId: 's6', attendance: 7, midterm: 6.5, final: 7.0},
  {subjectId: 's7', attendance: 9, midterm: 8.0, final: 8.5},
];

export const getSubject = id => subjects.find(s => s.id === id);
export const getLesson = id => schedule.find(l => l.id === id);
export const getGrade = subjectId => grades.find(g => g.subjectId === subjectId);
