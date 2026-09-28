import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';
import { ArrowRight, ShieldCheck, Zap, Truck, Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { openProduct, setCategory } = useShop();

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white rounded-2xl mx-4 sm:mx-6 lg:mx-8 my-6 border border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Autumn Release
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Refined technology & everyday essentials, delivered to your door.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
            Discover precision audio equipment, aerospace-grade titanium wearables, and studio workspace tools with verified reviews and guaranteed express fulfillment.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => openProduct('sn-audio-01')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
            >
              Shop Featured ANC Pro
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCategory('all')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors border border-slate-700"
            >
              Explore All Categories
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free 2-Day Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>2-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Simulated Fast Checkout</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Spotlight Card */}
        <div className="lg:col-span-5">
          <div className="relative bg-slate-800/80 border border-slate-700/80 rounded-xl p-6 backdrop-blur-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-emerald-400">Deal of the Day</span>
              <span className="font-mono text-slate-300">Save $80 Today</span>
            </div>

            {/* Visual spotlight */}
            <div
              onClick={() => openProduct('sn-audio-01')}
              className="w-full aspect-[4/3] bg-slate-900/60 rounded-lg p-4 cursor-pointer flex items-center justify-center border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <ProductVisual type="headphones" themeColor="slate" className="w-full h-full" />
            </div>

            <div className="mt-4">
              <h3 className="text-base font-bold text-white line-clamp-1">
                AuraWave ANC Pro Wireless Headphones
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                42mm titanium drivers with 40dB hybrid noise cancellation and 50-hour playback.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white tabular-nums">$199.99</span>
                  <span className="text-sm text-slate-400 line-through tabular-nums">$279.99</span>
                </div>
                <button
                  onClick={() => openProduct('sn-audio-01')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-white text-slate-900 text-xs font-semibold rounded-md transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
