import { Product, ProductCategory } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/products';

export interface FilterParams {
  category?: string;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  brand?: string;
  inStockOnly?: boolean;
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
  /**
   * Fetch list of products with optional filtering and sorting
   */
  async getProducts(params?: FilterParams): Promise<Product[]> {
    await delay(120); // Simulated network latency for skeleton transitions
    
    let result = [...PRODUCTS];

    if (!params) return result;

    // Search query
    if (params.query && params.query.trim()) {
      const q = params.query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (params.category && params.category !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === params.category?.toLowerCase()
      );
    }

    // Brand filter
    if (params.brand && params.brand !== 'all') {
      result = result.filter(
        (p) => p.brand.toLowerCase() === params.brand?.toLowerCase()
      );
    }

    // Price range
    if (params.minPrice !== undefined) {
      result = result.filter((p) => p.price >= (params.minPrice ?? 0));
    }
    if (params.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= (params.maxPrice ?? Infinity));
    }

    // Rating
    if (params.minRating && params.minRating > 0) {
      result = result.filter((p) => p.rating >= (params.minRating ?? 0));
    }

    // In Stock Only
    if (params.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sorting
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'relevance':
        default:
          result.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
      }
    }

    return result;
  },

  /**
   * Fetch single product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    await delay(100);
    const found = PRODUCTS.find((p) => p.id === id);
    return found || null;
  },

  /**
   * Quick search for autocomplete suggestions
   */
  async searchProducts(query: string, limit = 5): Promise<Product[]> {
    await delay(60);
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, limit);
  },

  /**
   * Get related products in the same category
   */
  async getRelated(productId: string, category: ProductCategory, limit = 4): Promise<Product[]> {
    await delay(80);
    return PRODUCTS.filter(
      (p) => p.category === category && p.id !== productId
    ).slice(0, limit);
  },

  /**
   * Get all categories
   */
  async getCategories(): Promise<ProductCategory[]> {
    return CATEGORIES;
  },
};
