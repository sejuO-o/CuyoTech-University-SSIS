import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();
const remarksFor = (g) => (g == null ? null : g <= 3.0 ? 'PASSED' : 'FAILED');

// GET /api/student/profile
router.get('/profile', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT s.studentId AS student_id, s.studentNum AS student_number,
            u.fullName AS full_name, u.email, u.contactNumber AS contact_number,
            u.address, s.yearLevel AS year_level, p.programName AS course_name,
            p.programCode AS course_code, u.status
       FROM Student s
       JOIN Users u ON u.userId = s.userId
       JOIN Program p ON p.programId = s.programId
      WHERE s.studentId = ?`,
    [req.user.student_id]
  );
  if (!rows[0]) return res.status(404).json({ message: 'Student not found.' });
  res.json(rows[0]);
});

// GET /api/student/grades  (graded enrollments only)
router.get('/grades', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT e.enrollmentId AS grade_id, c.courseCode AS subject_code, c.courseTitle AS subject_name,
            c.creditUnits AS units, e.midterm, e.finals, e.grade, e.remarks,
            e.semester, e.academicYear AS school_year
       FROM Enrollment e JOIN Course c ON c.courseId = e.courseId
      WHERE e.studentId = ? AND e.grade IS NOT NULL
      ORDER BY e.academicYear, e.semester, c.courseCode`,
    [req.user.student_id]
  );
  res.json(rows.map(({ grade, remarks, ...r }) => ({
    ...r,
    final_grade: grade.toFixed(2),
    remarks: remarks || remarksFor(grade),
  })));
});

// GET /api/student/enrollment  (current subjects)
router.get('/enrollment', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT e.enrollmentId AS enrollment_id, c.courseCode AS subject_code,
            c.courseTitle AS subject_name, c.creditUnits AS units,
            e.schedule, e.room, e.instructor,
            e.semester, e.academicYear AS school_year, e.status
       FROM Enrollment e JOIN Course c ON c.courseId = e.courseId
      WHERE e.studentId = ? AND e.status IN ('Enrolled', 'Pending')
      ORDER BY c.courseCode`,
    [req.user.student_id]
  );
  res.json(rows);
});

// GET /api/student/available-subjects  (all CCS subjects not yet enrolled this semester)
router.get('/available-subjects', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT c.courseId AS subject_id, c.courseCode AS subject_code,
            c.courseTitle AS subject_name, c.creditUnits AS units
       FROM Course c
      WHERE c.courseCode IN ('CCS112','CSP108','CSEG1','CCS106','CCS109','CSP105','ENV101')
        AND c.courseId NOT IN (
          SELECT e.courseId FROM Enrollment e
           WHERE e.studentId = ?
             AND e.academicYear = '2024-2025'
             AND e.semester = '2nd Semester'
             AND e.status IN ('Enrolled', 'Pending')
        )
      ORDER BY c.courseCode`,
    [req.user.student_id]
  );
  res.json(rows);
});

// POST /api/student/enroll  { subject_id }
router.post('/enroll', async (req, res) => {
  const { subject_id } = req.body || {};
  if (!subject_id) return res.status(400).json({ message: 'subject_id is required.' });

  // Guard: check the subject exists and is one of the allowed CCS subjects
  const [[course]] = await pool.query(
    `SELECT courseId, courseCode FROM Course
      WHERE courseId = ?
        AND courseCode IN ('CCS112','CSP108','CSEG1','CCS106','CCS109','CSP105','ENV101')`,
    [subject_id]
  );
  if (!course) return res.status(404).json({ message: 'Subject not found.' });

  // Guard: already enrolled?
  const [[existing]] = await pool.query(
    `SELECT enrollmentId FROM Enrollment
      WHERE studentId = ? AND courseId = ?
        AND academicYear = '2024-2025' AND semester = '2nd Semester'
        AND status IN ('Enrolled', 'Pending')`,
    [req.user.student_id, subject_id]
  );
  if (existing) return res.status(409).json({ message: 'Already enrolled in this subject.' });

  await pool.query(
    `INSERT INTO Enrollment (studentId, courseId, academicYear, semester, status)
     VALUES (?, ?, '2024-2025', '2nd Semester', 'Pending')`,
    [req.user.student_id, subject_id]
  );
  res.status(201).json({ success: true, message: `Enrollment request for ${course.courseCode} submitted. Pending registrar approval.` });
});

