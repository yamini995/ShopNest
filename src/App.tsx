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
import { WishlistView } from './components/WishlistView';
import { AdminCatalogCheck } from './components/AdminCatalogCheck';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { N8nChatWidget } from './components/N8nChatWidget';

const MainLayout: React.FC = () => {
  const { activePage, setActivePage } = useShop();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Sync /admin/catalog-check URL with activePage
  React.useEffect(() => {
    if (window.location.pathname.includes('/admin/catalog-check')) {
      setActivePage('catalog-check');
    }
  }, [setActivePage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] font-sans text-[#1A1A1A] antialiased selection:bg-[#0F766E] selection:text-white">
      {/* 2-Row Header */}
      <Header onOpenAuth={() => setIsAuthOpen(true)} />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {activePage === 'home' && <HomeView />}
        {activePage === 'listing' && <ProductListing />}
        {activePage === 'product-detail' && <ProductDetail />}
        {activePage === 'cart' && (
          <CartView onProceedToCheckout={() => setIsCheckoutOpen(true)} />
        )}
        {activePage === 'orders' && <OrdersView />}
        {activePage === 'account' && <AccountView />}
        {activePage === 'wishlist' && <WishlistView />}
        {activePage === 'catalog-check' && <AdminCatalogCheck />}
      </main>

      {/* Global Modals */}
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

      {/* n8n Chatbot Integration */}
      <N8nChatWidget />

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
