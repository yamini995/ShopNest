import React from 'react';
import { useShop } from '../context/ShopContext';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST } from '../data/products';
import {
  Sparkles,
  Flame,
  ThumbsUp,
  ArrowRight,
  Headphones,
  Laptop,
  Watch,
  Tv,
  Home,
  Coffee,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  electronics: <Tv className="w-5 h-5 text-indigo-500" />,
  audio: <Headphones className="w-5 h-5 text-sky-500" />,
  computers: <Laptop className="w-5 h-5 text-emerald-500" />,
  wearables: <Watch className="w-5 h-5 text-purple-500" />,
  'home-living': <Home className="w-5 h-5 text-amber-500" />,
  lifestyle: <Coffee className="w-5 h-5 text-rose-500" />,
};

export const HomeView: React.FC = () => {
  const { products, setCategory } = useShop();

  const dealsOfDay = products.filter((p) => p.isDealOfDay).slice(0, 4);
  const popularProducts = products.filter((p) => p.isPopular).slice(0, 4);
  const recommendedProducts = products.filter((p) => p.isRecommended || p.rating >= 4.8).slice(0, 4);

  return (
    <div className="pb-16 space-y-12">
      {/* Editorial Hero Banner */}
      <HeroBanner />

      {/* Category Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Explore Categories</h2>
            <span className="text-xs text-slate-500 font-medium">Curated collections</span>
          </div>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            View All Catalog <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES_LIST.filter((c) => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className="p-4 bg-white border border-slate-200/80 rounded-xl hover:border-slate-300 hover:shadow-sm text-left transition-all group flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-slate-100 transition-colors">
                {CATEGORY_ICONS[cat.id] || <Sparkles className="w-5 h-5 text-slate-600" />}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-slate-500 mt-0.5 block">{cat.count} Items</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Today's Deals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Today&apos;s Featured Deals</h2>
              <p className="text-xs text-slate-500">Limited-time promotional discounts with free priority delivery</p>
            </div>
          </div>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            See all deals
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealsOfDay.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Popular on ShopNest</h2>
              <p className="text-xs text-slate-500">Top-rated bestsellers loved by our community</p>
            </div>
          </div>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Browse popular
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Highlight Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              The ShopNest Standard
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Every item thoroughly vetted for quality, durability, and authenticity.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              We partner directly with leading brands and independent creators to guarantee factory-sealed units, comprehensive 2-year warranties, and hassle-free returns.
            </p>
          </div>
          <button
            onClick={() => setCategory('computers')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Explore Tech Catalog
          </button>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-indigo-100 text-indigo-800 flex items-center justify-center">
              <ThumbsUp className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recommended for You</h2>
              <p className="text-xs text-slate-500">Based on trending items and high customer satisfaction scores</p>
            </div>
          </div>
          <button
            onClick={() => setCategory('all')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            View recommendations
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
