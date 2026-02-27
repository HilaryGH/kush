const Hope = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-14">
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
        {/* Left column */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-white px-4 py-2 text-[15px] font-medium text-yellow-700 shadow-sm shadow-yellow-100">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-[13px] font-bold text-black">
              30
            </span>
            <span>Average delivery in under 30 minutes</span>
          </div>

          <h1 className="mt-6 text-balance text-[2.5rem] font-bold tracking-tight text-slate-900 sm:text-[3rem] lg:text-[3.5rem] leading-tight">
            Your favorite food,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
              delivered lightning fast.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-balance text-[17px] text-slate-600 sm:text-[18px] leading-relaxed">
            Discover the best restaurants in your city and get fresh meals,
            desserts, and drinks delivered straight to your door. Real-time tracking,
            no hidden fees, just great food.
          </p>

          {/* CTA row */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-red-500 px-8 py-4 text-[16px] font-semibold text-black shadow-md shadow-yellow-200 hover:shadow-lg hover:shadow-yellow-300 transition-all">
              Start your order
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-yellow-300 bg-white px-7 py-3.5 text-[16px] font-medium text-slate-800 hover:border-yellow-400 transition-colors">
              Browse restaurants
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md text-[15px] sm:text-[16px]">
            <div>
              <div className="font-semibold text-slate-900">4.9/5</div>
              <div className="text-slate-500">Average rating</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">500+</div>
              <div className="text-slate-500">Partner restaurants</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">24/7</div>
              <div className="text-slate-500">Delivery support</div>
            </div>
          </div>
        </div>

        {/* Right column – hero card */}
        <div className="relative">
          <div className="pointer-events-none absolute -left-10 -top-6 h-24 w-24 rounded-full bg-yellow-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-red-200/40 blur-3xl" />

          <div className="relative rounded-3xl border border-yellow-200 bg-white/80 p-4 shadow-xl shadow-yellow-100/40 backdrop-blur-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500">
                  Live order
                </p>
                <p className="mt-1.5 text-[17px] font-semibold text-slate-900">
                  Spicy Ramen & Sushi Combo
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1.5 text-[12px] font-semibold text-green-700">
                On the way
              </span>
            </div>

            {/* Delivery progress */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center justify-between text-[15px] text-slate-500">
                <span>Estimated arrival</span>
                <span className="font-semibold text-slate-900">18–24 min</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-yellow-100">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-yellow-400 to-red-500" />
              </div>
              <div className="flex justify-between text-[12px] text-slate-400">
                <span>Restaurant is preparing</span>
                <span>Courier picked up</span>
                <span>Almost there</span>
              </div>
            </div>

            {/* Mini list of items */}
            <div className="mt-6 space-y-3 rounded-2xl bg-yellow-50/70 p-4">
              <div className="flex items-center justify-between text-[15px]">
                <span className="font-medium text-slate-800">Spicy Miso Ramen</span>
                <span className="text-slate-600">1 × $14.90</span>
              </div>
              <div className="flex items-center justify-between text-[15px]">
                <span className="font-medium text-slate-800">Salmon Nigiri (6 pcs)</span>
                <span className="text-slate-600">1 × $11.50</span>
              </div>
              <div className="flex items-center justify-between text-[15px] border-t border-orange-100 pt-3">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="font-semibold text-slate-900">$28.40</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mt-16 md:mt-20">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900 sm:text-[2.25rem]">
              How delivery works
            </h2>
            <p className="mt-2 text-[17px] text-slate-500">
              From craving to doorstep in just a few taps.
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-100 text-sm font-semibold text-yellow-700">
              1
            </div>
            <h3 className="mt-4 text-[1.25rem] font-semibold text-slate-900">
              Choose your craving
            </h3>
            <p className="mt-2 text-[15px] text-slate-500 leading-relaxed">
              Browse hundreds of curated restaurants, cafes, and dessert spots near you.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-[16px] font-semibold text-yellow-700">
              2
            </div>
            <h3 className="mt-4 text-[1.25rem] font-semibold text-slate-900">
              Track in real time
            </h3>
            <p className="mt-2 text-[15px] text-slate-500 leading-relaxed">
              Watch your order being prepared, picked up, and delivered right on the map.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-[16px] font-semibold text-yellow-700">
              3
            </div>
            <h3 className="mt-4 text-[1.25rem] font-semibold text-slate-900">
              Enjoy & re-order fast
            </h3>
            <p className="mt-2 text-[15px] text-slate-500 leading-relaxed">
              Save your favorites and re-order in seconds whenever the cravings hit again.
            </p>
          </div>
        </div>
      </section>

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
    </main>
  )
}

export default Hope

