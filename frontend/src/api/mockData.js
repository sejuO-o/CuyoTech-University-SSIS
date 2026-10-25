// ============================================================
//  SSIS Mock Data — All roles + 4 student accounts
// ============================================================

// ── ACCOUNTS ─────────────────────────────────────────────
// All passwords: password
export const MOCK_ACCOUNTS = [
  // ── Students (4 accounts)
  { id: 1,  username: '2024-00001', password: 'password', role: 'student',    full_name: 'Juan Dela Cruz',   student_id: 1 },
  { id: 2,  username: '2023-10042', password: 'password', role: 'student',    full_name: 'Maria Santos',     student_id: 2 },
  { id: 3,  username: '2022-00315', password: 'password', role: 'student',    full_name: 'Pedro Reyes',      student_id: 3 },
  { id: 4,  username: '2024-00892', password: 'password', role: 'student',    full_name: 'Ana Garcia',       student_id: 4 },
  // ── Registrar
  { id: 5,  username: 'registrar',  password: 'password', role: 'registrar',  full_name: 'Ms. Reyes',        dept: 'Registrar Office' },
  // ── Cashier
  { id: 6,  username: 'cashier',    password: 'password', role: 'cashier',    full_name: 'Mr. Bautista',     dept: 'Cashier Office' },
  // ── Dept Staff
  { id: 7,  username: 'dept.lib',   password: 'password', role: 'dept_staff', full_name: 'Ms. Alvarez',      dept: 'Library' },
  { id: 8,  username: 'dept.lab',   password: 'password', role: 'dept_staff', full_name: 'Mr. Mendoza',      dept: 'Laboratory' },
  { id: 9,  username: 'dept.guid',  password: 'password', role: 'dept_staff', full_name: 'Ms. Villanueva',   dept: 'Guidance Office' },
  { id: 10, username: 'dept.dean',  password: 'password', role: 'dept_staff', full_name: 'Dr. Castillo',     dept: "Dean's Office" },
  // ── Admin
  { id: 11, username: 'admin',      password: 'password', role: 'admin',      full_name: 'System Admin',     dept: 'IT Department' },
];

// ── STUDENTS ─────────────────────────────────────────────
export const MOCK_STUDENTS = [
  { student_id: 1, student_number: '2024-00001', full_name: 'Juan Dela Cruz',    email: 'juan.delacruz@cuyotech.edu.ph',    contact_number: '09171234567', address: 'Cabuyao, Laguna',   year_level: 3, course_name: 'BS Computer Science',         course_code: 'BSCS', status: 'Active',   password: 'password' },
  { student_id: 2, student_number: '2023-10042', full_name: 'Maria Santos',      email: 'maria.santos@cuyotech.edu.ph',     contact_number: '09189876543', address: 'Biñan, Laguna',     year_level: 2, course_name: 'BS Information Technology',   course_code: 'BSIT', status: 'Active',   password: 'password' },
  { student_id: 3, student_number: '2022-00315', full_name: 'Pedro Reyes',       email: 'pedro.reyes@cuyotech.edu.ph',      contact_number: '09201112222', address: 'Sta. Rosa, Laguna', year_level: 4, course_name: 'BS Computer Science',         course_code: 'BSCS', status: 'Active',   password: 'password' },
  { student_id: 4, student_number: '2024-00892', full_name: 'Ana Garcia',        email: 'ana.garcia@cuyotech.edu.ph',       contact_number: '09333334444', address: 'Calamba, Laguna',   year_level: 1, course_name: 'BS Business Administration', course_code: 'BSBA', status: 'Active',   password: 'password' },
];

// ── COURSES ───────────────────────────────────────────────
export const MOCK_COURSES = [
  { course_id: 1, course_code: 'BSCS', course_name: 'BS Computer Science' },
  { course_id: 2, course_code: 'BSIT', course_name: 'BS Information Technology' },
  { course_id: 3, course_code: 'BSBA', course_name: 'BS Business Administration' },
  { course_id: 4, course_code: 'BSED', course_name: 'BS Education' },
];

