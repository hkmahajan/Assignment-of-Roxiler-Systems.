import { useState } from 'react';

const RatingForm = ({ storeName, initialScore = 0, onSubmit, loading }) => {
  const [score, setScore] = useState(initialScore);
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score > 0) onSubmit(score);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: '#0f172a' }}>
          Your Rating
        </label>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '0.5rem',
          padding: '1.25rem', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0'
        }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={`star interactive ${s <= (hover || score) ? 'filled' : ''}`}
              style={{ fontSize: '2.5rem', transition: 'transform 0.15s ease, color 0.15s ease' }}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setScore(s)}
            >
              ★
            </span>
          ))}
        </div>
        {score > 0 && (
          <p style={{ textAlign: 'center', marginTop: '0.75rem', color: '#64748b', fontSize: '0.875rem' }}>
            You selected <strong style={{ color: '#f59e0b' }}>{score}</strong> star{score !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-full"
        disabled={!score || loading}
      >
        {loading ? 'Submitting...' : `⭐ Submit Rating`}
      </button>
    </form>
  );
};

export default RatingForm;
