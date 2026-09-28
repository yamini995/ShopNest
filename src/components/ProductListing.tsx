import React, { useState, useMemo } from 'react';
import { useShop, SortOption } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST } from '../data/products';
import {
  SlidersHorizontal,
  Star,
  X,
  RotateCcw,
  Search,
} from 'lucide-react';

export const ProductListing: React.FC = () => {
  const {
    products,
    filters,
    setFilters,
    resetFilters,
    searchQuery,
    searchProducts,
  } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands for the filter sidebar
  const uniqueBrands = useMemo(() => {
    const brands = Array.from(new Set(products.map((p) => p.brand)));
    return ['all', ...brands];
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.title.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category filter
        if (filters.category !== 'all' && p.category !== filters.category) {
          return false;
        }

        // Brand filter
        if (filters.brand !== 'all' && p.brand !== filters.brand) {
          return false;
        }

        // Price range
        if (p.price < filters.minPrice || p.price > filters.maxPrice) {
          return false;
        }

        // Rating filter
        if (filters.minRating > 0 && p.rating < filters.minRating) {
          return false;
        }

        // In Stock filter
        if (filters.inStockOnly && !p.inStock) {
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
            return b.id.localeCompare(a.id);
          case 'relevance':
          default:
            return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        }
      });
  }, [products, filters, searchQuery]);

  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.brand !== 'all' ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 1500 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  const renderFilterPanel = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Category
        </h4>
        <div className="space-y-1 text-sm">
          {CATEGORIES_LIST.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilters((prev) => ({ ...prev, category: c.id }))}
              className={`w-full text-left py-1 px-2 rounded-md transition-colors flex items-center justify-between text-xs ${
                filters.category === c.id
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>{c.name}</span>
              <span className="text-slate-400 text-[11px]">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Price Range
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="flex-1">
              <label className="text-[10px] text-slate-400 block mb-0.5">Min ($)</label>
              <input
                type="number"
                min="0"
                max={filters.maxPrice}
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: Math.max(0, Number(e.target.value) || 0),
                  }))
                }
                className="w-full px-2 py-1.5 border border-slate-200 rounded text-slate-900 text-xs focus:outline-none focus:border-slate-400"
              />
            </div>
            <span className="text-slate-400 self-end mb-1.5">-</span>
            <div className="flex-1">
              <label className="text-[10px] text-slate-400 block mb-0.5">Max ($)</label>
              <input
                type="number"
                min={filters.minPrice}
                max="2000"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: Math.min(2000, Number(e.target.value) || 1500),
                  }))
                }
                className="w-full px-2 py-1.5 border border-slate-200 rounded text-slate-900 text-xs focus:outline-none focus:border-slate-400"
              />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="1500"
            step="25"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
            }
            className="w-full accent-slate-900 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>$0</span>
            <span>Up to ${filters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Customer Rating
        </h4>
        <div className="space-y-1.5 text-xs">
          {[4, 3, 2].map((r) => (
            <button
              key={r}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  minRating: prev.minRating === r ? 0 : r,
                }))
              }
              className={`w-full text-left py-1 px-2 rounded-md transition-colors flex items-center gap-2 ${
                filters.minRating === r
                  ? 'bg-amber-50 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < r ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px]">& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Brand
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {uniqueBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => setFilters((prev) => ({ ...prev, brand }))}
              className={`w-full text-left py-1 px-2 rounded-md transition-colors text-xs capitalize ${
                filters.brand === brand
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {brand === 'all' ? 'All Brands' : brand}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Availability
        </h4>
        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
            }
            className="rounded border-slate-300 text-emerald-600 focus:ring-0"
          />
          <span>Exclude Out of Stock Items</span>
        </label>
      </div>

      {/* Clear Filters Button */}
      {activeFiltersCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full py-2 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-rose-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All Filters ({activeFiltersCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header breadcrumb & results title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="text-xs text-slate-500 mb-1">
            <span>ShopNest Catalog</span>
            {filters.category !== 'all' && (
              <>
                <span className="mx-1.5">/</span>
                <span className="capitalize">{filters.category.replace('-', ' ')}</span>
              </>
            )}
            {searchQuery && (
              <>
                <span className="mx-1.5">/</span>
                <span>Search results for &ldquo;{searchQuery}&rdquo;</span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : filters.category !== 'all'
              ? CATEGORIES_LIST.find((c) => c.id === filters.category)?.name
              : 'All Products'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing <strong className="text-slate-800 tabular-nums">{filteredProducts.length}</strong> items
          </p>
        </div>

        {/* Sort & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>

          {/* Sort Control */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 hidden sm:inline whitespace-nowrap">
              Sort by:
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as SortOption,
                }))
              }
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 shadow-xs focus:outline-none cursor-pointer"
            >
              <option value="relevance">Featured & Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 py-3">
          <span className="text-xs text-slate-500">Active filters:</span>
          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
              Category: {CATEGORIES_LIST.find((c) => c.id === filters.category)?.name}
              <button
                onClick={() => setFilters((p) => ({ ...p, category: 'all' }))}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.brand !== 'all' && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
              Brand: {filters.brand}
              <button
                onClick={() => setFilters((p) => ({ ...p, brand: 'all' }))}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.minRating > 0 && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
              Rating: {filters.minRating}★ & above
              <button
                onClick={() => setFilters((p) => ({ ...p, minRating: 0 }))}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(filters.minPrice > 0 || filters.maxPrice < 1500) && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
              ${filters.minPrice} - ${filters.maxPrice}
              <button
                onClick={() => setFilters((p) => ({ ...p, minPrice: 0, maxPrice: 1500 }))}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
              In Stock Only
              <button
                onClick={() => setFilters((p) => ({ ...p, inStockOnly: false }))}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Grid + Sidebar Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              Filter Products
            </h3>
            {activeFiltersCount > 0 && (
              <span className="text-xs text-slate-500 font-medium">
                {activeFiltersCount} applied
              </span>
            )}
          </div>
          {renderFilterPanel()}
        </aside>

        {/* Product Cards Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No products found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                We couldn&apos;t find matching items for your selected filters or search terms. Try adjusting your criteria.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Reset All Filters
                </button>
                {searchQuery && (
                  <button
                    onClick={() => searchProducts('')}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <h3 className="font-bold text-slate-900 text-base">Filter Catalog</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {renderFilterPanel()}
            </div>

            <div className="pt-6 border-t border-slate-200 mt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-lg shadow-sm"
              >
                Apply Filters ({filteredProducts.length} Items)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
