import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';
import {
  Trash2,
  Bookmark,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  RotateCcw,
} from 'lucide-react';

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
    cartSubtotal,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  const deliveryCharge = cartSubtotal >= 50 || cartSubtotal === 0 ? 0 : 9.99;
  const discountAmount = cartSubtotal * promoDiscount;
  const finalTotal = cartSubtotal - discountAmount + deliveryCharge;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode.trim());
      setInputCode('');
    }
  };

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Your ShopNest Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-2 mb-6">
          Explore today&apos;s featured deals, audio gear, and minimalist tech essentials.
        </p>
        <button
          onClick={() => setActivePage('listing')}
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
        Shopping Cart ({cart.reduce((a, c) => a + c.quantity, 0)} Items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items & Saved For Later */}
        <div className="lg:col-span-8 space-y-6">
          {cart.length > 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-xs">
              {cart.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Thumbnail */}
                  <div
                    onClick={() => openProduct(item.product.id)}
                    className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 rounded-xl p-2 cursor-pointer shrink-0 border border-slate-100 flex items-center justify-center"
                  >
                    <ProductVisual
                      type={item.product.visualType}
                      themeColor={item.product.themeColor}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {item.product.brand}
                          </span>
                          <h3
                            onClick={() => openProduct(item.product.id)}
                            className="text-sm sm:text-base font-semibold text-slate-900 hover:text-emerald-700 cursor-pointer transition-colors leading-snug"
                          >
                            {item.product.title}
                          </h3>
                        </div>
                        <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Variant metadata */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        {item.selectedColor && (
                          <span>Color: <strong className="text-slate-700">{item.selectedColor}</strong></span>
                        )}
                        {item.selectedSize && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>Option: <strong className="text-slate-700">{item.selectedSize}</strong></span>
                          </>
                        )}
                      </div>

                      <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        In Stock & Ready to Ship
                      </p>
                    </div>

                    {/* Quantity controls and Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 border-t border-slate-50">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold text-slate-900 tabular-nums min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-medium">
                        <button
                          onClick={() => saveForLater(item.product.id)}
                          className="text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                          Save for Later
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center text-slate-500 text-xs">
              No active items in your main cart. Items in your saved section are listed below.
            </div>
          )}

          {/* Saved For Later Section */}
          {savedForLater.length > 0 && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">
                  Saved for Later ({savedForLater.length} {savedForLater.length === 1 ? 'Item' : 'Items'})
                </h3>
              </div>

              <div className="divide-y divide-slate-100">
                {savedForLater.map((s) => (
                  <div key={s.product.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => openProduct(s.product.id)}
                        className="w-16 h-16 bg-slate-50 rounded-lg p-1.5 cursor-pointer border border-slate-100 shrink-0"
                      >
                        <ProductVisual type={s.product.visualType} className="w-full h-full" />
                      </div>
                      <div>
                        <h4
                          onClick={() => openProduct(s.product.id)}
                          className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-emerald-700 cursor-pointer line-clamp-1"
                        >
                          {s.product.title}
                        </h4>
                        <span className="text-xs font-bold text-slate-800 tabular-nums">
                          ${s.product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveToCartFromSaved(s.product.id)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeSavedItem(s.product.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary & Checkout Action */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6 lg:sticky lg:top-24">
          <h2 className="text-base font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          {/* Pricing calculations */}
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>

            {promoDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span className="flex items-center gap-1">
                  Promo Discount ({promoCode})
                </span>
                <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Estimated Delivery</span>
              <span className="font-semibold tabular-nums">
                {deliveryCharge === 0 ? (
                  <span className="text-emerald-700">FREE</span>
                ) : (
                  `$${deliveryCharge.toFixed(2)}`
                )}
              </span>
            </div>

            {deliveryCharge > 0 && (
              <p className="text-[11px] text-slate-400">
                Add ${(50 - cartSubtotal).toFixed(2)} more of eligible items to get free delivery.
              </p>
            )}

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <div>
                <span className="text-base font-bold text-slate-900">Total Amount</span>
                <p className="text-[11px] text-slate-400">Including all applicable taxes</p>
              </div>
              <span className="text-2xl font-black text-slate-900 tabular-nums">
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Promo code input form */}
          <div className="pt-2 border-t border-slate-100">
            {promoCode ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-mono font-semibold">{promoCode} applied</span>
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCode} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (NEST10, VIP20)"
                    className="w-full pl-8 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400 uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Checkout CTA */}
          <button
            onClick={onProceedToCheckout}
            disabled={cart.length === 0}
            className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Security guarantee */}
          <div className="pt-2 flex items-center justify-center gap-2 text-slate-500 text-xs text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted 256-bit simulated safe checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
