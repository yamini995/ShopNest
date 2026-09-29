import React from 'react';
import { useShop } from '../context/ShopContext';
import { Truck, RotateCcw, ShieldCheck, ArrowUp } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/products';

export const Footer: React.FC = () => {
  const { setCategory, setActivePage } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F7F7F5] border-t border-[#E5E5E2] text-xs text-[#5C5C5C] mt-16 text-left">
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="w-full py-2.5 bg-[#FFFFFF] border-b border-[#E5E5E2] hover:bg-[#F7F7F5] text-[#1A1A1A] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
      >
        <ArrowUp size={14} strokeWidth={1.5} />
        <span>Back to top</span>
      </button>

      {/* Trust banner */}
      <div className="border-b border-[#E5E5E2] py-6">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <Truck size={20} strokeWidth={1.5} className="text-[#0F766E] shrink-0" />
            <div>
              <p className="font-bold text-[#1A1A1A]">Free delivery over ₹499</p>
              <p className="text-[11px] text-[#5C5C5C]">Standard dispatch within 24 hours</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw size={20} strokeWidth={1.5} className="text-[#0F766E] shrink-0" />
            <div>
              <p className="font-bold text-[#1A1A1A]">Returns within 7 days</p>
              <p className="text-[11px] text-[#5C5C5C]">Easy door pickup and fast refunds</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck size={20} strokeWidth={1.5} className="text-[#0F766E] shrink-0" />
            <div>
              <p className="font-bold text-[#1A1A1A]">100% Genuine products</p>
              <p className="text-[11px] text-[#5C5C5C]">Sourced directly from verified brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Links Columns */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-xs text-[#1A1A1A] uppercase tracking-wider mb-3">
            Shop by category
          </h4>
          <ul className="space-y-2">
            {CATEGORIES_LIST.filter((c) => c.id !== 'all').slice(0, 6).map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setCategory(c.id)}
                  className="hover:text-[#0F766E] transition-colors"
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs text-[#1A1A1A] uppercase tracking-wider mb-3">
            Customer service
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  if (window.openN8nChat) window.openN8nChat();
                }}
                className="hover:text-[#0F766E] transition-colors flex items-center gap-1.5 text-[#0F766E] font-medium"
              >
                <span>Live assistant chat</span>
                <span className="bg-[#0F766E]/10 text-[#0F766E] text-[10px] font-semibold px-1.5 py-0.5 rounded">n8n</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage('orders')}
                className="hover:text-[#0F766E] transition-colors"
              >
                Track your order
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage('orders')}
                className="hover:text-[#0F766E] transition-colors"
              >
                Returns &amp; replacements
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage('account')}
                className="hover:text-[#0F766E] transition-colors"
              >
                Shipping policies
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage('account')}
                className="hover:text-[#0F766E] transition-colors"
              >
                Help center &amp; FAQs
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs text-[#1A1A1A] uppercase tracking-wider mb-3">
            Account &amp; tools
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActivePage('account')}
                className="hover:text-[#0F766E] transition-colors"
              >
                Your account
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage('wishlist')}
                className="hover:text-[#0F766E] transition-colors"
              >
                Your wishlist
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage('account')}
                className="hover:text-[#0F766E] transition-colors"
              >
                Price alerts
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.history.pushState({}, '', '/admin/catalog-check');
                  setActivePage('catalog-check');
                }}
                className="hover:text-[#0F766E] transition-colors flex items-center gap-1 text-[11px] text-[#5C5C5C]"
              >
                <span>Catalog audit (/admin)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage('cart')}
                className="hover:text-[#0F766E] transition-colors"
              >
                Shopping cart
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs text-[#1A1A1A] uppercase tracking-wider mb-3">
            About ShopNest
          </h4>
          <p className="text-[11px] leading-relaxed mb-3">
            ShopNest is an Indian retail marketplace offering curated electronics, fashion, books, and home essentials with verified customer reviews and fast doorstep fulfillment.
          </p>
          <p className="text-[11px] text-[#1A1A1A] font-semibold">
            Support: support@shopnest.in
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#E5E5E2] py-4 bg-[#FFFFFF]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#5C5C5C]">
          <p>&copy; {new Date().getFullYear()} ShopNest Retail India Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Conditions of Use</span>
            <span className="hover:underline cursor-pointer">Privacy Notice</span>
            <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
