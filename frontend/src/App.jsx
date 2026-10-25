import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MainLayout    from './components/MainLayout.jsx';

// Public
import LoginPage from './pages/LoginPage.jsx';

// Student
import DashboardPage       from './pages/DashboardPage.jsx';
import GradesPage          from './pages/GradesPage.jsx';
import DocumentRequestPage from './pages/DocumentRequestPage.jsx';
import ClearancePage       from './pages/ClearancePage.jsx';
import PaymentPage         from './pages/PaymentPage.jsx';
import ProfilePage         from './pages/ProfilePage.jsx';
import EnrolledSubjectsPage from './pages/EnrolledSubjectsPage.jsx';
import EnrollmentPage      from './pages/EnrollmentPage.jsx';
import AccountPage         from './pages/AccountPage.jsx';

// Registrar
import RegistrarDashboard  from './pages/registrar/RegistrarDashboard.jsx';
import StudentList         from './pages/registrar/StudentList.jsx';
import EnrollmentManagement from './pages/registrar/EnrollmentManagement.jsx';
import GradesEncoding      from './pages/registrar/GradesEncoding.jsx';
import DocumentApproval    from './pages/registrar/DocumentApproval.jsx';

// Cashier
import CashierDashboard from './pages/cashier/CashierDashboard.jsx';
import PaymentRecords   from './pages/cashier/PaymentRecords.jsx';
import FeeSetup         from './pages/cashier/FeeSetup.jsx';

// Department Staff
import DeptDashboard    from './pages/dept/DeptDashboard.jsx';
import ClearanceApproval from './pages/dept/ClearanceApproval.jsx';

// Admin
import AdminDashboard  from './pages/admin/AdminDashboard.jsx';
import UserManagement  from './pages/admin/UserManagement.jsx';

// Helper: wraps a page inside MainLayout with role protection
function RoleRoute({ roles, element }) {
  return (
    <ProtectedRoute allowedRoles={roles}>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* ── Public ── */}
          <Route path="/login" element={<LoginPage />} />

          {/* ── Root redirect — sends to correct dashboard based on role ── */}
          <Route path="/" element={<RootRedirect />} />

          {/* ══════════════════════════════════════════
              STUDENT routes
          ══════════════════════════════════════════ */}
          <Route element={
            <ProtectedRoute allowedRoles={['student']}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard"          element={<DashboardPage />} />
            <Route path="grades"             element={<GradesPage />} />
            <Route path="enrolled-subjects"  element={<EnrolledSubjectsPage />} />
            <Route path="enrollment"         element={<EnrollmentPage />} />
            <Route path="document-request"   element={<DocumentRequestPage />} />
            <Route path="clearance"          element={<ClearancePage />} />
            <Route path="payment"            element={<PaymentPage />} />
            <Route path="profile"            element={<ProfilePage />} />
            <Route path="account"            element={<AccountPage />} />
          </Route>

          {/* ══════════════════════════════════════════
              REGISTRAR routes
          ══════════════════════════════════════════ */}
          <Route element={
            <ProtectedRoute allowedRoles={['registrar']}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="registrar/dashboard"  element={<RegistrarDashboard />} />
            <Route path="registrar/students"   element={<StudentList />} />
            <Route path="registrar/enrollment" element={<EnrollmentManagement />} />
            <Route path="registrar/grades"     element={<GradesEncoding />} />
            <Route path="registrar/documents"  element={<DocumentApproval />} />
            <Route path="registrar/account"    element={<AccountPage />} />
          </Route>

          {/* ══════════════════════════════════════════
              CASHIER routes
          ══════════════════════════════════════════ */}
          <Route element={
            <ProtectedRoute allowedRoles={['cashier']}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="cashier/dashboard" element={<CashierDashboard />} />
            <Route path="cashier/payments"  element={<PaymentRecords />} />
            <Route path="cashier/fees"      element={<FeeSetup />} />
            <Route path="cashier/account"   element={<AccountPage />} />
          </Route>

          {/* ══════════════════════════════════════════
              DEPARTMENT STAFF routes
          ══════════════════════════════════════════ */}
          <Route element={
            <ProtectedRoute allowedRoles={['dept_staff']}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="dept/dashboard" element={<DeptDashboard />} />
            <Route path="dept/clearance" element={<ClearanceApproval />} />
            <Route path="dept/account"   element={<AccountPage />} />
          </Route>

          {/* ══════════════════════════════════════════
              ADMIN routes
          ══════════════════════════════════════════ */}
          <Route element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/users"     element={<UserManagement />} />
            <Route path="admin/account"   element={<AccountPage />} />
          </Route>

          {/* ── Catch-all ── */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Redirects / to the correct dashboard based on logged-in role
function RootRedirect() {
  const stored = localStorage.getItem('ssis_user');
  if (!stored) return <Navigate to="/login" replace />;
  try {
    const user = JSON.parse(stored);
    const HOME = {
      student:    '/dashboard',
      registrar:  '/registrar/dashboard',
      cashier:    '/cashier/dashboard',
      dept_staff: '/dept/dashboard',
      admin:      '/admin/dashboard',
    };
    return <Navigate to={HOME[user.role] || '/login'} replace />;
  } catch {
    return <Navigate to="/login" replace />;
  }
}
