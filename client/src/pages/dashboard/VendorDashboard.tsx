import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSocket } from '../../context/SocketContext';

interface Order {
  _id: string;
  status: string;
  totalAmount: number;
  user: { fullName: string; phone: string };
  items: Array<{ menuItem: { name: string }; quantity: number }>;
  createdAt: string;
}

const VendorDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('new_order', (data: { order: Order }) => {
        setOrders((prev) => [data.order, ...prev]);
        setStats((prev) => ({
          ...prev,
          totalOrders: prev.totalOrders + 1,
          pendingOrders: prev.pendingOrders + 1,
        }));
      });

      return () => {
        socket.off('new_order');
      };
    }
  }, [socket]);

  const fetchData = async () => {
    try {
      // Get vendor ID first
      const vendorResponse = await api.get('/vendors');
      const vendors = vendorResponse.data.vendors;
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      const vendor = vendors.find((v: any) => v.email === user?.email);

      if (vendor) {
        const ordersResponse = await api.get(`/vendors/${vendor._id}/orders`);
        const ordersData = ordersResponse.data.orders;
        setOrders(ordersData);

        const today = new Date();
        const todayOrders = ordersData.filter(
          (o: Order) => new Date(o.createdAt).toDateString() === today.toDateString()
        );

        setStats({
          totalOrders: ordersData.length,
          pendingOrders: ordersData.filter((o: Order) => o.status === 'pending').length,
          todayRevenue: todayOrders.reduce((sum: number, o: Order) => sum + o.totalAmount, 0),
          totalRevenue: ordersData.reduce((sum: number, o: Order) => sum + o.totalAmount, 0),
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status });
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? { ...order, status } : order))
      );
      setStats((prev) => ({
        ...prev,
        pendingOrders:
          status === 'pending' ? prev.pendingOrders + 1 : prev.pendingOrders - 1,
      }));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Pending Orders</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-600">{stats.pendingOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Today Revenue</h3>
          <p className="text-3xl font-bold mt-2">₦{stats.todayRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">₦{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="p-6">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No orders yet</div>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 10).map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{order.user.fullName}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.items.length} item(s) • ₦{order.totalAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'accepted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                      {order.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateOrderStatus(order._id, 'accepted')}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order._id, 'cancelled')}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {order.status === 'accepted' && (
                        <button
                          onClick={() => updateOrderStatus(order._id, 'preparing')}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                        >
                          Start Preparing
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order._id, 'ready_for_pickup')}
                          className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                        >
                          Ready for Pickup
                        </button>
                      )}
                    </div>
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

export default VendorDashboard;
