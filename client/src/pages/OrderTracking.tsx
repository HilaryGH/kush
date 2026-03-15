import { useState } from 'react'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'

const OrderTracking = () => {
  const [order] = useState({
    id: 'ORD-12345',
    status: 'on_the_way',
    restaurant: 'Ethiopian Delights',
    items: [
      { name: 'Doro Wat', quantity: 2 },
      { name: 'Vegetarian Combo', quantity: 1 }
    ],
    total: 52.97,
    estimatedDelivery: '25 min',
    driver: {
      name: 'John Doe',
      phone: '+251 911 123 456',
      rating: 4.8,
      vehicle: 'Toyota Corolla'
    }
  })

  const statusSteps = [
    { id: 'received', label: 'Order Received', completed: true },
    { id: 'preparing', label: 'Preparing', completed: true },
    { id: 'driver_assigned', label: 'Driver Assigned', completed: true },
    { id: 'on_the_way', label: 'On the Way', completed: order.status === 'on_the_way' || order.status === 'delivered', active: order.status === 'on_the_way' },
    { id: 'delivered', label: 'Delivered', completed: order.status === 'delivered' }
  ]

  const getStatusBadge = () => {
    switch (order.status) {
      case 'received':
        return <Badge variant="info">Received</Badge>
      case 'preparing':
        return <Badge variant="info">Preparing</Badge>
      case 'driver_assigned':
        return <Badge variant="info">Driver Assigned</Badge>
      case 'on_the_way':
        return <Badge variant="warning">On the Way</Badge>
      case 'delivered':
        return <Badge variant="success">Delivered</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Track Your Order</h1>
            <p className="text-slate-600">Order #{order.id}</p>
          </div>
          {getStatusBadge()}
        </div>

        {/* Map Placeholder */}
        <Card className="p-0 mb-8 overflow-hidden">
          <div className="h-64 md:h-96 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center relative">
            <div className="text-center z-10">
              <svg className="w-16 h-16 text-orange-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-slate-600 font-medium">Map integration placeholder</p>
              <p className="text-sm text-slate-500 mt-2">Google Maps API will show live driver location</p>
            </div>
            {/* Driver marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 bg-orange-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Status Timeline */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Order Status</h2>
          <div className="space-y-6">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : step.active 
                        ? 'bg-orange-500 text-white animate-pulse' 
                        : 'bg-slate-200 text-slate-400'
                  }`}>
                    {step.completed ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div className={`w-0.5 h-12 ${
                      step.completed ? 'bg-green-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className={`font-semibold ${
                    step.completed || step.active ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {step.label}
                  </h3>
                  {step.active && (
                    <p className="text-sm text-slate-600 mt-1">
                      Estimated delivery in {order.estimatedDelivery}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Order Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">Restaurant</p>
                <p className="font-semibold text-slate-900">{order.restaurant}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Items</p>
                <ul className="mt-1 space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-slate-900">
                      {item.quantity}x {item.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-slate-600">Total</p>
                <p className="text-xl font-bold text-slate-900">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Driver Info</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">Name</p>
                <p className="font-semibold text-slate-900">{order.driver.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Phone</p>
                <a href={`tel:${order.driver.phone}`} className="text-orange-600 hover:text-orange-700 font-medium">
                  {order.driver.phone}
                </a>
              </div>
              <div>
                <p className="text-sm text-slate-600">Rating</p>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <span className="font-semibold text-slate-900">{order.driver.rating}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600">Vehicle</p>
                <p className="font-semibold text-slate-900">{order.driver.vehicle}</p>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Call Driver
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking
