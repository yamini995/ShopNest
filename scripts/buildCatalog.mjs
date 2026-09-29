import fs from 'fs';
import path from 'path';

// Subcategory labels mapping from DummyJSON slug
const SUBCATEGORY_LABELS = {
  'smartphones': 'Smartphones',
  'laptops': 'Laptops',
  'tablets': 'Tablets',
  'mobile-accessories': 'Mobile Accessories',
  'mens-shirts': "Men's Shirts",
  'womens-dresses': "Women's Dresses",
  'tops': 'Tops & Tees',
  'mens-shoes': "Men's Shoes",
  'womens-shoes': "Women's Shoes",
  'beauty': 'Cosmetics & Beauty',
  'skin-care': 'Skin Care',
  'fragrances': 'Fragrances & Perfumes',
  'kitchen-accessories': 'Kitchen Accessories',
  'furniture': 'Furniture',
  'home-decoration': 'Home Decor',
  'sunglasses': 'Sunglasses',
  'mens-watches': "Men's Watches",
  'womens-watches': "Women's Watches",
  'womens-bags': "Handbags & Bags",
  'womens-jewellery': 'Jewellery',
  'fiction': 'Fiction',
  'self_help': 'Self Help',
  'business': 'Business & Economics',
  'science': 'Science & Nature',
  'history': 'History',
  'biography': 'Biographies & Memoirs',
  'fantasy': 'Fantasy & Sci-Fi',
  'technology': 'Computers & Technology',
  'romance': 'Romance',
  'mystery': 'Mystery & Thriller'
};

