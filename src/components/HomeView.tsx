import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST } from '../data/products';
import { ChevronRight, Sparkles, TrendingUp, Tag, Clock } from 'lucide-react';
import { Product } from '../types';

export const HomeView: React.FC = () => {
  const { products, setCategory } = useShop();

  // Non-repeating sections: Today's Deals -> Popular -> Recommended -> New Arrivals
  const { deals, popular, recommended, newArrivals } = useMemo(() => {
    const usedIds = new Set<string>();

    // 1. Today's Deals: highest discountPercentage
    const sortedDeals = [...products]
      .filter((p) => (p.discountPercentage || 0) > 0 && p.originalPrice > p.price)
      .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));

    const pickedDeals: Product[] = [];
    for (const p of sortedDeals) {
      if (!usedIds.has(p.id)) {
        pickedDeals.push(p);
        usedIds.add(p.id);
        if (pickedDeals.length === 4) break;
      }
    }

    // 2. Popular: most reviews
    const sortedPopular = [...products]
      .filter((p) => !usedIds.has(p.id))
      .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));

    const pickedPopular: Product[] = [];
    for (const p of sortedPopular) {
      if (!usedIds.has(p.id)) {
        pickedPopular.push(p);
        usedIds.add(p.id);
        if (pickedPopular.length === 4) break;
      }
    }

    // 3. Recommended: diverse selection across distinct categories with high rating
    const sortedRecommended = [...products]
      .filter((p) => !usedIds.has(p.id))
      .sort((a, b) => b.rating - a.rating);

    const pickedRecommended: Product[] = [];
    const recommendedCategories = new Set<string>();

    // Try to pick diverse categories first
    for (const p of sortedRecommended) {
      if (!usedIds.has(p.id) && !recommendedCategories.has(p.category)) {
        pickedRecommended.push(p);
        usedIds.add(p.id);
        recommendedCategories.add(p.category);
        if (pickedRecommended.length === 4) break;
      }
    }
    // Fill remaining if needed
    if (pickedRecommended.length < 4) {
      for (const p of sortedRecommended) {
        if (!usedIds.has(p.id)) {
          pickedRecommended.push(p);
          usedIds.add(p.id);
          if (pickedRecommended.length === 4) break;
        }
      }
    }

    // 4. New Arrivals: isNew flag or newest createdAt
    const sortedNewArrivals = [...products]
      .filter((p) => !usedIds.has(p.id))
      .sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return b.createdAt.localeCompare(a.createdAt);
      });

    const pickedNewArrivals: Product[] = [];
    for (const p of sortedNewArrivals) {
      if (!usedIds.has(p.id)) {
        pickedNewArrivals.push(p);
        usedIds.add(p.id);
        if (pickedNewArrivals.length === 4) break;
      }
    }

    return {
      deals: pickedDeals,
      popular: pickedPopular,
      recommended: pickedRecommended,
      newArrivals: pickedNewArrivals,
    };
  }, [products]);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pb-12 space-y-12">
      {/* 2-column restrained Hero Banner */}
      <HeroBanner />

      {/* Category Navigation Cards */}
      <section>
        <div className="flex items-baseline justify-between mb-4 border-b border-[#E5E5E2] pb-2">
          <div>
            <h2 className="text-[20px] font-bold text-[#1A1A1A]">Shop by category</h2>
            <p className="text-xs text-[#5C5C5C]">9 curated departments, 20 products each</p>
          </div>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            <span>View all 180 products</span>
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES_LIST.filter((c) => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className="p-3 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[8px] hover:border-[#0F766E] text-left transition-colors flex flex-col justify-between h-20 group"
            >
              <span className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#0F766E]">
                {cat.name}
              </span>
              <span className="text-xs text-[#5C5C5C]">20 products</span>
            </button>
          ))}
        </div>
      </section>

      {/* 1. Today's Deals Section (Highest discount) */}
      <section>
        <div className="flex items-baseline justify-between mb-4 border-b border-[#E5E5E2] pb-2">
          <div className="flex items-center gap-2">
            <Tag size={18} className="text-[#F97316]" />
            <div>
              <h2 className="text-[20px] font-bold text-[#1A1A1A]">Today&apos;s Deals</h2>
              <p className="text-xs text-[#5C5C5C]">Highest discounted offers across our catalog</p>
            </div>
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

      {/* 2. Popular Products (Most reviews) */}
      <section>
        <div className="flex items-baseline justify-between mb-4 border-b border-[#E5E5E2] pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-[#0F766E]" />
            <div>
              <h2 className="text-[20px] font-bold text-[#1A1A1A]">Popular Products</h2>
              <p className="text-xs text-[#5C5C5C]">Most reviewed items by certified customers</p>
            </div>
          </div>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            <span>Browse top rated</span>
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Recommended Products (Seeded shuffle / diverse) */}
      <section>
        <div className="flex items-baseline justify-between mb-4 border-b border-[#E5E5E2] pb-2">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#0F766E]" />
            <div>
              <h2 className="text-[20px] font-bold text-[#1A1A1A]">Recommended for You</h2>
              <p className="text-xs text-[#5C5C5C]">Hand-picked selections tailored to your taste</p>
            </div>
          </div>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            <span>Explore more</span>
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. New Arrivals (isNew & latest createdAt) */}
      <section>
        <div className="flex items-baseline justify-between mb-4 border-b border-[#E5E5E2] pb-2">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-[#0F766E]" />
            <div>
              <h2 className="text-[20px] font-bold text-[#1A1A1A]">New Arrivals</h2>
              <p className="text-xs text-[#5C5C5C]">Freshly added to the catalog this season</p>
            </div>
          </div>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            <span>View new releases</span>
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
