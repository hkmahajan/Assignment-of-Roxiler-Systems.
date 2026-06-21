import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import './Login.css';
import { Store, User, Mail, Lock, Eye, EyeOff, MapPin, Users, UserPlus } from 'lucide-react';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: 'USER' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});
    setLoading(true);
    try {
      const res = await api.post('/auth/register', form);
      login(res.data.user, res.data.token);
      const role = res.data.user.role;
      if (role === 'ADMIN') navigate('/admin/dashboard');
      else if (role === 'STORE_OWNER') navigate('/owner/dashboard3');
      else navigate('/user/stores');
    } catch (err) {
      if (err.response?.data?.errors) {
        const fieldErrors = {};
        err.response.data.errors.forEach((e) => {
          fieldErrors[e.path || e.field || e.param] = e.msg || e.message;
        });
        setErrors(fieldErrors);
      } else {
        setError(err.response?.data?.message || 'Registration failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-split-page" style={{ minHeight: '100vh', padding: '1rem' }}>
      <div className="login-split-card" style={{ height: 'auto' }}>

        {}
        <div className="login-left-panel" style={{ flex: '0 0 420px' }}>
          <div className="login-brand">
            <div className="login-brand-icon" style={{ background: 'transparent', boxShadow: 'none' }}>
              <Store size={36} color="#3b82f6" />
            </div>
            <div className="login-brand-text">
              <h2>Store Rating</h2>
              <p>Platform</p>
            </div>
          </div>

          <p className="login-left-desc">
            Join our community! Rate stores, share your experience and help others discover the best!
          </p>



          <div className="login-illustration-container">
            <img src="/login_illustration.png" alt="Store rating illustration" />
          </div>
        </div>

        {}
        <div className="login-right-panel" style={{ flex: 1, overflowY: 'auto', maxHeight: '85vh' }}>
          <h1>Create Account</h1>
          <div className="divider-line"></div>
          <p className="subtitle">Fill in your details to get started</p>

          {error && <div className="login-error-alert">{error}</div>}

          <form onSubmit={handleSubmit}>
            {}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="login-form-group">
                <label htmlFor="name">Full Name</label>
                <div className="login-input-wrapper">
                  <span className="input-icon"><User size={18} color="#64748b" /></span>
                  <input
                    id="name" name="name" type="text"
                    placeholder="Your full name"
                    value={form.name} onChange={handleChange} required
                    style={errors.name ? { borderColor: '#ef4444' } : {}}
                  />
                </div>
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="login-form-group">
                <label htmlFor="email">Email</label>
                <div className="login-input-wrapper">
                  <span className="input-icon"><Mail size={18} color="#64748b" /></span>
                  <input
                    id="email" name="email" type="email"
                    placeholder="you@example.com"
                    value={form.email} onChange={handleChange} required
                    style={errors.email ? { borderColor: '#ef4444' } : {}}
                  />
                </div>
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrapper">
                <span className="input-icon"><Lock size={18} color="#64748b" /></span>
                <input
                  id="password" name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 8 chars, 1 uppercase, 1 special"
                  value={form.password} onChange={handleChange} required
                  style={errors.password ? { borderColor: '#ef4444' } : {}}
                />
                <button type="button" className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <div className="login-form-group">
              <label htmlFor="address">Address</label>
              <div className="login-input-wrapper">
                <span className="input-icon"><MapPin size={18} color="#64748b" /></span>
                <input
                  id="address" name="address" type="text"
                  placeholder="Enter your address"
                  value={form.address} onChange={handleChange}
                  style={errors.address ? { borderColor: '#ef4444' } : {}}
                />
              </div>
              {errors.address && <span className="form-error">{errors.address}</span>}
            </div>

            <div className="login-form-group">
              <label htmlFor="role">Register As</label>
              <div className="login-input-wrapper">
                <span className="input-icon"><Users size={18} color="#64748b" /></span>
                <select
                  id="role" name="role"
                  value={form.role} onChange={handleChange}
                  style={{
                    width: '100%', padding: '0.875rem 1rem 0.875rem 3rem',
                    border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem',
                    color: '#0f172a', background: '#ffffff', appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center'
                  }}
                >
                  <option value="USER">Normal User</option>
                  <option value="STORE_OWNER">Store Owner</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              <UserPlus size={18} style={{ marginRight: '8px' }} /> {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem' }} className="login-register-prompt">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
