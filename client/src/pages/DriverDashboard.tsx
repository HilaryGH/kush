import { useState } from 'react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(true)
  
  const todayStats = {
    deliveries: 12,
    earnings: 245.50,
    rating: 4.8,
    totalDistance: 45.2
  }

  const deliveries = [
    {
      id: '1',
      orderId: 'ORD-12345',
      restaurant: 'Ethiopian Delights',
      customer: 'John Doe',
      address: '123 Main St',
      distance: '2.3 km',
      status: 'pending',
      earnings: 12.50
    },
    {
      id: '2',
      orderId: 'ORD-12346',
      restaurant: 'Pizza Paradise',
      customer: 'Jane Smith',
      address: '456 Oak Ave',
      distance: '1.8 km',
      status: 'accepted',
      earnings: 10.00
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Driver Dashboard</h1>
            <p className="text-slate-600">Welcome back, John!</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className={`px-4 py-2 rounded-full font-semibold ${
              isOnline ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
            }`}>
              {isOnline ? '🟢 Online' : '⚫ Offline'}
            </span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                isOnline 
                  ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
              }`}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Today's Deliveries</span>
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{todayStats.deliveries}</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Today's Earnings</span>
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">${todayStats.earnings.toFixed(2)}</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Rating</span>
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{todayStats.rating}</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Distance Traveled</span>
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{todayStats.totalDistance} km</p>
          </Card>
        </div>

        {/* Delivery Requests */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">New Delivery Requests</h2>
            <Badge variant="info">{deliveries.length} pending</Badge>
          </div>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="p-4 bg-slate-50 rounded-xl border border-orange-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-slate-900">{delivery.orderId}</h3>
                      <Badge variant={delivery.status === 'pending' ? 'warning' : 'success'}>
                        {delivery.status === 'pending' ? 'New' : 'Accepted'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                      <div>
                        <span className="font-semibold">Restaurant:</span> {delivery.restaurant}
                      </div>
                      <div>
                        <span className="font-semibold">Customer:</span> {delivery.customer}
                      </div>
                      <div>
                        <span className="font-semibold">Address:</span> {delivery.address}
                      </div>
                      <div>
                        <span className="font-semibold">Distance:</span> {delivery.distance}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-xl font-bold text-green-600">${delivery.earnings.toFixed(2)}</p>
                    <div className="flex gap-2">
                      {delivery.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline">Reject</Button>
                          <Button size="sm">Accept</Button>
                        </>
                      )}
                      {delivery.status === 'accepted' && (
                        <Button size="sm">Navigate</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Earnings Summary */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Earnings Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600">This Week</span>
              <span className="text-xl font-bold text-slate-900">$1,245.50</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600">This Month</span>
              <span className="text-xl font-bold text-slate-900">$4,890.25</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
              <span>Total Earnings</span>
              <span className="text-xl font-bold">$12,450.75</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DriverDashboard
