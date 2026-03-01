import { useState } from 'react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-yellow-300">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-visible -my-2 flex items-center">
            <img
              src="/kushina%20logo.png"
              alt="Kushena logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-semibold tracking-tight text-yellow-500">
              Kushena
            </span>
            <span className="text-sm text-slate-500">
              Fresh. Fast. To your door.
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 text-[16px] font-medium text-slate-700 md:flex">
          <a href="#how-it-works" className="hover:text-yellow-500 transition-colors">
            How it works
          </a>
          <a href="#menu" className="hover:text-yellow-500 transition-colors">
            Popular dishes
          </a>
          <a href="#cities" className="hover:text-yellow-500 transition-colors">
            Cities
          </a>
          <a href="#contact" className="hover:text-yellow-500 transition-colors">
            Contact
          </a>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-full border border-yellow-300 px-6 py-2.5 text-[16px] font-medium text-yellow-600 hover:border-yellow-400 hover:text-yellow-700 transition-colors">
            Sign in
          </button>
          <button className="rounded-full bg-gradient-to-r from-yellow-400 to-red-500 px-6 py-2.5 text-[16px] font-semibold text-black shadow-md shadow-yellow-200 hover:shadow-lg hover:shadow-yellow-300 transition-all">
            Order now
          </button>
        </div>

        {/* Mobile button */}
        <button
          onClick={toggleMobileMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-yellow-300 text-slate-700 md:hidden transition-colors hover:bg-yellow-50"
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
        <div className="md:hidden border-t border-yellow-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 space-y-3">
            <a
              href="#how-it-works"
              onClick={closeMobileMenu}
              className="block py-2.5 text-[16px] font-medium text-slate-700 hover:text-yellow-500 transition-colors"
            >
              How it works
            </a>
            <a
              href="#menu"
              onClick={closeMobileMenu}
              className="block py-2.5 text-[16px] font-medium text-slate-700 hover:text-yellow-500 transition-colors"
            >
              Popular dishes
            </a>
            <a
              href="#cities"
              onClick={closeMobileMenu}
              className="block py-2.5 text-[16px] font-medium text-slate-700 hover:text-yellow-500 transition-colors"
            >
              Cities
            </a>
            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="block py-2.5 text-[16px] font-medium text-slate-700 hover:text-yellow-500 transition-colors"
            >
              Contact
            </a>
            <div className="pt-3 space-y-2 border-t border-yellow-200">
              <button
                onClick={closeMobileMenu}
                className="w-full rounded-full border border-yellow-300 px-6 py-2.5 text-[16px] font-medium text-yellow-600 hover:border-yellow-400 hover:text-yellow-700 transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={closeMobileMenu}
                className="w-full rounded-full bg-gradient-to-r from-yellow-400 to-red-500 px-6 py-2.5 text-[16px] font-semibold text-black shadow-md shadow-yellow-200 hover:shadow-lg hover:shadow-yellow-300 transition-all"
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

