import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSocket } from '../../context/SocketContext';

interface Order {
  _id: string;
  status: string;
  totalAmount: number;
  deliveryFee: number;
  user: { fullName: string; phone: string };
  vendor: { businessName: string; location: { lat: number; lng: number } };
  deliveryAddress: { location: { lat: number; lng: number }; address: string };
  createdAt: string;
}

const RiderDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [activeDeliveries, setActiveDeliveries] = useState<Order[]>([]);
  const [earnings, setEarnings] = useState({
    today: 0,
    total: 0,
    completedDeliveries: 0,
  });
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (socket && isOnline) {
      socket.on('order_assigned', (data: { order: Order }) => {
        setActiveDeliveries((prev) => [data.order, ...prev]);
        setAvailableOrders((prev) => prev.filter((o) => o._id !== data.order._id));
      });

      return () => {
        socket.off('order_assigned');
      };
    }
  }, [socket, isOnline]);

  const fetchData = async () => {
    try {
      const [profileRes, availableRes, activeRes, earningsRes] = await Promise.all([
        api.get('/riders/profile'),
        api.get('/riders/available-orders'),
        api.get('/riders/active-deliveries'),
        api.get('/riders/earnings'),
      ]);

      setIsOnline(profileRes.data.driver.isOnline);
      setAvailableOrders(availableRes.data.orders);
      setActiveDeliveries(activeRes.data.orders);
      setEarnings(earningsRes.data.earnings);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOnlineStatus = async () => {
    try {
      await api.patch('/riders/status', { isOnline: !isOnline });
      setIsOnline(!isOnline);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const acceptOrder = async (orderId: string) => {
    try {
      await api.post(`/riders/accept-delivery/${orderId}`);
      await fetchData();
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status });
      await fetchData();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Online Toggle */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Rider Status</h3>
          <p className="text-sm text-gray-500 mt-1">
            {isOnline ? 'You are online and receiving orders' : 'You are offline'}
          </p>
        </div>
        <button
          onClick={toggleOnlineStatus}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isOnline
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isOnline ? 'Go Offline' : 'Go Online'}
        </button>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Today Earnings</h3>
          <p className="text-3xl font-bold mt-2">₦{earnings.today.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Earnings</h3>
          <p className="text-3xl font-bold mt-2">₦{earnings.total.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Completed Deliveries</h3>
          <p className="text-3xl font-bold mt-2">{earnings.completedDeliveries}</p>
        </div>
      </div>

      {/* Available Orders */}
      {isOnline && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Available Orders</h2>
          </div>
          <div className="p-6">
            {availableOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No available orders</div>
            ) : (
              <div className="space-y-4">
                {availableOrders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{order.vendor.businessName}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          To: {order.user.fullName} • ₦{order.deliveryFee.toLocaleString()} fee
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => acceptOrder(order._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Deliveries */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Active Deliveries</h2>
        </div>
        <div className="p-6">
          {activeDeliveries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No active deliveries</div>
          ) : (
            <div className="space-y-4">
              {activeDeliveries.map((order) => (
                <div key={order._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{order.vendor.businessName}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        To: {order.user.fullName} • {order.deliveryAddress.address}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'assigned_to_driver'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                      {order.status === 'assigned_to_driver' && (
                        <button
                          onClick={() => updateOrderStatus(order._id, 'on_the_way')}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Start Delivery
                        </button>
                      )}
                      {order.status === 'on_the_way' && (
                        <button
                          onClick={() => updateOrderStatus(order._id, 'delivered')}
                          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                          Mark Delivered
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

export default RiderDashboard;
