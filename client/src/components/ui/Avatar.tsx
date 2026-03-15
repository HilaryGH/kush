
interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const Avatar = ({ src, alt, name, size = 'md', className = '' }: AvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white font-semibold ${className}`}>
      {src ? (
        <img src={src} alt={alt || name} className="w-full h-full object-cover" />
      ) : (
        <span>{name ? getInitials(name) : '?'}</span>
      )}
    </div>
  )
}

export default Avatar
