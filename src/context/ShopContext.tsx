import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  Product,
  CartItem,
  SavedItem,
  Order,
  UserProfile,
  Address,
  PriceAlert,
  ToastMessage,
  ActivePage,
  SortOption,
  OrderItem,
} from '../types';
import { PRODUCTS, DEMO_USER, INITIAL_ORDERS } from '../data/products';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  sortBy: SortOption;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  brand: 'all',
  minPrice: 0,
  maxPrice: 200000,
  minRating: 0,
  inStockOnly: false,
  sortBy: 'relevance',
};

export { type SortOption };

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  savedForLater: SavedItem[];
  wishlist: string[];
  orders: Order[];
  user: UserProfile | null;
  priceAlerts: PriceAlert[];
  toasts: ToastMessage[];
  couponCode: string | null;
  couponDiscount: number;
  activePage: ActivePage;
  selectedProductId: string | null;
  searchQuery: string;
  filters: FilterState;

  // Navigation & Page State
  setActivePage: (page: ActivePage) => void;
  openProduct: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  searchProducts: (query: string) => void;
  setCategory: (category: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Cart operations
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  buyNow: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  saveForLater: (productId: string, color?: string, size?: string) => void;
  moveToCartFromSaved: (productId: string) => void;
  removeSavedItem: (productId: string) => void;
  clearCart: () => void;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;

  // Price alert
  setPriceAlert: (productId: string, targetPrice: number, notifyMethod?: 'email' | 'in-app' | 'both') => void;
  removePriceAlert: (alertId: string) => void;
  getPriceAlertForProduct: (productId: string) => PriceAlert | undefined;
  simulatePriceDropTest: (productId: string, dropAmount?: number) => void;

  // Coupons
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Orders
  placeOrder: (
    address: Address,
    paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery',
    deliveryCharge: number
  ) => Order;
  cancelOrder: (orderId: string) => void;
  reorderItems: (items: OrderItem[]) => void;

  // User auth simulation
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  updateUserAddresses: (addresses: Address[]) => void;

  // Toast notifications
  showToast: (
    title: string,
    message: string,
    type?: 'success' | 'info' | 'warning',
    action?: { label: string; onClick: () => void }
  ) => void;
  dismissToast: (id: string) => void;

  // Calculated values
  cartSubtotal: number;
  cartDiscount: number;
  deliveryCharge: number;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useLocalStorage<CartItem[]>('shopnest_cart', []);
  const [savedForLater, setSavedForLater] = useLocalStorage<SavedItem[]>('shopnest_saved', []);
  const [wishlist, setWishlist] = useLocalStorage<string[]>('shopnest_wishlist', ['el-01', 'ac-01']);
  const [orders, setOrders] = useLocalStorage<Order[]>('shopnest_orders', INITIAL_ORDERS);
  const [user, setUser] = useLocalStorage<UserProfile | null>('shopnest_user', DEMO_USER);
  const [priceAlerts, setPriceAlerts] = useLocalStorage<PriceAlert[]>('shopnest_alerts', [
    {
      id: 'pa-init-1',
      productId: 'el-01',
      productName: 'AuraWave Over-Ear Wireless Headphones with Active Noise Cancellation',
      currentPrice: 4999,
      targetPrice: 4499,
      userEmail: DEMO_USER.email,
      createdAt: '2026-09-20',
      notifyMethod: 'both',
      status: 'active',
    },
  ]);

  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('el-01');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // Navigation helpers
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

  const setCategory = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
    setActivePage('listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery('');
  };

  // Toast Manager
  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' = 'success',
    action?: { label: string; onClick: () => void }
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type, action }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Management
  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (idx > -1) {
        const next = [...prev];
        const newQty = Math.min(product.stock, next[idx].quantity + quantity);
        next[idx] = { ...next[idx], quantity: newQty };
        return next;
      }

      return [
        ...prev,
        {
          product,
          quantity: Math.min(product.stock, quantity),
          selectedColor,
          selectedSize,
        },
      ];
    });

    showToast('Added to cart', `${product.name} added to your basket.`);
  };

  const buyNow = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCartQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === color &&
          item.selectedSize === size
        ) {
          return { ...item, quantity: Math.min(item.product.stock, quantity) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    const itemToRemove = cart.find(
      (item) =>
        item.product.id === productId &&
        item.selectedColor === color &&
        item.selectedSize === size
    );

    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );

    if (itemToRemove) {
      showToast(
        'Item removed',
        `${itemToRemove.product.name} removed from your cart.`,
        'info',
        {
          label: 'Undo',
          onClick: () => {
            setCart((curr) => [...curr, itemToRemove]);
            showToast('Restored', 'Item restored to your cart.');
          },
        }
      );
    }
  };

  const saveForLater = (productId: string, color?: string, size?: string) => {
    const item = cart.find(
      (i) =>
        i.product.id === productId &&
        i.selectedColor === color &&
        i.selectedSize === size
    );
    if (!item) return;

    setCart((prev) =>
      prev.filter(
        (i) =>
          !(
            i.product.id === productId &&
            i.selectedColor === color &&
            i.selectedSize === size
          )
      )
    );

    setSavedForLater((prev) => [
      ...prev.filter(
        (s) =>
          !(
            s.product.id === productId &&
            s.selectedColor === color &&
            s.selectedSize === size
          )
      ),
      {
        product: item.product,
        addedAt: new Date().toISOString(),
        selectedColor: color,
        selectedSize: size,
      },
    ]);

    showToast('Saved for later', 'Item moved to your saved list.');
  };

  const moveToCartFromSaved = (productId: string) => {
    const item = savedForLater.find((s) => s.product.id === productId);
    if (!item) return;

    setSavedForLater((prev) => prev.filter((s) => s.product.id !== productId));
    addToCart(item.product, 1, item.selectedColor, item.selectedSize);
  };

  const removeSavedItem = (productId: string) => {
    setSavedForLater((prev) => prev.filter((s) => s.product.id !== productId));
    showToast('Removed', 'Item removed from saved list.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    const prodName = prod ? prod.name : 'Item';
    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from wishlist', `${prodName} removed from wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Added to wishlist', `${prodName} saved to wishlist.`);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    addToCart(prod, 1);
    setWishlist((prev) => prev.filter((id) => id !== productId));
    showToast('Moved to cart', `${prod.name} moved to cart.`);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
    showToast('Removed from wishlist', 'Item removed from wishlist.', 'info');
  };

  // Price Alert
  const setPriceAlert = (
    productId: string,
    targetPrice: number,
    notifyMethod: 'email' | 'in-app' | 'both' = 'both'
  ) => {
    const prod = products.find((p) => p.id === productId);
    const existingIndex = priceAlerts.findIndex((a) => a.productId === productId);
    const newAlert: PriceAlert = {
      id: existingIndex > -1 ? priceAlerts[existingIndex].id : `pa-${Date.now()}`,
      productId,
      productName: prod ? prod.name : 'Tracked Product',
      currentPrice: prod ? prod.price : targetPrice,
      targetPrice,
      userEmail: user?.email || 'customer@example.com',
      createdAt: new Date().toISOString().split('T')[0],
      notifyMethod,
      status: 'active',
    };

    if (existingIndex > -1) {
      setPriceAlerts((prev) => {
        const copy = [...prev];
        copy[existingIndex] = newAlert;
        return copy;
      });
      showToast('Price alert updated', `Target price set to ₹${targetPrice.toLocaleString('en-IN')}.`);
    } else {
      setPriceAlerts((prev) => [newAlert, ...prev]);
      showToast(
        'Price alert activated',
        `We will notify you when price drops to ₹${targetPrice.toLocaleString('en-IN')}.`
      );
    }
  };

  const removePriceAlert = (alertId: string) => {
    setPriceAlerts((prev) => prev.filter((a) => a.id !== alertId));
    showToast('Price alert removed', 'You will no longer receive alerts for this item.', 'info');
  };

  const getPriceAlertForProduct = (productId: string) => {
    return priceAlerts.find((a) => a.productId === productId);
  };

  const simulatePriceDropTest = (productId: string, dropAmount = 500) => {
    const prod = products.find((p) => p.id === productId);
    const prodName = prod ? prod.name : 'Tracked item';
    showToast(
      'Price drop alert!',
      `Price drop on ${prodName}! Reduced by ₹${dropAmount.toLocaleString('en-IN')}. Check your alerts.`,
      'success'
    );
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SHOPNEST10') {
      setCouponCode(clean);
      setCouponDiscount(0.1); // 10%
      showToast('Coupon applied', '10% discount applied to your order.');
      return { success: true, message: '10% discount applied successfully.' };
    }
    if (clean === 'WELCOME20') {
      setCouponCode(clean);
      setCouponDiscount(0.2); // 20%
      showToast('Coupon applied', '20% discount applied to your order.');
      return { success: true, message: '20% discount applied successfully.' };
    }
    return { success: false, message: 'Invalid code. Try SHOPNEST10 or WELCOME20.' };
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setCouponDiscount(0);
    showToast('Coupon removed', 'Coupon code has been removed.', 'info');
  };

  // Orders
  const placeOrder = (
    address: Address,
    paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery',
    delivCharge: number
  ): Order => {
    const sub = cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
    const disc = Math.round(sub * couponDiscount);
    const tot = sub - disc + delivCharge;

    const newOrder: Order = {
      id: `SN-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cart.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.images[0] || '',
        selectedColor: i.selectedColor,
        selectedSize: i.selectedSize,
      })),
      subtotal: sub,
      discount: disc,
      deliveryCharge: delivCharge,
      total: tot,
      status: 'Ordered',
      deliveryAddress: address,
      paymentMethod,
      estimatedDeliveryDate: 'Within 2-3 business days',
      trackingHistory: [
        { status: 'Ordered', timestamp: 'Just now', location: 'Order Confirmed - Processing', completed: true },
        { status: 'Shipped', timestamp: 'Pending', location: 'Fulfillment Center', completed: false },
        { status: 'Out for Delivery', timestamp: 'Pending', location: 'Local Courier Facility', completed: false },
        { status: 'Delivered', timestamp: 'Estimated in 2-3 days', location: `${address.city}, ${address.state}`, completed: false },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setCouponCode(null);
    setCouponDiscount(0);
    showToast('Order placed', `Order #${newOrder.id} placed successfully.`);
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId && o.status !== 'Delivered') {
          return {
            ...o,
            status: 'Ordered',
            trackingHistory: [
              ...o.trackingHistory,
              { status: 'Ordered', timestamp: 'Just now', location: 'Order Cancelled by Customer', completed: true },
            ],
          };
        }
        return o;
      })
    );
    showToast('Order updated', `Cancellation request submitted for #${orderId}.`, 'info');
  };

  const reorderItems = (items: OrderItem[]) => {
    items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        addToCart(prod, item.quantity, item.selectedColor, item.selectedSize);
      }
    });
    setActivePage('cart');
    showToast('Items added', 'Items added back to your cart.');
  };

  // User Authentication Simulation
  const loginUser = (email: string, name?: string) => {
    const usr: UserProfile = {
      ...DEMO_USER,
      email,
      name: name || email.split('@')[0],
    };
    setUser(usr);
    showToast('Signed in', `Welcome back, ${usr.name}.`);
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed out', 'You have been signed out.', 'info');
  };

  const updateUserAddresses = (addresses: Address[]) => {
    if (!user) return;
    setUser({ ...user, addresses });
    showToast('Address saved', 'Your address book has been updated.');
  };

  // Calculated totals
  const cartSubtotal = useMemo(
    () => cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    [cart]
  );
  const cartDiscount = useMemo(
    () => Math.round(cartSubtotal * couponDiscount),
    [cartSubtotal, couponDiscount]
  );
  // Free delivery over ₹499, otherwise ₹40
  const deliveryCharge = useMemo(
    () => (cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 40),
    [cartSubtotal]
  );
  const cartTotal = useMemo(
    () => cartSubtotal - cartDiscount + deliveryCharge,
    [cartSubtotal, cartDiscount, deliveryCharge]
  );
  const cartCount = useMemo(
    () => cart.reduce((acc, i) => acc + i.quantity, 0),
    [cart]
  );
  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        savedForLater,
        wishlist,
        orders,
        user,
        priceAlerts,
        toasts,
        couponCode,
        couponDiscount,
        activePage,
        selectedProductId,
        searchQuery,
        filters,
        setActivePage,
        openProduct,
        setSearchQuery,
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
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        removeFromWishlist,
        setPriceAlert,
        removePriceAlert,
        getPriceAlertForProduct,
        simulatePriceDropTest,
        applyCoupon,
        removeCoupon,
        placeOrder,
        cancelOrder,
        reorderItems,
        loginUser,
        logoutUser,
        updateUserAddresses,
        showToast,
        dismissToast,
        cartSubtotal,
        cartDiscount,
        deliveryCharge,
        cartTotal,
        cartCount,
        wishlistCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export function useShop(): ShopContextType {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
