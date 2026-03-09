import { Link } from 'react-router-dom'

const Hope = () => {
  return (
    <main className="pt-0">
      {/* Hero Section with Background Image */}
      <section 
        className="relative w-full h-screen flex items-start pt-12 md:pt-20 overflow-hidden"
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
          {/* Mobile: Rotated 90 degrees */}
          <div 
            className="md:hidden absolute inset-0"
            style={{ 
              backgroundImage: 'url(/hero%20page.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: 'rotate(90deg) scale(1.5)',
              transformOrigin: 'center center',
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
        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
              Find and Enjoy your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">favourite</span> food !
            </h1>
            <p className="text-xl md:text-2xl text-slate-800 mb-8 font-medium">
              order a delivery, takeaway or reserve a table easily
            </p>
            <div className="max-w-2xl">
              <div className="flex items-center bg-white rounded-lg border border-slate-300 shadow-lg overflow-hidden">
                {/* Location Input */}
                <div className="flex items-center px-4 md:px-6 py-4 border-r border-slate-300">
                  <svg className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="outline-none text-lg text-slate-700 placeholder:text-slate-400 w-32 md:w-40"
                  />
                </div>
                
                {/* Separator */}
                <div className="text-slate-400 text-xl font-bold px-2">|</div>
                
                {/* Search Input */}
                <div className="flex-1 flex items-center px-4 md:px-6 py-4 relative overflow-visible">
                  <input
                    type="text"
                    placeholder="search restaurants and foods"
                    className="flex-1 outline-none text-lg text-slate-700 placeholder:text-slate-400"
                  />
                  {/* Diagonal Separator */}
                  <div 
                    className="absolute right-0 top-0 bottom-0 bg-slate-300"
                    style={{ 
                      transform: 'skewX(-12deg)',
                      width: '3px',
                      marginRight: '-2px'
                    }}
                  ></div>
                </div>
                
                {/* Search Button */}
                <button 
                  className="relative px-6 md:px-8 py-4 self-stretch flex items-center justify-center text-white font-semibold transition-all hover:opacity-90 overflow-hidden"
                  style={{
                    background: 'linear-gradient(to bottom right, #fbbf24, #ef4444)',
                    clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
              How it works
            </h2>
            <p className="text-lg text-slate-500">
              From craving to doorstep in just a few taps
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-red-500 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white font-bold text-sm shadow-md">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Choose your craving
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Browse hundreds of curated restaurants, cafes, and dessert spots near you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-red-500 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white font-bold text-sm shadow-md">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Track in real time
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Watch your order being prepared, picked up, and delivered right on the map.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-red-500 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white font-bold text-sm shadow-md">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Enjoy & re-order fast
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Save your favorites and re-order in seconds whenever the cravings hit again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section id="community" className="bg-gradient-to-b from-white via-yellow-50 to-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-3">
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Community</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Be part of our growing community and unlock exclusive opportunities
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Women Initiatives */}
            <div className="group relative bg-white rounded-2xl border-2 border-yellow-200 p-6 shadow-sm hover:shadow-xl hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Women Initiatives
                </h3>
                <p className="text-sm text-yellow-600 font-medium mb-3">Including Survey</p>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-4">
                  Empowering women through initiatives and community support
                </p>
                <Link
                  to="/women-initiatives"
                  className="block w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold text-sm hover:shadow-lg transition-all group-hover:scale-105 text-center"
                >
                  Join Now
                </Link>
              </div>
            </div>

            {/* Diaspora Community */}
            <div className="group relative bg-white rounded-2xl border-2 border-yellow-200 p-6 shadow-sm hover:shadow-xl hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M15 11a3 3 0 11-6 0m5.945 4H9a2 2 0 00-2 2v1a2 2 0 002 2h6.945M21 11a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Diaspora Community
                </h3>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-4">
                  Connect with the global Ethiopian diaspora community
                </p>
                <Link
                  to="/diaspora-community"
                  className="block w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold text-sm hover:shadow-lg transition-all group-hover:scale-105 text-center"
                >
                  Join Now
                </Link>
              </div>
            </div>

            {/* Professional Community */}
            <div className="group relative bg-white rounded-2xl border-2 border-yellow-200 p-6 shadow-sm hover:shadow-xl hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Professional Community
                </h3>
                <p className="text-sm text-yellow-600 font-medium mb-3">~ Fresh Graduates</p>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-4">
                  Support and opportunities for recent graduates
                </p>
                <Link
                  to="/professional-community"
                  className="block w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold text-sm hover:shadow-lg transition-all group-hover:scale-105 text-center"
                >
                  Join Now
                </Link>
              </div>
            </div>

            {/* Premium Membership */}
            <div className="group relative bg-gradient-to-br from-yellow-50 to-red-50 rounded-2xl border-2 border-yellow-300 p-6 shadow-md hover:shadow-xl hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold uppercase tracking-wide">
                    Premium
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Premium Membership
                </h3>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-4">
                  Exclusive benefits and premium features for members
                </p>
                <Link
                  to="/premium-community"
                  className="block w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold text-sm hover:shadow-lg transition-all group-hover:scale-105 text-center"
                >
                  Join Now
                </Link>
              </div>
            </div>

            {/* Invest/Partner With Us */}
            <div className="group relative bg-white rounded-2xl border-2 border-yellow-200 p-6 shadow-sm hover:shadow-xl hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 sm:col-span-2 lg:col-span-2">
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    Invest/Partner With Us
                  </h3>
                  <p className="text-slate-600 text-[15px] md:text-base leading-relaxed mb-4">
                    Join us as an investor or partner and grow together
                  </p>
                </div>
                <Link
                  to="/invest-partner"
                  className="block w-full md:w-auto py-2.5 px-6 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold text-sm hover:shadow-lg transition-all group-hover:scale-105 whitespace-nowrap text-center"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-14">

      {/* Popular dishes (static cards) */}
      <section id="menu" className="mt-16 md:mt-20">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900 sm:text-[2.25rem]">
              Popular right now
            </h2>
            <p className="mt-2 text-[17px] text-slate-500">
              Hand-picked favorites customers can&apos;t stop ordering.
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Neapolitan Margherita Pizza',
              tag: 'Italian • Pizza',
              price: '$15.90',
              badge: 'Top rated',
            },
            {
              name: 'Sushi Lover Bento Box',
              tag: 'Japanese • Sushi',
              price: '$22.50',
              badge: 'Most ordered',
            },
            {
              name: 'Smoky BBQ Burger Meal',
              tag: 'American • Burgers',
              price: '$13.40',
              badge: 'Combo deal',
            },
          ].map((item) => (
            <article
              key={item.name}
              className="flex flex-col justify-between rounded-2xl border border-yellow-200 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-yellow-600">
                  {item.badge}
                </div>
                <h3 className="mt-4 text-[1.125rem] font-semibold text-slate-900">
                  {item.name}
                </h3>
                <p className="mt-2 text-[15px] text-slate-500">{item.tag}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[17px] font-semibold text-slate-900">
                  {item.price}
                </span>
                <button className="rounded-full border border-yellow-300 bg-white px-5 py-2.5 text-[15px] font-medium text-yellow-700 hover:border-yellow-400 hover:text-yellow-800 transition-colors">
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cities */}
      <section id="cities" className="mt-16 md:mt-20">
        <h2 className="text-[2rem] font-bold tracking-tight text-slate-900 sm:text-[2.25rem]">
          Delivering across the city
        </h2>
        <p className="mt-2 max-w-xl text-[17px] text-slate-500">
          We partner with local restaurants in the most vibrant neighborhoods near you.
        </p>

        <div className="mt-7 grid gap-5 text-[15px] text-slate-700 sm:grid-cols-3">
          <div className="rounded-2xl border border-yellow-200 bg-white p-5">
            <h3 className="text-[1.125rem] font-semibold text-slate-900">Downtown</h3>
            <p className="mt-2 text-[15px] text-slate-500 leading-relaxed">
              Business district, riverside, and the historic old town.
            </p>
          </div>
          <div className="rounded-2xl border border-yellow-200 bg-white p-5">
            <h3 className="text-[1.125rem] font-semibold text-slate-900">Westside</h3>
            <p className="mt-2 text-[15px] text-slate-500 leading-relaxed">
              University area, parks, and the creative quarter.
            </p>
          </div>
          <div className="rounded-2xl border border-yellow-200 bg-white p-5">
            <h3 className="text-[1.125rem] font-semibold text-slate-900">Suburbs</h3>
            <p className="mt-2 text-[15px] text-slate-500 leading-relaxed">
              Residential neighborhoods with family favorites.
            </p>
          </div>
        </div>
      </section>

      {/* Partner CTA Section */}
      <section
        id="contact"
        className="mt-16 border-t border-yellow-200 pt-8 md:mt-20"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-800 text-[17px]">Become a partner restaurant</p>
            <p className="mt-2 max-w-md text-[16px] text-slate-600 leading-relaxed">
              Grow your business with Kushena. Reach thousands of hungry customers
              every single day.
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-full border border-yellow-300 bg-white px-6 py-3 text-[16px] font-medium text-yellow-700 hover:border-yellow-400 hover:text-yellow-800 transition-colors">
            Get in touch
          </button>
        </div>
      </section>
      </div>
    </main>
  )
}

export default Hope

