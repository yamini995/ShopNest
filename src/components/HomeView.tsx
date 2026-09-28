import React from 'react';
import { useShop } from '../context/ShopContext';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST } from '../data/products';
import { ChevronRight } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, setCategory } = useShop();

  // Deals: products with discount >= 20%
  const deals = products
    .filter((p) => p.originalPrice > p.price && (p.originalPrice - p.price) / p.originalPrice >= 0.2)
    .slice(0, 4);

  // Popular: high rating and review count
  const popular = products
    .filter((p) => p.rating >= 4.5)
    .slice(0, 4);

  // Recommended
  const recommended = products
    .filter((p) => p.price < 5000 && p.rating >= 4.3)
    .slice(0, 4);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pb-12 space-y-10">
      {/* Simple 2-column Hero Banner */}
      <HeroBanner />

      {/* Category Navigation Cards */}
      <section>
        <div className="flex items-baseline justify-between mb-4 border-b border-[#E5E5E2] pb-2">
          <h2 className="text-[20px] font-bold text-[#1A1A1A]">Shop by category</h2>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            <span>View all</span>
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES_LIST.filter((c) => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className="p-3 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[8px] hover:border-[#5C5C5C] text-left transition-colors flex flex-col justify-between h-20"
            >
              <span className="text-sm font-semibold text-[#1A1A1A]">{cat.name}</span>
              <span className="text-xs text-[#5C5C5C]">{cat.count} items</span>
            </button>
          ))}
        </div>
      </section>

      {/* Today's Deals Section */}
      <section>
        <div className="flex items-baseline justify-between mb-4 border-b border-[#E5E5E2] pb-2">
          <div>
            <h2 className="text-[20px] font-bold text-[#1A1A1A]">Today&apos;s deals</h2>
            <p className="text-xs text-[#5C5C5C]">Promotional prices available for a limited time</p>
          </div>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            <span>See all deals</span>
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section>
        <div className="flex items-baseline justify-between mb-4 border-b border-[#E5E5E2] pb-2">
          <div>
            <h2 className="text-[20px] font-bold text-[#1A1A1A]">Popular products</h2>
            <p className="text-xs text-[#5C5C5C]">Highest rated by customers this month</p>
          </div>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            <span>Browse catalog</span>
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Recommended Products */}
      <section>
        <div className="flex items-baseline justify-between mb-4 border-b border-[#E5E5E2] pb-2">
          <div>
            <h2 className="text-[20px] font-bold text-[#1A1A1A]">Recommended for you</h2>
            <p className="text-xs text-[#5C5C5C]">Everyday essentials with free delivery</p>
          </div>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            <span>See more</span>
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
