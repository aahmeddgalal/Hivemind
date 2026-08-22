import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

const AdminRoute = () => {
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
};

export default AdminRoute;
