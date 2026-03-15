import { useEffect, useState } from 'react';
import api from '../../services/api';

interface Analytics {
  totalOrders: number;
  activeRiders: number;
  totalRestaurants: number;
  totalUsers: number;
  totalRevenue: number;
  todayRevenue: number;
  recentOrders: any[];
}

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!analytics) {
    return <div className="text-center py-8">No data available</div>;
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{analytics.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Active Riders</h3>
          <p className="text-3xl font-bold mt-2">{analytics.activeRiders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Restaurants</h3>
          <p className="text-3xl font-bold mt-2">{analytics.totalRestaurants}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{analytics.totalUsers}</p>
        </div>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">₦{analytics.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Today Revenue</h3>
          <p className="text-3xl font-bold mt-2">₦{analytics.todayRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="p-6">
          {analytics.recentOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No recent orders</div>
          ) : (
            <div className="space-y-4">
              {analytics.recentOrders.map((order: any) => (
                <div key={order._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {order.user?.fullName || 'Unknown User'}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.vendor?.businessName || 'Unknown Vendor'} • ₦
                        {order.totalAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
