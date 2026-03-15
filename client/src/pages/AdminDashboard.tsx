import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Tabs from '../components/ui/Tabs'
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '../components/ui/Table'
import Button from '../components/ui/Button'

const AdminDashboard = () => {
  const stats = {
    totalUsers: 12450,
    totalDrivers: 245,
    totalVendors: 89,
    totalOrders: 45678,
    todayRevenue: 45230.50,
    activeOrders: 156
  }

  const recentUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'driver', status: 'active' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'vendor', status: 'pending' }
  ]

  const recentOrders = [
    { id: '1', orderId: 'ORD-12345', customer: 'John Doe', restaurant: 'Ethiopian Delights', total: 52.97, status: 'delivered' },
    { id: '2', orderId: 'ORD-12346', customer: 'Jane Smith', restaurant: 'Pizza Paradise', total: 28.96, status: 'on_the_way' },
    { id: '3', orderId: 'ORD-12347', customer: 'Mike Johnson', restaurant: 'Burger House', total: 18.99, status: 'preparing' }
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      active: { variant: 'success' as const },
      pending: { variant: 'warning' as const },
      inactive: { variant: 'error' as const },
      delivered: { variant: 'success' as const },
      on_the_way: { variant: 'info' as const },
      preparing: { variant: 'warning' as const }
    }
    const config = variants[status] || { variant: 'default' as const }
    return <Badge variant={config.variant}>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Platform overview and management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Total Users</span>
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalUsers.toLocaleString()}</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Total Drivers</span>
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalDrivers}</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Total Vendors</span>
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalVendors}</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Total Orders</span>
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalOrders.toLocaleString()}</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Today's Revenue</span>
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">${(stats.todayRevenue / 1000).toFixed(1)}k</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Active Orders</span>
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.activeOrders}</p>
          </Card>
        </div>

        {/* Heat Map Placeholder */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Delivery Heat Map</h2>
          <div className="h-64 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-orange-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-slate-600 font-medium">Real-time delivery heat map</p>
              <p className="text-sm text-slate-500 mt-2">Map integration placeholder</p>
            </div>
          </div>
        </Card>

        {/* Management Tables */}
        <Tabs
          tabs={[
            {
              id: 'users',
              label: 'Users',
              content: (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
                    <Button size="sm" variant="outline">
                      Export
                    </Button>
                  </div>
                  <Table>
                    <TableHeader sticky>
                      <TableRow hover={false}>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="default">{user.role}</Badge>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(user.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" variant="ghost" className="text-yellow-600 hover:text-yellow-700">
                                View
                              </Button>
                              <Button size="sm" variant="ghost" className="text-slate-600 hover:text-slate-700">
                                Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-yellow-200">
                    <p className="text-sm text-slate-600">Showing 1-3 of 12,450 users</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" disabled>Previous</Button>
                      <Button size="sm" variant="primary">1</Button>
                      <Button size="sm" variant="outline">2</Button>
                      <Button size="sm" variant="outline">3</Button>
                      <Button size="sm" variant="outline">Next</Button>
                    </div>
                  </div>
                </Card>
              )
            },
            {
              id: 'orders',
              label: 'Orders',
              content: (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Order Management</h2>
                    <Button size="sm" variant="outline">
                      Export
                    </Button>
                  </div>
                  <Table>
                    <TableHeader sticky>
                      <TableRow hover={false}>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-semibold">{order.orderId}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.restaurant}</TableCell>
                          <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            {getStatusBadge(order.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" variant="ghost" className="text-yellow-600 hover:text-yellow-700">
                                View
                              </Button>
                              <Button size="sm" variant="ghost" className="text-slate-600 hover:text-slate-700">
                                Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-yellow-200">
                    <p className="text-sm text-slate-600">Showing 1-3 of 45,678 orders</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" disabled>Previous</Button>
                      <Button size="sm" variant="primary">1</Button>
                      <Button size="sm" variant="outline">2</Button>
                      <Button size="sm" variant="outline">3</Button>
                      <Button size="sm" variant="outline">Next</Button>
                    </div>
                  </div>
                </Card>
              )
            }
          ]}
        />
      </div>
    </div>
  )
}

export default AdminDashboard
