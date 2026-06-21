import { useEffect, useState } from 'react';
import api from '../api/axios';
import StoreCard from '../components/StoreCard';

const UserStoreListing = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchStores = async () => {
    try {
      const res = await api.get('/stores', { params: { search: search || undefined } });
      setStores(res.data.stores || []);
    } catch {  }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStores(); }, [search]);

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 className="page-title">Browse Stores</h1>
          <p className="page-subtitle">Discover and rate stores near you</p>
        </div>

        <div className="search-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              className="form-input"
              placeholder="Search stores by name or address…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-wrapper"><div className="spinner" /></div>
        ) : stores.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏪</div>
            <div className="empty-state-text">No stores found</div>
          </div>
        ) : (
          <div className="stores-grid">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStoreListing;
