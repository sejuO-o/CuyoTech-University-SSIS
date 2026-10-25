import { useEffect, useState } from 'react';
import { getEnrollment, getAvailableSubjects, enrollInSubject } from '../api/api.js';

// The 7 CCS subjects with descriptions for context
const SUBJECT_INFO = {
  CCS112: { desc: 'App development trends, cloud, IoT, mobile, and emerging tech landscape.' },
  CSP108: { desc: 'Concepts, paradigms, and comparative study of programming languages.' },
  CSEG1:  { desc: 'Fundamentals of game design, mechanics, storytelling, and prototyping.' },
  CCS106: { desc: 'Ethics, professionalism, IP law, and social impact of computing.' },
  CCS109: { desc: 'Methods and tools for analyzing and designing information systems.' },
  CSP105: { desc: 'Algorithm design, analysis, and complexity theory.' },
  ENV101: { desc: 'Environmental principles, sustainability, and ecological awareness.' },
};

function ConfirmModal({ subject, onConfirm, onCancel, loading }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Confirm Enrollment</span>
          <button className="modal-close" onClick={onCancel} aria-label="Close">×</button>
        </div>
        <div className="modal-body">
          <p style={{ marginBottom: 16, color: '#374151' }}>
            You are about to submit an enrollment request for:
          </p>
          <div className="modal-detail-row">
            <span className="modal-detail-label">Subject Code</span>
            <span className="modal-detail-value" style={{ fontFamily: 'monospace', color: '#2563eb', fontWeight: 700 }}>
              {subject.subject_code}
            </span>
          </div>
          <div className="modal-detail-row">
            <span className="modal-detail-label">Subject Name</span>
            <span className="modal-detail-value">{subject.subject_name}</span>
          </div>
          <div className="modal-detail-row">
            <span className="modal-detail-label">Units</span>
            <span className="modal-detail-value">{subject.units}</span>
          </div>
          <p style={{ marginTop: 16, fontSize: 12, color: '#6b7280' }}>
            Your request will be <strong>Pending</strong> until approved by the Registrar.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" style={{ width: 'auto', padding: '8px 20px' }} onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn-submit"
            style={{ width: 'auto', padding: '8px 24px', marginLeft: 8 }}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Submitting…' : 'Confirm Enroll'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EnrollmentPage() {
  const [enrolled, setEnrolled]     = useState([]);
  const [available, setAvailable]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [selected, setSelected]     = useState(null);   // subject pending confirmation
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]           = useState('');

  function loadData() {
    setLoading(true);
    Promise.all([getEnrollment(), getAvailableSubjects()])
      .then(([enr, avail]) => {
        setEnrolled(enr);
        setAvailable(avail);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadData(); }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  }

  async function handleConfirm() {
    if (!selected) return;
    setSubmitting(true);
    try {
      const res = await enrollInSubject(selected.subject_id);
      showToast(res.message || 'Enrollment request submitted.');
      setSelected(null);
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to submit enrollment.');
      setSelected(null);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;
  if (error)   return <div className="card" style={{ color: '#dc2626' }}>{error}</div>;

  const totalUnits = enrolled.reduce((sum, s) => sum + (s.units || 0), 0);

  return (
    <div>
      <h1 className="page-title">Enrollment</h1>
      <p className="page-subtitle">2nd Semester AY 2024–2025</p>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 1000,
          background: '#1e3a5f', color: '#fff',
          padding: '12px 20px', borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          fontSize: 14, maxWidth: 360,
        }}>
          {toast}
        </div>
      )}

      {/* Summary */}
      <div className="grades-summary">
        <div className="stat-card blue">
          <span className="stat-card-label">Enrolled</span>
          <span className="stat-card-value">{enrolled.length}</span>
        </div>
        <div className="stat-card green">
          <span className="stat-card-label">Total Units</span>
          <span className="stat-card-value">{totalUnits}</span>
        </div>
        <div className="stat-card yellow">
          <span className="stat-card-label">Available</span>
          <span className="stat-card-value">{available.length}</span>
        </div>
      </div>

      {/* Currently Enrolled */}
      <div className="card" style={{ marginBottom: 18 }}>
        <p className="section-title">Currently Enrolled</p>
        {enrolled.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: '20px 0' }}>
            No enrolled subjects yet. Add subjects below.
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
              {enrolled.map(s => (
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

      {/* Available Subjects */}
      <div className="card">
        <p className="section-title">Available Subjects</p>
        {available.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: '20px 0' }}>
            You are enrolled in all available subjects for this semester.
          </p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Description</th>
                <th>Units</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {available.map(s => (
                <tr key={s.subject_id}>
                  <td style={{ fontFamily: 'monospace', color: '#2563eb', fontWeight: 600 }}>
                    {s.subject_code}
                  </td>
                  <td>{s.subject_name}</td>
                  <td style={{ fontSize: 12, color: '#6b7280' }}>
                    {SUBJECT_INFO[s.subject_code]?.desc ?? '—'}
                  </td>
                  <td style={{ textAlign: 'center' }}>{s.units}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn-action teal"
                      style={{ padding: '5px 16px', fontSize: 12 }}
                      onClick={() => setSelected(s)}
                    >
                      Enroll
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <ConfirmModal
          subject={selected}
          onConfirm={handleConfirm}
          onCancel={() => setSelected(null)}
          loading={submitting}
        />
      )}
    </div>
  );
}
