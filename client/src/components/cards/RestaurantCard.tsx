import { Link } from 'react-router-dom'
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
  isOpen = true,
}: RestaurantCardProps) => {
  return (
    <Link
      to={`/dashboard/restaurant/${id}`}
      className="group overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.11)]"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(15,23,42,0.04),_rgba(15,23,42,0.58))]" />
        {!isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Badge variant="error">Closed</Badge>
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {distance && <Badge className="border border-white/30 bg-white/90 text-slate-900">{distance}</Badge>}
          <Badge
            variant={isOpen ? 'success' : 'error'}
            className={isOpen ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : ''}
          >
            {isOpen ? 'Open now' : 'Closed'}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="line-clamp-1 text-xl font-semibold text-slate-900">{name}</h3>
            {cuisine && <p className="mt-2 text-sm text-slate-500">{cuisine}</p>}
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{priceRange}</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="font-semibold">{rating.toFixed(1)}</span>
            </div>
            <span>{deliveryTime}</span>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
            View
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCard
