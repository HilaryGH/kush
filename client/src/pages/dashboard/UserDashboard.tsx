import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useSocket } from '../../context/SocketContext';

interface Order {
  _id: string;
  status: string;
  totalAmount: number;
  vendor: { businessName: string };
  createdAt: string;
  items: Array<{ menuItem: { name: string }; quantity: number }>;
}

const UserDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('order_status_update', (data: { orderId: string; status: string }) => {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === data.orderId ? { ...order, status: data.status } : order
          )
        );
      });

      return () => {
        socket.off('order_status_update');
      };
    }
  }, [socket]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      preparing: 'bg-orange-100 text-orange-800',
      ready_for_pickup: 'bg-purple-100 text-purple-800',
      on_the_way: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{orders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Active Orders</h3>
          <p className="text-3xl font-bold mt-2">
            {orders.filter((o) => !['delivered', 'cancelled'].includes(o.status)).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Spent</h3>
          <p className="text-3xl font-bold mt-2">
            ₦{orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="p-6">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No orders yet</p>
              <Link
                to="/dashboard/restaurants"
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Browse Restaurants
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{order.vendor.businessName}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.items.length} item(s) • ₦{order.totalAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link
                      to={`/dashboard/order/${order._id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                    {order.status === 'on_the_way' && (
                      <Link
                        to={`/dashboard/order/${order._id}/track`}
                        className="text-sm text-green-600 hover:underline"
                      >
                        Track Order
                      </Link>
                    )}
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

export default UserDashboard;
