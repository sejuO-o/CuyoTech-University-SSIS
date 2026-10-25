import { useEffect, useState } from 'react';
import { getMe } from '../api/api.js';

const ROLE_LABEL = {
  student:    'Student',
  registrar:  'Registrar Staff',
  cashier:    'Cashier Staff',
  dept_staff: 'Department Staff',
  admin:      'System Administrator',
};

export default function AccountPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    getMe()
      .then(setProfile)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;
  if (error)   return <div className="card" style={{ color: '#dc2626' }}>{error}</div>;

  const initials = profile.full_name
    ? profile.full_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  const isStudent = profile.role === 'student';
  const yearSuffix = isStudent
    ? (['st','nd','rd'][profile.year_level - 1] || 'th')
    : null;

  return (
    <div>
      <h1 className="page-title">Manage Account</h1>
      <p className="page-subtitle">{ROLE_LABEL[profile.role] || profile.role} — Account Information</p>

      <div className="profile-grid">
        {/* Avatar card */}
        <div className="card profile-avatar-card">
          <div className="profile-avatar">{initials}</div>
          <p className="profile-name">{profile.full_name}</p>
          <p className="profile-num">
            {isStudent ? profile.student_number : profile.username}
          </p>
          {isStudent && (
            <p className="profile-num" style={{ marginTop: 4 }}>{profile.course_name}</p>
          )}
          {!isStudent && profile.dept && (
            <p className="profile-num" style={{ marginTop: 4 }}>{profile.dept}</p>
          )}

          <div style={{ marginTop: 16, width: '100%' }}>
            <div className="profile-detail-row">
              <span className="profile-detail-label">Role</span>
              <span className="profile-detail-value">{ROLE_LABEL[profile.role] || profile.role}</span>
            </div>
            <div className="profile-detail-row">
              <span className="profile-detail-label">Status</span>
              <span className="profile-detail-value">{profile.status}</span>
            </div>
            {isStudent && (
              <>
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Year Level</span>
                  <span className="profile-detail-value">{profile.year_level}{yearSuffix} Year</span>
                </div>
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Semester</span>
                  <span className="profile-detail-value">2nd Sem 2024-25</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Details card */}
        <div className="card">
          <p className="section-title">Account Information</p>

          {/* Fields common to all roles */}
          {[
            ['Full Name',   profile.full_name],
            ['Username',    profile.username],
            ['Email',       profile.email],
            ['Contact',     profile.contact_number || 'Not provided'],
            ['Address',     profile.address        || 'Not provided'],
          ].map(([label, value]) => (
            <div className="profile-detail-row" key={label}>
              <span className="profile-detail-label">{label}</span>
              <span className="profile-detail-value">{value}</span>
            </div>
          ))}

          {/* Extra fields for students */}
          {isStudent && (
            <>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Student Number</span>
                <span className="profile-detail-value">{profile.student_number}</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Program</span>
                <span className="profile-detail-value">{profile.course_name}</span>
              </div>
            </>
          )}

          {/* Extra field for staff */}
          {!isStudent && profile.dept && (
            <div className="profile-detail-row">
              <span className="profile-detail-label">Department</span>
              <span className="profile-detail-value">{profile.dept}</span>
            </div>
          )}

          <div className="notice-box" style={{ marginTop: 16 }}>
            <strong>Note:</strong>{' '}
            {profile.role === 'admin'
              ? 'As the System Administrator, you can update account information directly through the User Accounts module.'
              : profile.role === 'student'
              ? 'To update your personal information, please visit the Registrar\'s Office with a valid ID.'
              : 'To update your personal information or reset your password, please contact the System Administrator.'
            }
          </div>
        </div>
      </div>
    </div>
  );
}
