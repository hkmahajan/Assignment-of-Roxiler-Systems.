import { useEffect, useState } from 'react';
import api from '../api/axios';
import DataTable from '../components/DataTable';
import toast from 'react-hot-toast';

const StarDisplay = ({ score }) => (
  <div className="stars">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`star ${s <= score ? 'filled' : ''}`}>★</span>
    ))}
  </div>
);

const StoreOwnerRatings = () => {
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/stores/my-store')
      .then(async (res) => {
        setStore(res.data.store);
        const ratingsRes = await api.get(`/ratings/store/${res.data.store.id}`);
        setRatings(ratingsRes.data.ratings);
      })
      .catch(() => toast.error('Could not load ratings.'))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: 'user', label: 'User Name', sortable: false, render: (val) => val?.name || '—' },
    { key: 'user', label: 'User Email', sortable: false, render: (val) => val?.email || '—' },
    {
      key: 'score', label: 'Rating', sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <StarDisplay score={val} />
          <span style={{ color: '#f59e0b', fontWeight: 700 }}>{val}</span>
        </div>
      ),
    },
    {
      key: 'createdAt', label: 'Date', sortable: true,
      render: (val) => new Date(val).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    },
  ];

  const avg = store?.averageRating ? parseFloat(store.averageRating).toFixed(2) : '0.00';

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 className="page-title">Store Ratings</h1>
          <p className="page-subtitle">{store ? `All ratings for ${store.name}` : 'Loading...'}</p>
        </div>

        {store && (
          <div className="stats-grid" style={{ marginBottom: '2rem' }}>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">{avg}</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-value">{ratings.length}</div>
              <div className="stat-label">Total Reviews</div>
            </div>
          </div>
        )}

        <DataTable
          columns={columns}
          data={ratings}
          loading={loading}
          emptyMessage="No ratings yet. Share your store with customers!"
        />
      </div>
    </div>
  );
};

export default StoreOwnerRatings;
