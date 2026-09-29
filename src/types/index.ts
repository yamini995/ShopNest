export type ProductCategory =
  | 'Electronics'
  | 'Mobiles'
  | 'Laptops'
  | 'Fashion'
  | 'Shoes'
  | 'Beauty'
  | 'Home & Kitchen'
  | 'Books'
  | 'Accessories';

export interface ProductVariantColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  title?: string;
  brand: string;
  category: ProductCategory;
  subcategory?: string;
  slug?: string;
  baseProductId?: string;
  variantOption?: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
  colors?: ProductVariantColor[];
  sizes?: string[];
  stock: number;
  inStock?: boolean;
  isNew?: boolean;
  createdAt: string;
  deliveryDays: number;
  deliveryTime?: string;
  hasSaleBadge?: boolean;
  discountPercentage?: number;
  visualType?: string;
  themeColor?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface SavedItem {
  product: Product;
  addedAt: string;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
  type: 'home' | 'office';
}

export type OrderStatus = 'Ordered' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface OrderItem {
  productId: string;
  name: string;
  title?: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  visualType?: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  status: OrderStatus;
  deliveryAddress: Address;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery';
  estimatedDeliveryDate: string;
  trackingHistory: {
    status: OrderStatus;
    timestamp: string;
    location: string;
    completed: boolean;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  joinedDate: string;
}

export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  currentPrice: number;
  targetPrice: number;
  userEmail: string;
  createdAt: string;
  notifyMethod: 'email' | 'in-app' | 'both';
  status: 'active' | 'triggered';
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export type ActivePage =
  | 'home'
  | 'listing'
  | 'product-detail'
  | 'cart'
  | 'orders'
  | 'account'
  | 'wishlist'
  | 'catalog-check';

export type SortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  brands: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
}
