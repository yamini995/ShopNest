import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Package,
  ChevronDown,
  X,
  Compass,
} from 'lucide-react';
import { CATEGORIES_LIST } from '../data/products';

interface HeaderProps {
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth }) => {
  const {
    products,
    cartCount,
    wishlistCount,
    user,
    activePage,
    setActivePage,
    searchProducts,
    openProduct,
    setCategory,
    filters,
  } = useShop();

  const [inputQuery, setInputQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedDept, setSelectedDept] = useState('all');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Suggestions based on input
  const suggestions = inputQuery.trim()
    ? products
        .filter((p) => {
          const matchQuery =
            p.title.toLowerCase().includes(inputQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(inputQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(inputQuery.toLowerCase());
          const matchDept = selectedDept === 'all' || p.category === selectedDept;
          return matchQuery && matchDept;
        })
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedDept !== 'all') {
      setCategory(selectedDept);
    }
    searchProducts(inputQuery);
    setIsSearchFocused(false);
  };

  const handleSuggestionClick = (productId: string) => {
    openProduct(productId);
    setIsSearchFocused(false);
    setInputQuery('');
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-sm border-b border-slate-800">
      {/* Top Banner Notice */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 text-center border-b border-slate-800/80 flex items-center justify-center gap-2">
        <span className="font-medium text-amber-400">Exclusive Autumn Catalog</span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span>Free express delivery on orders over $50</span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span className="font-mono text-slate-300">Use code <strong className="text-white">NEST10</strong> for 10% off</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-lg shadow-sm">
                S
              </div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                ShopNest
              </span>
            </button>
          </div>

          {/* Zone 2: Search with Category Select & Live Autocomplete */}
          <div
            ref={searchContainerRef}
            className="flex-1 max-w-2xl relative hidden md:block"
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              {/* Category Dropdown inside search */}
              <div className="relative shrink-0">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="h-10 pl-3 pr-7 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-l-lg border-r border-slate-700 focus:outline-none appearance-none cursor-pointer transition-colors"
                >
                  <option value="all">All Departments</option>
                  <option value="electronics">Electronics</option>
                  <option value="audio">Audio</option>
                  <option value="computers">Computers</option>
                  <option value="wearables">Wearables</option>
                  <option value="home-living">Home & Living</option>
                  <option value="lifestyle">Lifestyle</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-3 pointer-events-none" />
              </div>

              {/* Main Input */}
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search premium headphones, watches, 4K monitors..."
                className="w-full h-10 px-3.5 bg-slate-800/90 text-white placeholder-slate-400 text-sm focus:outline-none focus:bg-slate-800 transition-colors"
              />

              {inputQuery && (
                <button
                  type="button"
                  onClick={() => setInputQuery('')}
                  className="absolute right-12 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Search Action Button */}
              <button
                type="submit"
                className="h-10 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-r-lg font-semibold transition-colors flex items-center justify-center shrink-0"
                aria-label="Search ShopNest"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Suggestions Overlay */}
            {isSearchFocused && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl py-2 z-50 overflow-hidden">
                <div className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-slate-400 border-b border-slate-800">
                  Product Suggestions
                </div>
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSuggestionClick(p.id)}
                    className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-800/90 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                      <span className="text-sm text-slate-200 group-hover:text-white line-clamp-1">
                        {p.title}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-medium text-emerald-400 ml-2">
                      ${p.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Zone 3: Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Account / Login Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  if (user) {
                    setShowUserDropdown(!showUserDropdown);
                  } else {
                    onOpenAuth();
                  }
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-left transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden xl:block">
                  <span className="block text-[11px] text-slate-400 leading-tight">
                    {user ? `Hello, ${user.name.split(' ')[0]}` : 'Sign In'}
                  </span>
                  <span className="block text-xs font-semibold text-slate-100 flex items-center gap-1">
                    Account <ChevronDown className="w-3 h-3 text-slate-400" />
                  </span>
                </div>
              </button>

              {/* User Dropdown */}
              {showUserDropdown && user && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="text-xs font-semibold text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActivePage('account');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    My Profile & Settings
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('orders');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                    My Orders & Tracking
                  </button>
                  <div className="border-t border-slate-800 my-1" />
                  <button
                    onClick={() => {
                      setActivePage('account');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-slate-800"
                  >
                    Switch Account / Logout
                  </button>
                </div>
              )}
            </div>

            {/* Orders Quick Nav */}
            <button
              onClick={() => setActivePage('orders')}
              className={`hidden sm:flex flex-col text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors ${
                activePage === 'orders' ? 'bg-slate-800' : ''
              }`}
            >
              <span className="text-[11px] text-slate-400 leading-tight">Returns &</span>
              <span className="text-xs font-semibold text-slate-100 flex items-center gap-1">
                Orders
              </span>
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => {
                setActivePage('listing');
                // Could filter by wishlist if needed or view in account
              }}
              className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white transition-colors flex items-center"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Link */}
            <button
              onClick={() => setActivePage('cart')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                activePage === 'cart'
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-100'
              }`}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-2 -right-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${
                      activePage === 'cart'
                        ? 'bg-slate-950 text-emerald-400'
                        : 'bg-emerald-500 text-slate-950'
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden md:inline">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="block md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-9 pl-9 pr-4 bg-slate-800 text-white placeholder-slate-400 text-xs rounded-lg focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
          </form>
        </div>
      </div>

      {/* Sub-Header Category Navigation */}
      <nav className="bg-slate-950/80 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 py-2 text-xs font-medium">
          <button
            onClick={() => {
              setCategory('all');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
              filters.category === 'all' && activePage === 'listing'
                ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            All Catalog
          </button>

          {CATEGORIES_LIST.filter((c) => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
              }}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                filters.category === cat.id && activePage === 'listing'
                  ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {cat.name}
            </button>
          ))}

          <div className="ml-auto pl-4 border-l border-slate-800 hidden lg:flex items-center gap-4 text-slate-400 text-[11px]">
            <button
              onClick={() => {
                setCategory('all');
              }}
              className="hover:text-emerald-400 transition-colors"
            >
              Today&apos;s Deals
            </button>
            <button
              onClick={() => setActivePage('orders')}
              className="hover:text-emerald-400 transition-colors"
            >
              Order Tracking
            </button>
            <button
              onClick={() => setActivePage('account')}
              className="hover:text-emerald-400 transition-colors"
            >
              Customer Care
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
