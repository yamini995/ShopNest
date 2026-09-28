import React from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { ProductImage } from './ProductImage';

export const WishlistView: React.FC = () => {
  const {
    products,
    wishlist,
    moveToCartFromWishlist,
    removeFromWishlist,
    openProduct,
    setActivePage,
  } = useShop();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="max-w-md mx-auto bg-[#F7F7F5] border border-[#E5E5E2] rounded-[8px] p-8 space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E5E5E2] text-[#5C5C5C] flex items-center justify-center mx-auto">
            <Heart size={20} strokeWidth={1.5} />
          </div>
          <h2 className="text-[20px] font-bold text-[#1A1A1A]">Your wishlist is empty</h2>
          <p className="text-xs text-[#5C5C5C]">
            Save items that you want to buy later by clicking the heart icon on any product.
          </p>
          <button
            onClick={() => setActivePage('listing')}
            className="mt-4 h-10 px-6 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white text-xs font-semibold rounded-[6px] transition-colors"
          >
            Explore products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 text-left space-y-6">
      <div className="border-b border-[#E5E5E2] pb-4 flex items-baseline justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#1A1A1A]">My wishlist</h1>
          <p className="text-xs text-[#5C5C5C]">
            {wishlistedProducts.length} saved {wishlistedProducts.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      {/* Grid of wishlisted products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {wishlistedProducts.map((product) => {
          const discountPercent =
            product.originalPrice > product.price
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

          return (
            <div
              key={product.id}
              className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] overflow-hidden flex flex-col justify-between hover:border-[#5C5C5C] transition-colors"
            >
              <div>
                <div
                  onClick={() => openProduct(product.id)}
                  className="relative aspect-square bg-[#F7F7F5] border-b border-[#E5E5E2] p-4 cursor-pointer flex items-center justify-center overflow-hidden"
                >
                  <ProductImage
                    src={product.images[0]}
                    alt={product.name}
                    category={product.category}
                    className="w-full h-full object-contain"
                  />
                  {discountPercent >= 15 && (
                    <span className="absolute top-2 left-2 bg-[#F97316] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[4px] z-10">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="p-3 space-y-1">
                  <p className="text-xs uppercase tracking-wide text-[#5C5C5C] font-medium">
                    {product.brand}
                  </p>
                  <h3
                    onClick={() => openProduct(product.id)}
                    className="text-[14px] font-medium text-[#1A1A1A] line-clamp-2 hover:text-[#0F766E] cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-bold text-[#1A1A1A] tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-[#5C5C5C] line-through tabular-nums">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#5C5C5C]">
                    {product.stock > 0 ? 'In stock' : 'Out of stock'}
                  </p>
                </div>
              </div>

              {/* Action buttons: Move to cart and Remove */}
              <div className="p-3 pt-0 flex gap-2">
                <button
                  onClick={() => moveToCartFromWishlist(product.id)}
                  disabled={product.stock <= 0}
                  className="flex-1 h-9 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white text-xs font-semibold rounded-[6px] transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <ShoppingCart size={14} strokeWidth={1.5} />
                  <span>Move to cart</span>
                </button>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="h-9 px-3 border border-[#E5E5E2] hover:border-[#DC2626] text-[#5C5C5C] hover:text-[#DC2626] rounded-[6px] transition-colors flex items-center justify-center"
                  aria-label="Remove from wishlist"
                  title="Remove"
                >
                  <Trash2 size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
