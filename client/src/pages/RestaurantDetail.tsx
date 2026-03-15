import { useState } from 'react'
import { useParams } from 'react-router-dom'
import MenuItemCard from '../components/cards/MenuItemCard'
import Tabs from '../components/ui/Tabs'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Drawer from '../components/ui/Drawer'

const RestaurantDetail = () => {
  const { id } = useParams()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<any[]>([])

  // Mock data - replace with API call
  const restaurant = {
    id: id || '1',
    name: 'Ethiopian Delights',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    rating: 4.8,
    deliveryTime: '25-35 min',
    priceRange: '$$',
    distance: '0.8 mi',
    cuisine: 'Ethiopian',
    description: 'Authentic Ethiopian cuisine with traditional flavors and spices. Family-owned restaurant serving the community for over 20 years.',
    address: '123 Main Street, Addis Ababa',
    phone: '+251 911 123 456',
    hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
    isOpen: true
  }

  const menuCategories = [
    {
      id: 'appetizers',
      label: 'Appetizers',
      items: [
        {
          id: '1',
          name: 'Sambusa',
          description: 'Crispy pastry filled with spiced lentils or meat',
          price: 4.99,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300',
          badge: 'Popular'
        },
        {
          id: '2',
          name: 'Kik Alicha',
          description: 'Mild yellow split peas cooked with turmeric',
          price: 5.99,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300'
        }
      ]
    },
    {
      id: 'mains',
      label: 'Main Dishes',
      items: [
        {
          id: '3',
          name: 'Doro Wat',
          description: 'Spicy chicken stew with berbere sauce and hard-boiled eggs',
          price: 18.99,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300',
          badge: 'Chef Special'
        },
        {
          id: '4',
          name: 'Tibs',
          description: 'Sautéed beef or lamb with vegetables and spices',
          price: 16.99,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300'
        },
        {
          id: '5',
          name: 'Vegetarian Combo',
          description: 'Assortment of 5 vegetarian dishes served with injera',
          price: 14.99,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300',
          badge: 'Best Value'
        }
      ]
    },
    {
      id: 'desserts',
      label: 'Desserts',
      items: [
        {
          id: '6',
          name: 'Baklava',
          description: 'Sweet pastry with honey and nuts',
          price: 6.99,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300'
        }
      ]
    }
  ]

  const handleAddToCart = (itemId: string) => {
    const item = menuCategories
      .flatMap(cat => cat.items)
      .find(i => i.id === itemId)
    
    if (item) {
      setCart([...cart, { ...item, quantity: 1 }])
      setIsCartOpen(true)
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{restaurant.deliveryTime}</span>
                  <span>•</span>
                  <span>{restaurant.priceRange}</span>
                  <span>•</span>
                  <span>{restaurant.distance}</span>
                </div>
              </div>
              {!restaurant.isOpen && (
                <Badge variant="error">Closed</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        {/* Restaurant Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-8">
          <p className="text-slate-700 mb-4">{restaurant.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold text-slate-900">Address:</span>
              <p className="text-slate-600">{restaurant.address}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-900">Phone:</span>
              <p className="text-slate-600">{restaurant.phone}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-900">Hours:</span>
              <p className="text-slate-600">{restaurant.hours}</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Menu</h2>
          <Tabs
            tabs={menuCategories.map(category => ({
              id: category.id,
              label: category.label,
              content: (
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      {...item}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )
            }))}
          />
        </div>
      </div>

      {/* Sticky Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-80 z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-6 py-4 font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-between"
          >
            <span>View Cart ({cart.length})</span>
            <span>${total.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      <Drawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        position="right"
        title="Your Cart"
      >
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full border border-orange-300 flex items-center justify-center hover:bg-orange-50">
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button className="w-8 h-8 rounded-full border border-orange-300 flex items-center justify-center hover:bg-orange-50">
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="border-t border-orange-100 pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-slate-900">Total:</span>
                <span className="text-xl font-bold text-slate-900">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}

export default RestaurantDetail
