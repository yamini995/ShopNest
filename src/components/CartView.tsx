import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Bookmark, ArrowRight, ShieldCheck, Tag, X } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { ProductImage } from './ProductImage';

interface CartViewProps {
  onProceedToCheckout: () => void;
}

export const CartView: React.FC<CartViewProps> = ({ onProceedToCheckout }) => {
  const {
    cart,
    savedForLater,
    updateCartQuantity,
    removeFromCart,
    saveForLater,
    moveToCartFromSaved,
    removeSavedItem,
    openProduct,
    setActivePage,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    cartSubtotal,
    cartDiscount,
    deliveryCharge,
    cartTotal,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="max-w-md mx-auto bg-[#F7F7F5] border border-[#E5E5E2] rounded-[8px] p-8 space-y-3">
          <h2 className="text-[20px] font-bold text-[#1A1A1A]">Your cart is empty</h2>
          <p className="text-xs text-[#5C5C5C]">
            Looks like you haven&apos;t added any items to your shopping cart yet.
          </p>
          <button
            onClick={() => setActivePage('listing')}
            className="mt-4 h-10 px-6 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white text-xs font-semibold rounded-[6px] transition-colors"
          >
            Start shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 text-left space-y-8">
      <h1 className="text-[28px] font-bold text-[#1A1A1A]">Shopping cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {cart.length > 0 ? (
            <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] divide-y divide-[#E5E5E2]">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 justify-between">
                  {/* Image and Details */}
                  <div className="flex gap-4 flex-1">
                    <div
                      onClick={() => openProduct(item.product.id)}
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[6px] p-2 shrink-0 cursor-pointer flex items-center justify-center hover:border-[#5C5C5C] transition-colors overflow-hidden"
                    >
                      <ProductImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        category={item.product.category}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <p className="text-xs uppercase tracking-wide text-[#5C5C5C] font-medium">
                        {item.product.brand}
                      </p>
                      <h3
                        onClick={() => openProduct(item.product.id)}
                        className="text-sm font-semibold text-[#1A1A1A] hover:text-[#0F766E] cursor-pointer line-clamp-2"
                      >
                        {item.product.name}
                      </h3>

                      {(item.selectedColor || item.selectedSize) && (
                        <div className="flex items-center gap-3 text-xs text-[#5C5C5C] pt-0.5">
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        </div>
                      )}

                      <p className="text-xs text-[#5C5C5C] pt-0.5">
                        {item.product.stock > 0 ? (
                          <span className="text-[#16A34A] font-medium">In stock</span>
                        ) : (
                          <span className="text-[#DC2626]">Out of stock</span>
                        )}
                      </p>

                      {/* Controls for mobile */}
                      <div className="flex items-center gap-4 pt-2 text-xs">
                        <div className="flex items-center border border-[#E5E5E2] rounded-[6px]">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center font-semibold text-[#1A1A1A] hover:bg-[#F7F7F5]"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center font-semibold text-[#1A1A1A] hover:bg-[#F7F7F5]"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            saveForLater(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="text-xs text-[#5C5C5C] hover:text-[#0F766E] underline"
                        >
                          Save for later
                        </button>

                        <button
                          onClick={() =>
                            removeFromCart(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="text-xs text-[#DC2626] hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price info right */}
                  <div className="text-right sm:self-start">
                    <span className="text-base font-bold text-[#1A1A1A] tabular-nums block">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-xs text-[#5C5C5C] block">
                        {formatPrice(item.product.price)} each
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] p-6 text-center">
              <p className="text-xs text-[#5C5C5C]">All items moved to saved for later.</p>
            </div>
          )}

          {/* Saved for Later Section */}
          {savedForLater.length > 0 && (
            <div className="pt-4">
              <h2 className="text-[20px] font-bold text-[#1A1A1A] mb-3">
                Saved for later ({savedForLater.length} {savedForLater.length === 1 ? 'item' : 'items'})
              </h2>

              <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] divide-y divide-[#E5E5E2]">
                {savedForLater.map((saved) => (
                  <div
                    key={`${saved.product.id}-${saved.selectedColor || ''}`}
                    className="p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => openProduct(saved.product.id)}
                        className="w-16 h-16 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[6px] p-1.5 shrink-0 cursor-pointer overflow-hidden"
                      >
                        <ProductImage
                          src={saved.product.images[0]}
                          alt={saved.product.name}
                          category={saved.product.category}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h4
                          onClick={() => openProduct(saved.product.id)}
                          className="text-xs font-semibold text-[#1A1A1A] hover:text-[#0F766E] cursor-pointer line-clamp-1"
                        >
                          {saved.product.name}
                        </h4>
                        <span className="text-xs font-bold text-[#1A1A1A] tabular-nums block mt-0.5">
                          {formatPrice(saved.product.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <button
                        onClick={() => moveToCartFromSaved(saved.product.id)}
                        className="h-8 px-3 bg-[#0F766E] text-white font-semibold rounded-[6px] hover:bg-[#115E59] transition-colors"
                      >
                        Move to cart
                      </button>
                      <button
                        onClick={() => removeSavedItem(saved.product.id)}
                        className="text-xs text-[#5C5C5C] hover:text-[#DC2626]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary (lg:col-span-4) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] p-5 space-y-4">
            <h2 className="text-base font-bold text-[#1A1A1A] border-b border-[#E5E5E2] pb-3">
              Order summary
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#5C5C5C]">
                <span>Subtotal</span>
                <span className="text-[#1A1A1A] font-medium tabular-nums">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex items-center justify-between text-[#16A34A]">
                  <span>Discount ({couponCode})</span>
                  <span className="font-semibold tabular-nums">
                    -{formatPrice(cartDiscount)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-[#5C5C5C]">
                <span>Delivery</span>
                <span className="text-[#1A1A1A] font-medium">
                  {deliveryCharge === 0 ? (
                    <span className="text-[#16A34A] font-semibold">FREE</span>
                  ) : (
                    formatPrice(deliveryCharge)
                  )}
                </span>
              </div>

              <div className="border-t border-[#E5E5E2] pt-3 flex items-baseline justify-between">
                <span className="text-sm font-bold text-[#1A1A1A]">Total</span>
                <span className="text-[20px] font-bold text-[#1A1A1A] tabular-nums">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="border-t border-[#E5E5E2] pt-3">
              {couponCode ? (
                <div className="flex items-center justify-between p-2 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[6px] text-xs">
                  <div className="flex items-center gap-1.5 text-[#16A34A] font-semibold">
                    <Tag size={14} />
                    <span>{couponCode} applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#5C5C5C] hover:text-[#DC2626]"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-xs text-[#1A1A1A] uppercase focus:border-[#0F766E] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="h-9 px-3 bg-[#FFFFFF] border border-[#E5E5E2] hover:border-[#1A1A1A] rounded-[6px] text-xs font-semibold text-[#1A1A1A] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoFeedback && (
                    <p
                      className={`text-[11px] ${
                        promoFeedback.success ? 'text-[#16A34A]' : 'text-[#DC2626]'
                      }`}
                    >
                      {promoFeedback.message}
                    </p>
                  )}
                  <p className="text-[11px] text-[#5C5C5C]">
                    Try code: <strong className="text-[#1A1A1A]">SHOPNEST10</strong> or <strong className="text-[#1A1A1A]">WELCOME20</strong>
                  </p>
                </form>
              )}
            </div>

            {/* Proceed to checkout button */}
            <button
              onClick={onProceedToCheckout}
              disabled={cart.length === 0}
              className="w-full h-11 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white text-xs font-semibold rounded-[6px] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>Proceed to checkout</span>
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>

            <p className="text-[11px] text-[#5C5C5C] text-center">
              Free delivery over ₹499. Returns within 7 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