const CATEGORY_MAP = {
  'Mobiles': { prefix: 'mobiles', slugs: ['smartphones'] },
  'Laptops': { prefix: 'laptops', slugs: ['laptops'] },
  'Electronics': { prefix: 'electronics', slugs: ['tablets', 'mobile-accessories'] },
  'Fashion': { prefix: 'fashion', slugs: ['mens-shirts', 'womens-dresses', 'tops'] },
  'Shoes': { prefix: 'shoes', slugs: ['mens-shoes', 'womens-shoes'] },
  'Beauty': { prefix: 'beauty', slugs: ['beauty', 'skin-care', 'fragrances'] },
  'Home & Kitchen': { prefix: 'home-kitchen', slugs: ['kitchen-accessories', 'furniture', 'home-decoration'] },
  'Accessories': { prefix: 'accessories', slugs: ['sunglasses', 'mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery'] },
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function toInrPrice(usd) {
  const raw = Math.round(usd * 83);
  if (raw < 1000) {
    const tens = Math.round(raw / 10) * 10;
    return Math.max(99, tens - 1);
  } else if (raw < 10000) {
    const hundreds = Math.round(raw / 100) * 100;
    return Math.max(999, hundreds - 1);
  } else {
    const thousands = Math.round(raw / 1000) * 1000;
    return Math.max(9999, thousands - 1);
  }
}

function calcOriginalPrice(price, discountPercentage, isDiscounted) {
  if (discountPercentage && discountPercentage > 5) {
    const orig = Math.round(price / (1 - discountPercentage / 100));
    if (orig > price) {
      if (orig < 1000) return Math.round(orig / 10) * 10 - 1;
      if (orig < 10000) return Math.round(orig / 100) * 100 - 1;
      return Math.round(orig / 1000) * 1000 - 1;
    }
  }
  if (isDiscounted) {
    const discount = 0.12 + Math.random() * 0.25;
    const orig = Math.round(price / (1 - discount));
    if (orig < 1000) return Math.round(orig / 10) * 10 - 1;
    if (orig < 10000) return Math.round(orig / 100) * 100 - 1;
    return Math.round(orig / 1000) * 1000 - 1;
  }
  return price;
}

function clampRating(r) {
  const clamped = Math.min(4.8, Math.max(3.6, r));
  return Math.round(clamped * 10) / 10;
}

function calcReviewCount(rating) {
  // 12 to 4800, higher for higher ratings
  const factor = (rating - 3.5) / 1.3; // 0 to 1
  const min = Math.round(20 + factor * 200);
  const max = Math.round(800 + factor * 4000);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCreatedAt() {
  const now = new Date('2026-09-28T12:00:00Z').getTime();
  const past = now - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000);
  return new Date(past).toISOString();
}

function buildSpecs(category, title, brand) {
  switch (category) {
    case 'Mobiles':
      return {
        'Brand': brand,
        'Display': '6.1-inch Super Retina OLED, 120Hz',
        'Processor': 'Octa-Core Bionic Engine',
        'RAM / Storage': '8GB RAM | 128GB Internal',
        'Camera': '50MP + 12MP Dual Studio System',
        'Battery': '4500 mAh with 30W Fast Charge',
        'Operating System': 'Latest Mobile OS 2026',
        'Warranty': '1 Year Brand Manufacturer Warranty',
      };
    case 'Laptops':
      return {
        'Brand': brand,
        'Display': '15.6-inch QHD Anti-Glare Display (300 nits)',
        'Processor': 'Latest Generation High-Performance Processor',
        'Memory': '16GB DDR5 High-Speed RAM',
        'Storage': '512GB PCIe NVMe M.2 SSD',
        'Graphics': 'Integrated Ultra HD Graphics',
        'Weight': '1.45 kg Ultra-portable',
        'Warranty': '1 Year Onsite Domestic Warranty',
      };
    case 'Electronics':
      return {
        'Brand': brand,
        'Connectivity': 'Bluetooth 5.3 & Wi-Fi 6',
        'Battery Life': 'Up to 36 Hours Total Playback',
        'Charging': 'USB Type-C Quick Fast Charge',
        'Compatibility': 'Universal iOS, Android, macOS & Windows',
        'Water Resistance': 'IPX5 Sweat & Splash Proof',
        'Warranty': '1 Year Replacement Guarantee',
      };
    case 'Fashion':
      return {
        'Brand': brand,
        'Material': '100% Breathable Organic Combed Cotton',
        'Fit': 'Contemporary Regular Tailored Fit',
        'Pattern': 'Signature Solid / Textured',
        'Care Instructions': 'Machine wash cold inside-out, tumble dry low',
        'Country of Origin': 'India',
      };
    case 'Shoes':
      return {
        'Brand': brand,
        'Sole Material': 'Ultra-Resilient Lightweight EVA Cushion',
        'Upper Material': 'Engineered Breathable Mesh & Suede',
        'Closure': 'Lace-Up Ergonomic Fit',
        'Arch Support': 'Orthopedic Responsive Foam Insole',
        'Care': 'Wipe clean with a damp cloth or soft sponge',
      };
    case 'Beauty':
      return {
        'Brand': brand,
        'Formulation': 'Dermatologically Tested, Hypoallergenic',
        'Skin Type': 'Suitable for All Skin Types including Sensitive',
        'Key Benefits': 'Deep Nourishment, 24H Radiant Glow & Hydration',
        'Cruelty Free': '100% Vegan & Paraben-Free',
        'Net Volume': '50 ml / 1.7 fl. oz.',
      };
    case 'Home & Kitchen':
      return {
        'Brand': brand,
        'Material': 'Premium Grade Stainless Steel / Hardwood',
        'Finish': 'Corrosion & Scratch Resistant Matte Coating',
        'Food Safe': '100% BPA-Free & Non-Toxic Certified',
        'Maintenance': 'Dishwasher Safe / Easy Hand Wash',
        'Warranty': '2 Year Quality Guarantee',
      };
    case 'Books':
      return {
        'Author': brand,
        'Format': 'Deluxe Paperback Edition',
        'Language': 'English',
        'Publisher': 'Classic Heritage & Modern Press',
        'Pages': '352 Pages',
        'ISBN': '978-0132350884',
      };
    case 'Accessories':
      return {
        'Brand': brand,
        'Material': 'Grade 316L Stainless Steel & Genuine Leather',
        'Movement / Glass': 'Scratch-Proof Sapphire Coated Crystal',
        'Water Resistance': '5 ATM / 50 Meters Water-Resistant',
        'Clasp Type': 'Secure Stainless Steel Deployant Buckle',
        'Warranty': '2 Years International Manufacturer Warranty',
      };
    default:
      return { 'Brand': brand, 'Warranty': '1 Year Standard Warranty' };
  }
}

// Check HEAD of image URL with timeout
async function testImageUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    clearTimeout(timeout);
    return res.ok;
  } catch (err) {
    return false;
  }
}

async function main() {
  console.log('=== Step 1: Fetching DummyJSON Products ===');
  const dummyProductsByCategory = {};

  for (const [catName, config] of Object.entries(CATEGORY_MAP)) {
    dummyProductsByCategory[catName] = [];
    for (const slug of config.slugs) {
      try {
        console.log(`Fetching DummyJSON category: ${slug} -> ${catName}`);
        const res = await fetch(`https://dummyjson.com/products/category/${slug}`);
        const data = await res.json();
        for (const p of data.products || []) {
          p._slugCategory = slug;
          dummyProductsByCategory[catName].push(p);
        }
      } catch (e) {
        console.error(`Failed to fetch slug ${slug}:`, e.message);
      }
    }
    console.log(`  Found ${dummyProductsByCategory[catName].length} products for ${catName}`);
  }

  console.log('\n=== Step 2: Fetching Books from Open Library ===');
  const subjects = ['fiction', 'self_help', 'business', 'science', 'history', 'biography', 'fantasy', 'technology', 'romance', 'mystery'];
  const rawBooks = [];
  const bookTitles = new Set();

  for (const sub of subjects) {
    try {
      console.log(`Fetching OpenLibrary subject: ${sub}`);
      const res = await fetch(`https://openlibrary.org/subjects/${sub}.json?limit=10`, {
        headers: { 'User-Agent': 'ShopNest/1.0 (catalog-builder@shopnest.app)' }
      });
      const data = await res.json();
      for (const work of data.works || []) {
        if (work.cover_id && !bookTitles.has(work.title.toLowerCase())) {
          bookTitles.add(work.title.toLowerCase());
          const author = work.authors && work.authors[0] ? work.authors[0].name : 'Various Authors';
          rawBooks.push({
            title: work.title,
            brand: author,
            subject: sub,
            cover_id: work.cover_id,
            coverUrl: `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`,
            description: `A ${sub.replace('_', ' ')} title by ${author}.`
          });
        }
      }
    } catch (e) {
      console.error(`Failed to fetch subject ${sub}:`, e.message);
    }
  }

  // Deduplicate and take 20 total mixing subjects
  console.log(`Fetched ${rawBooks.length} raw books with covers across subjects.`);
  const pickedBooks = [];
  let subIndex = 0;
  while (pickedBooks.length < 20 && rawBooks.length > 0) {
    const targetSub = subjects[subIndex % subjects.length];
    const itemIndex = rawBooks.findIndex(b => b.subject === targetSub);
    if (itemIndex >= 0) {
      pickedBooks.push(rawBooks.splice(itemIndex, 1)[0]);
    } else {
      // Pick next available
      if (rawBooks.length > 0) {
        pickedBooks.push(rawBooks.shift());
      }
    }
    subIndex++;
  }
  console.log(`Selected ${pickedBooks.length} books for Books category.`);

  console.log('\n=== Step 3: Normalizing & Creating Variants ===');
  const finalCatalog = [];

  for (const [catName, config] of Object.entries(CATEGORY_MAP)) {
    let prods = dummyProductsByCategory[catName] || [];

    // Filter products with valid images
    prods = prods.filter(p => p.images && p.images.length > 0);

    // If more than 20, sort by most images descending then rating descending, take top 20
    if (prods.length > 20) {
      prods.sort((a, b) => {
        if (b.images.length !== a.images.length) {
          return b.images.length - a.images.length;
        }
        return (b.rating || 0) - (a.rating || 0);
      });
      prods = prods.slice(0, 20);
    }

    // Now convert base products into target format
    const baseItems = prods.map((p, idx) => {
      const stableId = `${config.prefix}-${String(idx + 1).padStart(3, '0')}`;
      const brand = p.brand || p.title.split(' ')[0] || 'Generic';
      const inrPrice = toInrPrice(p.price);
      const isDiscounted = Math.random() < 0.6;
      const origPrice = calcOriginalPrice(inrPrice, p.discountPercentage, isDiscounted);
      const discPercent = origPrice > inrPrice ? Math.round(((origPrice - inrPrice) / origPrice) * 100) : 0;
      const rating = clampRating(p.rating || 4.2);
      const subcatLabel = SUBCATEGORY_LABELS[p._slugCategory] || p._slugCategory || catName;

      return {
        id: stableId,
        baseProductId: stableId,
        name: p.title,
        title: p.title,
        brand,
        category: catName,
        subcategory: subcatLabel,
        slug: slugify(p.title),
        price: inrPrice,
        originalPrice: origPrice,
        discountPercentage: discPercent,
        hasSaleBadge: discPercent >= 15,
        rating,
        reviewCount: calcReviewCount(rating),
        stock: p.stock ?? 25,
        inStock: (p.stock ?? 25) > 0,
        images: p.images,
        description: p.description || `${p.title} from ${brand}. High quality genuine product with full warranty.`,
        specs: buildSpecs(catName, p.title, brand),
        colors: ['Mobiles', 'Laptops', 'Electronics', 'Fashion', 'Shoes', 'Beauty'].includes(catName) ? [
          { name: 'Midnight Black', hex: '#1C1917' },
          { name: 'Silver Slate', hex: '#64748B' },
          { name: 'Pacific Blue', hex: '#0284C7' }
        ] : undefined,
        sizes: catName === 'Shoes' ? ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
          : catName === 'Fashion' ? ['S', 'M', 'L', 'XL', 'XXL'] : undefined,
        deliveryDays: Math.floor(Math.random() * 6) + 1,
        isNew: Math.random() < 0.1,
        createdAt: randomCreatedAt(),
        _raw: p
      };
    });

    // If under 20, create variants of existing real products reusing that product's real images
    const items = [...baseItems];
    let variantIndex = 0;
    const variantUsageCount = {};

    while (items.length < 20 && baseItems.length > 0) {
      const parent = baseItems[variantIndex % baseItems.length];
      variantIndex++;
      const currentParentVariants = variantUsageCount[parent.id] || 0;
      if (currentParentVariants >= 2 && baseItems.length >= 7) {
        // Don't exceed 2 variants if we have enough base products
        continue;
      }
      variantUsageCount[parent.id] = currentParentVariants + 1;

      const variantNumber = items.length + 1;
      const vId = `${config.prefix}-${String(variantNumber).padStart(3, '0')}`;

      // Variant options per category
      let variantOption = '';
      let priceMultiplier = 1.0;

      if (['Mobiles', 'Laptops', 'Electronics'].includes(catName)) {
        const options = [
          { opt: '128 GB, Midnight Black', mult: 0.95 },
          { opt: '256 GB, Starlight Silver', mult: 1.08 },
          { opt: '512 GB, Deep Blue', mult: 1.22 },
          { opt: '16GB RAM + 512GB SSD, Silver', mult: 1.15 },
          { opt: '32GB RAM + 1TB SSD, Space Black', mult: 1.35 },
          { opt: 'Cellular + Wi-Fi, Space Gray', mult: 1.18 }
        ];
        const pick = options[variantNumber % options.length];
        variantOption = pick.opt;
        priceMultiplier = pick.mult;
      } else if (['Fashion', 'Shoes'].includes(catName)) {
        const options = [
          { opt: 'Navy Blue, Regular Fit', mult: 1.0 },
          { opt: 'Olive Green, Slim Fit', mult: 1.05 },
          { opt: 'Charcoal Black, Athletic Cut', mult: 1.0 },
          { opt: 'Crimson Red & White, UK 9', mult: 1.08 },
          { opt: 'Triple Black Stealth Edition', mult: 1.12 },
          { opt: 'Earth Brown Nubuck Edition', mult: 1.05 }
        ];
        const pick = options[variantNumber % options.length];
        variantOption = pick.opt;
        priceMultiplier = pick.mult;
      } else {
        const options = [
          { opt: '50ml Deluxe Edition', mult: 1.12 },
          { opt: '100ml Value Pack', mult: 1.38 },
          { opt: 'Matte Warm Honey Shade', mult: 1.0 },
          { opt: 'Pack of 2 Gift Set', mult: 1.75 },
          { opt: 'Gunmetal Titanium Finish', mult: 1.15 },
          { opt: 'Rose Gold Accent Edition', mult: 1.2 }
        ];
        const pick = options[variantNumber % options.length];
        variantOption = pick.opt;
        priceMultiplier = pick.mult;
      }

      const variantName = `${parent.title} - ${variantOption}`;
      const vPrice = toInrPrice((parent.price / 83) * priceMultiplier);
      const vOrigPrice = calcOriginalPrice(vPrice, parent.discountPercentage, true);
      const vDiscPercent = vOrigPrice > vPrice ? Math.round(((vOrigPrice - vPrice) / vOrigPrice) * 100) : 0;
      const vRating = clampRating(parent.rating + (variantNumber % 2 === 0 ? 0.2 : -0.2));

      items.push({
        id: vId,
        baseProductId: parent.id,
        variantOption,
        name: variantName,
        title: variantName,
        brand: parent.brand,
        category: catName,
        subcategory: parent.subcategory,
        slug: slugify(variantName),
        price: vPrice,
        originalPrice: vOrigPrice,
        discountPercentage: vDiscPercent,
        hasSaleBadge: vDiscPercent >= 15,
        rating: vRating,
        reviewCount: calcReviewCount(vRating),
        stock: Math.max(0, parent.stock - 2 + (variantNumber % 10)),
        inStock: true,
        images: parent.images,
        description: `${parent.description} (Variant option: ${variantOption})`,
        specs: { ...parent.specs, 'Edition / Variant': variantOption },
        colors: parent.colors,
        sizes: parent.sizes,
        deliveryDays: Math.floor(Math.random() * 6) + 1,
        isNew: Math.random() < 0.1,
        createdAt: randomCreatedAt()
      });
    }

    finalCatalog.push(...items.slice(0, 20));
  }

  // Books Category (20 books)
  console.log('Normalizing Books category...');
  const bookItems = pickedBooks.slice(0, 20).map((b, idx) => {
    const stableId = `books-${String(idx + 1).padStart(3, '0')}`;
    const inrPrices = [299, 349, 399, 449, 499, 549, 599, 699, 799, 899];
    const price = inrPrices[idx % inrPrices.length];
    const isDiscounted = idx % 3 === 0;
    const origPrice = isDiscounted ? price + 150 : price;
    const rating = clampRating(4.0 + (idx % 8) * 0.1);
    const subcatLabel = SUBCATEGORY_LABELS[b.subject] || b.subject;

    return {
      id: stableId,
      baseProductId: stableId,
      name: b.title,
      title: b.title,
      brand: b.brand,
      category: 'Books',
      subcategory: subcatLabel,
      slug: slugify(b.title),
      price,
      originalPrice: origPrice,
      discountPercentage: origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0,
      hasSaleBadge: origPrice > price,
      rating,
      reviewCount: calcReviewCount(rating),
      stock: 15 + (idx % 20),
      inStock: true,
      images: [b.coverUrl, b.coverUrl, b.coverUrl],
      description: b.description,
      specs: buildSpecs('Books', b.title, b.brand),
      deliveryDays: (idx % 4) + 2,
      isNew: idx < 2,
      createdAt: randomCreatedAt()
    };
  });
  finalCatalog.push(...bookItems);

  console.log(`\nCatalog constructed with ${finalCatalog.length} items total.`);

  // Step 4: Adjust stocks: ~5% forced to 0 and ~5% under 5
  finalCatalog.forEach((p, idx) => {
    if (idx % 20 === 7) {
      p.stock = 0;
      p.inStock = false;
    } else if (idx % 20 === 13) {
      p.stock = 3;
      p.inStock = true;
    }
    // Clean up temporary _raw
    delete p._raw;
  });

  // Step 5: Validate first image of every product
  console.log('\n=== Step 5: Validating Images & Reporting ===');
  console.log('HEAD-checking first image of each product (concurrent chunks)...');
  
  const verifiedCatalog = [];
  const chunkSize = 15;
  for (let i = 0; i < finalCatalog.length; i += chunkSize) {
    const chunk = finalCatalog.slice(i, i + chunkSize);
    const results = await Promise.all(
      chunk.map(async (prod) => {
        const ok = await testImageUrl(prod.images[0]);
        return { prod, ok };
      })
    );
    for (const r of results) {
      if (r.ok) {
        verifiedCatalog.push(r.prod);
      } else {
        console.warn(`Dropped product "${r.prod.name}" due to failed image HEAD: ${r.prod.images[0]}`);
      }
    }
  }

  // Check counts per category
  const categoryCounts = {};
  for (const p of verifiedCatalog) {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  }

  console.log('\n--- Category Counts Table After Image Validation ---');
  console.table(categoryCounts);

  // If any category is short after drops, fill with variants
  for (const catName of Object.keys(CATEGORY_MAP).concat(['Books'])) {
    const currentCount = verifiedCatalog.filter(p => p.category === catName).length;
    if (currentCount < 20) {
      console.log(`Category "${catName}" is short (${currentCount}/20). Adding variants...`);
      const existing = verifiedCatalog.filter(p => p.category === catName);
      let addCount = 20 - currentCount;
      let eIdx = 0;
      while (addCount > 0 && existing.length > 0) {
        const parent = existing[eIdx % existing.length];
        eIdx++;
        const nextId = `${parent.id.split('-')[0]}-${String(currentCount + (20 - currentCount - addCount) + 1).padStart(3, '0')}`;
        const vOpt = `Special Edition ${addCount}`;
        const newV = {
          ...parent,
          id: nextId,
          baseProductId: parent.baseProductId || parent.id,
          variantOption: vOpt,
          name: `${parent.title} - ${vOpt}`,
          title: `${parent.title} - ${vOpt}`,
          slug: slugify(`${parent.title}-${vOpt}`),
          price: parent.price + 100,
          originalPrice: parent.originalPrice + 100,
          reviewCount: calcReviewCount(parent.rating)
        };
        verifiedCatalog.push(newV);
        addCount--;
      }
    }
  }

  // Print final counts
  const finalCounts = {};
  for (const p of verifiedCatalog) {
    finalCounts[p.category] = (finalCounts[p.category] || 0) + 1;
  }
  console.log('\n--- Final Verified Category Counts ---');
  console.table(finalCounts);

  // Check duplicate images shared by more than 2 products
  const imageUsage = {};
  for (const p of verifiedCatalog) {
    const img0 = p.images[0];
    imageUsage[img0] = (imageUsage[img0] || 0) + 1;
  }
  const multiShared = Object.entries(imageUsage).filter(([_, count]) => count > 2);
  if (multiShared.length > 0) {
    console.log(`\nNote: ${multiShared.length} images shared by more than 2 products (expected for variant items):`);
    multiShared.forEach(([url, cnt]) => console.log(`  - [${cnt} products] ${url}`));
  }

  // Generate src/data/products.ts
  console.log('\nWriting to src/data/products.ts...');
  const categoriesList = [
    { id: 'all', name: 'All Categories', count: verifiedCatalog.length },
    ...Object.keys(CATEGORY_MAP).concat(['Books']).map(cat => ({
      id: cat,
      name: cat,
      count: verifiedCatalog.filter(p => p.category === cat).length
    }))
  ];

  const code = `import { Product, ProductCategory, UserProfile, Order } from '../types';

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

export const CATEGORIES_LIST = ${JSON.stringify(categoriesList, null, 2)};

export const RAW_PRODUCTS: Product[] = ${JSON.stringify(verifiedCatalog, null, 2)};

export const PRODUCTS: Product[] = RAW_PRODUCTS;

export const DEMO_USER: UserProfile = {
  id: 'usr-101',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.in',
  phone: '+91 98765 43210',
  joinedDate: 'March 2024',
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
        productId: RAW_PRODUCTS[0]?.id || 'mobiles-001',
        name: RAW_PRODUCTS[0]?.name || 'Smartphone Pro',
        price: RAW_PRODUCTS[0]?.price || 49999,
        quantity: 1,
        image: RAW_PRODUCTS[0]?.images[0] || '',
      },
    ],
    subtotal: RAW_PRODUCTS[0]?.price || 49999,
    discount: 0,
    deliveryCharge: 0,
    total: RAW_PRODUCTS[0]?.price || 49999,
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
        productId: RAW_PRODUCTS.find(p => p.category === 'Books')?.id || 'books-001',
        name: RAW_PRODUCTS.find(p => p.category === 'Books')?.name || 'Pride and Prejudice',
        price: RAW_PRODUCTS.find(p => p.category === 'Books')?.price || 399,
        quantity: 1,
        image: RAW_PRODUCTS.find(p => p.category === 'Books')?.images[0] || '',
      },
    ],
    subtotal: RAW_PRODUCTS.find(p => p.category === 'Books')?.price || 399,
    discount: 0,
    deliveryCharge: 0,
    total: RAW_PRODUCTS.find(p => p.category === 'Books')?.price || 399,
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

  fs.writeFileSync(path.resolve('src/data/products.ts'), code, 'utf-8');
  console.log('Successfully written src/data/products.ts!');
}

main().catch(err => {
  console.error('Fatal script error:', err);
  process.exit(1);
});
