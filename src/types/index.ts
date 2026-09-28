export type ProductCategory =
  | 'electronics'
  | 'audio'
  | 'computers'
  | 'wearables'
  | 'home-living'
  | 'lifestyle';

export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  inStock: boolean;
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
  title: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  deliveryTime: string;
  isDealOfDay?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  colors: ProductVariant[];
  sizes?: string[];
  themeColor: string;
  visualType: string;
  reviews: Review[];
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
  title: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  themeColor: string;
  visualType: string;
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
