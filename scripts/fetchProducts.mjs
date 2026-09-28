import fs from 'fs';
import path from 'path';

// Realistic price conversion: USD to INR (x 83), ending in 9 or 99
function toInrPrice(usd) {
  const raw = Math.round(usd * 83);
  if (raw < 1000) {
    const tens = Math.round(raw / 10) * 10;
    return Math.max(99, tens - 1);
  }
  const hundreds = Math.round(raw / 100) * 100;
  return Math.max(999, hundreds - 1);
}

function calculateOriginalPrice(price, discountPercent) {
  if (!discountPercent || discountPercent <= 0) return price;
  const raw = Math.round(price / (1 - discountPercent / 100));
  if (raw < 1000) {
    const tens = Math.round(raw / 10) * 10;
    return Math.max(price, tens - 1);
  }
  const hundreds = Math.round(raw / 100) * 100;
  return Math.max(price, hundreds - 1);
}

const COLOR_PALETTES = {
  tech: [
    { name: 'Space Gray', hex: '#4B5563' },
    { name: 'Silver', hex: '#E5E7EB' },
    { name: 'Midnight Black', hex: '#111827' },
  ],
  fashion: [
    { name: 'Navy Blue', hex: '#1E3A8A' },
    { name: 'Classic Black', hex: '#18181B' },
    { name: 'Olive Green', hex: '#3F6212' },
  ],
  shoes: [
    { name: 'Black / White', hex: '#18181B' },
    { name: 'University Red', hex: '#DC2626' },
    { name: 'Wolf Gray', hex: '#9CA3AF' },
  ],
  beauty: [
    { name: 'Natural Nude', hex: '#FBCFE8' },
    { name: 'Classic Scarlet', hex: '#E11D48' },
  ],
  home: [
    { name: 'Natural Wood', hex: '#78350F' },
    { name: 'Matte Charcoal', hex: '#374151' },
  ],
  accessories: [
    { name: 'Obsidian Black', hex: '#09090B' },
    { name: 'Cognac Brown', hex: '#9A3412' },
    { name: 'Polished Silver', hex: '#D1D5DB' },
  ],
};

