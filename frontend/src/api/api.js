// ============================================================
//  SSIS API service — talks to the Express backend (all roles).
//  Vite proxies /api -> http://localhost:3001 (see vite.config.js)
//  Same exported names as the old mock version.
// ============================================================

async function request(path, options = {}) {
  const token = localStorage.getItem('ssis_token');
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Expired/invalid session on a protected call -> force re-login
    if (res.status === 401 && !path.startsWith('/auth/')) {
      localStorage.removeItem('ssis_token');
      localStorage.removeItem('ssis_user');
      window.location.href = '/login';
    }
    const err = new Error(data.message || 'Request failed.');
    err.status = res.status;
    throw err;
  }
  return data;
}

const send = (method, path, body) =>
  request(path, { method, ...(body !== undefined && { body: JSON.stringify(body) }) });

// ── AUTH ──────────────────────────────────────────────────
export async function loginUser(username, password) {
  const { token, user } = await send('POST', '/auth/login', { username, password });
  localStorage.setItem('ssis_token', token);
  localStorage.setItem('ssis_user', JSON.stringify(user));
  return user;
}

export const getMe = () => request('/auth/me');

// ── STUDENT ───────────────────────────────────────────────
export const getDashboard     = () => request('/student/dashboard');
export const getProfile       = () => request('/student/profile');
export const getGrades        = () => request('/student/grades');
export const getEnrollment    = () => request('/student/enrollment');
export const getAvailableSubjects = () => request('/student/available-subjects');
export const enrollInSubject  = (subject_id) => send('POST', '/student/enroll', { subject_id });
export const getClearance     = () => request('/student/clearance');
export const getMyPayments    = () => request('/student/payments');
export const setPaymentMethod = (id, method) => send('PATCH', `/student/payments/${id}/method`, { method });
export const getDocumentTypes = () => request('/documents/types');
export const getDocuments     = () => request('/documents');
export const submitDocument   = (body) => send('POST', '/documents', body);

// ── REGISTRAR ─────────────────────────────────────────────
export const getAllStudents            = () => request('/registrar/students');
export const getCourses                = () => request('/registrar/courses');
export const getSubjects               = () => request('/registrar/subjects');
export const getAllEnrollments         = () => request('/registrar/enrollments');
export const updateEnrollmentStatus    = (id, status) => send('PATCH', `/registrar/enrollments/${id}`, { status });
export const getAllGradesForRegistrar  = () => request('/registrar/grades');
export const encodeGrade               = (id, body) => send('PUT', `/registrar/grades/${id}`, body);
export const getAllDocumentRequests    = () => request('/registrar/documents');
export const updateDocumentStatus      = (id, status) => send('PATCH', `/registrar/documents/${id}`, { status });

// ── CASHIER ───────────────────────────────────────────────
export const getCashierStudents = () => request('/cashier/students');
export const getAllPayments = () => request('/cashier/payments');
export const confirmPayment = (id, or_number) => send('POST', `/cashier/payments/${id}/confirm`, { or_number });
export const addPayment     = ({ student_id, description, amount, method }) =>
  send('POST', '/cashier/payments', { student_id: Number(student_id), description, amount: Number(amount), method });
export const getFeeSchedule = () => request('/cashier/fees');
export const updateFee      = (id, amount) => send('PUT', `/cashier/fees/${id}`, { amount: Number(amount) });

// ── DEPT STAFF ────────────────────────────────────────────
export const getClearanceForDept = () => request('/dept/clearance');
export const approveClearance    = (id) => send('POST', `/dept/clearance/${id}/approve`);
export const rejectClearance     = (id) => send('POST', `/dept/clearance/${id}/reject`);

// ── ADMIN ─────────────────────────────────────────────────
export const getAccounts   = () => request('/admin/accounts');
export const addAccount    = (acc) => send('POST', '/admin/accounts', acc);
export const deleteAccount = (id) => send('DELETE', `/admin/accounts/${id}`);
export const resetPassword = (id) => send('POST', `/admin/accounts/${id}/reset-password`);
