import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ProductImage } from './ProductImage';
import {
  Star,
  Heart,
  Truck,
  RotateCcw,
  Check,
  Bell,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export const ProductDetail: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    showToast,
    setActivePage,
    setPriceAlert,
    getPriceAlertForProduct,
    removePriceAlert,
    simulatePriceDropTest,
    user,
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const isWishlisted = isInWishlist(product.id);
  const activeAlert = getPriceAlertForProduct(product.id);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Variant selections
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);

  // Delivery check state
  const [pincode, setPincode] = useState('560038');
  const [pincodeChecked, setPincodeChecked] = useState(true);

  // Price alert state
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [targetPriceInput, setTargetPriceInput] = useState(
    Math.round(product.price * 0.9).toString()
  );

  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setPincodeChecked(true);
      showToast('Delivery available', `Delivery available to ${pincode} within 2 days.`);
    } else {
      showToast('Invalid PIN', 'Please enter a valid 6-digit PIN code.', 'warning');
    }
  };

  const handleSavePriceAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(targetPriceInput);
    if (!val || val <= 0 || val >= product.price) {
      showToast('Invalid target', 'Please enter a price lower than the current price.', 'warning');
      return;
    }
    setPriceAlert(product.id, val, 'both');
    setShowAlertModal(false);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 text-left space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-[#5C5C5C]">
        <button
          onClick={() => setActivePage('home')}
          className="hover:text-[#1A1A1A] transition-colors"
        >
          Home
        </button>
        <ChevronRight size={14} strokeWidth={1.5} />
        <button
          onClick={() => setActivePage('listing')}
          className="hover:text-[#1A1A1A] transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight size={14} strokeWidth={1.5} />
        <span className="text-[#1A1A1A] font-medium truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Gallery Left, Buy Box Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Gallery (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square w-full bg-[#F7F7F5] border border-[#E5E5E2] rounded-[8px] p-6 flex items-center justify-center overflow-hidden">
            <ProductImage
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              category={product.category}
              className="w-full h-full object-contain"
              containerClassName="w-full h-full relative flex items-center justify-center"
            />

            {/* Sale Badge */}
            {discountPercent >= 15 && (
              <span className="absolute top-3 left-3 bg-[#F97316] text-white text-xs font-semibold px-2.5 py-1 rounded-[4px] z-10">
                {discountPercent}% OFF
              </span>
            )}

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-3 right-3 p-2 rounded-[6px] bg-[#FFFFFF] border border-[#E5E5E2] transition-colors z-10 ${
                isWishlisted
                  ? 'text-[#0F766E]'
                  : 'text-[#5C5C5C] hover:text-[#0F766E]'
              }`}
              title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart
                size={20}
                strokeWidth={1.5}
                className={isWishlisted ? 'fill-[#0F766E]' : ''}
              />
            </button>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 bg-[#F7F7F5] border rounded-[6px] p-1.5 transition-colors shrink-0 overflow-hidden ${
                    selectedImageIndex === idx
                      ? 'border-[#0F766E] border-2'
                      : 'border-[#E5E5E2] hover:border-[#5C5C5C]'
                  }`}
                >
                  <ProductImage
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    category={product.category}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Product Description & Specifications */}
          <div className="pt-6 border-t border-[#E5E5E2] space-y-4">
            <h3 className="text-base font-bold text-[#1A1A1A]">Product description</h3>
            <p className="text-sm text-[#5C5C5C] leading-relaxed">
              {product.description}
            </p>

            {/* Specifications Table */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="pt-4">
                <h4 className="text-sm font-bold text-[#1A1A1A] mb-3">Specifications</h4>
                <div className="border border-[#E5E5E2] rounded-[6px] divide-y divide-[#E5E5E2] text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-3 p-2.5">
                      <span className="font-semibold text-[#5C5C5C]">{key}</span>
                      <span className="col-span-2 text-[#1A1A1A]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Buy Box & Actions (lg:col-span-5) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] p-6 space-y-5">
            {/* Brand & Title */}
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#5C5C5C] mb-1">
                {product.brand}
              </p>
              <h1 className="text-[20px] font-bold text-[#1A1A1A] leading-snug">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-[#1A1A1A] font-semibold">
                  <Star size={15} strokeWidth={1.5} className="fill-[#1A1A1A] text-[#1A1A1A] mr-1" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-[#5C5C5C]">|</span>
                <span className="text-[#5C5C5C]">
                  {product.reviewCount.toLocaleString('en-IN')} verified reviews
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="border-t border-b border-[#E5E5E2] py-4">
              <div className="flex items-baseline gap-3">
                <span className="text-[28px] font-bold text-[#1A1A1A] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-[#5C5C5C] line-through tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-xs font-semibold text-[#16A34A]">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-[#5C5C5C] mt-1">Inclusive of all taxes</p>
            </div>

            {/* Color variants if applicable */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#1A1A1A] mb-2">
                  Color: <span className="font-normal text-[#5C5C5C]">{selectedColor}</span>
                </p>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`h-8 px-3 rounded-[6px] text-xs font-medium border flex items-center gap-2 transition-colors ${
                        selectedColor === c.name
                          ? 'border-[#0F766E] bg-[#F7F7F5] text-[#1A1A1A] font-semibold'
                          : 'border-[#E5E5E2] text-[#5C5C5C] hover:border-[#1A1A1A]'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size variants if applicable */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#1A1A1A] mb-2">
                  Size: <span className="font-normal text-[#5C5C5C]">{selectedSize}</span>
                </p>
                <div className="flex items-center gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`h-8 px-3 rounded-[6px] text-xs font-medium border transition-colors ${
                        selectedSize === s
                          ? 'border-[#0F766E] bg-[#F7F7F5] text-[#0F766E] font-semibold'
                          : 'border-[#E5E5E2] text-[#5C5C5C] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#1A1A1A]">Quantity:</span>
              <div className="flex items-center border border-[#E5E5E2] rounded-[6px]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-[#1A1A1A] hover:bg-[#F7F7F5]"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold text-[#1A1A1A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-[#1A1A1A] hover:bg-[#F7F7F5]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-[#5C5C5C]">
                {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
                disabled={product.stock <= 0}
                className="w-full h-11 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white text-sm font-semibold rounded-[6px] transition-colors disabled:opacity-50"
              >
                Add to cart
              </button>

              <button
                onClick={() => buyNow(product, quantity, selectedColor, selectedSize)}
                disabled={product.stock <= 0}
                className="w-full h-11 bg-[#F97316] hover:bg-[#EA580C] active:translate-y-px text-white text-sm font-semibold rounded-[6px] transition-colors disabled:opacity-50"
              >
                Buy now
              </button>
            </div>

            {/* Price Alert Feature Box */}
            <div className="border border-[#E5E5E2] rounded-[6px] p-3.5 bg-[#F7F7F5] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={16} strokeWidth={1.5} className="text-[#0F766E]" />
                  <span className="text-xs font-bold text-[#1A1A1A]">Price alert</span>
                </div>
                {activeAlert && (
                  <span className="text-[11px] font-semibold text-[#0F766E] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E5E5E2]">
                    Alert set for ₹{activeAlert.targetPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#5C5C5C]">
                Receive notification if this product drops to your target price.
              </p>

              {activeAlert ? (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => simulatePriceDropTest(product.id, 500)}
                    className="h-7 px-2.5 bg-[#0F766E] text-white rounded-[4px] text-[11px] font-semibold hover:bg-[#115E59]"
                  >
                    Test alert notification
                  </button>
                  <button
                    onClick={() => removePriceAlert(activeAlert.id)}
                    className="h-7 px-2.5 border border-[#E5E5E2] bg-[#FFFFFF] rounded-[4px] text-[11px] text-[#5C5C5C] hover:text-[#DC2626]"
                  >
                    Remove alert
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAlertModal(true)}
                  className="h-7 px-3 bg-[#FFFFFF] border border-[#E5E5E2] hover:border-[#1A1A1A] rounded-[4px] text-xs font-semibold text-[#1A1A1A] transition-colors"
                >
                  Set price alert
                </button>
              )}
            </div>

            {/* Price Alert Modal */}
            {showAlertModal && (
              <div className="fixed inset-0 z-50 bg-[#1A1A1A]/40 flex items-center justify-center p-4">
                <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] p-6 max-w-sm w-full shadow-md space-y-4">
                  <h3 className="font-bold text-sm text-[#1A1A1A]">
                    Set price alert for {product.name}
                  </h3>
                  <p className="text-xs text-[#5C5C5C]">
                    Current price is {formatPrice(product.price)}. Enter target price below:
                  </p>

                  <form onSubmit={handleSavePriceAlert} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
                        Target price (₹)
                      </label>
                      <input
                        type="number"
                        value={targetPriceInput}
                        onChange={(e) => setTargetPriceInput(e.target.value)}
                        className="w-full h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-xs text-[#1A1A1A] focus:border-[#0F766E] focus:outline-none"
                        max={product.price - 1}
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAlertModal(false)}
                        className="h-8 px-3 border border-[#E5E5E2] rounded-[6px] text-xs text-[#5C5C5C] hover:text-[#1A1A1A]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="h-8 px-4 bg-[#0F766E] text-white rounded-[6px] text-xs font-semibold hover:bg-[#115E59]"
                      >
                        Activate alert
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Delivery Checker & Guarantees */}
            <div className="space-y-3 pt-2 text-xs">
              <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter PIN code"
                  className="flex-1 h-8 px-2.5 border border-[#E5E5E2] rounded-[6px] text-xs text-[#1A1A1A]"
                />
                <button
                  type="submit"
                  className="h-8 px-3 border border-[#E5E5E2] hover:border-[#1A1A1A] rounded-[6px] font-semibold text-[#1A1A1A]"
                >
                  Check
                </button>
              </form>

              {pincodeChecked && (
                <div className="space-y-1.5 text-[#5C5C5C] pt-1">
                  <div className="flex items-center gap-2 text-[#16A34A] font-medium">
                    <Check size={14} strokeWidth={2} />
                    <span>Free delivery over ₹499 to {pincode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={14} strokeWidth={1.5} />
                    <span>Estimated delivery in {product.deliveryDays} business days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw size={14} strokeWidth={1.5} />
                    <span>Returns within 7 days</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="pt-8 border-t border-[#E5E5E2]">
        <h3 className="text-[20px] font-bold text-[#1A1A1A] mb-4">Customer reviews</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[8px] flex flex-col justify-center">
            <span className="text-[32px] font-bold text-[#1A1A1A]">{product.rating.toFixed(1)}</span>
            <div className="flex items-center text-[#1A1A1A] my-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(product.rating)
                      ? 'fill-[#1A1A1A]'
                      : 'text-[#E5E5E2]'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-[#5C5C5C]">
              Based on {product.reviewCount.toLocaleString('en-IN')} customer reviews
            </span>
          </div>

          <div className="md:col-span-2 border border-[#E5E5E2] rounded-[8px] p-4 divide-y divide-[#E5E5E2] text-xs">
            <div className="py-2.5 first:pt-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[#1A1A1A]">Pooja Verma</span>
                <span className="text-[#5C5C5C]">Verified Purchase · 2 days ago</span>
              </div>
              <div className="flex items-center text-[#1A1A1A] mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-[#1A1A1A]" />
                ))}
              </div>
              <p className="text-[#5C5C5C]">
                Solid build quality, very quick delivery and works exactly as advertised.
              </p>
            </div>

            <div className="py-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[#1A1A1A]">Anil Mehta</span>
                <span className="text-[#5C5C5C]">Verified Purchase · 1 week ago</span>
              </div>
              <div className="flex items-center text-[#1A1A1A] mb-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-[#1A1A1A]" />
                ))}
              </div>
              <p className="text-[#5C5C5C]">
                Great value for money. Packaging was neat and intact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-6 border-t border-[#E5E5E2]">
          <h3 className="text-[20px] font-bold text-[#1A1A1A] mb-4">
            Related products in {product.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
