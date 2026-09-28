import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, Heart } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
  const isWishlisted = isInWishlist(product.id);

  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] overflow-hidden flex flex-col justify-between hover:border-[#5C5C5C] transition-colors duration-150 h-full text-left">
      <div>
        {/* Product Image on light neutral background with square aspect ratio */}
        <div
          onClick={() => openProduct(product.id)}
          className="relative w-full aspect-square bg-[#F7F7F5] border-b border-[#E5E5E2] cursor-pointer overflow-hidden flex items-center justify-center p-3"
        >
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            category={product.category}
            className="w-full h-full object-contain"
            containerClassName="w-full h-full relative flex items-center justify-center"
          />

          {/* Wishlist Icon in corner */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`absolute top-2 right-2 p-1.5 rounded-[6px] bg-[#FFFFFF] border border-[#E5E5E2] transition-colors ${
              isWishlisted
                ? 'text-[#0F766E]'
                : 'text-[#5C5C5C] hover:text-[#0F766E]'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            title="Wishlist"
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              className={isWishlisted ? 'fill-[#0F766E]' : ''}
            />
          </button>

          {/* Sale badge in top left (orange only for sale) */}
          {discountPercent >= 15 && (
            <span className="absolute top-2 left-2 bg-[#F97316] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[4px]">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="p-3">
          {/* Brand - small, gray */}
          <p className="text-xs text-[#5C5C5C] uppercase tracking-wide font-medium mb-1">
            {product.brand}
          </p>

          {/* Product Name - 14-15px, medium weight, max 2 lines */}
          <h3
            onClick={() => openProduct(product.id)}
            className="text-[14px] font-medium text-[#1A1A1A] line-clamp-2 cursor-pointer hover:text-[#0F766E] transition-colors leading-snug min-h-[40px]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating with review count */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <div className="flex items-center text-[#1A1A1A] font-semibold">
              <Star size={14} strokeWidth={1.5} className="fill-[#1A1A1A] text-[#1A1A1A] mr-1" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-[#5C5C5C]">
              ({product.reviewCount.toLocaleString('en-IN')})
            </span>
          </div>

          {/* Price row: current price bold, original struck through, discount % in green */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-[18px] font-bold text-[#1A1A1A] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xs text-[#5C5C5C] line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-semibold text-[#16A34A]">
                  {discountPercent}% off
                </span>
              </>
            )}
          </div>

          {/* Delivery line */}
          <p className="text-xs text-[#5C5C5C] mt-1">
            {product.deliveryDays === 1
              ? 'Free delivery tomorrow'
              : `Free delivery over ₹499`}
          </p>
        </div>
      </div>

      {/* Full-width Add to cart button */}
      <div className="p-3 pt-0">
        <button
          onClick={() => addToCart(product, 1)}
          disabled={product.stock <= 0}
          className="w-full h-9 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white text-xs font-semibold rounded-[6px] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.stock > 0 ? 'Add to cart' : 'Out of stock'}
        </button>
      </div>
    </div>
  );
};
