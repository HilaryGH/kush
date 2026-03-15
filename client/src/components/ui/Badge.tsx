import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  dot?: boolean
}

const Badge = ({ children, variant = 'default', size = 'md', className = '', dot = false }: BadgeProps) => {
  const variants = {
    default: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    primary: 'bg-gradient-to-r from-yellow-400 to-red-500 text-white border-0',
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    info: 'bg-blue-100 text-blue-800 border border-blue-200'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2'
  }
  
  const dotColors = {
    default: 'bg-yellow-500',
    primary: 'bg-white',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }
  
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${variants[variant]} ${sizes[size]} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} ${size === 'sm' ? 'w-1 h-1' : ''}`}></span>
      )}
      {children}
    </span>
  )
}

export default Badge
