import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import DataTable from '../components/DataTable';

const StarDisplay = ({ score }) => (
  <div className="stars">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`star ${s <= score ? 'filled' : ''}`}>★</span>
    ))}
  </div>
);

const AdminStoresList = () => {
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

  const columns = [
    { key: 'name', label: 'Store Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'address', label: 'Address', sortable: false },
    {
      key: 'averageRating', label: 'Rating', sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <StarDisplay score={Math.round(val || 0)} />
          <span style={{ color: '#f59e0b', fontWeight: 700 }}>{val ? parseFloat(val).toFixed(1) : '0.0'}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 className="page-title">Stores</h1>
            <p className="page-subtitle" style={{ marginBottom: 0 }}>Manage all registered stores</p>
          </div>
          <Link to="/admin/stores/add" className="btn btn-primary">+ Add Store</Link>
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
          data={stores}
          loading={loading}
          emptyMessage="No stores found."
        />
      </div>
    </div>
  );
};

export default AdminStoresList;
