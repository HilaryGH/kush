import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick,
  variant = 'default',
  padding = 'md'
}: CardProps) => {
  const variants = {
    default: 'bg-white rounded-xl border border-yellow-200 shadow-sm',
    elevated: 'bg-white rounded-xl border border-yellow-200 shadow-md',
    outlined: 'bg-white rounded-xl border-2 border-yellow-300 shadow-none'
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const hoverStyles = hover || onClick
    ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:border-yellow-400'
    : ''
  
  return (
    <div
      className={`
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverStyles}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
