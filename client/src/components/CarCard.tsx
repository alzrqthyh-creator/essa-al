import { Car, formatPrice, origins } from '@/data/cars';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const originInfo = origins[car.origin];

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-secondary">
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Origin Badge */}
        <div className="absolute top-3 right-3">
          <Badge
            className="bg-accent text-accent-foreground font-semibold"
            style={{ backgroundColor: originInfo.color }}
          >
            {originInfo.label}
          </Badge>
        </div>

        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant={car.condition === 'new' ? 'default' : 'secondary'}
            className="font-semibold"
          >
            {car.condition === 'new' ? 'جديد' : 'مستعمل'}
          </Badge>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
        >
          <Heart
            size={20}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand and Model */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground">
            {car.brand}
          </h3>
          <p className="text-sm text-muted-foreground">{car.model}</p>
        </div>

        {/* Year and Transmission */}
        <div className="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{car.year}</span>
          <span>•</span>
          <span>{car.transmission}</span>
          <span>•</span>
          <span>{car.fuelType}</span>
        </div>

        {/* Features */}
        <div className="mb-4 flex flex-wrap gap-1">
          {car.features.slice(0, 2).map((feature, idx) => (
            <span
              key={idx}
              className="inline-block bg-secondary px-2 py-1 text-xs text-foreground rounded"
            >
              {feature}
            </span>
          ))}
          {car.features.length > 2 && (
            <span className="inline-block bg-secondary px-2 py-1 text-xs text-muted-foreground rounded">
              +{car.features.length - 2}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-4 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground mb-1">السعر</p>
          <p className="text-2xl font-semibold text-primary">
            {formatPrice(car.price)}
          </p>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          عرض التفاصيل
        </Button>
      </div>
    </div>
  );
}
