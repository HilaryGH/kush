const LoadingSkeleton = ({ type = 'card' }: { type?: 'card' | 'text' | 'image' | 'circle' }) => {
  const baseStyles = 'animate-pulse bg-slate-200 rounded'
  
  if (type === 'card') {
    return (
      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
        <div className={`h-48 w-full ${baseStyles}`} />
        <div className="p-4 space-y-3">
          <div className={`h-5 w-3/4 ${baseStyles}`} />
          <div className={`h-4 w-1/2 ${baseStyles}`} />
          <div className={`h-4 w-full ${baseStyles}`} />
        </div>
      </div>
    )
  }
  
  if (type === 'text') {
    return (
      <div className="space-y-2">
        <div className={`h-4 w-full ${baseStyles}`} />
        <div className={`h-4 w-5/6 ${baseStyles}`} />
        <div className={`h-4 w-4/6 ${baseStyles}`} />
      </div>
    )
  }
  
  if (type === 'image') {
    return <div className={`w-full h-full ${baseStyles}`} />
  }
  
  if (type === 'circle') {
    return <div className={`w-12 h-12 rounded-full ${baseStyles}`} />
  }
  
  return null
}

export default LoadingSkeleton
