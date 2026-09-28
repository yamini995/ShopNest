/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ProductListing } from './components/ProductListing';
import { ProductDetail } from './components/ProductDetail';
import { CartView } from './components/CartView';
import { OrdersView } from './components/OrdersView';
import { AccountView } from './components/AccountView';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

const MainLayout: React.FC = () => {
  const { activePage } = useShop();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 font-sans text-slate-900 antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* 3-Zone Header Contract & Navigation */}
      <Header onOpenAuth={() => setIsAuthOpen(true)} />

      {/* Dynamic Main Viewport Content */}
      <main className="flex-1">
        {activePage === 'home' && <HomeView />}
        {activePage === 'listing' && <ProductListing />}
        {activePage === 'product-detail' && <ProductDetail />}
        {activePage === 'cart' && (
          <CartView onProceedToCheckout={() => setIsCheckoutOpen(true)} />
        )}
        {activePage === 'orders' && <OrdersView />}
        {activePage === 'account' && <AccountView />}
      </main>

      {/* Global Interactive Modals */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Non-intrusive Toasts */}
      <ToastContainer />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
