import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';
import { Star, Heart, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { openProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-white border border-slate-200/80 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
      {/* Visual Image container (65-70% height emphasis) */}
      <div
        onClick={() => openProduct(product.id)}
        className="relative w-full aspect-[4/3] bg-slate-50/70 p-4 cursor-pointer overflow-hidden flex items-center justify-center border-b border-slate-100"
      >
        <ProductVisual
          type={product.visualType}
          themeColor={product.themeColor}
          altText={product.title}
          className="w-full h-full"
        />

        {/* Wishlist Quick Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/90 text-slate-400 hover:text-rose-600 shadow-sm'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quiet editorial deal indicator (no candy pill, subtle clean text) */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded tracking-tight">
            Save {product.discountPercentage}%
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed clean metadata (Zero-Pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span className="font-medium text-slate-700 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openProduct(product.id)}
            className="text-sm font-semibold text-slate-900 line-clamp-2 hover:text-emerald-700 cursor-pointer transition-colors leading-snug"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Customer Reviews Score */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-semibold ml-1 text-slate-800">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">
              {product.reviewCount.toLocaleString()} reviews
            </span>
          </div>

          {/* Delivery Note */}
          <p className="text-xs text-emerald-700 font-medium mt-1.5 flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-600" />
            {product.deliveryTime}
          </p>
        </div>

        {/* Pricing Baseline and Quick Add Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500">
              {product.inStock ? 'In Stock' : 'Temporarily Out of Stock'}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className="p-2.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center justify-center shadow-xs disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-emerald-600"
            aria-label="Add to cart"
            title="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
