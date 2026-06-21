import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AdminAddStore = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', ownerId: '' });
  const [owners, setOwners] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/users')
      .then((res) => {
        const storeOwners = (res.data.users || []).filter((u) => u.role === 'STORE_OWNER');
        setOwners(storeOwners);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await api.post('/stores', { ...form, ownerId: parseInt(form.ownerId) });
      toast.success('Store created successfully!');
      navigate('/admin/stores');
    } catch (err) {
      if (err.response?.data?.errors) {
        const fieldErrors = {};
        err.response.data.errors.forEach((e) => { fieldErrors[e.field] = e.message; });
        setErrors(fieldErrors);
      } else {
        toast.error(err.response?.data?.message || 'Failed to create store.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content" style={{ maxWidth: '600px' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, background: '#eff6ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', margin: '0 auto 1rem auto'
            }}>🏪</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Add New Store</h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>Register a new store on the platform</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Store Name</label>
              <input name="name" className="form-input" placeholder="Enter store name" value={form.name} onChange={handleChange} required />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input name="email" type="email" className="form-input" placeholder="Enter store email" value={form.email} onChange={handleChange} required />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input name="address" className="form-input" placeholder="Enter store address" value={form.address} onChange={handleChange} required />
              {errors.address && <div className="form-error">{errors.address}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Store Owner</label>
              <select name="ownerId" className="form-input" value={form.ownerId} onChange={handleChange} required>
                <option value="">Select an owner…</option>
                {owners.map((o) => (
                  <option key={o.id} value={o.id}>{o.name} ({o.email})</option>
                ))}
              </select>
              {errors.ownerId && <div className="form-error">{errors.ownerId}</div>}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1 }} disabled={loading}>
                {loading ? 'Creating...' : '+ Create Store'}
              </button>
              <button type="button" className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={() => navigate('/admin/stores')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddStore;
