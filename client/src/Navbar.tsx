import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="sticky top-0 z-20 bg-black">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-14 overflow-visible -my-3 flex items-center">
            <img
              src="/kushina%20logo%202.png"
              alt="Kushena logo"
              className="h-20 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-semibold tracking-tight text-yellow-500">
              Kushena
            </span>
            <span className="text-sm text-slate-300">
              Fresh. Fast. To your door.
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 text-[16px] font-medium text-white md:flex">
          <Link 
            to="/" 
            className={`relative transition-colors ${
              isActive('/') 
                ? 'text-yellow-500 font-semibold' 
                : 'hover:text-yellow-400'
            }`}
          >
            Home
            {isActive('/') && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"></span>
            )}
          </Link>
          <Link 
            to="/restaurants" 
            className={`relative transition-colors group ${
              isActive('/restaurants') 
                ? 'text-yellow-500 font-semibold' 
                : 'hover:text-yellow-400'
            }`}
          >
            Restaurant
            {isActive('/restaurants') && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"></span>
            )}
            {!isActive('/restaurants') && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            )}
          </Link>
          <a 
            href="#about" 
            className="hover:text-yellow-400 transition-colors relative group text-white"
          >
            About
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </a>
          <a 
            href="#contact" 
            className="hover:text-yellow-400 transition-colors relative group text-white"
          >
            Contact
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </a>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/signin"
            className={`flex items-center gap-2 text-white hover:text-yellow-400 transition-colors ${
              isActive('/signin') ? 'text-yellow-500' : ''
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[16px] font-medium">Sign in</span>
          </Link>
          <button className="rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 px-6 py-2.5 text-[16px] font-semibold text-white shadow-md shadow-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/50 transition-all hover:opacity-90 active:scale-[0.98]">
            Order now
          </button>
        </div>

        {/* Mobile button */}
        <button
          onClick={toggleMobileMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-yellow-500/50 text-white md:hidden transition-colors hover:bg-yellow-500/10"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-yellow-500/20 bg-black animate-fadeIn">
          <div className="mx-auto max-w-6xl px-4 py-4 space-y-1">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`block py-2.5 px-3 rounded-lg text-[16px] font-medium transition-colors ${
                isActive('/')
                  ? 'bg-yellow-500/20 text-yellow-500 font-semibold'
                  : 'text-white hover:text-yellow-400 hover:bg-yellow-500/10'
              }`}
            >
              Home
            </Link>
            <Link
              to="/restaurants"
              onClick={closeMobileMenu}
              className={`block py-2.5 px-3 rounded-lg text-[16px] font-medium transition-colors ${
                isActive('/restaurants')
                  ? 'bg-yellow-500/20 text-yellow-500 font-semibold'
                  : 'text-white hover:text-yellow-400 hover:bg-yellow-500/10'
              }`}
            >
              Restaurant
            </Link>
            <a
              href="#about"
              onClick={closeMobileMenu}
              className="block py-2.5 px-3 rounded-lg text-[16px] font-medium text-white hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="block py-2.5 px-3 rounded-lg text-[16px] font-medium text-white hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors"
            >
              Contact
            </a>
            <div className="pt-3 space-y-2 border-t border-yellow-500/20">
              <Link
                to="/signin"
                onClick={closeMobileMenu}
                className={`flex items-center gap-2 py-2.5 px-3 rounded-lg text-[16px] font-medium text-white hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors ${
                  isActive('/signin') ? 'text-yellow-500 bg-yellow-500/20' : ''
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Sign in</span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="w-full rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 px-6 py-2.5 text-[16px] font-semibold text-white shadow-md shadow-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/50 transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Order now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

