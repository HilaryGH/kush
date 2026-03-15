import { useState, useEffect } from 'react'
import { useSearchParams, Link, useLocation } from 'react-router-dom'
import RestaurantCard from '../components/cards/RestaurantCard'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import EmptyState from '../components/ui/EmptyState'
import api from '../services/api'

const Restaurants = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const category = searchParams.get('category')
  const [isLoading, setIsLoading] = useState(true)
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [menuItems, setMenuItems] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'restaurants' | 'food'>('all')
  const [filters, setFilters] = useState({
    sort: 'rating',
    minRating: 0,
    maxDeliveryTime: 60,
    priceRange: 'all'
  })

  // Fetch restaurants and menu items when component mounts or route changes
  useEffect(() => {
    fetchRestaurants()
    fetchMenuItems()
  }, [location.pathname]) // Refetch when navigating to this page

  // Fetch restaurants when filter type changes to restaurants or all
  useEffect(() => {
    if (filterType === 'restaurants' || filterType === 'all') {
      fetchRestaurants()
    }
  }, [filterType])

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true)
      console.log('Fetching registered restaurants...')
      
      // Fetch all registered restaurants (both verified and unverified)
      const response = await api.get('/vendors')
      console.log('Restaurants response:', response.data)
      
      if (response.data && response.data.success !== false) {
        const vendorsList = (response.data.vendors || []).map((v: any) => ({
          id: v._id,
          name: v.businessName || 'Restaurant',
          image: v.restaurantPhoto || 'https://via.placeholder.com/400x300?text=Restaurant',
          rating: v.rating || 0,
          deliveryTime: '30-45 min',
          priceRange: '$$',
          isOpen: v.isOpen !== false, // Default to true if not specified
          cuisine: v.businessType || 'Other',
          location: v.primaryLocation?.address || v.city || 'Location not specified',
          vendor: v,
          isVerified: v.isVerified || false,
        }))
        setRestaurants(vendorsList)
        console.log(`Loaded ${vendorsList.length} registered restaurants`)
      } else {
        console.warn('Unexpected response format:', response.data)
        setRestaurants([])
      }
    } catch (error: any) {
      console.error('Error fetching restaurants:', error)
      console.error('Error response:', error.response?.data)
      setRestaurants([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMenuItems = async () => {
    try {
      const response = await api.get('/menu')
      setMenuItems(response.data.menuItems || [])
    } catch (error) {
      console.error('Error fetching menu items:', error)
    }
  }

  // Mock data fallback - remove when API is fully working
  const mockRestaurants = [
    {
      id: '1',
      name: 'Ethiopian Delights',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      rating: 4.8,
      deliveryTime: '25-35 min',
      priceRange: '$$',
      distance: '0.8 mi',
      cuisine: 'Ethiopian',
      isOpen: true
    },
    {
      id: '2',
      name: 'Pizza Paradise',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      rating: 4.6,
      deliveryTime: '20-30 min',
      priceRange: '$$',
      distance: '1.2 mi',
      cuisine: 'Italian',
      isOpen: true
    },
    {
      id: '3',
      name: 'Burger House',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      rating: 4.7,
      deliveryTime: '15-25 min',
      priceRange: '$',
      distance: '0.5 mi',
      cuisine: 'American',
      isOpen: true
    },
    {
      id: '4',
      name: 'Sushi Master',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
      rating: 4.9,
      deliveryTime: '30-40 min',
      priceRange: '$$$',
      distance: '2.1 mi',
      cuisine: 'Japanese',
      isOpen: true
    },
    {
      id: '5',
      name: 'Sweet Dreams Bakery',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
      rating: 4.5,
      deliveryTime: '20-30 min',
      priceRange: '$',
      distance: '1.5 mi',
      cuisine: 'Desserts',
      isOpen: false
    },
    {
      id: '6',
      name: 'Taco Fiesta',
      image: 'https://images.unsplash.com/photo-1565299585323-38174c0c5e3c?w=400',
      rating: 4.4,
      deliveryTime: '18-28 min',
      priceRange: '$$',
      distance: '0.9 mi',
      cuisine: 'Mexican',
      isOpen: true
    }
  ]

  const displayRestaurants = restaurants.length > 0 ? restaurants : mockRestaurants
  
  // Filter and search logic
  const getFilteredResults = () => {
    const query = searchQuery.toLowerCase().trim()
    
    if (filterType === 'restaurants' || filterType === 'all') {
      let filtered = displayRestaurants.filter(restaurant => {
        // Category filter
        if (category && restaurant.cuisine?.toLowerCase() !== category) return false
        // Rating filter
        if (filters.minRating > 0 && restaurant.rating < filters.minRating) return false
        // Search filter
        if (query) {
          const matchesName = restaurant.name?.toLowerCase().includes(query)
          const matchesCuisine = restaurant.cuisine?.toLowerCase().includes(query)
          const matchesLocation = restaurant.location?.toLowerCase().includes(query)
          if (!matchesName && !matchesCuisine && !matchesLocation) return false
        }
        return true
      })
      
      // Sort restaurants
      if (filters.sort === 'rating') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      } else if (filters.sort === 'deliveryTime') {
        filtered.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime?.split('-')[0] || '30')
          const bTime = parseInt(b.deliveryTime?.split('-')[0] || '30')
          return aTime - bTime
        })
      }
      
      if (filterType === 'restaurants') {
        return { restaurants: filtered, menuItems: [] }
      }
      
      // If filterType is 'all', also include menu items (only when searching)
      if (filterType === 'all' && query) {
        const filteredMenuItems = menuItems.filter(item => {
          if (!item.isAvailable) return false
          const matchesName = item.name?.toLowerCase().includes(query)
          const matchesDescription = item.description?.toLowerCase().includes(query)
          const matchesCategory = item.category?.toLowerCase().includes(query)
          return matchesName || matchesDescription || matchesCategory
        })
        return { restaurants: filtered, menuItems: filteredMenuItems }
      }
      
      // If filterType is 'all' but no search query, show only restaurants
      return { restaurants: filtered, menuItems: [] }
    } else if (filterType === 'food') {
      const filteredMenuItems = menuItems.filter(item => {
        if (!item.isAvailable) return false
        if (query) {
          const matchesName = item.name?.toLowerCase().includes(query)
          const matchesDescription = item.description?.toLowerCase().includes(query)
          const matchesCategory = item.category?.toLowerCase().includes(query)
          return matchesName || matchesDescription || matchesCategory
        }
        return true
      })
      return { restaurants: [], menuItems: filteredMenuItems }
    }
    
    return { restaurants: [], menuItems: [] }
  }
  
  const { restaurants: filteredRestaurants, menuItems: filteredMenuItems } = getFilteredResults()

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <div className="bg-white border-b border-orange-100 sticky top-[73px] z-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4">
          {/* Search and Filter Type */}
          <div className="mb-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search restaurants, food items, or cuisines..."
                    className="w-full px-4 py-3 pl-12 rounded-lg border border-orange-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Filter Type Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterType === 'all'
                      ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('restaurants')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterType === 'restaurants'
                      ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Restaurants
                </button>
                <button
                  onClick={() => setFilterType('food')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterType === 'food'
                      ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Food
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Restaurants` : 
               filterType === 'restaurants' ? 'Restaurants' :
               filterType === 'food' ? 'Food Items' :
               'All Results'}
            </h1>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="px-4 py-2 rounded-lg border border-orange-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="deliveryTime">Fastest Delivery</option>
                <option value="distance">Nearest</option>
              </select>
              
              <select
                value={filters.minRating}
                onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                className="px-4 py-2 rounded-lg border border-orange-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="0">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
              
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="px-4 py-2 rounded-lg border border-orange-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Prices</option>
                <option value="$">$ Budget</option>
                <option value="$$">$$ Moderate</option>
                <option value="$$$">$$$ Expensive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <LoadingSkeleton key={i} type="card" />
            ))}
          </div>
        ) : filteredRestaurants.length === 0 && filteredMenuItems.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            title="No results found"
            description="Try adjusting your filters or search criteria"
          />
        ) : (
          <>
            <div className="mb-4 text-sm text-slate-600">
              Found {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
              {filteredMenuItems.length > 0 && ` and ${filteredMenuItems.length} food item${filteredMenuItems.length !== 1 ? 's' : ''}`}
            </div>
            
            {/* Restaurants Grid */}
            {filteredRestaurants.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Restaurants</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <Link key={restaurant.id} to={`/dashboard/restaurant/${restaurant.id}`}>
                      <RestaurantCard {...restaurant} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Menu Items Grid */}
            {filteredMenuItems.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Food Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredMenuItems.map((item) => (
                    <Link 
                      key={item._id} 
                      to={`/dashboard/restaurant/${item.vendor?._id || item.vendor}`}
                      className="block"
                    >
                      <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex gap-4 p-4">
                          {item.imageUrl && (
                            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="text-lg font-bold text-slate-900 line-clamp-2">{item.name}</h3>
                            </div>
                            {item.description && (
                              <p className="text-sm text-slate-600 mb-2 line-clamp-2">{item.description}</p>
                            )}
                            {item.vendor?.businessName && (
                              <p className="text-xs text-slate-500 mb-2">from {item.vendor.businessName}</p>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-slate-900">₦{item.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Restaurants
