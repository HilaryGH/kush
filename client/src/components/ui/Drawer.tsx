import { useEffect } from 'react'
import type { ReactNode } from 'react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  position?: 'left' | 'right' | 'bottom'
  title?: string
}

const Drawer = ({ isOpen, onClose, children, position = 'right', title }: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  const positions = {
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0',
    bottom: 'left-0 right-0 bottom-0 rounded-t-2xl'
  }
  
  const widths = {
    left: 'w-full sm:w-96',
    right: 'w-full sm:w-96',
    bottom: 'w-full max-h-[90vh]'
  }
  
  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      <div className={`fixed ${positions[position]} ${widths[position]} z-50 bg-white shadow-2xl animate-slideIn${position === 'right' ? 'Right' : position === 'left' ? 'Left' : 'Up'} overflow-y-auto`}>
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-orange-100">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close drawer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </>
  )
}

export default Drawer
