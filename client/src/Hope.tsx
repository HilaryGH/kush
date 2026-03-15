import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CommunicationWidget from './components/CommunicationWidget'
import RestaurantCard from './components/cards/RestaurantCard'
import api from './services/api'

const Hope = () => {
  const [popularRestaurants, setPopularRestaurants] = useState<any[]>([])
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true)
  const [popularFood, setPopularFood] = useState<any[]>([])
  const [isLoadingFood, setIsLoadingFood] = useState(true)

  useEffect(() => {
    fetchPopularRestaurants()
    fetchPopularFood()
  }, [])

  const fetchPopularRestaurants = async () => {
    try {
      setIsLoadingRestaurants(true)
      const response = await api.get('/vendors')
      
      if (response.data && response.data.success !== false) {
        const restaurants = (response.data.vendors || [])
          .filter((v: any) => v.isVerified !== false) // Show verified restaurants
          .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0)) // Sort by rating
          .slice(0, 4) // Take first 4
          .map((v: any) => ({
            id: v._id,
            name: v.businessName || 'Restaurant',
            image: v.restaurantPhoto || 'https://via.placeholder.com/400x300?text=Restaurant',
            rating: v.rating || 0,
            deliveryTime: '30-45 min',
            priceRange: '$$',
            isOpen: v.isOpen !== false,
            cuisine: v.businessType || 'Other',
          }))
        setPopularRestaurants(restaurants)
      }
    } catch (error) {
      console.error('Error fetching popular restaurants:', error)
      setPopularRestaurants([])
    } finally {
      setIsLoadingRestaurants(false)
    }
  }

  const fetchPopularFood = async () => {
    try {
      setIsLoadingFood(true)
      const response = await api.get('/menu')
      
      if (response.data && response.data.menuItems) {
        const foodItems = (response.data.menuItems || [])
          .filter((item: any) => item.isAvailable !== false) // Show available items
          .slice(0, 4) // Take first 4
        setPopularFood(foodItems)
      }
    } catch (error) {
      console.error('Error fetching popular food:', error)
      setPopularFood([])
    } finally {
      setIsLoadingFood(false)
    }
  }

  return (
    <>
      <style>{`
        @media (min-width: 640px) {
          .search-button-clip {
            clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
          }
        }
      `}</style>
    <main className="pt-0">
      {/* Hero Section with Background Image */}
      <section 
        className="relative w-full min-h-[40vh] sm:min-h-[50vh] md:min-h-[55vh] flex items-start pt-2 sm:pt-4 md:pt-6 overflow-hidden"
      >
        {/* Background Image Container - Mobile: Rotated 90deg, Desktop: Normal */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: 'url(/hero%20page.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Mobile: Normal orientation */}
          <div 
            className="md:hidden absolute inset-x-0 top-0"
            style={{ 
              backgroundImage: 'url(/hero%20page.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: '50%',
            }}
          ></div>
          {/* Desktop: Normal orientation */}
          <div 
            className="hidden md:block absolute inset-0"
            style={{ 
              backgroundImage: 'url(/hero%20page.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/30 to-transparent z-10"></div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 w-full pt-2 sm:pt-4 md:pt-6 pb-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              Find and Enjoy your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">favourite</span> food !
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-800 mb-6 sm:mb-8 font-medium">
              order a delivery, takeaway or reserve a table easily
            </p>
            <div className="max-w-2xl">
              <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-lg sm:rounded-xl border border-slate-300 shadow-lg overflow-hidden">
                {/* Location Input */}
                <div className="flex items-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b sm:border-b-0 min-w-0 flex-1 relative">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="flex-1 min-w-0 outline-none text-sm sm:text-base md:text-lg text-slate-700 placeholder:text-slate-400"
                  />
                  {/* Diagonal Separator */}
                  <div 
                    className="hidden sm:block absolute right-0 top-0 bottom-0 bg-slate-300"
                    style={{ 
                      transform: 'skewX(-12deg)',
                      width: '3px',
                      marginRight: '-2px'
                    }}
                  ></div>
                </div>
                
                {/* Search Input */}
                <div className="flex-1 flex items-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 relative min-w-0 border-b sm:border-b-0">
                  <input
                    type="text"
                    placeholder="search restaurants and foods"
                    className="flex-1 min-w-0 outline-none text-sm sm:text-base md:text-lg text-slate-700 placeholder:text-slate-400"
                  />
                  {/* Diagonal Separator */}
                  <div 
                    className="hidden sm:block absolute right-0 top-0 bottom-0 bg-slate-300"
                    style={{ 
                      transform: 'skewX(-12deg)',
                      width: '3px',
                      marginRight: '-2px'
                    }}
                  ></div>
                </div>
                
                {/* Search Button */}
                <button 
                  className="relative px-4 sm:px-6 md:px-8 py-3 sm:py-4 self-stretch flex items-center justify-center text-white text-sm sm:text-base font-semibold transition-all hover:opacity-90 rounded-b-lg sm:rounded-none search-button-clip"
                  style={{
                    background: 'linear-gradient(to bottom right, #fbbf24, #ef4444)'
                  }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="ml-2 sm:hidden">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Options Section */}
      <section className="bg-white pt-2 md:pt-4 pb-6 md:pb-8 -mt-2 relative z-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {/* Order Online */}
            <div className="flex items-center gap-3 p-4 md:p-5">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">Order Online</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">Get your favorite meals delivered to your doorstep</p>
              </div>
            </div>

            {/* Take Away */}
            <div className="flex items-center gap-3 p-4 md:p-5">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">Take Away</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">Pick up your order at your convenience</p>
              </div>
            </div>

            {/* Reserve Table */}
            <div className="flex items-center gap-3 p-4 md:p-5">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">Reserve Table</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">Book a table for dine-in experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {/* Local & Traditional */}
            <Link
              to="/restaurants?category=local-traditional"
              className="group relative overflow-hidden rounded-xl border border-yellow-100 hover:border-yellow-300 hover:shadow-lg transition-all"
            >
              <div className="aspect-square relative">
                <img 
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561b1d?w=400&h=400&fit=crop" 
                  alt="Local & Traditional"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold text-white text-center">Local & Traditional</h3>
                </div>
              </div>
            </Link>

            {/* Fast Food & Snacks */}
            <Link
              to="/restaurants?category=fast-food"
              className="group relative overflow-hidden rounded-xl border border-yellow-100 hover:border-yellow-300 hover:shadow-lg transition-all"
            >
              <div className="aspect-square relative">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop" 
                  alt="Fast Food & Snacks"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold text-white text-center">Fast Food & Snacks</h3>
                </div>
              </div>
            </Link>

            {/* International / Asian / Continental */}
            <Link
              to="/restaurants?category=international"
              className="group relative overflow-hidden rounded-xl border border-yellow-100 hover:border-yellow-300 hover:shadow-lg transition-all"
            >
              <div className="aspect-square relative">
                <img 
                  src="https://images.unsplash.com/photo-1551218808-8e22c1f0d32c?w=400&h=400&fit=crop" 
                  alt="International / Asian / Continental"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold text-white text-center">International / Asian / Continental</h3>
                </div>
              </div>
            </Link>

            {/* Healthy & Dietary Choices */}
            <Link
              to="/restaurants?category=healthy"
              className="group relative overflow-hidden rounded-xl border border-yellow-100 hover:border-yellow-300 hover:shadow-lg transition-all"
            >
              <div className="aspect-square relative">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop" 
                  alt="Healthy & Dietary Choices"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold text-white text-center">Healthy & Dietary Choices</h3>
                </div>
              </div>
            </Link>

            {/* Desserts & Beverages */}
            <Link
              to="/restaurants?category=desserts"
              className="group relative overflow-hidden rounded-xl border border-yellow-100 hover:border-yellow-300 hover:shadow-lg transition-all"
            >
              <div className="aspect-square relative">
                <img 
                  src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop" 
                  alt="Desserts & Beverages"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold text-white text-center">Desserts & Beverages</h3>
                </div>
              </div>
            </Link>

            {/* Family Packs / Catering / Special Orders */}
            <Link
              to="/restaurants?category=catering"
              className="group relative overflow-hidden rounded-xl border border-yellow-100 hover:border-yellow-300 hover:shadow-lg transition-all"
            >
              <div className="aspect-square relative">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop" 
                  alt="Family Packs / Catering / Special Orders"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold text-white text-center">Family Packs / Catering / Special Orders</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Restaurants Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Popular Restaurants
              </h2>
              <p className="text-slate-600">Discover the most loved restaurants in your area</p>
            </div>
            <Link
              to="/restaurants"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
            >
              <span>View All</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {isLoadingRestaurants ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-200 animate-pulse rounded-xl h-64"></div>
              ))}
            </div>
          ) : popularRestaurants.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
              <div className="mt-8 text-center sm:hidden">
                <Link
                  to="/restaurants"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  <span>View All Restaurants</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">No restaurants available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Popular Food Section */}
      <section className="bg-gradient-to-b from-white to-yellow-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Popular Food
              </h2>
              <p className="text-slate-600">Taste the most ordered dishes from top restaurants</p>
            </div>
            <Link
              to="/restaurants?filter=food"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
            >
              <span>View All</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {isLoadingFood ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-200 animate-pulse rounded-xl h-64"></div>
              ))}
            </div>
          ) : popularFood.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularFood.map((item: any) => {
                  const vendorId = typeof item.vendor === 'object' ? item.vendor?._id : item.vendor
                  const vendorName = typeof item.vendor === 'object' ? item.vendor?.businessName : null
                  
                  return (
                    <Link 
                      key={item._id} 
                      to={`/dashboard/restaurant/${vendorId || ''}`}
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
                            {vendorName && (
                              <p className="text-xs text-slate-500 mb-2">from {vendorName}</p>
                            )}
                            {item.category && (
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded mb-2">
                                {item.category}
                              </span>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xl font-bold text-slate-900">₦{item.price?.toLocaleString() || '0'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div className="mt-8 text-center sm:hidden">
                <Link
                  to="/restaurants?filter=food"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  <span>View All Food</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">No food items available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Join Our Community Section */}
      <section 
        id="community" 
        className="relative py-16 md:py-24 overflow-hidden"
      >
        {/* Wave Background Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23fbbf24' fill-opacity='0.3' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3Cpath fill='%23ef4444' fill-opacity='0.25' d='M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3Cpath fill='%23f59e0b' fill-opacity='0.2' d='M0,160L48,165.3C96,171,192,181,288,181.3C384,181,480,171,576,165.3C672,160,768,160,864,165.3C960,171,1056,181,1152,181.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
              style={{
                fontFamily: "'Dancing Script', cursive, 'DM Sans', sans-serif",
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ef4444 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 4px rgba(251, 191, 36, 0.3)'
              }}
            >
              Join Our Community
            </h2>
            <p className="text-lg md:text-xl text-slate-800 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
              Be part of our growing community and unlock exclusive opportunities
            </p>
          </div>

          {/* Two cards on top, three on bottom */}
          <div className="space-y-6 md:space-y-8">
            {/* Top Row - Two Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Women Initiatives - Left */}
              <Link
                to="/women-initiatives"
                className="group relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Wave Background */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 30, 50 50 T 100 50 L 100 100 L 0 100 Z' fill='%23fbbf24'/%3E%3Cpath d='M0 50 Q 25 70, 50 50 T 100 50 L 100 0 L 0 0 Z' fill='%23ef4444'/%3E%3C/svg%3E")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <div className="relative p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                    Women Initiatives
                  </h3>
                  <p className="text-sm font-semibold text-slate-600 mb-2">Including Survey</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 min-h-[3rem]">
                    Empowering women through initiatives and community support
                  </p>
                  <button 
                    className="w-full py-3 px-6 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
                    }}
                  >
                    Join Now
                  </button>
                </div>
              </Link>

              {/* Diaspora Community - Right */}
              <Link
                to="/diaspora-community"
                className="group relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Wave Background */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 30, 50 50 T 100 50 L 100 100 L 0 100 Z' fill='%23fbbf24'/%3E%3Cpath d='M0 50 Q 25 70, 50 50 T 100 50 L 100 0 L 0 0 Z' fill='%23ef4444'/%3E%3C/svg%3E")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <div className="relative p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                    Diaspora Community
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 min-h-[3rem]">
                    Connect with the global Ethiopian diaspora community
                  </p>
                  <button 
                    className="w-full py-3 px-6 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)'
                    }}
                  >
                    Join Now
                  </button>
                </div>
              </Link>
            </div>

            {/* Bottom Row - Three Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Professional Community */}
              <Link
                to="/professional-community"
                className="group relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                    Professional Community
                  </h3>
                  <p className="text-sm font-semibold text-slate-600 mb-2">~ Fresh Graduates</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 min-h-[3rem]">
                    Support and opportunities for recent graduates
                  </p>
                  <button 
                    className="w-full py-3 px-6 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
                    }}
                  >
                    Join Now
                  </button>
                </div>
              </Link>

              {/* Premium Membership */}
              <Link
                to="/premium-community"
                className="group relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                    Premium Membership
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 min-h-[3rem]">
                    Exclusive benefits & features for members
                  </p>
                  <button 
                    className="w-full py-3 px-6 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                    }}
                  >
                    Join Now
                  </button>
                </div>
              </Link>

              {/* Invest/Partner With Us */}
              <Link
                to="/invest-partner"
                className="group relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                    Invest / Partner With Us
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 min-h-[3rem]">
                    Join us as an investor or partner and grow together
                  </p>
                  <button 
                    className="w-full py-3 px-6 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)'
                    }}
                  >
                    Join Now
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <CommunicationWidget />
    </>
  )
}

export default Hope

