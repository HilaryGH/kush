import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-white/8 bg-[#0c0906] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,_rgba(251,191,36,0.12),_rgba(239,68,68,0.08))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">Built for trust</p>
              <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl">
                A polished marketplace for restaurants, riders, and modern customers.
              </h2>
            </div>
            <Link
              to="/vendor-registration"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,_#f59e0b,_#ef4444)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(239,68,68,0.25)] transition-all hover:-translate-y-0.5"
            >
              Partner with Kushena
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/6">
                <img
                  src="/kushina%20logo%202.png"
                  alt="Kushena logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div>
                <p className="font-display text-2xl">Kushena</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Fresh. Fast. Professional.</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-8 text-white/68">
              A modern food marketplace for verified restaurants, premium delivery experiences, and community-led growth.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {['Trusted vendors', 'Live dispatch', 'Premium support'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">Navigate</h3>
            <ul className="mt-6 space-y-4 text-sm text-white/68">
              <li><a href="#about" className="transition-colors hover:text-white">About Kushena</a></li>
              <li><a href="#menu" className="transition-colors hover:text-white">Popular dishes</a></li>
              <li><a href="#community" className="transition-colors hover:text-white">Community programs</a></li>
              <li><Link to="/restaurants" className="transition-colors hover:text-white">Restaurants</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">Support</h3>
            <ul className="mt-6 space-y-4 text-sm text-white/68">
              <li><Link to="/signin" className="transition-colors hover:text-white">Account access</Link></li>
              <li><Link to="/vendor-registration" className="transition-colors hover:text-white">Become a vendor</Link></li>
              <li><a href="#" className="transition-colors hover:text-white">Help center</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Order tracking</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">Contact</h3>
            <div className="mt-6 space-y-4 text-sm text-white/68">
              <p className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                <span className="block text-xs uppercase tracking-[0.24em] text-white/42">Email</span>
                <span className="mt-2 block text-white">g.fikre2@gmail.com</span>
              </p>
              <p className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                <span className="block text-xs uppercase tracking-[0.24em] text-white/42">Phone</span>
                <span className="mt-2 block text-white">+251 911 508 734</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{`Copyright ${new Date().getFullYear()} Kushena. All rights reserved.`}</p>
          <div className="flex flex-wrap gap-5">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
