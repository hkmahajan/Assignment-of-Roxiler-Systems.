import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import RatingForm from '../components/RatingForm';
import toast from 'react-hot-toast';

const UserRateStore = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/stores/${storeId}`)
      .then((res) => setStore(res.data.store))
      .catch(() => toast.error('Store not found.'));
  }, [storeId]);

  const handleSubmit = async (score) => {
    setSubmitting(true);
    try {
      await api.post('/ratings', { storeId: parseInt(storeId), score });
      toast.success('Rating submitted!');
      navigate('/user/stores');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit rating.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!store) return <div className="page-wrapper"><div className="loading-wrapper"><div className="spinner" /></div></div>;

  return (
    <div className="page-wrapper">
      <div className="page-content" style={{ maxWidth: '520px' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, background: '#fef3c7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', margin: '0 auto 1rem auto'
            }}>⭐</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Rate Store</h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>Share your experience with {store.name}</p>
          </div>

          <RatingForm storeName={store.name} onSubmit={handleSubmit} loading={submitting} />
          <button className="btn btn-secondary btn-full mt-lg" onClick={() => navigate('/user/stores')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRateStore;
