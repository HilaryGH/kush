import { Link } from 'react-router-dom'
import RestaurantCard from '../components/cards/RestaurantCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

const Home = () => {
  // Mock data - replace with API calls
  const featuredRestaurants = [
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
    }
  ]

  const categories = [
    { id: 'pizza', name: 'Pizza', icon: '🍕', color: 'from-red-400 to-red-600' },
    { id: 'burger', name: 'Burgers', icon: '🍔', color: 'from-orange-400 to-orange-600' },
    { id: 'ethiopian', name: 'Ethiopian', icon: '🌶️', color: 'from-yellow-400 to-red-500' },
    { id: 'sushi', name: 'Sushi', icon: '🍣', color: 'from-pink-400 to-pink-600' },
    { id: 'dessert', name: 'Desserts', icon: '🍰', color: 'from-purple-400 to-purple-600' },
    { id: 'drinks', name: 'Drinks', icon: '🥤', color: 'from-blue-400 to-blue-600' }
  ]

  const popularDishes = [
    {
      id: '1',
      name: 'Neapolitan Margherita Pizza',
      tag: 'Italian • Pizza',
      price: 15.90,
      badge: 'Top rated',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300'
    },
    {
      id: '2',
      name: 'Sushi Lover Bento Box',
      tag: 'Japanese • Sushi',
      price: 22.50,
      badge: 'Most ordered',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300'
    },
    {
      id: '3',
      name: 'Smoky BBQ Burger Meal',
      tag: 'American • Burgers',
      price: 13.40,
      badge: 'Combo deal',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300'
    }
  ]

  return (
    <main className="pt-0">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center pt-6 sm:pt-8 md:pt-12 overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{ 
              backgroundImage: 'url(/hero%20page.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full py-8 sm:py-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Find and Enjoy your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                favourite
              </span>{' '}
              food!
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-slate-700 mb-6 sm:mb-8 font-medium">
              Order delivery, takeaway, or reserve a table easily
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-2 sm:p-3 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1 flex items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="flex-1 min-w-0 outline-none bg-transparent text-sm sm:text-base text-slate-700 placeholder:text-slate-400"
                />
              </div>
              
              <div className="flex-1 flex items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search restaurants and foods"
                  className="flex-1 min-w-0 outline-none bg-transparent text-sm sm:text-base text-slate-700 placeholder:text-slate-400"
                />
              </div>
              
              <Button className="px-6 sm:px-8 py-2.5 sm:py-3 whitespace-nowrap text-sm sm:text-base w-full sm:w-auto">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 md:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Browse by Category</h2>
            <Link to="/restaurants" className="text-orange-600 font-medium hover:text-orange-700 hidden sm:block">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/restaurants?category=${category.id}`}
                className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-orange-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-3xl mb-2 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <span className="text-sm font-semibold text-slate-700 text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-8 md:py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Featured Restaurants</h2>
            <Link to="/restaurants" className="text-orange-600 font-medium hover:text-orange-700">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section id="menu" className="py-8 md:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Popular Right Now
            </h2>
            <p className="text-slate-600">
              Hand-picked favorites customers can't stop ordering
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularDishes.map((dish) => (
              <div
                key={dish.id}
                className="group bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge>{dish.badge}</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{dish.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{dish.tag}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900">${dish.price.toFixed(2)}</span>
                    <Button size="sm">Add to cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-12 md:py-16 bg-gradient-to-b from-white to-orange-50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
              How it works
            </h2>
            <p className="text-lg text-slate-600">
              From craving to doorstep in just a few taps
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: 1,
                title: 'Choose your craving',
                description: 'Browse hundreds of curated restaurants, cafes, and dessert spots near you.',
                icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
              },
              {
                step: 2,
                title: 'Track in real time',
                description: 'Watch your order being prepared, picked up, and delivered right on the map.',
                icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
              },
              {
                step: 3,
                title: 'Enjoy & re-order fast',
                description: 'Save your favorites and re-order in seconds whenever the cravings hit again.',
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              }
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-sm shadow-md">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section id="community" className="py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Community</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Be part of our growing community and unlock exclusive opportunities
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Women Initiatives',
                subtitle: 'Including Survey',
                description: 'Empowering women through initiatives and community support',
                link: '/women-initiatives',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                color: 'from-pink-100 to-rose-100',
                iconBg: 'from-pink-500 to-rose-500',
                borderColor: 'border-pink-200'
              },
              {
                title: 'Diaspora Community',
                description: 'Connect with the global Ethiopian diaspora community',
                link: '/diaspora-community',
                icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M15 11a3 3 0 11-6 0m5.945 4H9a2 2 0 00-2 2v1a2 2 0 002 2h6.945M21 11a9 9 0 11-18 0 9 9 0 0118 0z',
                color: 'from-blue-100 to-indigo-100',
                iconBg: 'from-blue-500 to-indigo-500',
                borderColor: 'border-blue-200'
              },
              {
                title: 'Professional Community',
                subtitle: '~ Fresh Graduates',
                description: 'Support and opportunities for recent graduates',
                link: '/professional-community',
                icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                color: 'from-emerald-100 to-teal-100',
                iconBg: 'from-emerald-500 to-teal-500',
                borderColor: 'border-emerald-200'
              },
              {
                title: 'Premium Membership',
                description: 'Exclusive benefits and premium features for members',
                link: '/premium-community',
                icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
                premium: true,
                color: 'from-amber-100 to-orange-100',
                iconBg: 'from-amber-500 to-orange-500',
                borderColor: 'border-amber-300'
              },
              {
                title: 'Invest/Partner With Us',
                description: 'Join us as an investor or partner and grow together',
                link: '/invest-partner',
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                wide: true,
                color: 'from-purple-100 to-violet-100',
                iconBg: 'from-purple-500 to-violet-500',
                borderColor: 'border-purple-200'
              }
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className={`group relative overflow-hidden bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
                  item.wide ? 'sm:col-span-2 lg:col-span-2' : ''
                } ${item.premium ? `bg-gradient-to-br ${item.color} border-amber-300` : ''}`}
              >
                {/* Subtle background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                {/* Decorative corner element */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.iconBg} opacity-5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:opacity-10 transition-opacity`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  
                  {/* Premium Badge */}
                  {item.premium && (
                    <Badge variant="warning" className="mb-3 text-xs">Premium</Badge>
                  )}
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* Subtitle */}
                  {item.subtitle && (
                    <p className="text-sm font-medium text-slate-500 mb-3">{item.subtitle}</p>
                  )}
                  
                  {/* Description */}
                  <p className="text-slate-600 text-[15px] leading-relaxed mb-6 min-h-[3rem]">
                    {item.description}
                  </p>
                  
                  {/* Button - Subtle outline style */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                      Join Now
                    </span>
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
