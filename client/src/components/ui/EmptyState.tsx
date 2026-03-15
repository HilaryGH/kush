import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const EmptyState = ({ icon, title, description, action, size = 'md' }: EmptyStateProps) => {
  const sizes = {
    sm: { icon: 'w-16 h-16', title: 'text-lg', padding: 'py-8' },
    md: { icon: 'w-24 h-24', title: 'text-xl', padding: 'py-12' },
    lg: { icon: 'w-32 h-32', title: 'text-2xl', padding: 'py-16' }
  }
  
  const currentSize = sizes[size]
  
  return (
    <div className={`flex flex-col items-center justify-center ${currentSize.padding} px-4 text-center animate-fadeIn`}>
      {icon && (
        <div className={`mb-6 text-slate-300 ${currentSize.icon} flex items-center justify-center`}>
          {icon}
        </div>
      )}
      <h3 className={`${currentSize.title} font-bold text-slate-900 mb-3`}>{title}</h3>
      {description && (
        <p className="text-slate-600 mb-8 max-w-md leading-relaxed">{description}</p>
      )}
      {action && (
        <div className="flex items-center justify-center">
          {action}
        </div>
      )}
    </div>
  )
}

export default EmptyState
