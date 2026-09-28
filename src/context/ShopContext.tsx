import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, SavedItem, Order, UserProfile, Address } from '../types';
import { PRODUCTS, DEMO_USER, INITIAL_ORDERS } from '../data/products';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  brand: string;
  inStockOnly: boolean;
  sortBy: SortOption;
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  savedForLater: SavedItem[];
  wishlist: string[];
  orders: Order[];
  user: UserProfile | null;
  activePage: 'home' | 'listing' | 'product-detail' | 'cart' | 'orders' | 'account';
  selectedProductId: string | null;
  searchQuery: string;
  promoCode: string | null;
  promoDiscount: number;
  filters: FilterState;
  toasts: ToastMessage[];
  // Navigation actions
  setActivePage: (page: 'home' | 'listing' | 'product-detail' | 'cart' | 'orders' | 'account') => void;
  openProduct: (productId: string) => void;
  searchProducts: (query: string) => void;
  setCategory: (category: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  // Cart & Wishlist actions
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  buyNow: (product: Product, quantity?: number, color?: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  saveForLater: (productId: string) => void;
  moveToCartFromSaved: (productId: string) => void;
  removeSavedItem: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  // Order actions
  placeOrder: (
    deliveryAddress: Address,
    paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery',
    deliveryCharge: number
  ) => Order;
  cancelOrder: (orderId: string) => void;
  // Promo code
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  // Auth simulation
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  updateUserAddresses: (addresses: Address[]) => void;
  // UI helpers
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
  // Computed values
  cartSubtotal: number;
  cartCount: number;
  wishlistCount: number;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  minPrice: 0,
  maxPrice: 1500,
  minRating: 0,
  brand: 'all',
  inStockOnly: false,
  sortBy: 'relevance',
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shopnest_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedForLater, setSavedForLater] = useState<SavedItem[]>(() => {
    try {
      const saved = localStorage.getItem('shopnest_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shopnest_wishlist');
      return saved ? JSON.parse(saved) : ['sn-audio-01', 'sn-comp-01'];
    } catch {
      return ['sn-audio-01', 'sn-comp-01'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('shopnest_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('shopnest_user');
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  const [activePage, setActivePage] = useState<'home' | 'listing' | 'product-detail' | 'cart' | 'orders' | 'account'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('shopnest_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopnest_saved', JSON.stringify(savedForLater));
  }, [savedForLater]);

  useEffect(() => {
    localStorage.setItem('shopnest_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('shopnest_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('shopnest_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shopnest_user');
    }
  }, [user]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const searchProducts = (query: string) => {
    setSearchQuery(query);
    setActivePage('listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCategory = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    setActivePage('listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const chosenColor = color || (product.colors.length > 0 ? product.colors[0].name : undefined);
    const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === chosenColor && item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [...prev, { product, quantity, selectedColor: chosenColor, selectedSize: chosenSize }];
    });

    showToast('Added to Cart', `${product.title} has been added to your shopping cart.`);
  };

  const buyNow = (product: Product, quantity = 1, color?: string, size?: string) => {
    addToCart(product, quantity, color, size);
    setActivePage('cart');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast('Removed from Cart', `${item.product.title} was removed from your cart.`, 'info');
    }
  };

  const saveForLater = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    setSavedForLater((prev) => [
      ...prev.filter((s) => s.product.id !== productId),
      {
        product: item.product,
        addedAt: new Date().toISOString(),
        selectedColor: item.selectedColor,
      },
    ]);
    showToast('Saved for Later', `${item.product.title} moved to Saved for Later.`, 'info');
  };

  const moveToCartFromSaved = (productId: string) => {
    const item = savedForLater.find((s) => s.product.id === productId);
    if (!item) return;
    setSavedForLater((prev) => prev.filter((s) => s.product.id !== productId));
    addToCart(item.product, 1, item.selectedColor);
  };

  const removeSavedItem = (productId: string) => {
    setSavedForLater((prev) => prev.filter((s) => s.product.id !== productId));
    showToast('Item Removed', 'Product removed from your saved list.', 'info');
  };

  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from Wishlist', `${product ? product.title : 'Item'} removed from your wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Added to Wishlist', `${product ? product.title : 'Item'} added to your wishlist.`);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const clearCart = () => setCart([]);

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NEST10' || clean === 'WELCOME10') {
      setPromoCode(clean);
      setPromoDiscount(0.1); // 10% off
      showToast('Promo Code Applied!', '10% discount applied to your order.');
      return true;
    }
    if (clean === 'VIP20' || clean === 'SAVE20') {
      setPromoCode(clean);
      setPromoDiscount(0.2); // 20% off
      showToast('VIP Promo Code Applied!', '20% special discount applied.');
      return true;
    }
    showToast('Invalid Promo Code', 'Use code NEST10 for 10% off or VIP20 for 20% off.', 'warning');
    return false;
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setPromoDiscount(0);
    showToast('Promo Code Removed', 'Promo discount has been cleared.', 'info');
  };

  const placeOrder = (
    deliveryAddress: Address,
    paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery',
    deliveryCharge: number
  ): Order => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = subtotal * promoDiscount;
    const finalTotal = subtotal - discount + deliveryCharge;

    const newOrder: Order = {
      id: `SN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        themeColor: item.product.themeColor,
        visualType: item.product.visualType,
      })),
      subtotal,
      discount,
      deliveryCharge,
      total: Number(finalTotal.toFixed(2)),
      status: 'Ordered',
      deliveryAddress,
      paymentMethod,
      estimatedDeliveryDate: 'Within 2-3 business days',
      trackingHistory: [
        {
          status: 'Ordered',
          timestamp: 'Just now',
          location: 'Order Confirmed - ShopNest Fulfillment',
          completed: true,
        },
        {
          status: 'Shipped',
          timestamp: 'Pending dispatch',
          location: 'Regional Distribution Center',
          completed: false,
        },
        {
          status: 'Out for Delivery',
          timestamp: 'Upcoming',
          location: 'Local Delivery Facility',
          completed: false,
        },
        {
          status: 'Delivered',
          timestamp: 'Estimated 2-3 days',
          location: `${deliveryAddress.street}, ${deliveryAddress.city}`,
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setPromoCode(null);
    setPromoDiscount(0);
    showToast('Order Placed Successfully!', `Order ${newOrder.id} has been created.`);
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId && o.status === 'Ordered') {
          return {
            ...o,
            status: 'Delivered', // mark handled or add cancelled
          };
        }
        return o;
      })
    );
    showToast('Order Update', `Order ${orderId} status updated.`, 'info');
  };

  const loginUser = (email: string, name?: string) => {
    setUser({
      ...DEMO_USER,
      email,
      name: name || email.split('@')[0],
    });
    showToast('Welcome Back', `Signed in as ${name || email}`);
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed Out', 'You have been logged out of ShopNest.', 'info');
  };

  const updateUserAddresses = (addresses: Address[]) => {
    if (!user) return;
    setUser({
      ...user,
      addresses,
    });
    showToast('Address Updated', 'Your delivery addresses have been saved.');
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        savedForLater,
        wishlist,
        orders,
        user,
        activePage,
        selectedProductId,
        searchQuery,
        promoCode,
        promoDiscount,
        filters,
        toasts,
        setActivePage,
        openProduct,
        searchProducts,
        setCategory,
        setFilters,
        resetFilters,
        addToCart,
        buyNow,
        updateCartQuantity,
        removeFromCart,
        saveForLater,
        moveToCartFromSaved,
        removeSavedItem,
        toggleWishlist,
        isInWishlist,
        clearCart,
        placeOrder,
        cancelOrder,
        applyPromoCode,
        removePromoCode,
        loginUser,
        logoutUser,
        updateUserAddresses,
        showToast,
        dismissToast,
        cartSubtotal,
        cartCount,
        wishlistCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
