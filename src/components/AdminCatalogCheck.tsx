import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_LIST } from '../data/products';
import { formatPrice } from '../utils/formatters';
import { Search, ArrowLeft, CheckCircle2, AlertTriangle, Eye, ExternalLink } from 'lucide-react';

export const AdminCatalogCheck: React.FC = () => {
  const { products, setActivePage, openProduct } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    products.forEach((p) => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    return stats;
  }, [products]);

  const handleImageError = (id: string, name: string, url: string) => {
    console.warn(`[Catalog Check] Image failed to load for product ${id} ("${name}"): ${url}`);
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const errorCount = Object.keys(imageErrors).length;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 text-left space-y-6">
      {/* Dev Header */}
      <div className="bg-[#F7F7F5] border border-[#E5E5E2] rounded-[8px] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#1A1A1A] text-white text-[11px] font-mono px-2 py-0.5 rounded">
                DEV TOOL
              </span>
              <h1 className="text-[20px] font-bold text-[#1A1A1A]">
                Catalog Visual Audit &amp; Mismatch Check
              </h1>
            </div>
            <p className="text-xs text-[#5C5C5C] mt-1">
              Visual verification grid of all {products.length} products (20 per category). Inspect image-to-title alignment, thumbnails, and subcategory mappings.
            </p>
          </div>

          <button
            onClick={() => setActivePage('home')}
            className="self-start sm:self-auto h-9 px-4 bg-[#FFFFFF] border border-[#E5E5E2] hover:border-[#1A1A1A] rounded-[6px] text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Store</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-4 pt-4 border-t border-[#E5E5E2] text-xs">
          <div>
            <span className="text-[#5C5C5C] block">Total Products:</span>
            <span className="font-bold text-[#1A1A1A] text-sm">{products.length}</span>
          </div>
          <div>
            <span className="text-[#5C5C5C] block">Categories:</span>
            <span className="font-bold text-[#1A1A1A] text-sm">9 (20 items each)</span>
          </div>
          <div>
            <span className="text-[#5C5C5C] block">Currently Displayed:</span>
            <span className="font-bold text-[#0F766E] text-sm">{filteredProducts.length}</span>
          </div>
          <div>
            <span className="text-[#5C5C5C] block">Broken Image Alerts:</span>
            <span className={`font-bold text-sm ${errorCount > 0 ? 'text-[#DC2626]' : 'text-[#16A34A]'}`}>
              {errorCount} {errorCount === 0 ? '✓ All Loaded' : 'Broken'}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C5C5C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, brand, or id..."
            className="w-full h-10 pl-9 pr-3 text-xs bg-[#FFFFFF] border border-[#E5E5E2] rounded-[6px] focus:outline-none focus:border-[#0F766E]"
          />
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-[6px] border whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#0F766E] text-white border-[#0F766E] font-medium'
                : 'bg-[#FFFFFF] border-[#E5E5E2] text-[#5C5C5C] hover:border-[#1A1A1A]'
            }`}
          >
            All ({products.length})
          </button>
          {CATEGORIES_LIST.filter((c) => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-[6px] border whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#0F766E] text-white border-[#0F766E] font-medium'
                  : 'bg-[#FFFFFF] border-[#E5E5E2] text-[#5C5C5C] hover:border-[#1A1A1A]'
              }`}
            >
              {cat.name} ({categoryStats[cat.id] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid: 4-col on desktop, showing image, title, category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.map((p, idx) => {
          const isError = imageErrors[p.id];
          return (
            <div
              key={p.id}
              className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] p-3 flex flex-col justify-between hover:border-[#0F766E] transition-all group"
            >
              <div>
                {/* Image Container with #F7F7F5 background */}
                <div className="relative aspect-square w-full bg-[#F7F7F5] rounded-[6px] border border-[#E5E5E2] flex items-center justify-center overflow-hidden mb-2">
                  {!isError ? (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      onError={() => handleImageError(p.id, p.name, p.images[0])}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-3 text-center text-[#DC2626]">
                      <AlertTriangle size={24} className="mb-1" />
                      <span className="text-[10px] font-medium">Image failed</span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <span className="absolute top-1.5 left-1.5 bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#E5E5E2] text-[10px] font-semibold text-[#1A1A1A] px-1.5 py-0.5 rounded-[4px]">
                    {p.category}
                  </span>

                  {/* Index Counter */}
                  <span className="absolute top-1.5 right-1.5 bg-[#1A1A1A]/80 text-white font-mono text-[9px] px-1 py-0.5 rounded">
                    #{idx + 1}
                  </span>
                </div>

                {/* Subcategory & Brand */}
                <div className="flex items-center justify-between text-[11px] text-[#5C5C5C] mb-1">
                  <span className="font-semibold text-[#0F766E] truncate max-w-[120px]">
                    {p.subcategory || p.category}
                  </span>
                  <span className="uppercase text-[10px] tracking-wide">{p.brand}</span>
                </div>

                {/* Product Name */}
                <h3
                  className="text-xs font-semibold text-[#1A1A1A] line-clamp-2 leading-tight"
                  title={p.name}
                >
                  {p.name}
                </h3>
              </div>

              {/* Bottom Row: Price & Details button */}
              <div className="mt-3 pt-2 border-t border-[#E5E5E2] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#1A1A1A]">
                    {formatPrice(p.price)}
                  </span>
                  {p.stock === 0 && (
                    <span className="block text-[10px] text-[#DC2626] font-medium">
                      Out of stock
                    </span>
                  )}
                </div>

                <button
                  onClick={() => openProduct(p.id)}
                  className="p-1.5 text-[#5C5C5C] hover:text-[#0F766E] border border-[#E5E5E2] rounded-[4px] hover:border-[#0F766E] transition-colors"
                  title="View product detail page"
                >
                  <Eye size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 border border-[#E5E5E2] rounded-[8px] bg-[#F7F7F5]">
          <p className="text-sm font-semibold text-[#1A1A1A]">No products matched your search</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-[#0F766E] font-medium hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
};
