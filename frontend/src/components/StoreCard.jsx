import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './StoreCard.css';

const StarDisplay = ({ score }) => (
  <div className="stars">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`star ${s <= score ? 'filled' : ''}`}>★</span>
    ))}
  </div>
);

const StoreCard = ({ store }) => {
  const { user } = useAuth();
  const avg = store.averageRating ? parseFloat(store.averageRating).toFixed(1) : '0.0';
  const initial = store.name?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="store-card">
      <div className="store-card-header">
        <div className="store-avatar">{initial}</div>
        <div className="store-info">
          <div className="store-name">{store.name}</div>
          <div className="store-address">📍 {store.address}</div>
        </div>
      </div>

      <div className="store-rating-row">
        <StarDisplay score={Math.round(store.averageRating || 0)} />
        <span className="store-avg-score">{avg}</span>
        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          ({store.ratings?.length || 0} reviews)
        </span>
      </div>

      {user?.role === 'USER' && (
        <div className="store-card-actions">
          {store.myRating ? (
            <Link to={`/user/stores/${store.id}/edit-rating`} className="btn btn-secondary btn-sm btn-full">
              ✏️ Edit My Rating ({store.myRating.score}★)
            </Link>
          ) : (
            <Link to={`/user/stores/${store.id}/rate`} className="btn btn-primary btn-sm btn-full">
              ⭐ Rate This Store
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default StoreCard;
