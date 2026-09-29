import React, { useState, useMemo, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

const ITEMS_PER_PAGE = 12;

export const ProductListing: React.FC = () => {
  const {
    products,
    filters,
    setFilters,
    resetFilters,
    searchQuery,
  } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  // Read initial page from URL query string ?page=
  const getPageFromUrl = (): number => {
    const params = new URLSearchParams(window.location.search);
    const p = parseInt(params.get('page') || '1', 10);
    return isNaN(p) || p < 1 ? 1 : p;
  };

  const [currentPage, setCurrentPage] = useState<number>(getPageFromUrl());

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync page state with URL query parameter
  const setPage = (newPage: number) => {
    setCurrentPage(newPage);
    const url = new URL(window.location.href);
    if (newPage <= 1) {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', newPage.toString());
    }
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page and subcategory when category or search changes
  useEffect(() => {
    setSelectedSubcategory('all');
    setPage(1);
  }, [filters.category, searchQuery]);

  // Collapsible filter group states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    subcategory: true,
    category: true,
    price: true,
    rating: true,
    brand: true,
    availability: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Derive available subcategories from current category products
  const availableSubcategories = useMemo(() => {
    if (filters.category === 'all') return [];
    const set = new Set<string>();
    products
      .filter((p) => p.category === filters.category && p.subcategory)
      .forEach((p) => {
        if (p.subcategory) set.add(p.subcategory);
      });
    return Array.from(set).sort();
  }, [products, filters.category]);

  // Unique brands
  const brandsList = useMemo(() => {
    const brands = Array.from(
      new Set(
        products
          .filter((p) => filters.category === 'all' || p.category === filters.category)
          .map((p) => p.brand)
      )
    ).sort();
    return ['all', ...brands];
  }, [products, filters.category]);

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
            (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
            p.description.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category
        if (filters.category !== 'all' && p.category !== filters.category) {
          return false;
        }

        // Subcategory
        if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) {
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
  }, [products, filters, searchQuery, selectedSubcategory]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const validPage = Math.min(Math.max(1, currentPage), totalPages);
    const start = (validPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage, totalPages]);

  // Active filter tags for chips
  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];

    if (filters.category !== 'all') {
      chips.push({
        label: `Category: ${filters.category}`,
        onRemove: () => setFilters((prev) => ({ ...prev, category: 'all' })),
      });
    }

    if (selectedSubcategory !== 'all') {
      chips.push({
        label: `Subcategory: ${selectedSubcategory}`,
        onRemove: () => setSelectedSubcategory('all'),
      });
    }

    if (filters.brand !== 'all') {
      chips.push({
        label: `Brand: ${filters.brand}`,
        onRemove: () => setFilters((prev) => ({ ...prev, brand: 'all' })),
      });
    }

    if (filters.minPrice > 0 || filters.maxPrice < 200000) {
      chips.push({
        label: `₹${filters.minPrice.toLocaleString()} - ₹${filters.maxPrice.toLocaleString()}`,
        onRemove: () => setFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: 200000 })),
      });
    }

    if (filters.minRating > 0) {
      chips.push({
        label: `${filters.minRating}★ & above`,
        onRemove: () => setFilters((prev) => ({ ...prev, minRating: 0 })),
      });
    }

    if (filters.inStockOnly) {
      chips.push({
        label: 'In Stock Only',
        onRemove: () => setFilters((prev) => ({ ...prev, inStockOnly: false })),
      });
    }

    return chips;
  }, [filters, selectedSubcategory, setFilters]);

  // Render Filter Sidebar Content
  const renderFilterContent = () => (
    <div className="space-y-6 text-xs text-left">
      {/* Category Selection */}
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
                onClick={() => {
                  setFilters((prev) => ({ ...prev, category: c.id }));
                  setSelectedSubcategory('all');
                  setPage(1);
                }}
                className={`w-full flex items-center justify-between py-1.5 px-2 rounded-[4px] transition-colors ${
                  filters.category === c.id
                    ? 'bg-[#F7F7F5] text-[#0F766E] font-semibold'
                    : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
                }`}
              >
                <span>{c.name}</span>
                <span className="text-[11px] text-[#5C5C5C]">{c.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Subcategory Filter (Derived from Category Data) */}
      {filters.category !== 'all' && availableSubcategories.length > 0 && (
        <div className="border-b border-[#E5E5E2] pb-4">
          <button
            onClick={() => toggleSection('subcategory')}
            className="w-full flex items-center justify-between font-bold text-[#1A1A1A] py-1"
          >
            <span>Subcategory</span>
            {openSections.subcategory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openSections.subcategory && (
            <div className="mt-2 space-y-1">
              <button
                onClick={() => {
                  setSelectedSubcategory('all');
                  setPage(1);
                }}
                className={`w-full text-left py-1 px-2 rounded-[4px] transition-colors ${
                  selectedSubcategory === 'all'
                    ? 'bg-[#F7F7F5] text-[#0F766E] font-semibold'
                    : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
                }`}
              >
                All Subcategories
              </button>
              {availableSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => {
                    setSelectedSubcategory(sub);
                    setPage(1);
                  }}
                  className={`w-full text-left py-1 px-2 rounded-[4px] transition-colors ${
                    selectedSubcategory === sub
                      ? 'bg-[#F7F7F5] text-[#0F766E] font-semibold'
                      : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Range */}
      <div className="border-b border-[#E5E5E2] pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-bold text-[#1A1A1A] py-1"
        >
          <span>Price Range</span>
          {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.price && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between text-[#5C5C5C] text-[11px]">
              <span>{formatPrice(filters.minPrice)}</span>
              <span>{formatPrice(filters.maxPrice)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={filters.maxPrice}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }));
                setPage(1);
              }}
              className="w-full accent-[#0F766E] cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Customer Rating */}
      <div className="border-b border-[#E5E5E2] pb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between font-bold text-[#1A1A1A] py-1"
        >
          <span>Customer Rating</span>
          {openSections.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.rating && (
          <div className="mt-2 space-y-1">
            {[4, 3, 2, 0].map((star) => (
              <button
                key={star}
                onClick={() => {
                  setFilters((prev) => ({ ...prev, minRating: star }));
                  setPage(1);
                }}
                className={`w-full flex items-center gap-1.5 py-1 px-2 rounded-[4px] transition-colors ${
                  filters.minRating === star
                    ? 'bg-[#F7F7F5] text-[#0F766E] font-semibold'
                    : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
                }`}
              >
                {star > 0 ? (
                  <>
                    <span className="flex items-center text-[#1A1A1A]">
                      {star} <Star size={12} className="fill-[#1A1A1A] inline ml-0.5" />
                    </span>
                    <span>&amp; up</span>
                  </>
                ) : (
                  <span>All Ratings</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
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
                onClick={() => {
                  setFilters((prev) => ({ ...prev, brand: b }));
                  setPage(1);
                }}
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
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }));
                setPage(1);
              }}
              className="accent-[#0F766E] rounded-[4px]"
            />
            <span>Include in-stock items only</span>
          </label>
        )}
      </div>

      {/* Reset Filters */}
      {(activeChips.length > 0 || selectedSubcategory !== 'all') && (
        <button
          onClick={() => {
            resetFilters();
            setSelectedSubcategory('all');
            setPage(1);
          }}
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
          <div className="flex items-center gap-2.5">
            <h1 className="text-[20px] font-bold text-[#1A1A1A]">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : filters.category !== 'all'
                ? filters.category
                : 'All Products'}
            </h1>
            {filters.category !== 'all' && (
              <span className="text-xs font-semibold bg-[#F7F7F5] border border-[#E5E5E2] px-2 py-0.5 rounded-[4px] text-[#0F766E]">
                20 products
              </span>
            )}
          </div>
          <p className="text-xs text-[#5C5C5C] mt-0.5">
            {filters.category !== 'all'
              ? `Showing ${filteredProducts.length} of 20 products in ${filters.category}`
              : `Showing ${filteredProducts.length} of ${products.length} products`}
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
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
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as SortOption,
                }));
                setPage(1);
              }}
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
        <div className="flex flex-wrap items-center gap-2 py-3 border-b border-[#E5E5E2]">
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
            onClick={() => {
              resetFilters();
              setSelectedSubcategory('all');
              setPage(1);
            }}
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

        {/* Results Grid & Pagination */}
        <main className="col-span-1 md:col-span-3 lg:col-span-4 flex flex-col justify-between">
          {paginatedProducts.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Numbered Pagination Section (12 per page) */}
              {totalPages > 1 && (
                <div className="mt-8 pt-6 border-t border-[#E5E5E2] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-[#5C5C5C]">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of{' '}
                    {filteredProducts.length} items
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Previous Button */}
                    <button
                      onClick={() => setPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage <= 1}
                      className="h-8 px-2.5 rounded-[6px] border border-[#E5E5E2] text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#1A1A1A]"
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={14} />
                      <span className="hidden sm:inline">Prev</span>
                    </button>

                    {/* Numbered Page Buttons */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 rounded-[6px] text-xs font-semibold transition-colors border ${
                          currentPage === pageNum
                            ? 'bg-[#0F766E] text-white border-[#0F766E]'
                            : 'bg-[#FFFFFF] border-[#E5E5E2] text-[#1A1A1A] hover:border-[#1A1A1A]'
                        }`}
                        aria-current={currentPage === pageNum ? 'page' : undefined}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage >= totalPages}
                      className="h-8 px-2.5 rounded-[6px] border border-[#E5E5E2] text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#1A1A1A]"
                      aria-label="Next page"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-16 text-center border border-[#E5E5E2] rounded-[8px] bg-[#F7F7F5] p-8">
              <h3 className="text-base font-semibold text-[#1A1A1A]">
                No matching products found
              </h3>
              <p className="text-xs text-[#5C5C5C] mt-1 max-w-sm mx-auto">
                Try loosening your filters or clearing search filters.
              </p>
              <button
                onClick={() => {
                  resetFilters();
                  setSelectedSubcategory('all');
                  setPage(1);
                }}
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
