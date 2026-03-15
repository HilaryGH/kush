import { useState } from 'react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

interface MenuItemCardProps {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  badge?: string
  onAddToCart?: (id: string) => void
}

const MenuItemCard = ({
  id,
  name,
  description,
  price,
  image,
  badge,
  onAddToCart
}: MenuItemCardProps) => {
  const [isAdding, setIsAdding] = useState(false)
  
  const handleAddToCart = async () => {
    if (onAddToCart) {
      setIsAdding(true)
      await onAddToCart(id)
      setIsAdding(false)
    }
  }
  
  return (
    <Card className="overflow-hidden">
      <div className="flex gap-4 p-4">
        {image && (
          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-slate-900 line-clamp-2">{name}</h3>
            {badge && <Badge size="sm">{badge}</Badge>}
          </div>
          {description && (
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">{description}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-slate-900">${price.toFixed(2)}</span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              isLoading={isAdding}
              className="flex-shrink-0"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default MenuItemCard
