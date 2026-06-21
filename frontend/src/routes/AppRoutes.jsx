import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import useAuth from '../hooks/useAuth';


import Login from '../pages/Login';
import Register from '../pages/Register';
import ChangePassword from '../pages/ChangePassword';


import AdminDashboard from '../pages/AdminDashboard';
import AdminUsersList from '../pages/AdminUsersList';
import AdminStoresList from '../pages/AdminStoresList';
import AdminAddUser from '../pages/AdminAddUser';
import AdminAddStore from '../pages/AdminAddStore';


import UserStoreListing from '../pages/UserStoreListing';
import UserRateStore from '../pages/UserRateStore';
import UserEditRating from '../pages/UserEditRating';


import StoreOwnerDashboard from '../pages/StoreOwnerDashboard';
import StoreOwnerRatings from '../pages/StoreOwnerRatings';

const RootRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'STORE_OWNER') return <Navigate to="/owner/dashboard3" replace />;
  return <Navigate to="/user/stores" replace />;
};

const AppRoutes = () => (
  <Routes>
    {}
    <Route path="/" element={<RootRedirect />} />

    {}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {}
    <Route
      path="/change-password"
      element={
        <ProtectedRoute>
          <ChangePassword />
        </ProtectedRoute>
      }
    />

    {}
    <Route path="/admin/dashboard" element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/users" element={<ProtectedRoute roles={['ADMIN']}><AdminUsersList /></ProtectedRoute>} />
    <Route path="/admin/users/add" element={<ProtectedRoute roles={['ADMIN']}><AdminAddUser /></ProtectedRoute>} />
    <Route path="/admin/stores" element={<ProtectedRoute roles={['ADMIN']}><AdminStoresList /></ProtectedRoute>} />
    <Route path="/admin/stores/add" element={<ProtectedRoute roles={['ADMIN']}><AdminAddStore /></ProtectedRoute>} />

    {}
    <Route path="/user/stores" element={<ProtectedRoute roles={['USER']}><UserStoreListing /></ProtectedRoute>} />
    <Route path="/user/stores/:storeId/rate" element={<ProtectedRoute roles={['USER']}><UserRateStore /></ProtectedRoute>} />
    <Route path="/user/stores/:storeId/edit-rating" element={<ProtectedRoute roles={['USER']}><UserEditRating /></ProtectedRoute>} />

    {}
    <Route path="/owner/dashboard3" element={<ProtectedRoute roles={['STORE_OWNER']}><StoreOwnerDashboard /></ProtectedRoute>} />
    <Route path="/owner/ratings" element={<ProtectedRoute roles={['STORE_OWNER']}><StoreOwnerRatings /></ProtectedRoute>} />

    {}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