// GET /api/student/clearance
router.get('/clearance', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT c.clearanceId AS clearance_id, d.deptName AS department_name, c.status,
            IF(c.status = 'Cleared', a.fullName, NULL) AS cleared_by,
            IF(c.status = 'Cleared', DATE_FORMAT(c.updatedAt, '%Y-%m-%d'), NULL) AS cleared_date,
            c.semester, c.schoolYear AS school_year
       FROM Clearance c
       JOIN Department d ON d.deptId = c.deptId
       LEFT JOIN Users a ON a.userId = c.adminUserId
      WHERE c.studentId = ?
      ORDER BY c.clearanceId`,
    [req.user.student_id]
  );
  res.json(rows);
});

// GET /api/student/payments  (this student's fees, paid and pending)
router.get('/payments', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT paymentId AS payment_id, description, amount, paymentMethod AS method, status,
            DATE_FORMAT(paymentDate, '%Y-%m-%d') AS date, receiptNumber AS or_number
       FROM Payment WHERE studentId = ? ORDER BY paymentId`,
    [req.user.student_id]
  );
  res.json(rows);
});

// PATCH /api/student/payments/:id/method  { method }
// Student only picks how they'll pay. It stays Pending until the cashier confirms with an OR number.
router.patch('/payments/:id/method', async (req, res) => {
  const { method } = req.body || {};
  if (!['Cash', 'Online'].includes(method)) {
    return res.status(400).json({ message: 'Invalid payment method.' });
  }
  const [r] = await pool.query(
    `UPDATE Payment SET paymentMethod = ?
      WHERE paymentId = ? AND studentId = ? AND status = 'Pending'`,
    [method, req.params.id, req.user.student_id]
  );
  if (r.affectedRows === 0) return res.status(404).json({ message: 'Pending payment not found.' });
  res.json({ success: true });
});

// GET /api/student/dashboard
router.get('/dashboard', async (req, res) => {
  const id = req.user.student_id;

  const [[stats]] = await pool.query(
    `SELECT COALESCE(SUM(c.creditUnits), 0) AS total_units,
            SUM(e.grade * c.creditUnits) / NULLIF(SUM(c.creditUnits), 0) AS gwa
       FROM Enrollment e JOIN Course c ON c.courseId = e.courseId
      WHERE e.studentId = ? AND e.grade IS NOT NULL`,
    [id]
  );
  const [[docs]] = await pool.query(
    `SELECT COUNT(*) AS pending_docs FROM Document_Request
      WHERE studentId = ? AND status IN ('Pending', 'Processing')`,
    [id]
  );
  const [[clr]] = await pool.query(
    `SELECT COUNT(*) AS total, COALESCE(SUM(status <> 'Cleared'), 0) AS pending
       FROM Clearance WHERE studentId = ?`,
    [id]
  );
  const [feed] = await pool.query(
    `SELECT requestId AS request_id, documentType AS document_type, status,
            DATE_FORMAT(requestDate, '%Y-%m-%d') AS request_date
       FROM Document_Request WHERE studentId = ?
      ORDER BY requestId DESC LIMIT 5`,
    [id]
  );

  res.json({
    total_units: Number(stats.total_units),
    gwa: stats.gwa == null ? 'N/A' : Number(stats.gwa).toFixed(2),
    pending_docs: docs.pending_docs,
    clearance_status: clr.total > 0 && Number(clr.pending) === 0 ? 'CLEARED' : 'PENDING',
    feed,
  });
});

export default router;
