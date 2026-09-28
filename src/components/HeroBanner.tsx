import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/formatters';
import { ProductImage } from './ProductImage';

export const HeroBanner: React.FC = () => {
  const { products, openProduct } = useShop();

  // Pick a high-ticket featured tech deal from real products (e.g., Apple AirPods Max or MacBook)
  const featured =
    products.find((p) => p.name.includes('AirPods Max')) ||
    products.find((p) => p.category === 'Electronics') ||
    products[0];

  if (!featured) return null;

  const discountPercent =
    featured.originalPrice > featured.price
      ? Math.round(((featured.originalPrice - featured.price) / featured.originalPrice) * 100)
      : 20;

  return (
    <div className="bg-[#F7F7F5] border border-[#E5E5E2] rounded-[8px] overflow-hidden my-6">
      <div className="max-w-[1240px] mx-auto px-6 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Offer Copy */}
        <div className="space-y-3 text-left">
          <div className="inline-block bg-[#F97316] text-white text-xs font-semibold px-2.5 py-1 rounded-[4px]">
            Deal of the week
          </div>

          <h1 className="text-[28px] md:text-[40px] font-bold text-[#1A1A1A] leading-tight tracking-tight">
            {featured.name}
          </h1>

          <p className="text-sm md:text-base text-[#5C5C5C] leading-relaxed max-w-lg line-clamp-2">
            {featured.description}
          </p>

          <div className="pt-2 flex items-baseline gap-3">
            <span className="text-[28px] font-bold text-[#1A1A1A] tabular-nums">
              {formatPrice(featured.price)}
            </span>
            {featured.originalPrice > featured.price && (
              <span className="text-base text-[#5C5C5C] line-through tabular-nums">
                {formatPrice(featured.originalPrice)}
              </span>
            )}
            <span className="text-sm font-semibold text-[#16A34A]">
              Save {discountPercent}%
            </span>
          </div>

          <div className="pt-3">
            <button
              onClick={() => openProduct(featured.id)}
              className="h-10 px-6 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white text-sm font-semibold rounded-[6px] transition-colors"
            >
              Shop deal
            </button>
          </div>
        </div>

        {/* Right Column: Product Photo on light neutral background */}
        <div className="flex items-center justify-center">
          <div
            onClick={() => openProduct(featured.id)}
            className="w-full max-w-[400px] aspect-square bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] p-6 cursor-pointer flex items-center justify-center hover:border-[#5C5C5C] transition-colors overflow-hidden"
          >
            <ProductImage
              src={featured.images[0]}
              alt={featured.name}
              category={featured.category}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
