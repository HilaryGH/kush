import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Restaurants', to: '/restaurants' },
]

const anchorLinks = [
  { label: 'About', href: '#about' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname === path

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const goToSignIn = () => {
    closeMobileMenu()
    navigate('/signin')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#120d08]/82 shadow-[0_14px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">
        <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/8 shadow-[0_10px_24px_rgba(0,0,0,0.15)]">
            <img
              src="/kushina%20logo%202.png"
              alt="Kushena logo"
              className="h-14 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg text-white">Kushena</span>
            <span className="text-xs uppercase tracking-[0.28em] text-white/45">Delivery refined</span>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/7 p-1.5 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive(item.to)
                  ? 'bg-[linear-gradient(135deg,_#f59e0b,_#ea580c)] text-white shadow-[0_12px_28px_rgba(245,158,11,0.32)]'
                  : 'text-white/72 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {anchorLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white/72 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={goToSignIn}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              isActive('/signin') ? 'text-amber-300' : 'text-white/80 hover:text-white'
            }`}
          >
            Sign in
          </button>
          <Link
            to="/restaurants"
            className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,_#f59e0b,_#ef4444)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(239,68,68,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(239,68,68,0.35)]"
          >
            Order now
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-colors hover:bg-white/10 md:hidden"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileMenuOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-white/8 bg-[#120d08]/96 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMobileMenu}
                className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive(item.to)
                    ? 'bg-[linear-gradient(135deg,_rgba(245,158,11,0.2),_rgba(239,68,68,0.2))] text-white'
                    : 'text-white/78 hover:bg-white/8 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {anchorLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white/78 transition-all hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="grid gap-3 pt-3">
              <button
                type="button"
                onClick={goToSignIn}
                className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Sign in
              </button>
              <Link
                to="/restaurants"
                onClick={closeMobileMenu}
                className="block rounded-2xl bg-[linear-gradient(135deg,_#f59e0b,_#ef4444)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Order now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
