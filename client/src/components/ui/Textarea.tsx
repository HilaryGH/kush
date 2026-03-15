import { forwardRef, useState } from 'react'
import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
  floatingLabel?: boolean
  maxLength?: number
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    success, 
    helperText,
    floatingLabel = false,
    maxLength,
    className = '', 
    id,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const valueLength = typeof props.value === 'string' ? props.value.length : 0
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    const baseStyles = 'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed resize-y'
    
    const stateStyles = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50'
      : success
      ? 'border-green-300 focus:border-green-500 focus:ring-green-500 bg-green-50'
      : 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 bg-white hover:border-yellow-400'

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
          {floatingLabel && label && (
            <label
              htmlFor={inputId}
              className={`absolute left-4 top-3 transition-all duration-200 pointer-events-none ${
                isFocused || hasValue || props.value
                  ? 'top-2 text-xs font-semibold text-yellow-600'
                  : 'text-sm text-slate-500'
              }`}
            >
              {label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          <textarea
            {...props}
            ref={ref}
            id={inputId}
            className={`${baseStyles} ${stateStyles} ${floatingLabelStyles} ${className}`}
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
        
        <div className="flex items-center justify-between mt-1.5">
          {(error || helperText) && (
            <p className={`text-sm ${error ? 'text-red-600' : 'text-slate-500'}`}>
              {error || helperText}
            </p>
          )}
          {maxLength && (
            <p className={`text-xs ml-auto ${valueLength > maxLength * 0.9 ? 'text-yellow-600' : 'text-slate-400'}`}>
              {valueLength} / {maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
