import { useEffect, useState } from 'react';
import { getAccounts, addAccount, deleteAccount, resetPassword } from '../../api/api.js';

const ROLES = ['student', 'registrar', 'cashier', 'dept_staff', 'admin'];
const DEPTS = ['Registrar Office', 'Cashier Office', 'Library', 'Laboratory', 'Guidance Office', "Dean's Office", 'IT Department'];

const ROLE_BADGE_COLOR = {
  student:    '#dbeafe:#1d4ed8',
  registrar:  '#d1fae5:#065f46',
  cashier:    '#fef3c7:#92400e',
  dept_staff: '#ede9fe:#5b21b6',
  admin:      '#fee2e2:#991b1b',
};

function RoleBadge({ role }) {
  const [bg, color] = (ROLE_BADGE_COLOR[role] || '#f3f4f6:#374151').split(':');
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 12, background: bg, color }}>
      {role.replace('_', ' ').toUpperCase()}
    </span>
  );
}

const EMPTY_FORM = { username: '', full_name: '', role: 'student', dept: '' };

export default function UserManagement() {
  const [accounts, setAccounts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [showAdd,  setShowAdd]  = useState(false);
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [adding,   setAdding]   = useState(false);
  const [saving,   setSaving]   = useState(null);
  const [toast,    setToast]    = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    getAccounts().then(setAccounts).finally(() => setLoading(false));
  }, []);

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3500); }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.username || !form.full_name || !form.role) {
      showToast('Please fill in all required fields.'); return;
    }
    setAdding(true);
    const created = await addAccount(form);
    setAccounts(prev => [...prev, created]);
    setForm(EMPTY_FORM);
    setShowAdd(false);
    setAdding(false);
    showToast(`Account "${form.username}" created. Default password: password`);
  }

  async function handleDelete(id) {
    setSaving(id);
    await deleteAccount(id);
    setAccounts(prev => prev.filter(a => a.id !== id));
    setSaving(null);
    setConfirmDelete(null);
    showToast('Account deleted.');
  }

  async function handleReset(id, username) {
    setSaving(`reset-${id}`);
    await resetPassword(id);
    setSaving(null);
    showToast(`Password for "${username}" reset to "password".`);
  }

  const filtered = accounts.filter(a => {
    const matchSearch = !search ||
      (a.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.username  || '').toLowerCase().includes(search.toLowerCase());
    const matchRole = !filterRole || a.role === filterRole;
    return matchSearch && matchRole;
  });

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;

  return (
    <div>
      <h1 className="page-title">User Account Management</h1>
      <p className="page-subtitle">Create, manage, and control all system accounts</p>

      {toast && <div className="alert-success">✓ {toast}</div>}

      {/* Filters + Add */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Search</label>
            <input className="form-control" placeholder="Name or username..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ flex: '0 1 160px' }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Role</label>
            <select className="form-control" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
              <option value="">All Roles</option>
              {ROLES.map(r => <option key={r} value={r}>{r.replace('_',' ')}</option>)}
            </select>
          </div>
          <button className="btn-cancel" style={{ padding: '9px 16px', height: 38 }}
            onClick={() => { setSearch(''); setFilterRole(''); }}>Clear</button>
          <button className="btn-submit" style={{ padding: '9px 18px', height: 38 }}
            onClick={() => setShowAdd(v => !v)}>
            {showAdd ? 'Cancel' : '+ Add Account'}
          </button>
        </div>

        {/* Add form */}
        {showAdd && (
          <form onSubmit={handleAdd} style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 12 }}>New Account</p>
            <div className="form-row">
              <div className="form-field">
                <label>Username <span className="required">*</span></label>
                <input className="form-control" placeholder="e.g. 2025-00001 or cashier2"
                  value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
              </div>
              <div className="form-field">
                <label>Full Name <span className="required">*</span></label>
                <input className="form-control" placeholder="Full name"
                  value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Role <span className="required">*</span></label>
                <select className="form-control" value={form.role}
                  onChange={e => setForm(f => ({
                    ...f,
                    role: e.target.value,
                    // students and admins have no department
                    dept: ['student', 'admin'].includes(e.target.value) ? '' : f.dept,
                  }))}>
                  {ROLES.map(r => <option key={r} value={r}>{r.replace('_',' ')}</option>)}
                </select>
              </div>
              {!['student', 'admin'].includes(form.role) && (
                <div className="form-field">
                  <label>Department</label>
                  <select className="form-control" value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))}>
                    <option value="">— None —</option>
                    {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              )}
            </div>
            <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 10 }}>
              Default password will be set to <strong>"password"</strong>. The user must change it on first login.
            </p>
            <button type="submit" className="btn-submit" style={{ padding: '9px 24px' }} disabled={adding}>
              {adding ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>

      {/* Accounts table */}
      <div className="card">
        <p className="section-title">Accounts ({filtered.length})</p>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#9ca3af', padding: 20 }}>No accounts found.</td></tr>
              ) : filtered.map(a => (
                <tr key={a.id}>
                  <td style={{ color: '#9ca3af', fontSize: 11 }}>{a.id}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600 }}>{a.username}</td>
                  <td style={{ fontWeight: 600 }}>{a.full_name}</td>
                  <td><RoleBadge role={a.role} /></td>
                  <td style={{ fontSize: 11, color: '#6b7280' }}>{a.dept || '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        style={{ fontSize: 11, padding: '3px 10px', borderRadius: 5, background: '#fef3c7', color: '#92400e', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                        disabled={saving === `reset-${a.id}`}
                        onClick={() => handleReset(a.id, a.username)}>
                        {saving === `reset-${a.id}` ? '...' : 'Reset PW'}
                      </button>
                      <button
                        style={{ fontSize: 11, padding: '3px 10px', borderRadius: 5, background: '#fee2e2', color: '#991b1b', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                        disabled={saving === a.id}
                        onClick={() => setConfirmDelete(a)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-box" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Confirm Delete</span>
              <button className="modal-close" onClick={() => setConfirmDelete(null)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 13, color: '#374151' }}>
                Are you sure you want to delete account <strong>{confirmDelete.username}</strong> ({confirmDelete.full_name})?
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer" style={{ gap: 8 }}>
              <button className="btn-cancel" style={{ width: 'auto', padding: '8px 20px' }}
                onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button
                style={{ padding: '8px 20px', borderRadius: 6, background: '#dc2626', color: '#fff', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer' }}
                disabled={saving === confirmDelete.id}
                onClick={() => handleDelete(confirmDelete.id)}>
                {saving === confirmDelete.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
