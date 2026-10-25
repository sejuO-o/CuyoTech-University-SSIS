import { useEffect, useState } from 'react';
import { getEnrollment } from '../api/api.js';

export default function EnrolledSubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    getEnrollment()
      .then(setSubjects)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;
  if (error)   return <div className="card" style={{ color: '#dc2626' }}>{error}</div>;

  const totalUnits = subjects.reduce((sum, s) => sum + (s.units || 0), 0);

  return (
    <div>
      <h1 className="page-title">Enrolled Subjects</h1>
      <p className="page-subtitle">2nd Semester AY 2024–2025</p>

      <div className="grades-summary">
        <div className="stat-card blue">
          <span className="stat-card-label">Total Subjects</span>
          <span className="stat-card-value">{subjects.length}</span>
        </div>
        <div className="stat-card green">
          <span className="stat-card-label">Total Units</span>
          <span className="stat-card-value">{totalUnits}</span>
        </div>
        <div className="stat-card green">
          <span className="stat-card-label">Status</span>
          <span className="stat-card-value" style={{ fontSize: '15px' }}>
            {subjects.length > 0 ? 'ENROLLED' : 'NOT ENROLLED'}
          </span>
        </div>
      </div>

      <div className="card">
        <p className="section-title">My Subjects this Semester</p>

        {subjects.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: '24px 0' }}>
            You are not enrolled in any subjects this semester.
          </p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Units</th>
                <th>Schedule</th>
                <th>Room</th>
                <th>Instructor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(s => (
                <tr key={s.enrollment_id}>
                  <td style={{ fontFamily: 'monospace', color: '#2563eb', fontWeight: 600 }}>
                    {s.subject_code}
                  </td>
                  <td>{s.subject_name}</td>
                  <td style={{ textAlign: 'center' }}>{s.units}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{s.schedule ?? '—'}</td>
                  <td>{s.room ?? '—'}</td>
                  <td>{s.instructor ?? '—'}</td>
                  <td>
                    <span className={`badge ${s.status === 'Enrolled' ? 'badge-released' : 'badge-pending'}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
