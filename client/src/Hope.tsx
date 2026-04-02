import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from './components/ui/Badge'
import Button from './components/ui/Button'
import CommunicationWidget from './components/CommunicationWidget'
import RestaurantCard from './components/cards/RestaurantCard'
import api from './services/api'

const categories = [
  {
    id: 'local-traditional',
    name: 'Local Classics',
    description: 'Authentic regional dishes and cultural favorites.',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    id: 'fast-food',
    name: 'Fast Casual',
    description: 'Quick comfort food, burgers, pizza, and snacks.',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    accent: 'from-rose-400 to-orange-500',
  },
  {
    id: 'international',
    name: 'Global Kitchen',
    description: 'Asian, continental, and fusion menus from top chefs.',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    accent: 'from-orange-400 to-red-500',
  },
  {
    id: 'healthy',
    name: 'Healthy Picks',
    description: 'Balanced bowls, fresh salads, and clean meals.',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
    accent: 'from-emerald-400 to-teal-500',
  },
]

const serviceModes = [
  {
    title: 'On-demand delivery',
    description: 'Fast dispatching, tracked riders, and predictable arrival windows.',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 005.414 17H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    title: 'Pickup and takeaway',
    description: 'Skip the queue with scheduled pickup from your favorite restaurants.',
    icon: 'M5 8h14l1 12H4L5 8zm3 0V6a4 4 0 118 0v2',
  },
  {
    title: 'Table reservations',
    description: 'Secure premium dining slots for family dinners and client meetings.',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
]

const journeySteps = [
  {
    step: '01',
    title: 'Discover curated vendors',
    description: 'Browse verified restaurants, filter by cuisine, and compare timing, price, and ratings.',
  },
  {
    step: '02',
    title: 'Place with confidence',
    description: 'Choose delivery, pickup, or reservation and move through a streamlined checkout flow.',
  },
  {
    step: '03',
    title: 'Track and reorder',
    description: 'Monitor progress in real time and come back to saved favorites in seconds.',
  },
]

const communityPrograms = [
  {
    title: 'Women Initiatives',
    description: 'Programs, partnerships, and community support designed to create real opportunity.',
    link: '/women-initiatives',
    eyebrow: 'Impact program',
  },
  {
    title: 'Diaspora Community',
    description: 'A trusted place to connect global Ethiopian communities through food and belonging.',
    link: '/diaspora-community',
    eyebrow: 'Global network',
  },
  {
    title: 'Professional Community',
    description: 'Career access, mentorship, and visibility for fresh graduates and emerging talent.',
    link: '/professional-community',
    eyebrow: 'Career growth',
  },
  {
    title: 'Premium Membership',
    description: 'Unlock priority service, premium support, and members-only benefits.',
    link: '/premium-community',
    eyebrow: 'Exclusive access',
  },
  {
    title: 'Invest or Partner',
    description: 'Collaborate with Kushena through funding, strategic partnerships, or growth programs.',
    link: '/invest-partner',
    eyebrow: 'Business growth',
  },
]

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
          .filter((vendor: any) => vendor.isVerified !== false)
          .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 4)
          .map((vendor: any) => ({
            id: vendor._id,
            name: vendor.businessName || 'Restaurant',
            image: vendor.restaurantPhoto || 'https://via.placeholder.com/400x300?text=Restaurant',
            rating: vendor.rating || 0,
            deliveryTime: '30-45 min',
            priceRange: '$$',
            distance: vendor.address?.city ? vendor.address.city : undefined,
            isOpen: vendor.isOpen !== false,
            cuisine: vendor.businessType || 'Featured vendor',
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
          .filter((item: any) => item.isAvailable !== false)
          .slice(0, 4)
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
      <main className="relative overflow-hidden bg-[#f7f1e8] text-slate-900 pt-0">
        {/* Hero Section with Background Image — fills viewport below navbar */}
        <section
          className="relative flex w-full min-h-[calc(100dvh-5.5rem)] items-start overflow-hidden pt-2 sm:pt-4 md:pt-6"
        >
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/hero%20page.png)' }}
            aria-hidden={true}
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-yellow-50/30 to-transparent" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 w-full pt-2 sm:pt-4 md:pt-6 pb-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4 sm:mb-6 leading-tight">
                Find and Enjoy your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">favourite</span>{' '}
                food !
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-800 mb-6 sm:mb-8 font-medium">
                order a delivery, takeaway or reserve a table easily
              </p>
              <div className="max-w-2xl">
                <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-lg sm:rounded-xl border border-slate-300 shadow-lg overflow-hidden">
                  <div className="flex items-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b sm:border-b-0 min-w-0 flex-1 relative">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 sm:mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="flex-1 min-w-0 outline-none text-sm sm:text-base md:text-lg text-slate-700 placeholder:text-slate-400"
                    />
                    <div
                      className="hidden sm:block absolute right-0 top-0 bottom-0 bg-slate-300"
                      style={{
                        transform: 'skewX(-12deg)',
                        width: '3px',
                        marginRight: '-2px',
                      }}
                    />
                  </div>
                  <div className="flex-1 flex items-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 relative min-w-0 border-b sm:border-b-0">
                    <input
                      type="text"
                      placeholder="search restaurants and foods"
                      className="flex-1 min-w-0 outline-none text-sm sm:text-base md:text-lg text-slate-700 placeholder:text-slate-400"
                    />
                    <div
                      className="hidden sm:block absolute right-0 top-0 bottom-0 bg-slate-300"
                      style={{
                        transform: 'skewX(-12deg)',
                        width: '3px',
                        marginRight: '-2px',
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="relative px-4 sm:px-6 md:px-8 py-3 sm:py-4 self-stretch flex items-center justify-center text-white text-sm sm:text-base font-semibold transition-all hover:opacity-90 rounded-b-lg sm:rounded-none search-button-clip"
                    style={{
                      background: 'linear-gradient(to bottom right, #fbbf24, #ef4444)',
                    }}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="ml-2 sm:hidden">Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="relative mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="surface-card rounded-[32px] p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-600">Built for modern demand</p>
              <h2 className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                A cleaner platform for customers, partners, and premium community growth.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
                The experience is designed to feel professional at every touchpoint, from discovery and checkout to operations visibility and partner trust.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {serviceModes.map((item) => (
                <div
                  key={item.title}
                  className="group soft-panel rounded-[28px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.1)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#f59e0b,_#ea580c)] text-white shadow-[0_16px_35px_rgba(245,158,11,0.35)]">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/restaurants?category=${category.id}`}
                className="group relative overflow-hidden rounded-[30px] border border-black/5 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_72px_rgba(15,23,42,0.12)]"
              >
                <div className="absolute inset-0">
                  <img src={category.image} alt={category.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(15,23,42,0.06)_0%,_rgba(15,23,42,0.72)_100%)]" />
                </div>
                <div className="relative flex min-h-[320px] flex-col justify-between p-6 text-white">
                  <span className={`w-fit rounded-full bg-gradient-to-r ${category.accent} px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]`}>
                    Curated
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold">{category.name}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-7 text-white/78">{category.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                      Explore category
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:py-24">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-600">Featured vendors</p>
              <h2 className="font-display mt-3 text-3xl text-slate-900 sm:text-4xl">Popular restaurants customers keep coming back to.</h2>
            </div>
            <Link to="/restaurants" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-amber-600">
              View all restaurants
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {isLoadingRestaurants ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-72 animate-pulse rounded-[28px] bg-white/70 shadow-[0_18px_55px_rgba(15,23,42,0.06)]" />
              ))}
            </div>
          ) : popularRestaurants.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {popularRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 px-6 py-14 text-center text-slate-600">
              No restaurants are available right now.
            </div>
          )}
        </section>

        <section id="menu" className="bg-[linear-gradient(180deg,_rgba(255,255,255,0.5),_rgba(255,247,237,0.95))]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-600">Customer favorites</p>
                <h2 className="font-display mt-3 text-3xl text-slate-900 sm:text-4xl">Top dishes with strong demand and standout presentation.</h2>
              </div>
              <Link to="/restaurants?filter=food" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-amber-600">
                Browse all food
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {isLoadingFood ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-80 animate-pulse rounded-[28px] bg-white/80 shadow-[0_18px_55px_rgba(15,23,42,0.06)]" />
                ))}
              </div>
            ) : popularFood.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {popularFood.map((item: any) => {
                  const vendorName = typeof item.vendor === 'object' ? item.vendor?.businessName : null

                  return (
                    <Link
                      key={item._id}
                      to="/restaurants?filter=food"
                      className="group overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.11)]"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={item.imageUrl || 'https://via.placeholder.com/400x300?text=Dish'}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(15,23,42,0.02),_rgba(15,23,42,0.55))]" />
                        {item.category && (
                          <div className="absolute left-4 top-4">
                            <Badge className="border border-white/30 bg-white/90 text-slate-900">{item.category}</Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="line-clamp-2 text-xl font-semibold text-slate-900">{item.name}</h3>
                        {item.description && (
                          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{item.description}</p>
                        )}
                        <div className="mt-5 flex items-end justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">From</p>
                            <p className="mt-1 text-sm text-slate-700">{vendorName || 'Featured kitchen'}</p>
                          </div>
                          <p className="text-2xl font-semibold text-slate-900">
                            ETB {Number(item.price || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 px-6 py-14 text-center text-slate-600">
                No food items are available right now.
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:py-24">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-600">How it works</p>
              <h2 className="font-display mt-3 text-3xl text-slate-900 sm:text-4xl">A clearer journey from discovery to delivery.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-600">
              Every major step is structured to feel dependable, fast, and easy to understand for customers and business partners alike.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {journeySteps.map((item) => (
              <div key={item.step} className="rounded-[30px] bg-[#1b130d] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] transition-transform duration-300 hover:-translate-y-1">
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">{item.step}</span>
                <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-8 text-white/72">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="community" className="relative overflow-hidden bg-[#120d08] py-16 text-white sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.2),_transparent_28%),linear-gradient(180deg,_rgba(18,13,8,0.96),_rgba(18,13,8,1))]" />
          <div className="grain-overlay absolute inset-0 opacity-35" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">Community and partnerships</p>
                <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl">
                  A stronger brand experience that extends beyond food ordering.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-white/70">
                Kushena also acts as a platform for meaningful community programs, professional access, and partnership opportunities.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {communityPrograms.map((item, index) => (
                <Link
                  key={item.title}
                  to={item.link}
                  className={`group rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 ${
                    index === 4 ? 'md:col-span-2 xl:col-span-1' : ''
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">{item.eyebrow}</p>
                  <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/68">{item.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                    Learn more
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,_rgba(251,191,36,0.14),_rgba(239,68,68,0.14))] p-8 shadow-[0_28px_80px_rgba(15,23,42,0.24)] lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-200/90">Ready to scale</p>
                <h3 className="font-display mt-3 text-3xl">Turn the first impression into a stronger customer and partner funnel.</h3>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  Use the refreshed public experience to present Kushena as a credible, modern brand from the first click.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 lg:mt-0">
                <Link to="/restaurants">
                  <Button className="rounded-full px-8">Start ordering</Button>
                </Link>
                <Link
                  to="/vendor-registration"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Become a vendor
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
