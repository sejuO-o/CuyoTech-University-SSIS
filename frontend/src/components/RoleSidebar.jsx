import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  IconHome, IconGrades, IconDoc, IconClearance,
  IconLogout, IconSchool, IconUser, IconBookOpen, IconPlusCircle,
} from './Icons.jsx';

// Extra icons inline (no library)
function IconUsers({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  );
}
function IconClipboard({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  );
}
function IconPencil({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function IconMoney({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  );
}
function IconSettings({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  );
}

// Nav config per role
const NAV_CONFIG = {
  student: [
    { to: '/dashboard',           icon: IconHome,        label: 'Homepage'            },
    { to: '/grades',              icon: IconGrades,      label: 'Grades per Semester' },
    { to: '/enrolled-subjects',   icon: IconBookOpen,    label: 'Enrolled Subjects'   },
    { to: '/enrollment',          icon: IconPlusCircle,  label: 'Enrollment'          },
    { to: '/document-request',    icon: IconDoc,         label: 'Document Requests'   },
    { to: '/clearance',           icon: IconClearance,   label: 'Clearance Status'    },
    { to: '/payment',             icon: IconMoney,       label: 'Pay Fees'            },
    { to: '/profile',             icon: IconUser,        label: 'My Profile'          },
  ],
  registrar: [
    { to: '/registrar/dashboard', icon: IconHome,      label: 'Dashboard'          },
    { to: '/registrar/students',  icon: IconUsers,     label: 'Student List'       },
    { to: '/registrar/enrollment',icon: IconClipboard, label: 'Enrollment'         },
    { to: '/registrar/grades',    icon: IconPencil,    label: 'Grades Encoding'    },
    { to: '/registrar/documents', icon: IconDoc,       label: 'Document Requests'  },
    { to: '/registrar/account',   icon: IconUser,      label: 'Manage Account'     },
  ],
  cashier: [
    { to: '/cashier/dashboard', icon: IconHome,     label: 'Dashboard'       },
    { to: '/cashier/payments',  icon: IconMoney,    label: 'Payment Records' },
    { to: '/cashier/fees',      icon: IconSettings, label: 'Fee Schedule'    },
    { to: '/cashier/account',   icon: IconUser,     label: 'Manage Account'  },
  ],
  dept_staff: [
    { to: '/dept/dashboard', icon: IconHome,      label: 'Dashboard'          },
    { to: '/dept/clearance', icon: IconClearance, label: 'Clearance Approval' },
    { to: '/dept/account',   icon: IconUser,      label: 'Manage Account'     },
  ],
  admin: [
    { to: '/admin/dashboard', icon: IconHome,   label: 'Dashboard'      },
    { to: '/admin/users',     icon: IconUsers,  label: 'User Accounts'  },
    { to: '/admin/account',   icon: IconUser,   label: 'Manage Account' },
  ],
};

// Accent colors per role
const ROLE_ACCENT = {
  student:    '#1a2340',
  registrar:  '#064e3b',
  cashier:    '#7c2d12',
  dept_staff: '#4c1d95',
  admin:      '#1e3a5f',
};

const ROLE_LABEL = {
  student:    'Student Portal',
  registrar:  'Registrar Module',
  cashier:    'Cashier Module',
  dept_staff: 'Department Module',
  admin:      'Admin Module',
};

export default function RoleSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role     = user?.role || 'student';
  const navItems = NAV_CONFIG[role] || NAV_CONFIG.student;
  const accent   = ROLE_ACCENT[role] || '#1a2340';

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  const initials = user?.full_name
    ? user.full_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'S';

  return (
    <aside className="sidebar" style={{ backgroundColor: accent }}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-logo">
          <img src="/images/logo.png" alt="CuyoTech Logo" className="sidebar-brand-logo-img" />
        </div>
        <div>
          <span className="sidebar-brand-text">University of<br />CuyoTech</span>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2, fontWeight: 600, letterSpacing: '0.04em' }}>
            {ROLE_LABEL[role]}
          </div>
        </div>
      </div>

      {/* User chip */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
          {initials}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.full_name}
          </div>
          {user?.dept && (
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{user.dept}</div>
          )}
          {user?.student_number && (
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{user.student_number}</div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => 'sidebar-nav-item' + (isActive ? ' active' : '')}
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={handleLogout}>
          <IconLogout size={15} />
          Logout
        </button>
      </div>
    </aside>
  );
}