// ── GRADES (for all 4 students) ───────────────────────────
export const MOCK_GRADES = [
  // Juan Dela Cruz — BSCS 3rd year (1st Sem graded)
  { grade_id: 1,  student_id: 1, subject_code: 'CCS112', subject_name: 'Application Development and Emerging Technologies', units: 3, midterm: 88, finals: 91, final_grade: '1.50', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 2,  student_id: 1, subject_code: 'CSP108', subject_name: 'Programming Languages',                             units: 3, midterm: 92, finals: 95, final_grade: '1.25', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 3,  student_id: 1, subject_code: 'CSEG1',  subject_name: 'Game Concept and Design',                          units: 3, midterm: 85, finals: 87, final_grade: '1.75', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 4,  student_id: 1, subject_code: 'CCS106', subject_name: 'Social Issues and Professional Practices',         units: 3, midterm: 78, finals: 82, final_grade: '2.00', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 5,  student_id: 1, subject_code: 'CCS109', subject_name: 'System Analysis and Design',                       units: 3, midterm: 90, finals: 88, final_grade: '1.50', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 6,  student_id: 1, subject_code: 'CSP105', subject_name: 'Algorithm and Complexity',                         units: 3, midterm: 75, finals: 80, final_grade: '2.25', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 7,  student_id: 1, subject_code: 'ENV101', subject_name: 'Environmental Science',                            units: 3, midterm: 82, finals: 85, final_grade: '1.75', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },

  // Maria Santos — BSCS 2nd year (1st Sem graded)
  { grade_id: 8,  student_id: 2, subject_code: 'CCS112', subject_name: 'Application Development and Emerging Technologies', units: 3, midterm: 90, finals: 93, final_grade: '1.25', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 9,  student_id: 2, subject_code: 'CSP108', subject_name: 'Programming Languages',                             units: 3, midterm: 82, finals: 85, final_grade: '1.75', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 10, student_id: 2, subject_code: 'CSEG1',  subject_name: 'Game Concept and Design',                          units: 3, midterm: 88, finals: 90, final_grade: '1.50', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 11, student_id: 2, subject_code: 'CCS106', subject_name: 'Social Issues and Professional Practices',         units: 3, midterm: 80, finals: 84, final_grade: '1.75', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 12, student_id: 2, subject_code: 'ENV101', subject_name: 'Environmental Science',                            units: 3, midterm: 85, finals: 87, final_grade: '1.75', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },

  // Pedro Reyes — BSCS 4th year (1st Sem graded)
  { grade_id: 13, student_id: 3, subject_code: 'CCS112', subject_name: 'Application Development and Emerging Technologies', units: 3, midterm: 91, finals: 94, final_grade: '1.25', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 14, student_id: 3, subject_code: 'CSP108', subject_name: 'Programming Languages',                             units: 3, midterm: 84, finals: 88, final_grade: '1.50', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 15, student_id: 3, subject_code: 'CCS109', subject_name: 'System Analysis and Design',                       units: 3, midterm: 79, finals: 83, final_grade: '2.00', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 16, student_id: 3, subject_code: 'CSP105', subject_name: 'Algorithm and Complexity',                         units: 3, midterm: 88, finals: 92, final_grade: '1.50', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 17, student_id: 3, subject_code: 'CCS106', subject_name: 'Social Issues and Professional Practices',         units: 3, midterm: 86, finals: 89, final_grade: '1.50', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },

  // Ana Garcia — BSCS 1st year (1st Sem graded)
  { grade_id: 18, student_id: 4, subject_code: 'CCS112', subject_name: 'Application Development and Emerging Technologies', units: 3, midterm: 83, finals: 86, final_grade: '1.75', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 19, student_id: 4, subject_code: 'CSP108', subject_name: 'Programming Languages',                             units: 3, midterm: 76, finals: 79, final_grade: '2.25', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 20, student_id: 4, subject_code: 'ENV101', subject_name: 'Environmental Science',                             units: 3, midterm: 81, finals: 84, final_grade: '2.00', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
  { grade_id: 21, student_id: 4, subject_code: 'CCS106', subject_name: 'Social Issues and Professional Practices',          units: 3, midterm: 87, finals: 89, final_grade: '1.50', remarks: 'PASSED', semester: '1st Semester', school_year: '2024-2025' },
];

// ── ENROLLMENTS (for all 4 students, 2nd Semester — CCS subjects) ─────────────────────
export const MOCK_ENROLLMENT = [
  // Juan Dela Cruz
  { enrollment_id: 1,  student_id: 1, subject_code: 'CCS112', subject_name: 'Application Development and Emerging Technologies', units: 3, schedule: 'MWF 7:30-8:30 AM',   room: 'Lab 301',  instructor: 'Prof. Reyes',   semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 2,  student_id: 1, subject_code: 'CSP108', subject_name: 'Programming Languages',                             units: 3, schedule: 'TTH 10:30-12:00 PM', room: 'Room 205', instructor: 'Prof. Garcia',  semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 3,  student_id: 1, subject_code: 'CSEG1',  subject_name: 'Game Concept and Design',                          units: 3, schedule: 'MWF 1:00-2:00 PM',   room: 'Lab 402',  instructor: 'Prof. Lim',     semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 4,  student_id: 1, subject_code: 'CCS106', subject_name: 'Social Issues and Professional Practices',         units: 3, schedule: 'TTH 1:00-2:30 PM',   room: 'Room 110', instructor: 'Prof. Cruz',    semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 5,  student_id: 1, subject_code: 'CCS109', subject_name: 'System Analysis and Design',                       units: 3, schedule: 'MWF 9:00-10:00 AM',  room: 'Room 302', instructor: 'Prof. Santos',  semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 6,  student_id: 1, subject_code: 'CSP105', subject_name: 'Algorithm and Complexity',                         units: 3, schedule: 'TTH 8:00-9:30 AM',   room: 'Room 201', instructor: 'Prof. Mendoza', semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 7,  student_id: 1, subject_code: 'ENV101', subject_name: 'Environmental Science',                            units: 3, schedule: 'MWF 3:00-4:00 PM',   room: 'Room 108', instructor: 'Prof. Torres',  semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  // Maria Santos
  { enrollment_id: 8,  student_id: 2, subject_code: 'CCS112', subject_name: 'Application Development and Emerging Technologies', units: 3, schedule: 'MWF 8:00-9:00 AM',   room: 'Lab 301',  instructor: 'Prof. Reyes',   semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 9,  student_id: 2, subject_code: 'CSP108', subject_name: 'Programming Languages',                             units: 3, schedule: 'TTH 1:00-2:30 PM',   room: 'Room 205', instructor: 'Prof. Lim',     semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 10, student_id: 2, subject_code: 'CCS109', subject_name: 'System Analysis and Design',                       units: 3, schedule: 'MWF 2:00-3:00 PM',   room: 'Room 302', instructor: 'Prof. Garcia',  semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 11, student_id: 2, subject_code: 'CCS106', subject_name: 'Social Issues and Professional Practices',         units: 3, schedule: 'TTH 8:00-9:30 AM',   room: 'Room 110', instructor: 'Prof. Cruz',    semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 12, student_id: 2, subject_code: 'ENV101', subject_name: 'Environmental Science',                            units: 3, schedule: 'MWF 10:00-11:00 AM', room: 'Room 108', instructor: 'Prof. Torres',  semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  // Pedro Reyes
  { enrollment_id: 13, student_id: 3, subject_code: 'CCS112', subject_name: 'Application Development and Emerging Technologies', units: 3, schedule: 'TTH 1:00-4:00 PM',   room: 'Lab 401',  instructor: 'Prof. Cruz',    semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 14, student_id: 3, subject_code: 'CSP105', subject_name: 'Algorithm and Complexity',                         units: 3, schedule: 'MWF 10:00-11:00 AM', room: 'Room 201', instructor: 'Prof. Garcia',  semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 15, student_id: 3, subject_code: 'CSEG1',  subject_name: 'Game Concept and Design',                          units: 3, schedule: 'TTH 10:30-12:00 PM', room: 'Lab 402',  instructor: 'Prof. Mendoza', semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 16, student_id: 3, subject_code: 'CCS106', subject_name: 'Social Issues and Professional Practices',         units: 3, schedule: 'MWF 9:00-10:00 AM',  room: 'Room 110', instructor: 'Prof. Santos',  semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  // Ana Garcia
  { enrollment_id: 17, student_id: 4, subject_code: 'CCS112', subject_name: 'Application Development and Emerging Technologies', units: 3, schedule: 'MWF 7:30-8:30 AM',   room: 'Lab 301',  instructor: 'Prof. Reyes',    semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 18, student_id: 4, subject_code: 'CSP108', subject_name: 'Programming Languages',                             units: 3, schedule: 'TTH 9:00-10:30 AM',  room: 'Room 205', instructor: 'Prof. Navarro',  semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 19, student_id: 4, subject_code: 'ENV101', subject_name: 'Environmental Science',                             units: 3, schedule: 'MWF 11:00-12:00 PM', room: 'Room 108', instructor: 'Prof. Santos',   semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
  { enrollment_id: 20, student_id: 4, subject_code: 'CCS106', subject_name: 'Social Issues and Professional Practices',          units: 3, schedule: 'TTH 1:00-2:30 PM',   room: 'Room 110', instructor: 'Prof. Reyes',    semester: '2nd Semester', school_year: '2024-2025', status: 'Enrolled' },
];

// ── DOCUMENT REQUESTS ─────────────────────────────────────
export const MOCK_DOCUMENTS = [
  // Juan
  { request_id: 1, student_id: 1, student_name: 'Juan Dela Cruz', student_number: '2024-00001', document_type: 'TOR',  quantity: 1, amount: 150, status: 'Released',   request_date: '2024-01-15', release_date: '2024-01-22', payment_method: 'Cash',   purpose: 'Job Application' },
  { request_id: 2, student_id: 1, student_name: 'Juan Dela Cruz', student_number: '2024-00001', document_type: 'COR',  quantity: 2, amount: 100, status: 'Processing', request_date: '2024-02-10', release_date: null,         payment_method: 'Cash',   purpose: 'Scholarship' },
  { request_id: 3, student_id: 1, student_name: 'Juan Dela Cruz', student_number: '2024-00001', document_type: 'CERT', quantity: 1, amount: 150, status: 'Pending',    request_date: '2024-03-01', release_date: null,         payment_method: 'Online', purpose: 'Board Exam' },
  // Maria
  { request_id: 4, student_id: 2, student_name: 'Maria Santos',   student_number: '2023-10042', document_type: 'TOR',  quantity: 1, amount: 150, status: 'Pending',    request_date: '2024-03-05', release_date: null,         payment_method: 'Cash',   purpose: 'Employment' },
  { request_id: 5, student_id: 2, student_name: 'Maria Santos',   student_number: '2023-10042', document_type: 'COE',  quantity: 2, amount: 100, status: 'Released',   request_date: '2024-02-20', release_date: '2024-02-27', payment_method: 'Cash',   purpose: 'Scholarship' },
  // Pedro
  { request_id: 6, student_id: 3, student_name: 'Pedro Reyes',    student_number: '2022-00315', document_type: 'COG',  quantity: 1, amount: 200, status: 'Processing', request_date: '2024-03-10', release_date: null,         payment_method: 'Online', purpose: 'Board Exam' },
  { request_id: 7, student_id: 3, student_name: 'Pedro Reyes',    student_number: '2022-00315', document_type: 'TOR',  quantity: 2, amount: 300, status: 'Released',   request_date: '2024-01-20', release_date: '2024-01-27', payment_method: 'Cash',   purpose: 'Graduate School' },
  // Ana
  { request_id: 8, student_id: 4, student_name: 'Ana Garcia',     student_number: '2024-00892', document_type: 'COR',  quantity: 1, amount: 50,  status: 'Pending',    request_date: '2024-03-12', release_date: null,         payment_method: 'Cash',   purpose: 'Scholarship' },
  { request_id: 9, student_id: 4, student_name: 'Ana Garcia',     student_number: '2024-00892', document_type: 'GOOD_MORAL', quantity: 1, amount: 50, status: 'Released', request_date: '2024-02-05', release_date: '2024-02-12', payment_method: 'Cash', purpose: 'Transfer' },
];

export const MOCK_DOCUMENT_TYPES = [
  { value: 'TOR',        label: 'Transcript of Records',       price: 150 },
  { value: 'COR',        label: 'Certificate of Registration', price: 50  },
  { value: 'COE',        label: 'Certificate of Enrollment',   price: 50  },
  { value: 'COG',        label: 'Certificate of Graduation',   price: 200 },
  { value: 'DIPLOMA',    label: 'Diploma',                     price: 500 },
  { value: 'GOOD_MORAL', label: 'Good Moral Certificate',      price: 50  },
  { value: 'HONORABLE',  label: 'Honorable Dismissal',         price: 100 },
  { value: 'CERT',       label: 'Certification',               price: 150 },
];

// ── CLEARANCE (all 4 students × 6 departments) ───────────
const DEPARTMENTS = ['Library', 'Cashier', 'Registrar', 'Laboratory', 'Guidance Office', "Dean's Office"];
const CLEARANCE_DATA = [
  // Juan — 3 cleared, 3 pending
  ['Cleared','Ms. Alvarez','2024-01-10'], ['Cleared','Mr. Bautista','2024-01-12'], ['Pending',null,null],
  ['Pending',null,null], ['Cleared','Ms. Villanueva','2024-01-08'], ['Pending',null,null],
  // Maria — 2 cleared, 4 pending
  ['Cleared','Ms. Alvarez','2024-01-11'], ['Pending',null,null], ['Pending',null,null],
  ['Pending',null,null], ['Cleared','Ms. Villanueva','2024-01-09'], ['Pending',null,null],
  // Pedro — 5 cleared, 1 pending
  ['Cleared','Ms. Alvarez','2024-01-08'], ['Cleared','Mr. Bautista','2024-01-08'], ['Cleared','Ms. Reyes','2024-01-09'],
  ['Cleared','Mr. Mendoza','2024-01-10'], ['Cleared','Ms. Villanueva','2024-01-07'], ['Pending',null,null],
  // Ana — 1 cleared, 5 pending
  ['Cleared','Ms. Alvarez','2024-01-15'], ['Pending',null,null], ['Pending',null,null],
  ['Pending',null,null], ['Pending',null,null], ['Pending',null,null],
];

export const MOCK_CLEARANCE = CLEARANCE_DATA.map(([status, cleared_by, cleared_date], i) => {
  const student_idx   = Math.floor(i / 6);
  const dept_idx      = i % 6;
  const students      = [
    { student_id: 1, student_name: 'Juan Dela Cruz',  student_number: '2024-00001' },
    { student_id: 2, student_name: 'Maria Santos',    student_number: '2023-10042' },
    { student_id: 3, student_name: 'Pedro Reyes',     student_number: '2022-00315' },
    { student_id: 4, student_name: 'Ana Garcia',      student_number: '2024-00892' },
  ];
  const s = students[student_idx];
  return {
    clearance_id:    i + 1,
    student_id:      s.student_id,
    student_name:    s.student_name,
    student_number:  s.student_number,
    department_name: DEPARTMENTS[dept_idx],
    status, cleared_by, cleared_date,
    semester:    '1st Semester',
    school_year: '2024-2025',
  };
});

// ── PAYMENTS ─────────────────────────────────────────────
export const MOCK_PAYMENTS = [
  // Juan
  { payment_id: 1,  student_id: 1, student_name: 'Juan Dela Cruz', student_number: '2024-00001', description: 'Tuition Fee',        amount: 12500, method: 'Cash',   status: 'Paid',    date: '2024-06-10', or_number: 'OR-20240001' },
  { payment_id: 2,  student_id: 1, student_name: 'Juan Dela Cruz', student_number: '2024-00001', description: 'Miscellaneous Fee',  amount: 1500,  method: 'Cash',   status: 'Paid',    date: '2024-06-10', or_number: 'OR-20240002' },
  { payment_id: 3,  student_id: 1, student_name: 'Juan Dela Cruz', student_number: '2024-00001', description: 'Laboratory Fee',     amount: 800,   method: 'Online', status: 'Pending', date: '2024-06-15', or_number: null },
  // Maria
  { payment_id: 4,  student_id: 2, student_name: 'Maria Santos',   student_number: '2023-10042', description: 'Tuition Fee',        amount: 12500, method: 'Online', status: 'Paid',    date: '2024-06-11', or_number: 'OR-20240003' },
  { payment_id: 5,  student_id: 2, student_name: 'Maria Santos',   student_number: '2023-10042', description: 'Miscellaneous Fee',  amount: 1500,  method: 'Cash',   status: 'Pending', date: '2024-06-15', or_number: null },
  { payment_id: 6,  student_id: 2, student_name: 'Maria Santos',   student_number: '2023-10042', description: 'Laboratory Fee',     amount: 800,   method: 'Online', status: 'Pending', date: '2024-06-15', or_number: null },
  // Pedro
  { payment_id: 7,  student_id: 3, student_name: 'Pedro Reyes',    student_number: '2022-00315', description: 'Tuition Fee',        amount: 12500, method: 'Cash',   status: 'Paid',    date: '2024-06-09', or_number: 'OR-20240004' },
  { payment_id: 8,  student_id: 3, student_name: 'Pedro Reyes',    student_number: '2022-00315', description: 'Miscellaneous Fee',  amount: 1500,  method: 'Cash',   status: 'Paid',    date: '2024-06-09', or_number: 'OR-20240005' },
  { payment_id: 9,  student_id: 3, student_name: 'Pedro Reyes',    student_number: '2022-00315', description: 'Laboratory Fee',     amount: 800,   method: 'Cash',   status: 'Paid',    date: '2024-06-09', or_number: 'OR-20240006' },
  // Ana
  { payment_id: 10, student_id: 4, student_name: 'Ana Garcia',     student_number: '2024-00892', description: 'Tuition Fee',        amount: 12500, method: 'Online', status: 'Pending', date: '2024-06-16', or_number: null },
  { payment_id: 11, student_id: 4, student_name: 'Ana Garcia',     student_number: '2024-00892', description: 'Miscellaneous Fee',  amount: 1500,  method: 'Online', status: 'Pending', date: '2024-06-16', or_number: null },
];

// ── FEE SCHEDULE ──────────────────────────────────────────
export const MOCK_FEE_SCHEDULE = [
  { fee_id: 1, fee_name: 'Tuition Fee',           amount: 12500, per: 'semester', applicable_to: 'All'    },
  { fee_id: 2, fee_name: 'Miscellaneous Fee',     amount: 1500,  per: 'semester', applicable_to: 'All'    },
  { fee_id: 3, fee_name: 'Laboratory Fee',        amount: 800,   per: 'semester', applicable_to: 'CS/IT'  },
  { fee_id: 4, fee_name: 'Library Fee',           amount: 300,   per: 'semester', applicable_to: 'All'    },
  { fee_id: 5, fee_name: 'Student Activity Fund', amount: 200,   per: 'semester', applicable_to: 'All'    },
];

// ── SUBJECTS (CCS — Computer Science subjects only) ───────
export const MOCK_SUBJECTS = [
  { subject_id: 1, subject_code: 'CCS112', subject_name: 'Application Development and Emerging Technologies', units: 3, course_code: 'BSCS' },
  { subject_id: 2, subject_code: 'CSP108', subject_name: 'Programming Languages',                             units: 3, course_code: 'BSCS' },
  { subject_id: 3, subject_code: 'CSEG1',  subject_name: 'Game Concept and Design',                          units: 3, course_code: 'BSCS' },
  { subject_id: 4, subject_code: 'CCS106', subject_name: 'Social Issues and Professional Practices',         units: 3, course_code: 'BSCS' },
  { subject_id: 5, subject_code: 'CCS109', subject_name: 'System Analysis and Design',                       units: 3, course_code: 'BSCS' },
  { subject_id: 6, subject_code: 'CSP105', subject_name: 'Algorithm and Complexity',                         units: 3, course_code: 'BSCS' },
  { subject_id: 7, subject_code: 'ENV101', subject_name: 'Environmental Science',                            units: 3, course_code: 'BSCS' },
];
