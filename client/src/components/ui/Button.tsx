import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props 
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'
  
  const variants = {
    primary: 'bg-gradient-to-r from-yellow-400 to-red-500 text-white hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(249,115,22,0.28)] focus:ring-yellow-500 hover:opacity-90',
    secondary: 'bg-gradient-to-r from-yellow-300 to-yellow-500 text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(245,158,11,0.22)] focus:ring-yellow-400',
    outline: 'border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 focus:ring-yellow-500 hover:border-yellow-500',
    ghost: 'text-yellow-700 hover:bg-yellow-50 focus:ring-yellow-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 hover:shadow-md hover:shadow-green-200/50',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 hover:shadow-md hover:shadow-red-200/50'
  }
  
  const sizes = {
    sm: 'px-4 py-2.5 text-sm gap-1.5',
    md: 'px-6 py-3.5 text-base gap-2',
    lg: 'px-8 py-4.5 text-lg gap-2'
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}

export default Button