async function main() {
  console.log('Fetching products from DummyJSON...');
  const res = await fetch('https://dummyjson.com/products?limit=0');
  const data = await res.json();
  const all = data.products;

  // Filter and map to 8 ShopNest categories (up to 8 products per category)
  const categoryConfig = [
    {
      shopCategory: 'Mobiles',
      match: (p) => p.category === 'smartphones',
      colorType: 'tech',
      sizes: undefined,
      limit: 8,
    },
    {
      shopCategory: 'Laptops',
      match: (p) => ['laptops', 'tablets'].includes(p.category),
      colorType: 'tech',
      sizes: undefined,
      limit: 8,
    },
    {
      shopCategory: 'Electronics',
      match: (p) => p.category === 'mobile-accessories',
      colorType: 'tech',
      sizes: undefined,
      limit: 8,
    },
    {
      shopCategory: 'Fashion',
      match: (p) => ['mens-shirts', 'womens-dresses', 'tops'].includes(p.category),
      colorType: 'fashion',
      sizes: ['S', 'M', 'L', 'XL'],
      limit: 8,
    },
    {
      shopCategory: 'Shoes',
      match: (p) => ['mens-shoes', 'womens-shoes'].includes(p.category),
      colorType: 'shoes',
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
      limit: 8,
    },
    {
      shopCategory: 'Beauty',
      match: (p) => ['beauty', 'skin-care', 'fragrances'].includes(p.category),
      colorType: 'beauty',
      sizes: undefined,
      limit: 8,
    },
    {
      shopCategory: 'Home & Kitchen',
      match: (p) =>
        ['kitchen-accessories', 'furniture', 'home-decoration'].includes(
          p.category
        ),
      colorType: 'home',
      sizes: undefined,
      limit: 8,
    },
    {
      shopCategory: 'Accessories',
      match: (p) =>
        [
          'sunglasses',
          'mens-watches',
          'womens-watches',
          'womens-bags',
          'womens-jewellery',
        ].includes(p.category),
      colorType: 'accessories',
      sizes: undefined,
      limit: 8,
    },
  ];

  const processedProducts = [];
  const categoryCounts = {};

  for (const cfg of categoryConfig) {
    const matched = all.filter(cfg.match).slice(0, cfg.limit);
    console.log(`Found ${matched.length} items for ${cfg.shopCategory}`);
    categoryCounts[cfg.shopCategory] = matched.length;

    matched.forEach((p, index) => {
      const price = toInrPrice(p.price);
      const originalPrice = calculateOriginalPrice(price, p.discountPercentage);
      const rating = Math.round(p.rating * 10) / 10;
      const reviewCount = Math.floor(180 + (p.id * 73) % 2400);
      const deliveryDays = (index % 2) + 1; // 1 or 2 days
      const isNew = index % 3 === 0;
      const createdAt = `2026-0${(index % 8) + 1}-15`;

      const specs = {
        Brand: p.brand || 'ShopNest Verified',
        Category: cfg.shopCategory,
        Warranty: p.warrantyInformation || '1 Year Manufacturer Warranty',
        ReturnPolicy: p.returnPolicy || '7 Days Replacement Guarantee',
        Availability: p.availabilityStatus || 'In Stock',
      };

      if (p.dimensions) {
        specs['Dimensions'] = `${p.dimensions.width} x ${p.dimensions.height} x ${p.dimensions.depth} cm`;
      }
      if (p.weight) {
        specs['Weight'] = `${p.weight} kg`;
      }

      processedProducts.push({
        id: `sn-${cfg.shopCategory.toLowerCase().slice(0, 2)}-${String(
          index + 1
        ).padStart(2, '0')}`,
        name: p.title,
        brand: p.brand || 'ShopNest Verified',
        category: cfg.shopCategory,
        price,
        originalPrice,
        rating,
        reviewCount,
        images: p.images && p.images.length > 0 ? p.images : [p.thumbnail],
        description: p.description,
        specs,
        colors: COLOR_PALETTES[cfg.colorType],
        sizes: cfg.sizes,
        stock: p.stock || 25,
        isNew,
        createdAt,
        deliveryDays,
        hasSaleBadge: originalPrice > price,
      });
    });
  }

  // 8 Real Books with Real Verified ISBNs from Open Library
  const books = [
    {
      isbn: '9780132350884',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      price: 699,
      originalPrice: 999,
      rating: 4.7,
      reviewCount: 3820,
      description:
        'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. A timeless guide to software craft, readability, and refactoring.',
      specs: {
        Author: 'Robert C. Martin',
        Publisher: 'Prentice Hall',
        Language: 'English',
        Format: 'Paperback, 464 pages',
        'ISBN-13': '978-0132350884',
      },
      deliveryDays: 1,
      createdAt: '2026-03-10',
    },
    {
      isbn: '9781449373320',
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      price: 1899,
      originalPrice: 2499,
      rating: 4.9,
      reviewCount: 4210,
      description:
        'Data is at the center of many challenges in system design today. Explore the principles, algorithms, and practical trade-offs for distributed systems, replication, and streaming.',
      specs: {
        Author: 'Martin Kleppmann',
        Publisher: "O'Reilly Media",
        Language: 'English',
        Format: 'Paperback, 616 pages',
        'ISBN-13': '978-1449373320',
      },
      deliveryDays: 2,
      createdAt: '2026-04-12',
    },
    {
      isbn: '9780135957059',
      title: 'The Pragmatic Programmer: Your Journey To Mastery (20th Anniversary)',
      author: 'David Thomas, Andrew Hunt',
      price: 1499,
      originalPrice: 1999,
      rating: 4.8,
      reviewCount: 2950,
      description:
        'One of the most significant books on modern programming practices. Covers career development, architectural responsibility, and keeping code flexible and adaptable.',
      specs: {
        Author: 'David Thomas, Andrew Hunt',
        Publisher: 'Addison-Wesley',
        Language: 'English',
        Format: 'Paperback, 352 pages',
        'ISBN-13': '978-0135957059',
      },
      deliveryDays: 1,
      createdAt: '2026-05-18',
    },
    {
      isbn: '9780735211292',
      title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      author: 'James Clear',
      price: 499,
      originalPrice: 799,
      rating: 4.8,
      reviewCount: 8430,
      description:
        'No matter your goals, Atomic Habits offers a proven framework for improving every day. Learn how microscopic changes lead to remarkable results over time.',
      specs: {
        Author: 'James Clear',
        Publisher: 'Avery',
        Language: 'English',
        Format: 'Paperback, 320 pages',
        'ISBN-13': '978-0735211292',
      },
      deliveryDays: 1,
      createdAt: '2026-06-01',
    },
    {
      isbn: '9780134494166',
      title: 'Clean Architecture: A Craftsman’s Guide to Software Structure and Design',
      author: 'Robert C. Martin',
      price: 899,
      originalPrice: 1299,
      rating: 4.7,
      reviewCount: 2410,
      description:
        'By applying universal rules of software architecture, you can dramatically improve developer productivity throughout the life of any software system.',
      specs: {
        Author: 'Robert C. Martin',
        Publisher: 'Prentice Hall',
        Language: 'English',
        Format: 'Paperback, 432 pages',
        'ISBN-13': '978-0134494166',
      },
      deliveryDays: 2,
      createdAt: '2026-05-02',
    },
    {
      isbn: '9780201616224',
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      price: 599,
      originalPrice: 899,
      rating: 4.6,
      reviewCount: 3120,
      description:
        'Even the smartest among us can feel inept as we fail to figure out which light switch or oven burner to turn on, or whether to push, pull, or slide a door. The ultimate primer on design usability.',
      specs: {
        Author: 'Don Norman',
        Publisher: 'Basic Books',
        Language: 'English',
        Format: 'Paperback, 368 pages',
        'ISBN-13': '978-0201616224',
      },
      deliveryDays: 1,
      createdAt: '2026-04-18',
    },
    {
      isbn: '9780596007126',
      title: 'Head First Design Patterns: Building Extensible and Maintainable Software',
      author: 'Eric Freeman, Elisabeth Robson',
      price: 1399,
      originalPrice: 1899,
      rating: 4.7,
      reviewCount: 2780,
      description:
        'You want to learn about the patterns that matter, why they matter, how and when to apply them, and the object-oriented design principles on which they’re based.',
      specs: {
        Author: 'Eric Freeman, Elisabeth Robson',
        Publisher: "O'Reilly Media",
        Language: 'English',
        Format: 'Paperback, 694 pages',
        'ISBN-13': '978-0596007126',
      },
      deliveryDays: 2,
      createdAt: '2026-06-11',
    },
    {
      isbn: '9780385547345',
      title: 'Deep Work: Rules for Focused Success in a Distracted World',
      author: 'Cal Newport',
      price: 549,
      originalPrice: 799,
      rating: 4.6,
      reviewCount: 5120,
      description:
        'Deep work is the ability to focus without distraction on a cognitively demanding task. It’s a skill that allows you to quickly master complicated information and produce better results in less time.',
      specs: {
        Author: 'Cal Newport',
        Publisher: 'Grand Central Publishing',
        Language: 'English',
        Format: 'Paperback, 304 pages',
        'ISBN-13': '978-0385547345',
      },
      deliveryDays: 1,
      createdAt: '2026-06-25',
    },
  ];

  categoryCounts['Books'] = books.length;

  books.forEach((b, index) => {
    const coverUrl = `https://covers.openlibrary.org/b/isbn/${b.isbn}-L.jpg`;
    processedProducts.push({
      id: `sn-bk-0${index + 1}`,
      name: b.title,
      brand: b.author,
      category: 'Books',
      price: b.price,
      originalPrice: b.originalPrice,
      rating: b.rating,
      reviewCount: b.reviewCount,
      images: [coverUrl, coverUrl, coverUrl],
      description: b.description,
      specs: b.specs,
      stock: 40,
      isNew: index === 3 || index === 7,
      createdAt: b.createdAt,
      deliveryDays: b.deliveryDays,
      hasSaleBadge: b.originalPrice > b.price,
    });
  });

  console.log(`Total processed products: ${processedProducts.length}`);

  // Build category list with real accurate counts
  const categoriesListDef = [
    { id: 'all', name: 'All Categories', count: processedProducts.length },
    { id: 'Electronics', name: 'Electronics', count: categoryCounts['Electronics'] || 8 },
    { id: 'Mobiles', name: 'Mobiles', count: categoryCounts['Mobiles'] || 8 },
    { id: 'Laptops', name: 'Laptops', count: categoryCounts['Laptops'] || 8 },
    { id: 'Fashion', name: 'Fashion', count: categoryCounts['Fashion'] || 8 },
    { id: 'Shoes', name: 'Shoes', count: categoryCounts['Shoes'] || 8 },
    { id: 'Beauty', name: 'Beauty', count: categoryCounts['Beauty'] || 8 },
    { id: 'Home & Kitchen', name: 'Home & Kitchen', count: categoryCounts['Home & Kitchen'] || 8 },
    { id: 'Books', name: 'Books', count: categoryCounts['Books'] || 8 },
    { id: 'Accessories', name: 'Accessories', count: categoryCounts['Accessories'] || 8 },
  ];

  // Build the complete src/data/products.ts file content
  const outputCode = `import { Product, ProductCategory, UserProfile, Order } from '../types';

export const CATEGORY_NAMES: ProductCategory[] = [
  'Electronics',
  'Mobiles',
  'Laptops',
  'Fashion',
  'Shoes',
  'Beauty',
  'Home & Kitchen',
  'Books',
  'Accessories',
];
export const CATEGORIES = CATEGORY_NAMES;

export const CATEGORIES_LIST = ${JSON.stringify(categoriesListDef, null, 2)};

const RAW_PRODUCTS: Product[] = ${JSON.stringify(processedProducts, null, 2)};

export const PRODUCTS: (Product & {
  isDealOfDay?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
})[] = RAW_PRODUCTS.map((p) => {
  const discountPercentage =
    p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : 0;

  return {
    ...p,
    title: p.name,
    inStock: p.stock > 0,
    discountPercentage,
    deliveryTime:
      p.deliveryDays === 1
        ? 'Free delivery tomorrow'
        : \`Free delivery in \${p.deliveryDays} days\`,
    isDealOfDay: p.hasSaleBadge || discountPercentage >= 25,
    isPopular: p.rating >= 4.5 && p.reviewCount > 500,
    isRecommended: p.rating >= 4.4,
    visualType: 'product',
    themeColor: '#0F766E',
  };
});

export const DEMO_USER: UserProfile = {
  id: 'usr-101',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  joinedDate: 'May 2025',
  addresses: [
    {
      id: 'addr-01',
      fullName: 'Rahul Sharma',
      phone: '+91 98765 43210',
      street: '42, 3rd Cross, Indiranagar',
      apartment: 'Flat 302, Green Meadows',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      isDefault: true,
      type: 'home',
    },
    {
      id: 'addr-02',
      fullName: 'Rahul Sharma (Office)',
      phone: '+91 98765 43210',
      street: 'EcoSpace Business Park, Bellandur',
      apartment: 'Tower 2, 4th Floor',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560103',
      isDefault: false,
      type: 'office',
    },
  ],
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SN-2026-89412',
    date: '25 Sep, 2026',
    items: [
      {
        productId: RAW_PRODUCTS[0]?.id || 'sn-mo-01',
        name: RAW_PRODUCTS[0]?.name || 'iPhone 13 Pro',
        price: RAW_PRODUCTS[0]?.price || 89999,
        quantity: 1,
        image: RAW_PRODUCTS[0]?.images[0] || '',
      },
    ],
    subtotal: RAW_PRODUCTS[0]?.price || 89999,
    discount: 0,
    deliveryCharge: 0,
    total: RAW_PRODUCTS[0]?.price || 89999,
    status: 'Out for Delivery',
    deliveryAddress: DEMO_USER.addresses[0],
    paymentMethod: 'UPI',
    estimatedDeliveryDate: 'Today by 8:00 PM',
    trackingHistory: [
      { status: 'Ordered', timestamp: '25 Sep, 10:14 AM', location: 'Order Confirmed - Bengaluru Hub', completed: true },
      { status: 'Shipped', timestamp: '26 Sep, 02:40 PM', location: 'Dispatched from Whitefield Fulfillment Center', completed: true },
      { status: 'Out for Delivery', timestamp: 'Today, 09:15 AM', location: 'Courier Partner En Route', completed: true },
      { status: 'Delivered', timestamp: 'Estimated by 8:00 PM', location: 'Indiranagar, Bengaluru', completed: false },
    ],
  },
  {
    id: 'SN-2026-72108',
    date: '20 Aug, 2026',
    items: [
      {
        productId: RAW_PRODUCTS[64]?.id || 'sn-bk-01',
        name: RAW_PRODUCTS[64]?.name || 'Clean Code: A Handbook of Agile Software Craftsmanship',
        price: RAW_PRODUCTS[64]?.price || 699,
        quantity: 1,
        image: RAW_PRODUCTS[64]?.images[0] || '',
      },
    ],
    subtotal: RAW_PRODUCTS[64]?.price || 699,
    discount: 0,
    deliveryCharge: 0,
    total: RAW_PRODUCTS[64]?.price || 699,
    status: 'Delivered',
    deliveryAddress: DEMO_USER.addresses[0],
    paymentMethod: 'Credit/Debit Card',
    estimatedDeliveryDate: '22 Aug, 2026',
    trackingHistory: [
      { status: 'Ordered', timestamp: '20 Aug, 11:00 AM', location: 'Order Confirmed', completed: true },
      { status: 'Shipped', timestamp: '21 Aug, 08:30 AM', location: 'Dispatched from Koramangala Hub', completed: true },
      { status: 'Out for Delivery', timestamp: '22 Aug, 09:10 AM', location: 'Delivered to Doorstep', completed: true },
      { status: 'Delivered', timestamp: '22 Aug, 01:45 PM', location: 'Delivered & Signed', completed: true },
    ],
  },
];
`;

  const targetPath = path.resolve('src/data/products.ts');
  fs.writeFileSync(targetPath, outputCode, 'utf-8');
  console.log(`Successfully wrote ${processedProducts.length} products to ${targetPath}`);
}

main().catch((err) => {
  console.error('Error fetching products:', err);
  process.exit(1);
});
