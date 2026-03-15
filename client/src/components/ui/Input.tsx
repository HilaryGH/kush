import { forwardRef, useState } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  success?: boolean
  icon?: React.ReactNode
  floatingLabel?: boolean
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    success, 
    icon, 
    floatingLabel = false,
    helperText,
    className = '', 
    id,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    const baseStyles = 'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const stateStyles = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50'
      : success
      ? 'border-green-300 focus:border-green-500 focus:ring-green-500 bg-green-50'
      : 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 bg-white hover:border-yellow-400'

    const iconPadding = icon ? 'pl-11' : ''
    const floatingLabelStyles = floatingLabel && (isFocused || hasValue || props.value)
      ? 'pt-5 pb-1'
      : ''

    return (
      <div className="relative">
        {label && !floatingLabel && (
          <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {icon}
            </div>
          )}
          
          {floatingLabel && label && (
            <label
              htmlFor={inputId}
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                isFocused || hasValue || props.value
                  ? 'top-2 text-xs font-semibold text-yellow-600'
                  : 'top-1/2 -translate-y-1/2 text-sm text-slate-500'
              } ${icon ? 'left-11' : ''}`}
            >
              {label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          <input
            {...props}
            ref={ref}
            id={inputId}
            className={`${baseStyles} ${stateStyles} ${iconPadding} ${floatingLabelStyles} ${className}`}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            onChange={handleChange}
          />
        </div>
        
        {(error || helperText) && (
          <p className={`mt-1.5 text-sm ${error ? 'text-red-600' : 'text-slate-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
