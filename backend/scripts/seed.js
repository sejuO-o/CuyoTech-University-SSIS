// Run once after setup-db:  npm run seed
// Same data as the old mockData.js. Every account's password is: password
import bcrypt from 'bcryptjs';
import { pool } from '../src/db.js';

const hash = bcrypt.hashSync('password', 10);
const q = (sql, params) => pool.query(sql, params);
const TERM1 = ['1st Semester', '2024-2025'];

async function main() {
  // ── Departments (colleges + clearance offices + staff offices) ──
  const dept = {};
  for (const [code, name] of [
    ['CCS', 'College of Computing Studies'], ['CBA', 'College of Business Administration'],
    ['GE', 'General Education'],
    ['LIB', 'Library'], ['CSH', 'Cashier'], ['REG', 'Registrar'], ['LAB', 'Laboratory'],
    ['GUI', 'Guidance Office'], ['DEAN', "Dean's Office"],
    ['REGO', 'Registrar Office'], ['CASH', 'Cashier Office'], ['IT', 'IT Department'],
  ]) {
    const [r] = await q('INSERT INTO Department (deptCode, deptName) VALUES (?, ?)', [code, name]);
    dept[name] = r.insertId;
  }

  // ── Programs ──
  const prog = {};
  for (const [code, name] of [
    ['BSCS', 'BS Computer Science'], ['BSIT', 'BS Information Technology'],
    ['BSBA', 'BS Business Administration'], ['BSED', 'BS Education'],
  ]) {
    const [r] = await q('INSERT INTO Program (programCode, programName) VALUES (?, ?)', [code, name]);
    prog[code] = r.insertId;
  }

  // ── Staff accounts ──
  const staff = {};
  for (const [username, name, role, office] of [
    ['registrar', 'Ms. Reyes', 'registrar', 'Registrar Office'],
    ['cashier', 'Mr. Bautista', 'cashier', 'Cashier Office'],
    ['dept.lib', 'Ms. Alvarez', 'dept_staff', 'Library'],
    ['dept.lab', 'Mr. Mendoza', 'dept_staff', 'Laboratory'],
    ['dept.guid', 'Ms. Villanueva', 'dept_staff', 'Guidance Office'],
    ['dept.dean', 'Dr. Castillo', 'dept_staff', "Dean's Office"],
    ['admin', 'System Admin', 'admin', 'IT Department'],
  ]) {
    const [r] = await q(
      `INSERT INTO Users (username, fullName, password, email, role, deptId)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, name, hash, `${username}@cuyotech.edu.ph`, role, dept[office]]);
    staff[username] = r.insertId;
  }

  // ── Students ──
  async function addStudent(num, name, email, phone, addr, program, year) {
    const [u] = await q(
      `INSERT INTO Users (username, fullName, password, email, contactNumber, address, role)
       VALUES (?, ?, ?, ?, ?, ?, 'student')`, [num, name, hash, email, phone, addr]);
    const [s] = await q(
      'INSERT INTO Student (userId, studentNum, programId, yearLevel) VALUES (?, ?, ?, ?)',
      [u.insertId, num, prog[program], year]);
    return s.insertId;
  }
  const juan  = await addStudent('2024-00001', 'Juan Dela Cruz', 'juan.delacruz@cuyotech.edu.ph', '09171234567', 'Cabuyao, Laguna',   'BSCS', 3);
  const maria = await addStudent('2023-10042', 'Maria Santos',   'maria.santos@cuyotech.edu.ph',  '09189876543', 'Biñan, Laguna',     'BSIT', 2);
  const pedro = await addStudent('2022-00315', 'Pedro Reyes',    'pedro.reyes@cuyotech.edu.ph',   '09201112222', 'Sta. Rosa, Laguna', 'BSCS', 4);
  const ana   = await addStudent('2024-00892', 'Ana Garcia',     'ana.garcia@cuyotech.edu.ph',    '09333334444', 'Calamba, Laguna',   'BSBA', 1);

  // ── Courses (created on first use) ──
  const courseIds = {};
  async function course(code, title, deptName) {
    if (!courseIds[code]) {
      const [r] = await q(
        'INSERT INTO Course (deptId, courseCode, courseTitle, creditUnits) VALUES (?, ?, ?, 3)',
        [dept[deptName], code, title]);
      courseIds[code] = r.insertId;
    }
    return courseIds[code];
  }
  const CCS = 'College of Computing Studies';

  // Graded 1st-semester records: [student, code, title, dept, midterm, finals, grade]
  const graded = [
    // Juan Dela Cruz — all 7 subjects
    [juan, 'CCS112', 'Application Development and Emerging Technologies', CCS, 88, 91, 1.50],
    [juan, 'CSP108', 'Programming Languages',                             CCS, 92, 95, 1.25],
    [juan, 'CSEG1',  'Game Concept and Design',                           CCS, 85, 87, 1.75],
    [juan, 'CCS106', 'Social Issues and Professional Practices',          CCS, 78, 82, 2.00],
    [juan, 'CCS109', 'System Analysis and Design',                        CCS, 90, 88, 1.50],
    [juan, 'CSP105', 'Algorithm and Complexity',                          CCS, 75, 80, 2.25],
    [juan, 'ENV101', 'Environmental Science',                             CCS, 82, 85, 1.75],
    // Maria Santos — 5 subjects
    [maria, 'CCS112', 'Application Development and Emerging Technologies', CCS, 90, 93, 1.25],
    [maria, 'CSP108', 'Programming Languages',                             CCS, 82, 85, 1.75],
    [maria, 'CSEG1',  'Game Concept and Design',                           CCS, 88, 90, 1.50],
    [maria, 'CCS106', 'Social Issues and Professional Practices',          CCS, 80, 84, 1.75],
    [maria, 'ENV101', 'Environmental Science',                             CCS, 85, 87, 1.75],
    // Pedro Reyes — 5 subjects
    [pedro, 'CCS112', 'Application Development and Emerging Technologies', CCS, 91, 94, 1.25],
    [pedro, 'CSP108', 'Programming Languages',                             CCS, 84, 88, 1.50],
    [pedro, 'CCS109', 'System Analysis and Design',                        CCS, 79, 83, 2.00],
    [pedro, 'CSP105', 'Algorithm and Complexity',                          CCS, 88, 92, 1.50],
    [pedro, 'CCS106', 'Social Issues and Professional Practices',          CCS, 86, 89, 1.50],
    // Ana Garcia — 4 subjects
    [ana, 'CCS112', 'Application Development and Emerging Technologies', CCS, 83, 86, 1.75],
    [ana, 'CSP108', 'Programming Languages',                             CCS, 76, 79, 2.25],
    [ana, 'ENV101', 'Environmental Science',                             CCS, 81, 84, 2.00],
    [ana, 'CCS106', 'Social Issues and Professional Practices',          CCS, 87, 89, 1.50],
  ];
  for (const [sid, code, title, d, mid, fin, grade] of graded) {
    const cid = await course(code, title, d);
    await q(
      `INSERT INTO Enrollment (studentId, courseId, academicYear, semester, midterm, finals, grade, remarks, status)
       VALUES (?, ?, '2024-2025', '1st Semester', ?, ?, ?, ?, 'Completed')`,
      [sid, cid, mid, fin, grade, grade <= 3 ? 'PASSED' : 'FAILED']);
  }

  // Current 2nd-semester enrollments (not graded yet): [student, code, title, dept, schedule, room, instructor]
  const current = [
    // Juan Dela Cruz — all 7 subjects
    [juan, 'CCS112', 'Application Development and Emerging Technologies', CCS, 'MWF 7:30-8:30 AM',   'Lab 301',  'Prof. Reyes'  ],
    [juan, 'CSP108', 'Programming Languages',                             CCS, 'TTH 10:30-12:00 PM', 'Room 205', 'Prof. Garcia' ],
    [juan, 'CSEG1',  'Game Concept and Design',                           CCS, 'MWF 1:00-2:00 PM',   'Lab 402',  'Prof. Lim'    ],
    [juan, 'CCS106', 'Social Issues and Professional Practices',          CCS, 'TTH 1:00-2:30 PM',   'Room 110', 'Prof. Cruz'   ],
    [juan, 'CCS109', 'System Analysis and Design',                        CCS, 'MWF 9:00-10:00 AM',  'Room 302', 'Prof. Santos' ],
    [juan, 'CSP105', 'Algorithm and Complexity',                          CCS, 'TTH 8:00-9:30 AM',   'Room 201', 'Prof. Mendoza'],
    [juan, 'ENV101', 'Environmental Science',                             CCS, 'MWF 3:00-4:00 PM',   'Room 108', 'Prof. Torres' ],
    // Maria Santos — 5 subjects
    [maria, 'CCS112', 'Application Development and Emerging Technologies', CCS, 'MWF 8:00-9:00 AM',   'Lab 301',  'Prof. Reyes'  ],
    [maria, 'CSP108', 'Programming Languages',                             CCS, 'TTH 1:00-2:30 PM',   'Room 205', 'Prof. Lim'    ],
    [maria, 'CCS109', 'System Analysis and Design',                        CCS, 'MWF 2:00-3:00 PM',   'Room 302', 'Prof. Garcia' ],
    [maria, 'CCS106', 'Social Issues and Professional Practices',          CCS, 'TTH 8:00-9:30 AM',   'Room 110', 'Prof. Cruz'   ],
    [maria, 'ENV101', 'Environmental Science',                             CCS, 'MWF 10:00-11:00 AM', 'Room 108', 'Prof. Torres' ],
    // Pedro Reyes — 4 subjects
    [pedro, 'CCS112', 'Application Development and Emerging Technologies', CCS, 'TTH 1:00-4:00 PM',   'Lab 401',  'Prof. Cruz'   ],
    [pedro, 'CSP105', 'Algorithm and Complexity',                          CCS, 'MWF 10:00-11:00 AM', 'Room 201', 'Prof. Garcia' ],
    [pedro, 'CSEG1',  'Game Concept and Design',                           CCS, 'TTH 10:30-12:00 PM', 'Lab 402',  'Prof. Mendoza'],
    [pedro, 'CCS106', 'Social Issues and Professional Practices',          CCS, 'MWF 9:00-10:00 AM',  'Room 110', 'Prof. Santos' ],
    // Ana Garcia — 4 subjects
    [ana, 'CCS112', 'Application Development and Emerging Technologies', CCS, 'MWF 7:30-8:30 AM',   'Lab 301',  'Prof. Reyes'  ],
    [ana, 'CSP108', 'Programming Languages',                             CCS, 'TTH 9:00-10:30 AM',  'Room 205', 'Prof. Navarro'],
    [ana, 'ENV101', 'Environmental Science',                             CCS, 'MWF 11:00-12:00 PM', 'Room 108', 'Prof. Santos' ],
    [ana, 'CCS106', 'Social Issues and Professional Practices',          CCS, 'TTH 1:00-2:30 PM',   'Room 110', 'Prof. Reyes'  ],
  ];
  for (const [sid, code, title, d, sched, room, inst] of current) {
    const cid = await course(code, title, d);
    await q(
      `INSERT INTO Enrollment (studentId, courseId, academicYear, semester, schedule, room, instructor, status)
       VALUES (?, ?, '2024-2025', '2nd Semester', ?, ?, ?, 'Enrolled')`,
      [sid, cid, sched, room, inst]);
  }

  // ── Document types + requests ──
  for (const [code, label, price] of [
    ['TOR', 'Transcript of Records', 150], ['COR', 'Certificate of Registration', 50],
    ['COE', 'Certificate of Enrollment', 50], ['COG', 'Certificate of Graduation', 200],
    ['DIPLOMA', 'Diploma', 500], ['GOOD_MORAL', 'Good Moral Certificate', 50],
    ['HONORABLE', 'Honorable Dismissal', 100], ['CERT', 'Certification', 150],
  ]) {
    await q('INSERT INTO Document_Type (code, label, price) VALUES (?, ?, ?)', [code, label, price]);
  }
  for (const r of [
    [juan, 'TOR', 1, 150, 'Released', '2024-01-15', '2024-01-22', 'Cash', 'Job Application'],
    [juan, 'COR', 2, 100, 'Processing', '2024-02-10', null, 'Cash', 'Scholarship'],
    [juan, 'CERT', 1, 150, 'Pending', '2024-03-01', null, 'Online', 'Board Exam'],
    [maria, 'TOR', 1, 150, 'Pending', '2024-03-05', null, 'Cash', 'Employment'],
    [maria, 'COE', 2, 100, 'Released', '2024-02-20', '2024-02-27', 'Cash', 'Scholarship'],
    [pedro, 'COG', 1, 200, 'Processing', '2024-03-10', null, 'Online', 'Board Exam'],
    [pedro, 'TOR', 2, 300, 'Released', '2024-01-20', '2024-01-27', 'Cash', 'Graduate School'],
    [ana, 'COR', 1, 50, 'Pending', '2024-03-12', null, 'Cash', 'Scholarship'],
    [ana, 'GOOD_MORAL', 1, 50, 'Released', '2024-02-05', '2024-02-12', 'Cash', 'Transfer'],
  ]) {
    await q(
      `INSERT INTO Document_Request
         (studentId, documentType, quantity, totalAmount, status, requestDate, releaseDate, paymentMethod, purpose)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, r);
  }

  // ── Clearance: office order, then per student [status, signedBy, date] ──
  const offices = ['Library', 'Cashier', 'Registrar', 'Laboratory', 'Guidance Office', "Dean's Office"];
  const P = ['Pending', null, null];
  const clearance = [
    [juan,  [['Cleared', 'dept.lib', '2024-01-10'], ['Cleared', 'cashier', '2024-01-12'], P, P, ['Cleared', 'dept.guid', '2024-01-08'], P]],
    [maria, [['Cleared', 'dept.lib', '2024-01-11'], P, P, P, ['Cleared', 'dept.guid', '2024-01-09'], P]],
    [pedro, [['Cleared', 'dept.lib', '2024-01-08'], ['Cleared', 'cashier', '2024-01-08'], ['Cleared', 'registrar', '2024-01-09'],
             ['Cleared', 'dept.lab', '2024-01-10'], ['Cleared', 'dept.guid', '2024-01-07'], P]],
    [ana,   [['Cleared', 'dept.lib', '2024-01-15'], P, P, P, P, P]],
  ];
  for (const [sid, rows] of clearance) {
    for (let i = 0; i < offices.length; i++) {
      const [status, by, date] = rows[i];
      await q(
        `INSERT INTO Clearance (studentId, deptId, adminUserId, semester, schoolYear, status, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [sid, dept[offices[i]], by ? staff[by] : null, TERM1[0], TERM1[1], status, date ? `${date} 09:00:00` : new Date()]);
    }
  }

  // ── Payments: [student, description, amount, method, status, date, OR] ──
  for (const [sid, desc, amt, method, status, date, or] of [
    [juan, 'Tuition Fee', 12500, 'Cash', 'Paid', '2024-06-10', 'OR-20240001'],
    [juan, 'Miscellaneous Fee', 1500, 'Cash', 'Paid', '2024-06-10', 'OR-20240002'],
    [juan, 'Laboratory Fee', 800, 'Online', 'Pending', '2024-06-15', null],
    [maria, 'Tuition Fee', 12500, 'Online', 'Paid', '2024-06-11', 'OR-20240003'],
    [maria, 'Miscellaneous Fee', 1500, 'Cash', 'Pending', '2024-06-15', null],
    [maria, 'Laboratory Fee', 800, 'Online', 'Pending', '2024-06-15', null],
    [pedro, 'Tuition Fee', 12500, 'Cash', 'Paid', '2024-06-09', 'OR-20240004'],
    [pedro, 'Miscellaneous Fee', 1500, 'Cash', 'Paid', '2024-06-09', 'OR-20240005'],
    [pedro, 'Laboratory Fee', 800, 'Cash', 'Paid', '2024-06-09', 'OR-20240006'],
    [ana, 'Tuition Fee', 12500, 'Online', 'Pending', '2024-06-16', null],
    [ana, 'Miscellaneous Fee', 1500, 'Online', 'Pending', '2024-06-16', null],
  ]) {
    await q(
      `INSERT INTO Payment (studentId, cashierUserId, description, amount, paymentMethod, status, paymentDate, receiptNumber)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [sid, status === 'Paid' ? staff.cashier : null, desc, amt, method, status, date, or]);
  }

  // ── Fee schedule ──
  for (const [name, amt, who] of [
    ['Tuition Fee', 12500, 'All'], ['Miscellaneous Fee', 1500, 'All'],
    ['Laboratory Fee', 800, 'CS/IT'], ['Library Fee', 300, 'All'], ['Student Activity Fund', 200, 'All'],
  ]) {
    await q('INSERT INTO Fee_Schedule (feeName, amount, per, applicableTo) VALUES (?, ?, ?, ?)', [name, amt, 'semester', who]);
  }

  console.log('Seeded. All passwords: password');
  console.log('Logins: 2024-00001 (student), registrar, cashier, dept.lib, dept.lab, dept.guid, dept.dean, admin');
  await pool.end();
}

main().catch(e => { console.error(e); process.exit(1); });
