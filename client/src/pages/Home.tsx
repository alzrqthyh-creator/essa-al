import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CategorySection from '@/components/CategorySection';
import CarCard from '@/components/CarCard';
import { cars, getCarsByOrigin } from '@/data/cars';
import { useState } from 'react';
import { Search } from 'lucide-react';

/**
 * Home Page - Taran Taran Car Sales
 * Design: Luxury Minimal
 * Colors: Pure white with deep blue and soft gold
 * Fonts: Playfair Display for headings, Lato for body
 */

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState<'all' | 'japanese' | 'korean' | 'chinese'>('all');

  const japaneseCars = getCarsByOrigin('japanese');
  const koreanCars = getCarsByOrigin('korean');
  const chineseCars = getCarsByOrigin('chinese');

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.includes(searchQuery) ||
      car.brand.includes(searchQuery) ||
      car.model.includes(searchQuery);
    const matchesOrigin = selectedOrigin === 'all' || car.origin === selectedOrigin;
    return matchesSearch && matchesOrigin;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-primary">ترن ترن</h1>
          <div className="hidden md:flex items-center gap-8">
            <a href="#japanese" className="text-sm text-foreground hover:text-primary transition">
              ياباني
            </a>
            <a href="#korean" className="text-sm text-foreground hover:text-primary transition">
              كوري
            </a>
            <a href="#chinese" className="text-sm text-foreground hover:text-primary transition">
              صيني
            </a>
          </div>
          <Button variant="outline" className="text-sm">اتصل بنا</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663645755027/6mD8i9pV2MdidwFy8CNpmu/hero-banner-92E74z5PghUp3g2ZoZgCPX.webp"
          alt="Hero Banner"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" />

        <div className="relative z-10 container text-center text-white max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            ترن ترن لبيع السيارات
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            اكتشف افضل السيارات اليابانية والكورية والصينية بأسعار تنافسية في العراق
          </p>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8"
          >
            استكشف الآن
          </Button>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-secondary py-8 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="ابحث عن السيارة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 py-2 bg-white"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'japanese', 'korean', 'chinese'] as const).map((origin) => (
                <Button
                  key={origin}
                  variant={selectedOrigin === origin ? 'default' : 'outline'}
                  onClick={() => setSelectedOrigin(origin)}
                >
                  {origin === 'all'
                    ? 'الكل'
                    : origin === 'japanese'
                      ? 'ياباني'
                      : origin === 'korean'
                        ? 'كوري'
                        : 'صيني'}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && (
        <section className="container py-12">
          <h3 className="text-2xl font-semibold mb-8">
            نتائج البحث ({filteredCars.length})
          </h3>
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لم نجد سيارات تطابق بحثك</p>
            </div>
          )}
        </section>
      )}

      {/* Categories */}
      {!searchQuery && (
        <>
          {/* Japanese Cars */}
          <section id="japanese" className="container">
            <CategorySection
              title="السيارات اليابانية"
              description="اكتشف افضل السيارات اليابانية الموثوقة والعالية الجودة من تويوتا ونيسان وسوزوكي"
              cars={japaneseCars}
              origin="japanese"
              image="https://d2xsxph8kpxj0f.cloudfront.net/310519663645755027/6mD8i9pV2MdidwFy8CNpmu/japanese-cars-hero-AtnfPg9YzpeiE3HdDukjGe.webp"
            />
          </section>

          {/* Korean Cars */}
          <section id="korean" className="container">
            <CategorySection
              title="السيارات الكورية"
              description="استمتع بالتصاميم الحديثة والتقنيات المتطورة من كيا وهيونداي"
              cars={koreanCars}
              origin="korean"
              image="https://d2xsxph8kpxj0f.cloudfront.net/310519663645755027/6mD8i9pV2MdidwFy8CNpmu/korean-cars-hero-FTWGr352VsKggBwyKSAs3b.webp"
            />
          </section>

          {/* Chinese Cars */}
          <section id="chinese" className="container">
            <CategorySection
              title="السيارات الصينية"
              description="اكتشف السيارات الصينية الحديثة بأسعار منافسة من شيري وجيلي وأم جي"
              cars={chineseCars}
              origin="chinese"
              image="https://d2xsxph8kpxj0f.cloudfront.net/310519663645755027/6mD8i9pV2MdidwFy8CNpmu/chinese-cars-hero-c6qGR3S5EqJqEGipBTcHoq.webp"
            />
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 border-t border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">ترن ترن</h4>
              <p className="text-sm text-primary-foreground/80">
                منصة موثوقة لبيع السيارات الفاخرة في العراق
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">الفئات</h5>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#japanese" className="hover:text-white transition">السيارات اليابانية</a></li>
                <li><a href="#korean" className="hover:text-white transition">السيارات الكورية</a></li>
                <li><a href="#chinese" className="hover:text-white transition">السيارات الصينية</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">الروابط</h5>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-white transition">عن الموقع</a></li>
                <li><a href="#" className="hover:text-white transition">الشروط والاحكام</a></li>
                <li><a href="#" className="hover:text-white transition">سياسة الخصوصية</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">التواصل</h5>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>البريد: info@taran-taran.com</li>
                <li>الهاتف: +964 XXX XXXX</li>
                <li>العنوان: بغداد، العراق</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; 2026 ترن ترن. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
