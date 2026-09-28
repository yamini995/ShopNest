import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Truck, RotateCcw, Headphones, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCategory, setActivePage, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      showToast('Subscribed!', 'Thank you for subscribing to ShopNest curated weekly deals.');
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-16 text-xs">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold"
      >
        <ArrowUp className="w-3.5 h-3.5" />
        Back to top
      </button>

      {/* Trust Pillars */}
      <div className="border-b border-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-300">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-white text-xs">Fast & Free Shipping</h4>
              <p className="text-[11px] text-slate-400">On all eligible orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-white text-xs">100% Genuine Products</h4>
              <p className="text-[11px] text-slate-400">Directly from verified manufacturers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-white text-xs">Hassle-Free Returns</h4>
              <p className="text-[11px] text-slate-400">30-day money-back guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Headphones className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-white text-xs">24/7 Dedicated Support</h4>
              <p className="text-[11px] text-slate-400">Live chat and swift resolution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand & Newsletter Column */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-sm">
              S
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">ShopNest</span>
          </div>

          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            ShopNest is an independent, design-conscious marketplace delivering premium acoustics, computing gear, titanium wearables, and mindful living essentials.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm pt-1">
            <span className="text-xs font-semibold text-white block">
              Subscribe for VIP product drops & discounts
            </span>
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-slate-700"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg font-bold text-xs transition-colors shrink-0"
              >
                Join
              </button>
            </div>
          </form>
        </div>

        {/* Column 2: Departments */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Departments
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => setCategory('electronics')} className="hover:text-white transition-colors">
                Electronics & 4K
              </button>
            </li>
            <li>
              <button onClick={() => setCategory('audio')} className="hover:text-white transition-colors">
                Audio & Noise-Cancelling
              </button>
            </li>
            <li>
              <button onClick={() => setCategory('computers')} className="hover:text-white transition-colors">
                Computers & Keyboards
              </button>
            </li>
            <li>
              <button onClick={() => setCategory('wearables')} className="hover:text-white transition-colors">
                Titanium Wearables
              </button>
            </li>
            <li>
              <button onClick={() => setCategory('home-living')} className="hover:text-white transition-colors">
                Home & Living
              </button>
            </li>
            <li>
              <button onClick={() => setCategory('lifestyle')} className="hover:text-white transition-colors">
                Lifestyle & EDC
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Customer Care
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActivePage('orders')} className="hover:text-white transition-colors">
                Track My Package
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('orders')} className="hover:text-white transition-colors">
                Shipping & Delivery Rates
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('orders')} className="hover:text-white transition-colors">
                Returns & Replacements
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('account')} className="hover:text-white transition-colors">
                Manage Prime & Addresses
              </button>
            </li>
            <li>
              <span className="hover:text-white cursor-pointer">Help & FAQs</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Company & Policies */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            ShopNest Company
          </h4>
          <ul className="space-y-2">
            <li><span className="hover:text-white cursor-pointer">About Our Philosophy</span></li>
            <li><span className="hover:text-white cursor-pointer">Authenticity Standards</span></li>
            <li><span className="hover:text-white cursor-pointer">Sustainability Initiatives</span></li>
            <li><span className="hover:text-white cursor-pointer">Privacy & Cookie Policy</span></li>
            <li><span className="hover:text-white cursor-pointer">Terms of Commercial Sale</span></li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900/80 py-6 px-4 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} ShopNest Inc. All rights reserved. Simulated Prototype Environment.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Use</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Notice</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 cursor-pointer">Consumer Health Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
