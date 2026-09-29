import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  X,
  Package,
  Bell,
  LogOut,
  MapPin,
  Menu,
  Bot,
} from 'lucide-react';
import { CATEGORIES_LIST } from '../data/products';
import { formatPrice } from '../utils/formatters';
import { ProductImage } from './ProductImage';

interface HeaderProps {
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth }) => {
  const {
    products,
    cartCount,
    cartTotal,
    wishlistCount,
    user,
    activePage,
    setActivePage,
    searchProducts,
    openProduct,
    setCategory,
    filters,
    logoutUser,
  } = useShop();

  const [inputQuery, setInputQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedDept, setSelectedDept] = useState('all');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Suggestions based on query
  const suggestions = inputQuery.trim()
    ? products
        .filter((p) => {
          const q = inputQuery.toLowerCase();
          const matchQuery =
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q);
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
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E5E5E2]">
      {/* Utility Announcement Bar */}
      <div className="bg-[#F7F7F5] border-b border-[#E5E5E2] text-xs text-[#5C5C5C] px-4 py-1.5">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium text-[#1A1A1A]">Free delivery on orders over ₹499</span>
            <span className="hidden sm:inline text-[#E5E5E2]">|</span>
            <span className="hidden sm:inline">Returns within 7 days</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.openN8nChat) window.openN8nChat();
              }}
              className="hover:text-[#0F766E] transition-colors flex items-center gap-1 text-[#0F766E] font-medium"
            >
              <Bot size={13} className="text-[#0F766E]" />
              <span>Ask AI Chatbot</span>
            </button>
            <span className="text-[#E5E5E2]">|</span>
            <button
              onClick={() => setActivePage('orders')}
              className="hover:text-[#0F766E] transition-colors"
            >
              Track order
            </button>
            <span className="text-[#E5E5E2]">|</span>
            <span>Use code <strong className="text-[#1A1A1A] font-semibold">SHOPNEST10</strong> for 10% off</span>
          </div>
        </div>
      </div>

      {/* Row 1: Logo, Wide Search, User Actions */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#5C5C5C] hover:text-[#1A1A1A]"
              aria-label="Toggle navigation menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-8 h-8 rounded-[6px] bg-[#0F766E] flex items-center justify-center text-white font-bold text-base">
                S
              </div>
              <div>
                <span className="text-[20px] font-bold tracking-tight text-[#1A1A1A]">
                  Shop<span className="text-[#0F766E]">Nest</span>
                </span>
                <span className="hidden sm:block text-[11px] text-[#5C5C5C] leading-none">
                  Retail Store
                </span>
              </div>
            </button>
          </div>

          {/* Wide Search Bar - Most visible element */}
          <div
            ref={searchContainerRef}
            className="flex-1 max-w-[620px] relative hidden sm:block"
          >
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              {/* Category dropdown prefix */}
              <div className="relative">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="h-10 pl-3 pr-7 bg-[#F7F7F5] border border-r-0 border-[#E5E5E2] rounded-l-[6px] text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#0F766E] cursor-pointer appearance-none"
                >
                  <option value="all">All Departments</option>
                  {CATEGORIES_LIST.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className="absolute right-2 top-3 pointer-events-none text-[#5C5C5C]"
                />
              </div>

              {/* Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search products, brands, or categories..."
                  className="w-full h-10 pl-3 pr-8 text-sm text-[#1A1A1A] placeholder-[#5C5C5C] bg-[#FFFFFF] border border-[#E5E5E2] focus:border-[#0F766E] focus:outline-none"
                />
                {inputQuery && (
                  <button
                    type="button"
                    onClick={() => setInputQuery('')}
                    className="absolute right-2.5 top-2.5 text-[#5C5C5C] hover:text-[#1A1A1A]"
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="h-10 px-4 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-r-[6px] transition-colors flex items-center justify-center"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
            </form>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-[#FFFFFF] border border-[#E5E5E2] rounded-[6px] shadow-md z-50 overflow-hidden">
                <div className="py-1">
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSuggestionClick(item.id)}
                      className="w-full text-left px-3 py-2 hover:bg-[#F7F7F5] flex items-center justify-between text-sm transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[4px] p-0.5 shrink-0 overflow-hidden">
                          <ProductImage
                            src={item.images[0]}
                            alt={item.name}
                            category={item.category}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-[#1A1A1A] line-clamp-1">{item.name}</span>
                        <span className="text-xs text-[#5C5C5C]">{item.brand}</span>
                      </div>
                      <span className="font-semibold text-[#1A1A1A] text-xs">
                        {formatPrice(item.price)}
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={() => handleSearchSubmit()}
                    className="w-full text-left px-3 py-2 bg-[#F7F7F5] border-t border-[#E5E5E2] text-xs font-medium text-[#0F766E] hover:underline"
                  >
                    See all results for &ldquo;{inputQuery}&rdquo;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons: Account, Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Account / Login */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-1.5 p-2 rounded-[6px] hover:bg-[#F7F7F5] text-left transition-colors"
                >
                  <User size={20} strokeWidth={1.5} className="text-[#1A1A1A]" />
                  <div className="hidden lg:block">
                    <span className="block text-[11px] text-[#5C5C5C] leading-none">
                      Hello, {user.name.split(' ')[0]}
                    </span>
                    <span className="block text-xs font-semibold text-[#1A1A1A]">
                      Account
                    </span>
                  </div>
                  <ChevronDown size={14} strokeWidth={1.5} className="text-[#5C5C5C] hidden lg:block" />
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0F766E] hover:bg-[#F7F7F5] rounded-[6px] border border-[#0F766E] transition-colors"
                >
                  <User size={16} strokeWidth={1.5} />
                  <span>Sign In</span>
                </button>
              )}

              {/* Account Dropdown */}
              {showUserDropdown && user && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-[#FFFFFF] border border-[#E5E5E2] rounded-[6px] shadow-md z-50 py-1 text-sm">
                  <div className="px-3 py-2 border-b border-[#E5E5E2]">
                    <p className="font-semibold text-[#1A1A1A] text-xs">{user.name}</p>
                    <p className="text-[11px] text-[#5C5C5C] truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActivePage('account');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#F7F7F5] text-[#1A1A1A] flex items-center gap-2"
                  >
                    <User size={16} strokeWidth={1.5} className="text-[#5C5C5C]" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('orders');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#F7F7F5] text-[#1A1A1A] flex items-center gap-2"
                  >
                    <Package size={16} strokeWidth={1.5} className="text-[#5C5C5C]" />
                    <span>My Orders</span>
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('wishlist');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#F7F7F5] text-[#1A1A1A] flex items-center gap-2"
                  >
                    <Heart size={16} strokeWidth={1.5} className="text-[#5C5C5C]" />
                    <span>Wishlist ({wishlistCount})</span>
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('account');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#F7F7F5] text-[#1A1A1A] flex items-center gap-2"
                  >
                    <MapPin size={16} strokeWidth={1.5} className="text-[#5C5C5C]" />
                    <span>Saved Addresses</span>
                  </button>
                  <div className="border-t border-[#E5E5E2] my-1" />
                  <button
                    onClick={() => {
                      logoutUser();
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#F7F7F5] text-[#DC2626] flex items-center gap-2"
                  >
                    <LogOut size={16} strokeWidth={1.5} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => setActivePage('wishlist')}
              className="p-2 rounded-[6px] hover:bg-[#F7F7F5] text-[#1A1A1A] relative flex items-center gap-1.5 transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 sm:static bg-[#0F766E] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                  {wishlistCount}
                </span>
              )}
              <span className="hidden lg:inline text-xs font-medium text-[#5C5C5C]">
                Wishlist
              </span>
            </button>

            {/* Cart Icon & Total */}
            <button
              onClick={() => setActivePage('cart')}
              className="p-2 rounded-[6px] hover:bg-[#F7F7F5] text-[#1A1A1A] relative flex items-center gap-2 transition-colors"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#0F766E] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left">
                <span className="block text-[11px] text-[#5C5C5C] leading-none">
                  Cart
                </span>
                <span className="block text-xs font-bold text-[#1A1A1A]">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (under logo on small screens) */}
        <div className="mt-2.5 sm:hidden">
          <form onSubmit={handleSearchSubmit} className="flex w-full">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-9 pl-3 pr-3 text-xs text-[#1A1A1A] placeholder-[#5C5C5C] bg-[#FFFFFF] border border-[#E5E5E2] rounded-l-[6px] focus:border-[#0F766E] focus:outline-none"
            />
            <button
              type="submit"
              className="h-9 px-3 bg-[#0F766E] text-white rounded-r-[6px] flex items-center justify-center"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
          </form>
        </div>
      </div>

      {/* Row 2: Category Navigation Links */}
      <nav className="bg-[#FFFFFF] border-t border-[#E5E5E2] hidden md:block overflow-x-auto scrollbar-none">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center gap-6 text-xs whitespace-nowrap">
          <button
            onClick={() => setCategory('all')}
            className={`py-2.5 transition-colors font-medium border-b-2 ${
              activePage === 'listing' && filters.category === 'all'
                ? 'border-[#0F766E] text-[#0F766E] font-semibold'
                : 'border-transparent text-[#5C5C5C] hover:text-[#1A1A1A]'
            }`}
          >
            All Products
          </button>

          {CATEGORIES_LIST.filter((c) => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`py-2.5 transition-colors font-medium border-b-2 ${
                activePage === 'listing' && filters.category === cat.id
                  ? 'border-[#0F766E] text-[#0F766E] font-semibold'
                  : 'border-transparent text-[#5C5C5C] hover:text-[#1A1A1A]'
              }`}
            >
              {cat.name}
            </button>
          ))}

          <button
            onClick={() => {
              setCategory('all');
              // filters.onSaleOnly
            }}
            className="py-2.5 text-[#F97316] font-semibold hover:text-[#EA580C] ml-auto transition-colors"
          >
            Today&apos;s Deals
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-t border-[#E5E5E2] px-4 py-3 space-y-2">
          <p className="text-xs font-semibold text-[#5C5C5C] uppercase tracking-wider">
            Categories
          </p>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <button
              onClick={() => {
                setCategory('all');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 px-2 rounded hover:bg-[#F7F7F5] text-[#1A1A1A]"
            >
              All Products
            </button>
            {CATEGORIES_LIST.filter((c) => c.id !== 'all').map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCategory(c.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-1.5 px-2 rounded hover:bg-[#F7F7F5] text-[#1A1A1A]"
              >
                {c.name}
              </button>
            ))}
          </div>
          <div className="border-t border-[#E5E5E2] pt-2 flex flex-col gap-1 text-xs">
            <button
              onClick={() => {
                setActivePage('orders');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 text-[#1A1A1A]"
            >
              My Orders & Tracking
            </button>
            <button
              onClick={() => {
                setActivePage('wishlist');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 text-[#1A1A1A]"
            >
              My Wishlist ({wishlistCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
