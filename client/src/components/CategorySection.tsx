import { Car, origins } from '@/data/cars';
import CarCard from './CarCard';

interface CategorySectionProps {
  title: string;
  description: string;
  cars: Car[];
  origin: 'japanese' | 'korean' | 'chinese';
  image: string;
}

export default function CategorySection({
  title,
  description,
  cars,
  origin,
  image,
}: CategorySectionProps) {
  const originInfo = origins[origin];

  return (
    <section className="py-16 md:py-24">
      {/* Category Header */}
      <div className="mb-12">
        <div className="relative h-80 rounded-lg overflow-hidden mb-8">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {title}
            </h2>
            <p className="text-lg text-white/90 max-w-2xl">{description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">عدد السيارات</p>
            <p className="text-2xl font-semibold text-foreground">
              {cars.length}
            </p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div>
            <p className="text-muted-foreground mb-1">الفئة</p>
            <p
              className="text-lg font-semibold"
              style={{ color: originInfo.color }}
            >
              {originInfo.label}
            </p>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
