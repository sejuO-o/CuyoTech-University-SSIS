import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { IconEye, IconEyeOff } from '../components/Icons.jsx';

const ROLE_REDIRECTS = {
  student:    '/dashboard',
  registrar:  '/registrar/dashboard',
  cashier:    '/cashier/dashboard',
  dept_staff: '/dept/dashboard',
  admin:      '/admin/dashboard',
};

const ROLE_LABELS = {
  student:    'Student Portal',
  registrar:  'Registrar Module',
  cashier:    'Cashier Module',
  dept_staff: 'Department Module',
  admin:      'Admin Module',
};

const ROLE_COLORS = {
  student:    '#1a2340',
  registrar:  '#065f46',
  cashier:    '#7c2d12',
  dept_staff: '#4c1d95',
  admin:      '#1e3a5f',
};

export default function LoginPage() {
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [showPw,   setShowPw]           = useState(false);
  const [error,    setError]            = useState('');
  const [loading,  setLoading]          = useState(false);
  const [loggedInRole, setLoggedInRole] = useState(null);

  const { login } = useAuth();
  const navigate  = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!username.trim()) { setError('Please enter your username or student number.'); return; }
    if (!password)        { setError('Please enter your password.'); return; }

    setLoading(true);
    try {
      const user = await login(username.trim(), password);
      setLoggedInRole(user.role);
      setTimeout(() => navigate(ROLE_REDIRECTS[user.role] || '/dashboard', { replace: true }), 600);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card" style={{ maxWidth: 380 }}>

        {/* Logo */}
        <div className="login-logo">
          <img src="/images/logo.png" alt="University of CuyoTech Logo" className="login-logo-img" />
        </div>

        <p className="login-university">University of CuyoTech</p>
        <p className="login-subtitle">STUDENT SERVICES INFORMATION SYSTEM (SSIS)</p>

        {/* Role flash on success */}
        {loggedInRole ? (
          <div style={{
            width: '100%', padding: '10px', borderRadius: 8, marginBottom: 14,
            textAlign: 'center', background: ROLE_COLORS[loggedInRole],
            color: '#fff', fontSize: 13, fontWeight: 700,
          }}>
            ✓ Logged in as {ROLE_LABELS[loggedInRole]} — redirecting...
          </div>
        ) : (
          <p className="login-heading">SIGN IN</p>
        )}

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
          <div className="form-group">
            <label htmlFor="username">Username / Student ID Number</label>
            <input
              id="username" type="text" className="form-control"
              placeholder="Enter your username or student number"
              value={username} onChange={e => setUsername(e.target.value)}
              autoComplete="username" aria-label="Username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pw">Password</label>
            <div className="input-pw-wrap">
              <input
                id="pw" type={showPw ? 'text' : 'password'} className="form-control"
                placeholder="Enter your password" value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password" aria-label="Password"
              />
              <button type="button" className="pw-toggle"
                onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}>
                {showPw ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading || !!loggedInRole}>
            {loading ? 'Signing in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}
