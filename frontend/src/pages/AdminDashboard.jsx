import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/users'),
      api.get('/stores'),
    ])
      .then(([usersRes, storesRes]) => {
        const users = usersRes.data.users || [];
        const stores = storesRes.data.stores || [];
        const totalRatings = stores.reduce((sum, s) => sum + (s.ratings?.length || 0), 0);
        setStats({ users: users.length, stores: stores.length, ratings: totalRatings });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-wrapper"><div className="loading-wrapper"><div className="spinner" /></div></div>;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div style={{ marginBottom: '2rem' }}>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Overview of the entire platform</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-value">{stats.users}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏪</div>
            <div className="stat-value">{stats.stores}</div>
            <div className="stat-label">Total Stores</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{stats.ratings}</div>
            <div className="stat-label">Total Ratings</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div className="card">
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>👤 User Management</h2>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Add and manage users across all roles
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/admin/users/add" className="btn btn-primary">+ Add User</Link>
              <Link to="/admin/users" className="btn btn-secondary">View All Users</Link>
            </div>
          </div>

          <div className="card">
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>🏪 Store Management</h2>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Add and manage stores and their owners
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/admin/stores/add" className="btn btn-primary">+ Add Store</Link>
              <Link to="/admin/stores" className="btn btn-secondary">View All Stores</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
