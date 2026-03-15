import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import Input from '../components/ui/Input'
import { useToast } from '../components/ui'

const Cart = () => {
  const { showSuccess, showError } = useToast()
  const [cart, setCart] = useState([
    {
      id: '1',
      name: 'Doro Wat',
      restaurant: 'Ethiopian Delights',
      price: 18.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100'
    },
    {
      id: '2',
      name: 'Vegetarian Combo',
      restaurant: 'Ethiopian Delights',
      price: 14.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100'
    }
  ])

  const [deliveryAddress, setDeliveryAddress] = useState('123 Main Street, Addis Ababa')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 2.99
  const tax = subtotal * 0.1
  const total = subtotal + deliveryFee + tax

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ))
    showSuccess(delta > 0 ? 'Item quantity increased' : 'Item quantity decreased')
  }

  const removeItem = (id: string) => {
    const item = cart.find(i => i.id === id)
    setCart(cart.filter(item => item.id !== id))
    showSuccess(`${item?.name} removed from cart`)
  }

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim()) {
      showError('Please enter a delivery address')
      return
    }
    
    setIsPlacingOrder(true)
    // Simulate API call
    setTimeout(() => {
      showSuccess('Order placed successfully!')
      setIsPlacingOrder(false)
    }, 1500)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
        <div className="mx-auto max-w-4xl px-4 md:px-6 py-12">
          <EmptyState
            icon={
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            title="Your cart is empty"
            description="Add some delicious items to get started!"
            action={
              <Link to="/restaurants">
                <Button>Browse Restaurants</Button>
              </Link>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} hover className="p-5">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-slate-600">{item.restaurant}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 flex-shrink-0 ml-2"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-9 h-9 rounded-lg border-2 border-yellow-300 flex items-center justify-center hover:bg-yellow-50 hover:border-yellow-400 transition-all active:scale-95 font-semibold text-yellow-600"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-lg text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-9 h-9 rounded-lg border-2 border-yellow-300 flex items-center justify-center hover:bg-yellow-50 hover:border-yellow-400 transition-all active:scale-95 font-semibold text-yellow-600"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xl font-bold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
              
              {/* Delivery Address */}
              <div className="mb-6">
                <Input
                  label="Delivery Address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter delivery address"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />
                <button className="mt-2 text-sm text-yellow-600 hover:text-yellow-700 font-medium transition-colors flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Use current location
                </button>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-yellow-400 bg-yellow-50 shadow-sm'
                      : 'border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 w-4 h-4 text-yellow-600 focus:ring-yellow-500"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium text-slate-900">Cash on Delivery</span>
                    </div>
                  </label>
                  <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-yellow-400 bg-yellow-50 shadow-sm'
                      : 'border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 w-4 h-4 text-yellow-600 focus:ring-yellow-500"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-medium text-slate-900">Credit/Debit Card</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-yellow-200">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePlaceOrder}
                isLoading={isPlacingOrder}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
              >
                Place Order
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
