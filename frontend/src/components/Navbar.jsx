import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/stores', label: 'Stores' },
  ];

  const userLinks = [{ to: '/user/stores', label: 'Browse Stores' }];

  const ownerLinks = [
    { to: '/owner/dashboard3', label: 'Dashboard' },
    { to: '/owner/ratings', label: 'Ratings' },
  ];

  const links =
    user.role === 'ADMIN' ? adminLinks :
    user.role === 'STORE_OWNER' ? ownerLinks : userLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-icon">⭐</div>
          StoreRate
        </Link>

        <div className="navbar-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/change-password"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
          >
            Settings
          </NavLink>
        </div>

        <div className="navbar-actions">
          <div className="navbar-user">
            <div className="navbar-avatar">{initials}</div>
            <span>{user.name?.split(' ')[0]}</span>
          </div>
          <button className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
