import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';
import { ProductCard } from './ProductCard';
import {
  Star,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  MapPin,
  Share2,
  ChevronRight,
  Package,
} from 'lucide-react';

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
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const isWishlisted = isInWishlist(product.id);

  // Local PDP state
  const [selectedColor, setSelectedColor] = useState(
    product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeGalleryView, setActiveGalleryView] = useState<'front' | 'angle' | 'detail'>('front');
  const [pincode, setPincode] = useState('98101');
  const [pincodeChecked, setPincodeChecked] = useState(false);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length >= 4) {
      setPincodeChecked(true);
      showToast('Delivery Available', `Express delivery is available to ${pincode}`);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Product link copied to clipboard.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
        <button
          onClick={() => setActivePage('home')}
          className="hover:text-slate-900 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <button
          onClick={() => setActivePage('listing')}
          className="hover:text-slate-900 transition-colors capitalize"
        >
          {product.category.replace('-', ' ')}
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Dual-Column PDP Grid (Sticky Gallery Left, Sticky Purchase Module Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Product Gallery & Showcase */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
          {/* Main Visual Display */}
          <div className="relative w-full aspect-[4/3] bg-slate-50 border border-slate-200/80 rounded-2xl p-8 flex items-center justify-center overflow-hidden">
            <ProductVisual
              type={product.visualType}
              themeColor={product.themeColor}
              altText={product.title}
              className="w-full h-full max-h-80"
            />

            {/* Discount Badge */}
            {product.discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded">
                Save {product.discountPercentage}%
              </div>
            )}

            {/* Share action */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 rounded-full shadow-sm border border-slate-200/80 transition-colors"
              title="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Alternate Angle Thumbnails */}
          <div className="flex items-center gap-3">
            {(['front', 'angle', 'detail'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setActiveGalleryView(view)}
                className={`flex-1 p-2 rounded-xl border text-center transition-all bg-white flex flex-col items-center justify-center ${
                  activeGalleryView === view
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-16 h-12 flex items-center justify-center">
                  <ProductVisual
                    type={product.visualType}
                    className="w-12 h-10 object-contain"
                  />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 mt-1 capitalize">
                  {view} View
                </span>
              </button>
            ))}
          </div>

          {/* Quality Guarantees row */}
          <div className="grid grid-cols-3 gap-3 pt-3 text-slate-600 text-xs">
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200/60 rounded-lg">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[11px] leading-tight font-medium">Free Global Shipping</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200/60 rounded-lg">
              <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[11px] leading-tight font-medium">30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200/60 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[11px] leading-tight font-medium">2-Year Official Warranty</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Meta */}
          <div className="border-b border-slate-200 pb-5">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span className="font-semibold text-slate-800 uppercase tracking-wider">
                {product.brand}
              </span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{product.category.replace('-', ' ')}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium">Genuine Authenticity</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-slate-800 ml-1.5">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                {product.reviewCount.toLocaleString()} verified customer ratings
              </span>
            </div>
          </div>

          {/* Pricing Module */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-base text-slate-400 line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                    Save ${(product.originalPrice - product.price).toFixed(2)} ({product.discountPercentage}%)
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Inclusive of all taxes. Free delivery on this order.
            </p>
          </div>

          {/* Color Variant Selector */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-800">
                  Color: <span className="text-slate-600 font-normal">{selectedColor}</span>
                </span>
                <span className="text-slate-400 text-[11px]">
                  {product.colors.filter((c) => c.inStock).length} options available
                </span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.name)}
                    disabled={!color.inStock}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      selectedColor === color.name
                        ? 'border-slate-900 bg-white ring-1 ring-slate-900 text-slate-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    } ${!color.inStock ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                      style={{ backgroundColor: color.colorHex || '#334155' }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size / Configuration Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <span className="block text-xs font-semibold text-slate-800 mb-2">
                Configuration: <span className="text-slate-600 font-normal">{selectedSize}</span>
              </span>
              <div className="flex items-center gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      selectedSize === size
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-semibold text-slate-900 tabular-nums min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-sm"
                >
                  +
                </button>
              </div>

              <div className="text-xs text-slate-500">
                {product.stockCount > 0 ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    In Stock ({product.stockCount} units remaining)
                  </span>
                ) : (
                  <span className="text-rose-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
                disabled={!product.inStock}
                className="flex-1 py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                <Package className="w-4 h-4" />
                Add to Cart
              </button>

              <button
                onClick={() => buyNow(product, quantity, selectedColor, selectedSize)}
                disabled={!product.inStock}
                className="flex-1 py-3 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                Buy Now
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors flex items-center justify-center shrink-0 ${
                  isWishlisted
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                }`}
                title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Pincode & Delivery Checker */}
          <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4 space-y-2">
            <span className="block text-xs font-semibold text-slate-800">
              Check Delivery & Availability
            </span>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter postal code"
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Check
              </button>
            </form>
            {pincodeChecked && (
              <p className="text-xs text-emerald-700 font-medium flex items-center gap-1.5 pt-1">
                <Check className="w-3 h-3 text-emerald-600" />
                Standard Delivery: Free by Tomorrow · Express Delivery: Same day by 9 PM
              </p>
            )}
          </div>

          {/* Description & Feature Highlights */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Overview & Highlights
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {product.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Specifications Section */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Technical Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-2">
          {Object.entries(product.specs).map(([specKey, specVal]) => (
            <div
              key={specKey}
              className="flex justify-between py-2 border-b border-slate-100 text-xs sm:text-sm"
            >
              <span className="text-slate-500 font-medium">{specKey}</span>
              <span className="text-slate-900 font-semibold text-right">{specVal}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews & Breakdown */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Customer Ratings & Reviews
            </h3>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-900">
                {product.rating.toFixed(1)} out of 5
              </span>
              <span className="text-xs text-slate-400">
                ({product.reviewCount.toLocaleString()} global ratings)
              </span>
            </div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {product.reviews.map((rev) => (
            <div key={rev.id} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">{rev.userName}</span>
                <span className="text-[11px] text-slate-400 font-mono">{rev.date}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h4 className="text-xs font-semibold text-slate-800">{rev.title}</h4>
                {rev.verified && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Verified Purchase
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Related Products in this Department
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
