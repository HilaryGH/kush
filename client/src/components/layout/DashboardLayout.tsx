import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'user' | 'vendor' | 'rider' | 'admin';
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const getNavItems = () => {
    switch (role) {
      case 'user':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
          { path: '/dashboard/restaurants', label: 'Restaurants', icon: '🍽️' },
          { path: '/dashboard/cart', label: 'Cart', icon: '🛒' },
          { path: '/dashboard/orders', label: 'Orders', icon: '📦' },
          { path: '/dashboard/referral', label: 'Referral', icon: '🎁' },
          { path: '/dashboard/profile', label: 'Profile', icon: '👤' },
          { path: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
        ];
      case 'vendor':
        return [
          { path: '/vendor/dashboard', label: 'Dashboard', icon: '🏠' },
          { path: '/vendor/orders', label: 'Orders', icon: '📦' },
          { path: '/vendor/menu', label: 'Menu', icon: '🍽️' },
          { path: '/vendor/reports', label: 'Reports', icon: '📊' },
          { path: '/vendor/discounts', label: 'Discounts', icon: '🎫' },
          { path: '/vendor/settings', label: 'Settings', icon: '⚙️' },
        ];
      case 'rider':
        return [
          { path: '/rider/dashboard', label: 'Dashboard', icon: '🏠' },
          { path: '/rider/available-orders', label: 'Available Orders', icon: '📋' },
          { path: '/rider/active-deliveries', label: 'Active Deliveries', icon: '🚚' },
          { path: '/rider/earnings', label: 'Earnings', icon: '💰' },
          { path: '/rider/history', label: 'History', icon: '📜' },
          { path: '/rider/profile', label: 'Profile', icon: '👤' },
        ];
      case 'admin':
        return [
          { path: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
          { path: '/admin/users', label: 'Users', icon: '👥' },
          { path: '/admin/riders', label: 'Riders', icon: '🚚' },
          { path: '/admin/restaurants', label: 'Restaurants', icon: '🍽️' },
          { path: '/admin/orders', label: 'Orders', icon: '📦' },
          { path: '/admin/promotions', label: 'Promotions', icon: '🎫' },
          { path: '/admin/analytics', label: 'Analytics', icon: '📊' },
          { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h1 className={`font-bold text-xl ${sidebarOpen ? 'block' : 'hidden'}`}>
              {role === 'user' ? 'Customer' : role === 'vendor' ? 'Vendor' : role === 'rider' ? 'Rider' : 'Admin'}
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600"
          >
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {navItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.fullName}</span>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
