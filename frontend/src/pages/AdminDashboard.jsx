import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Skeleton from '../components/Skeleton';
import { Users, Store, Star, PlusCircle, List } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/users'),
      api.get('/stores'),
    ])
      .then(([usersRes, storesRes]) => {
        const users = usersRes.data.users || [];
        const stores = storesRes.data.stores || [];
        const totalRatings = stores.reduce((sum, s) => sum + (s.ratings?.length || 0), 0);
        setStats({ users: users.length, stores: stores.length, ratings: totalRatings });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const chartData = [
    { name: 'Users', value: stats.users, fill: '#0062ff' },
    { name: 'Stores', value: stats.stores, fill: '#10b981' },
    { name: 'Ratings', value: stats.ratings, fill: '#f59e0b' },
  ];

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div style={{ marginBottom: '2rem' }}>
            <Skeleton style={{ height: '40px', width: '250px', marginBottom: '8px' }} />
            <Skeleton style={{ height: '20px', width: '200px' }} />
          </div>
          <div className="stats-grid">
            <Skeleton style={{ height: '150px', width: '100%', borderRadius: '12px' }} />
            <Skeleton style={{ height: '150px', width: '100%', borderRadius: '12px' }} />
            <Skeleton style={{ height: '150px', width: '100%', borderRadius: '12px' }} />
          </div>
          <Skeleton style={{ height: '350px', width: '100%', borderRadius: '16px' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div style={{ marginBottom: '2rem' }}>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Overview of the entire platform</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#eff6ff', color: '#0062ff' }}>
              <Users size={24} />
            </div>
            <div className="stat-value">{stats.users}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
              <Store size={24} />
            </div>
            <div className="stat-value">{stats.stores}</div>
            <div className="stat-label">Total Stores</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
              <Star size={24} />
            </div>
            <div className="stat-value">{stats.ratings}</div>
            <div className="stat-label">Total Ratings</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* Chart Section */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Platform Metrics</h2>
            </div>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }} 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.06)' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>Quick Actions</h2>
            
            <Link to="/admin/users/add" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid transparent', transition: 'all 0.2s', textDecoration: 'none', color: 'inherit' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ padding: '0.5rem', background: '#eff6ff', color: '#0062ff', borderRadius: '8px' }}>
                <PlusCircle size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Add User</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Create a new platform user</div>
              </div>
            </Link>

            <Link to="/admin/stores/add" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid transparent', transition: 'all 0.2s', textDecoration: 'none', color: 'inherit' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ padding: '0.5rem', background: '#d1fae5', color: '#10b981', borderRadius: '8px' }}>
                <Store size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Add Store</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Register a new store owner</div>
              </div>
            </Link>

            <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid transparent', transition: 'all 0.2s', textDecoration: 'none', color: 'inherit' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ padding: '0.5rem', background: '#f1f5f9', color: '#64748b', borderRadius: '8px' }}>
                <List size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>View All Data</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Manage all existing records</div>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
