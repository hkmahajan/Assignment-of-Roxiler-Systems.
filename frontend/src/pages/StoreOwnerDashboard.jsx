import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const StarDisplay = ({ score }) => (
  <div className="stars">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`star ${s <= score ? 'filled' : ''}`}>★</span>
    ))}
  </div>
);

const StoreOwnerDashboard = () => {
  const { user } = useAuth();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/stores/my-store')
      .then((res) => setStore(res.data.store))
      .catch(() => toast.error('Could not load your store.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-wrapper"><div className="loading-wrapper"><div className="spinner" /></div></div>;

  if (!store) {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-title">My Store Dashboard</h1>
          <div className="empty-state">
            <div className="empty-state-icon">🏪</div>
            <div className="empty-state-text">No store linked to your account yet.</div>
            <p style={{ marginTop: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>Contact an admin to have your store set up.</p>
          </div>
        </div>
      </div>
    );
  }

  const avg = store.averageRating ? parseFloat(store.averageRating).toFixed(2) : '0.00';

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div style={{ marginBottom: '2rem' }}>
          <h1 className="page-title">My Store Dashboard</h1>
          <p className="page-subtitle">Welcome back, {user?.name?.split(' ')[0]}!</p>
        </div>

        {}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h2 className="card-title">🏪 {store.name}</h2>
            <Link to="/owner/ratings" className="btn btn-primary btn-sm">View All Ratings →</Link>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.25rem' }}>📧 {store.email}</p>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>📍 {store.address}</p>
        </div>

        {}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{avg}</div>
            <div className="stat-label">Average Rating</div>
            <StarDisplay score={Math.round(store.averageRating || 0)} />
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-value">{store.ratings?.length || 0}</div>
            <div className="stat-label">Total Ratings Received</div>
          </div>
        </div>

        {}
        {store.ratings && store.ratings.length > 0 && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Recent Ratings</h2>
              <Link to="/owner/ratings" className="btn btn-secondary btn-sm">View All</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {store.ratings.slice(0, 5).map((r) => (
                <div key={r.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: 12,
                  border: '1px solid #f1f5f9'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '0.125rem' }}>{r.user?.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{r.user?.email}</div>
                  </div>
                  <StarDisplay score={r.score} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
