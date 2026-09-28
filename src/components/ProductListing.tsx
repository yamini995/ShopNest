import React, { useState, useMemo } from 'react';
import { useShop, SortOption } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST } from '../data/products';
import {
  SlidersHorizontal,
  Star,
  X,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export const ProductListing: React.FC = () => {
  const {
    products,
    filters,
    setFilters,
    resetFilters,
    searchQuery,
  } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Collapsible filter group states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    rating: true,
    brand: true,
    availability: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Unique brands
  const brandsList = useMemo(() => {
    const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
    return ['all', ...brands];
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category
        if (filters.category !== 'all' && p.category !== filters.category) {
          return false;
        }

        // Brand
        if (filters.brand !== 'all' && p.brand !== filters.brand) {
          return false;
        }

        // Price range
        if (p.price < filters.minPrice || p.price > filters.maxPrice) {
          return false;
        }

        // Rating
        if (filters.minRating > 0 && p.rating < filters.minRating) {
          return false;
        }

        // Availability
        if (filters.inStockOnly && p.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return b.createdAt.localeCompare(a.createdAt);
          case 'relevance':
          default:
            return 0;
        }
      });
  }, [products, filters, searchQuery]);

  // Active filter count
  const activeChips: { label: string; onRemove: () => void }[] = [];

  if (filters.category !== 'all') {
    activeChips.push({
      label: `Category: ${filters.category}`,
      onRemove: () => setFilters((prev) => ({ ...prev, category: 'all' })),
    });
  }

  if (filters.brand !== 'all') {
    activeChips.push({
      label: `Brand: ${filters.brand}`,
      onRemove: () => setFilters((prev) => ({ ...prev, brand: 'all' })),
    });
  }

  if (filters.minRating > 0) {
    activeChips.push({
      label: `${filters.minRating}★ and above`,
      onRemove: () => setFilters((prev) => ({ ...prev, minRating: 0 })),
    });
  }

  if (filters.maxPrice < 200000) {
    activeChips.push({
      label: `Under ${formatPrice(filters.maxPrice)}`,
      onRemove: () => setFilters((prev) => ({ ...prev, maxPrice: 200000 })),
    });
  }

  if (filters.inStockOnly) {
    activeChips.push({
      label: 'In Stock Only',
      onRemove: () => setFilters((prev) => ({ ...prev, inStockOnly: false })),
    });
  }

  const renderFilterContent = () => (
    <div className="space-y-5 text-left text-xs">
      {/* Category Filter */}
      <div className="border-b border-[#E5E5E2] pb-4">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between font-bold text-[#1A1A1A] py-1"
        >
          <span>Category</span>
          {openSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.category && (
          <div className="mt-2 space-y-1">
            {CATEGORIES_LIST.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilters((prev) => ({ ...prev, category: c.id }))}
                className={`w-full text-left py-1 px-2 rounded-[4px] transition-colors flex items-center justify-between ${
                  filters.category === c.id
                    ? 'bg-[#F7F7F5] text-[#0F766E] font-semibold'
                    : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
                }`}
              >
                <span>{c.name}</span>
                <span className="text-[#5C5C5C]">{c.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-[#E5E5E2] pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-bold text-[#1A1A1A] py-1"
        >
          <span>Price</span>
          {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.price && (
          <div className="mt-2 space-y-1.5">
            {[
              { label: 'All Prices', max: 200000 },
              { label: 'Under ₹1,000', max: 1000 },
              { label: 'Under ₹5,000', max: 5000 },
              { label: 'Under ₹15,000', max: 15000 },
              { label: 'Under ₹50,000', max: 50000 },
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => setFilters((prev) => ({ ...prev, maxPrice: p.max }))}
                className={`w-full text-left py-1 px-2 rounded-[4px] transition-colors ${
                  filters.maxPrice === p.max
                    ? 'bg-[#F7F7F5] text-[#0F766E] font-semibold'
                    : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Customer Rating Filter */}
      <div className="border-b border-[#E5E5E2] pb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between font-bold text-[#1A1A1A] py-1"
        >
          <span>Customer rating</span>
          {openSections.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.rating && (
          <div className="mt-2 space-y-1">
            {[4, 3, 2].map((r) => (
              <button
                key={r}
                onClick={() => setFilters((prev) => ({ ...prev, minRating: r }))}
                className={`w-full text-left py-1 px-2 rounded-[4px] flex items-center gap-1.5 transition-colors ${
                  filters.minRating === r
                    ? 'bg-[#F7F7F5] text-[#0F766E] font-semibold'
                    : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
                }`}
              >
                <div className="flex items-center text-[#1A1A1A]">
                  {Array.from({ length: r }).map((_, i) => (
                    <Star key={i} size={13} className="fill-[#1A1A1A]" />
                  ))}
                </div>
                <span>&amp; above</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="border-b border-[#E5E5E2] pb-4">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between font-bold text-[#1A1A1A] py-1"
        >
          <span>Brand</span>
          {openSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.brand && (
          <div className="mt-2 max-h-48 overflow-y-auto space-y-1 pr-1">
            {brandsList.map((b) => (
              <button
                key={b}
                onClick={() => setFilters((prev) => ({ ...prev, brand: b }))}
                className={`w-full text-left py-1 px-2 rounded-[4px] transition-colors capitalize ${
                  filters.brand === b
                    ? 'bg-[#F7F7F5] text-[#0F766E] font-semibold'
                    : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
                }`}
              >
                {b === 'all' ? 'All Brands' : b}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div>
        <button
          onClick={() => toggleSection('availability')}
          className="w-full flex items-center justify-between font-bold text-[#1A1A1A] py-1"
        >
          <span>Availability</span>
          {openSections.availability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.availability && (
          <label className="mt-2 flex items-center gap-2 text-[#1A1A1A] cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
              }
              className="accent-[#0F766E] rounded-[4px]"
            />
            <span>Include in-stock items only</span>
          </label>
        )}
      </div>

      {/* Reset Filters */}
      {activeChips.length > 0 && (
        <button
          onClick={resetFilters}
          className="w-full h-8 mt-2 border border-[#E5E5E2] rounded-[6px] hover:border-[#1A1A1A] text-xs font-semibold text-[#1A1A1A] flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw size={14} strokeWidth={1.5} />
          <span>Reset all filters</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 text-left">
      {/* Top Bar above grid: Result Count and Sort dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E5E2] gap-3">
        <div>
          <h1 className="text-[20px] font-bold text-[#1A1A1A]">
            {searchQuery ? `Search results for "${searchQuery}"` : filters.category !== 'all' ? filters.category : 'All Products'}
          </h1>
          <p className="text-xs text-[#5C5C5C]">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5"
          >
            <SlidersHorizontal size={16} strokeWidth={1.5} />
            <span>Filters {activeChips.length > 0 && `(${activeChips.length})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5C5C5C] hidden sm:inline">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as SortOption,
                }))
              }
              className="h-9 px-3 bg-[#FFFFFF] border border-[#E5E5E2] rounded-[6px] text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#0F766E] cursor-pointer"
            >
              <option value="relevance">Featured &amp; Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 py-3">
          <span className="text-xs text-[#5C5C5C]">Active filters:</span>
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 text-xs bg-[#F7F7F5] border border-[#E5E5E2] rounded-[6px] px-2.5 py-1 text-[#1A1A1A]"
            >
              {chip.label}
              <button
                onClick={chip.onRemove}
                className="text-[#5C5C5C] hover:text-[#1A1A1A]"
                aria-label={`Remove filter ${chip.label}`}
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </span>
          ))}
          <button
            onClick={resetFilters}
            className="text-xs text-[#0F766E] font-medium hover:underline ml-1"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Layout: Left Sidebar + Right Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-4">
        {/* Left Sidebar Filters on Desktop */}
        <aside className="hidden md:block col-span-1 border-r border-[#E5E5E2] pr-6">
          {renderFilterContent()}
        </aside>

        {/* Mobile Filters Drawer */}
        {mobileFilterOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#1A1A1A]/40 flex justify-end">
            <div className="w-80 bg-[#FFFFFF] h-full p-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E2] mb-4">
                <h3 className="font-bold text-sm text-[#1A1A1A]">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#5C5C5C] hover:text-[#1A1A1A]"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              {renderFilterContent()}
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full h-10 mt-6 bg-[#0F766E] text-white rounded-[6px] text-xs font-semibold"
              >
                Apply filters
              </button>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <main className="col-span-1 md:col-span-3 lg:col-span-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center border border-[#E5E5E2] rounded-[8px] bg-[#F7F7F5] p-8">
              <h3 className="text-base font-semibold text-[#1A1A1A]">
                No matching products found
              </h3>
              <p className="text-xs text-[#5C5C5C] mt-1 max-w-sm mx-auto">
                Try loosening your filters or searching with different keywords.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 h-9 px-4 bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold rounded-[6px] transition-colors"
              >
                Reset all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
