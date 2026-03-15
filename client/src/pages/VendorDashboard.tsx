import { useState } from 'react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Tabs from '../components/ui/Tabs'

const VendorDashboard = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  const stats = {
    todayOrders: 45,
    todayRevenue: 1245.50,
    totalMenuItems: 28,
    averageRating: 4.7
  }

  const orders = [
    {
      id: '1',
      orderId: 'ORD-12345',
      customer: 'John Doe',
      items: ['Doro Wat x2', 'Vegetarian Combo x1'],
      total: 52.97,
      status: 'pending',
      time: '2 min ago'
    },
    {
      id: '2',
      orderId: 'ORD-12346',
      customer: 'Jane Smith',
      items: ['Tibs x1', 'Sambusa x3'],
      total: 28.96,
      status: 'preparing',
      time: '5 min ago'
    },
    {
      id: '3',
      orderId: 'ORD-12347',
      customer: 'Mike Johnson',
      items: ['Doro Wat x1'],
      total: 18.99,
      status: 'ready',
      time: '10 min ago'
    }
  ]

  const menuItems = [
    {
      id: '1',
      name: 'Doro Wat',
      category: 'Main Dishes',
      price: 18.99,
      available: true,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100'
    },
    {
      id: '2',
      name: 'Tibs',
      category: 'Main Dishes',
      price: 16.99,
      available: true,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100'
    },
    {
      id: '3',
      name: 'Sambusa',
      category: 'Appetizers',
      price: 4.99,
      available: false,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100'
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: 'warning' as const, label: 'Pending' },
      preparing: { variant: 'info' as const, label: 'Preparing' },
      ready: { variant: 'success' as const, label: 'Ready' },
      completed: { variant: 'default' as const, label: 'Completed' }
    }
    const config = variants[status] || variants.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Vendor Dashboard</h1>
            <p className="text-slate-600">Ethiopian Delights Restaurant</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className={`px-4 py-2 rounded-full font-semibold ${
              isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {isOpen ? '🟢 Open' : '🔴 Closed'}
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                isOpen 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isOpen ? 'Close Restaurant' : 'Open Restaurant'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Today's Orders</span>
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.todayOrders}</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Today's Revenue</span>
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">${stats.todayRevenue.toFixed(2)}</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Menu Items</span>
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalMenuItems}</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Average Rating</span>
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.averageRating}</p>
          </Card>
        </div>

        {/* Orders and Menu Management */}
        <Tabs
          tabs={[
            {
              id: 'orders',
              label: 'Orders',
              content: (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Recent Orders</h2>
                    <Badge variant="info">{orders.length} active</Badge>
                  </div>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 bg-slate-50 rounded-xl border border-orange-100"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-slate-900">{order.orderId}</h3>
                              {getStatusBadge(order.status)}
                              <span className="text-sm text-slate-500">{order.time}</span>
                            </div>
                            <div className="text-sm text-slate-600 mb-1">
                              <span className="font-semibold">Customer:</span> {order.customer}
                            </div>
                            <div className="text-sm text-slate-600">
                              <span className="font-semibold">Items:</span> {order.items.join(', ')}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <p className="text-xl font-bold text-slate-900">${order.total.toFixed(2)}</p>
                            <div className="flex gap-2">
                              {order.status === 'pending' && (
                                <>
                                  <Button size="sm" variant="outline">Reject</Button>
                                  <Button size="sm">Accept</Button>
                                </>
                              )}
                              {order.status === 'preparing' && (
                                <Button size="sm">Mark Ready</Button>
                              )}
                              {order.status === 'ready' && (
                                <Button size="sm" variant="success">Completed</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            },
            {
              id: 'menu',
              label: 'Menu Management',
              content: (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Menu Items</h2>
                    <Button onClick={() => setIsMenuModalOpen(true)}>Add Menu Item</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-slate-50 rounded-xl border border-orange-100"
                      >
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="font-bold text-slate-900">{item.name}</h3>
                              <Badge variant={item.available ? 'success' : 'error'}>
                                {item.available ? 'Available' : 'Unavailable'}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{item.category}</p>
                            <p className="text-lg font-bold text-slate-900 mb-2">${item.price.toFixed(2)}</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="outline">
                                {item.available ? 'Mark Unavailable' : 'Mark Available'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            }
          ]}
        />

        {/* Add Menu Item Modal */}
        <Modal
          isOpen={isMenuModalOpen}
          onClose={() => setIsMenuModalOpen(false)}
          title="Add Menu Item"
          size="lg"
        >
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Item Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter item name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Category</label>
              <select className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Appetizers</option>
                <option>Main Dishes</option>
                <option>Desserts</option>
                <option>Drinks</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter item description"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setIsMenuModalOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1">Add Item</Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default VendorDashboard
