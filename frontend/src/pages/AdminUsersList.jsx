import { useEffect, useState } from 'react';
import api from '../api/axios';
import DataTable from '../components/DataTable';

const AdminUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users', { params: { search: search || undefined } });
      setUsers(res.data.users || []);
    } catch {  }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, [search]);

  const roleBadge = (role) => {
    const cls = role === 'ADMIN' ? 'badge-admin' : role === 'STORE_OWNER' ? 'badge-store_owner' : 'badge-user';
    return <span className={`badge ${cls}`}>{role.replace('_', ' ')}</span>;
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'address', label: 'Address', sortable: false, render: (val) => val || '—' },
    { key: 'role', label: 'Role', sortable: true, render: (val) => roleBadge(val) },
  ];

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 className="page-title">Users</h1>
            <p className="page-subtitle" style={{ marginBottom: 0 }}>Manage all registered users</p>
          </div>
        </div>

        <div className="search-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              className="form-input"
              placeholder="Search by name, email, or address…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={users}
          loading={loading}
          emptyMessage="No users found."
        />
      </div>
    </div>
  );
};

export default AdminUsersList;
