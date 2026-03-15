import { Link } from 'react-router-dom'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

interface RestaurantCardProps {
  id: string
  name: string
  image: string
  rating: number
  deliveryTime: string
  priceRange: string
  distance?: string
  cuisine?: string
  isOpen?: boolean
}

const RestaurantCard = ({
  id,
  name,
  image,
  rating,
  deliveryTime,
  priceRange,
  distance,
  cuisine,
  isOpen = true
}: RestaurantCardProps) => {
  return (
    <Link to={`/dashboard/restaurant/${id}`}>
      <Card hover className="overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {!isOpen && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="error">Closed</Badge>
            </div>
          )}
          {distance && (
            <div className="absolute top-3 left-3">
              <Badge variant="default">{distance}</Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{name}</h3>
          {cuisine && (
            <p className="text-sm text-slate-500 mb-2">{cuisine}</p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span className="ml-1 text-sm font-semibold text-slate-900">{rating.toFixed(1)}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-sm text-slate-600">{deliveryTime}</span>
            </div>
            <span className="text-sm font-medium text-slate-600">{priceRange}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default RestaurantCard
