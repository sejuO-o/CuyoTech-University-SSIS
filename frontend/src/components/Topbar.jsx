import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { IconBell, IconMenu, IconUser } from './Icons.jsx';

// Role → account page path
const ACCOUNT_PATH = {
  student:    '/account',
  registrar:  '/registrar/account',
  cashier:    '/cashier/account',
  dept_staff: '/dept/account',
  admin:      '/admin/account',
};

// Close dropdown when clicking outside
function useOutsideClick(ref, handler) {
  useEffect(() => {
    function listener(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

const NOTIFICATIONS = [
  { id: 1, text: 'Your TOR request has been released.',          time: '2 hours ago',  read: false },
  { id: 2, text: 'Enrollment for 2nd Semester is now open.',     time: '1 day ago',    read: false },
  { id: 3, text: 'Library clearance has been approved.',         time: '3 days ago',   read: true  },
  { id: 4, text: 'Grades for 1st Sem 2024-2025 are available.',  time: '1 week ago',   read: true  },
];

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showNotif,   setShowNotif]   = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifs, setNotifs]           = useState(NOTIFICATIONS);

  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  useOutsideClick(notifRef,   () => setShowNotif(false));
  useOutsideClick(profileRef, () => setShowProfile(false));

  const unread = notifs.filter(n => !n.read).length;

  const initials = user?.full_name
    ? user.full_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'S';

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Logo */}
        <img src="/images/logo.png" alt="CuyoTech Logo" className="topbar-logo" />
        <span className="topbar-student-number">{user?.student_number}</span>
        <span className="topbar-divider">|</span>
        <span className="topbar-student-name">{user?.full_name}</span>
      </div>

      <div className="topbar-right">

        {/* ── Hamburger / Profile menu ── */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button
            className="topbar-icon-btn"
            aria-label="Menu"
            onClick={() => { setShowProfile(v => !v); setShowNotif(false); }}
          >
            <IconMenu size={18} />
          </button>

          {showProfile && (
            <div className="topbar-dropdown" style={{ right: 0, width: 180 }}>
              <div className="topbar-dropdown-header">Account</div>
              <button
                className="topbar-dropdown-item"
                onClick={() => { navigate(ACCOUNT_PATH[user?.role] || '/account'); setShowProfile(false); }}
              >
                <IconUser size={14} />
                Manage Account
              </button>
              <div className="topbar-dropdown-divider" />
              <button
                className="topbar-dropdown-item danger"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* ── Notifications ── */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className="topbar-icon-btn"
            aria-label="Notifications"
            onClick={() => { setShowNotif(v => !v); setShowProfile(false); }}
          >
            <IconBell size={18} />
            {unread > 0 && <span className="notif-badge">{unread}</span>}
          </button>

          {showNotif && (
            <div className="topbar-dropdown" style={{ right: 0, width: 300 }}>
              <div className="topbar-dropdown-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Notifications</span>
                {unread > 0 && (
                  <button
                    onClick={markAllRead}
                    style={{ fontSize: 10, color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Mark all read
                  </button>
                )}
              </div>
              {notifs.map(n => (
                <div
                  key={n.id}
                  className="topbar-notif-item"
                  style={{ background: n.read ? '#fff' : '#eff6ff' }}
                  onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                >
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    {!n.read && (
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b82f6', flexShrink: 0, marginTop: 4 }} />
                    )}
                    <div style={{ flex: 1, paddingLeft: n.read ? 15 : 0 }}>
                      <p style={{ fontSize: 12, color: '#1a1a2e', fontWeight: n.read ? 400 : 600, lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: 10, color: '#9ca3af', marginTop: 3 }}>{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              {notifs.every(n => n.read) && (
                <div style={{ padding: '16px', textAlign: 'center', fontSize: 12, color: '#9ca3af' }}>
                  No new notifications
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Avatar ── */}
        <div className="topbar-avatar">{initials}</div>
      </div>
    </header>
  );
}
