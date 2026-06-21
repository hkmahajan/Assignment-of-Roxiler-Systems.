import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import './Login.css'; 
import { Store, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.user, res.data.token);
      const role = res.data.user.role;
      if (role === 'ADMIN') navigate('/admin/dashboard');
      else if (role === 'STORE_OWNER') navigate('/owner/dashboard3');
      else navigate('/user/stores');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-split-page">
      <div className="login-split-card">
        
        {}
        <div className="login-left-panel">
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
            Rate stores, share your experience and help others discover the best!
          </p>



          <div className="login-illustration-container">
            {}
            <img src="/login_illustration.png" alt="Store rating illustration" />
          </div>
        </div>

        {}
        <div className="login-right-panel">
          <h1>Welcome Back</h1>
          <div className="divider-line"></div>
          <p className="subtitle">Sign in to your account to continue</p>

          {error && <div className="login-error-alert">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <div className="login-input-wrapper">
                <span className="input-icon"><Mail size={18} color="#64748b" /></span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrapper">
                <span className="input-icon"><Lock size={18} color="#64748b" /></span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password" 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              <LogIn size={18} style={{ marginRight: '8px' }} /> {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button type="button" className="btn-google">
            <svg width="20" height="20" viewBox="0 0 48 48" style={{ marginRight: '8px' }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Login with Google
          </button>

          <div className="login-register-prompt">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
          
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '1rem', width: '100%', textAlign: 'center' }}>
        <p className="login-footer-text">© 2025 Store Rating Platform. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
