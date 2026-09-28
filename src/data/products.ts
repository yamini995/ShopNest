import { Product, ProductCategory, UserProfile, Order } from '../types';

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

export const CATEGORIES_LIST = [
  {
    "id": "all",
    "name": "All Categories",
    "count": 72
  },
  {
    "id": "Electronics",
    "name": "Electronics",
    "count": 8
  },
  {
    "id": "Mobiles",
    "name": "Mobiles",
    "count": 8
  },
  {
    "id": "Laptops",
    "name": "Laptops",
    "count": 8
  },
  {
    "id": "Fashion",
    "name": "Fashion",
    "count": 8
  },
  {
    "id": "Shoes",
    "name": "Shoes",
    "count": 8
  },
  {
    "id": "Beauty",
    "name": "Beauty",
    "count": 8
  },
  {
    "id": "Home & Kitchen",
    "name": "Home & Kitchen",
    "count": 8
  },
  {
    "id": "Books",
    "name": "Books",
    "count": 8
  },
  {
    "id": "Accessories",
    "name": "Accessories",
    "count": 8
  }
];

const RAW_PRODUCTS: Product[] = [
  {
    "id": "sn-mo-01",
    "name": "iPhone 5s",
    "brand": "Apple",
    "category": "Mobiles",
    "price": 16599,
    "originalPrice": 19099,
    "rating": 2.8,
    "reviewCount": 1813,
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/2.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/3.webp"
    ],
    "description": "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience.",
    "specs": {
      "Brand": "Apple",
      "Category": "Mobiles",
      "Warranty": "Lifetime warranty",
      "ReturnPolicy": "60 days return policy",
      "Availability": "In Stock",
      "Dimensions": "5.29 x 18.38 x 17.72 cm",
      "Weight": "2 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 25,
    "isNew": true,
    "createdAt": "2026-01-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-mo-02",
    "name": "iPhone 6",
    "brand": "Apple",
    "category": "Mobiles",
    "price": 24899,
    "originalPrice": 26699,
    "rating": 3.4,
    "reviewCount": 1886,
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/1.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/2.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/3.webp"
    ],
    "description": "The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.",
    "specs": {
      "Brand": "Apple",
      "Category": "Mobiles",
      "Warranty": "1 month warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "11 x 9.1 x 9.67 cm",
      "Weight": "7 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 60,
    "isNew": false,
    "createdAt": "2026-02-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-mo-03",
    "name": "iPhone 13 Pro",
    "brand": "Apple",
    "category": "Mobiles",
    "price": 91299,
    "originalPrice": 100699,
    "rating": 4.1,
    "reviewCount": 1959,
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp"
    ],
    "description": "The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.",
    "specs": {
      "Brand": "Apple",
      "Category": "Mobiles",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "12.63 x 5.28 x 14.29 cm",
      "Weight": "8 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 56,
    "isNew": false,
    "createdAt": "2026-03-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-mo-04",
    "name": "iPhone X",
    "brand": "Apple",
    "category": "Mobiles",
    "price": 74699,
    "originalPrice": 92899,
    "rating": 2.5,
    "reviewCount": 2032,
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/1.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/2.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/3.webp"
    ],
    "description": "The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.",
    "specs": {
      "Brand": "Apple",
      "Category": "Mobiles",
      "Warranty": "3 months warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "21.88 x 24.19 x 14.19 cm",
      "Weight": "1 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 37,
    "isNew": true,
    "createdAt": "2026-04-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-mo-05",
    "name": "Oppo A57",
    "brand": "Oppo",
    "category": "Mobiles",
    "price": 20699,
    "originalPrice": 21199,
    "rating": 3.9,
    "reviewCount": 2105,
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/1.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/2.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/3.webp"
    ],
    "description": "The Oppo A57 is a mid-range smartphone known for its sleek design and capable features. It offers a balance of performance and affordability, making it a popular choice.",
    "specs": {
      "Brand": "Oppo",
      "Category": "Mobiles",
      "Warranty": "Lifetime warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "7.2 x 10.74 x 23.68 cm",
      "Weight": "5 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 19,
    "isNew": false,
    "createdAt": "2026-05-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-mo-06",
    "name": "Oppo F19 Pro Plus",
    "brand": "Oppo",
    "category": "Mobiles",
    "price": 33199,
    "originalPrice": 40799,
    "rating": 3.5,
    "reviewCount": 2178,
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/1.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/2.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/3.webp"
    ],
    "description": "The Oppo F19 Pro Plus is a feature-rich smartphone with a focus on camera capabilities. It boasts advanced photography features and a powerful performance for a premium user experience.",
    "specs": {
      "Brand": "Oppo",
      "Category": "Mobiles",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "6.78 x 25.17 x 8.4 cm",
      "Weight": "6 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 78,
    "isNew": false,
    "createdAt": "2026-06-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-mo-07",
    "name": "Oppo K1",
    "brand": "Oppo",
    "category": "Mobiles",
    "price": 24899,
    "originalPrice": 30499,
    "rating": 4.3,
    "reviewCount": 2251,
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/1.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/2.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/3.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/4.webp"
    ],
    "description": "The Oppo K1 series offers a range of smartphones with various features and specifications. Known for their stylish design and reliable performance, the Oppo K1 series caters to diverse user preferences.",
    "specs": {
      "Brand": "Oppo",
      "Category": "Mobiles",
      "Warranty": "1 month warranty",
      "ReturnPolicy": "30 days return policy",
      "Availability": "In Stock",
      "Dimensions": "13.89 x 10.63 x 16.6 cm",
      "Weight": "5 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 55,
    "isNew": true,
    "createdAt": "2026-07-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-mo-08",
    "name": "Realme C35",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 12399,
    "originalPrice": 14599,
    "rating": 4.2,
    "reviewCount": 2324,
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/realme-c35/1.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/realme-c35/2.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/realme-c35/3.webp"
    ],
    "description": "The Realme C35 is a budget-friendly smartphone with a focus on providing essential features for everyday use. It offers a reliable performance and user-friendly experience.",
    "specs": {
      "Brand": "Realme",
      "Category": "Mobiles",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "25.28 x 8.14 x 29.53 cm",
      "Weight": "2 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 48,
    "isNew": false,
    "createdAt": "2026-08-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-la-01",
    "name": "Apple MacBook Pro 14 Inch Space Grey",
    "brand": "Apple",
    "category": "Laptops",
    "price": 165999,
    "originalPrice": 174199,
    "rating": 3.7,
    "reviewCount": 1074,
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/3.webp"
    ],
    "description": "The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple's M1 Pro chip for exceptional performance and a stunning Retina display.",
    "specs": {
      "Brand": "Apple",
      "Category": "Laptops",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "20.03 x 9.54 x 14.82 cm",
      "Weight": "9 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 24,
    "isNew": true,
    "createdAt": "2026-01-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-la-02",
    "name": "Asus Zenbook Pro Dual Screen Laptop",
    "brand": "Asus",
    "category": "Laptops",
    "price": 149399,
    "originalPrice": 168099,
    "rating": 4,
    "reviewCount": 1147,
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/3.webp"
    ],
    "description": "The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.",
    "specs": {
      "Brand": "Asus",
      "Category": "Laptops",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "16.6 x 11.49 x 10.89 cm",
      "Weight": "9 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 45,
    "isNew": false,
    "createdAt": "2026-02-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-la-03",
    "name": "Huawei Matebook X Pro",
    "brand": "Huawei",
    "category": "Laptops",
    "price": 116199,
    "originalPrice": 128199,
    "rating": 5,
    "reviewCount": 1220,
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/3.webp"
    ],
    "description": "The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.",
    "specs": {
      "Brand": "Huawei",
      "Category": "Laptops",
      "Warranty": "No warranty",
      "ReturnPolicy": "60 days return policy",
      "Availability": "In Stock",
      "Dimensions": "18.21 x 22.83 x 17.26 cm",
      "Weight": "9 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 75,
    "isNew": false,
    "createdAt": "2026-03-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-la-04",
    "name": "Lenovo Yoga 920",
    "brand": "Lenovo",
    "category": "Laptops",
    "price": 91299,
    "originalPrice": 97699,
    "rating": 2.9,
    "reviewCount": 1293,
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/3.webp"
    ],
    "description": "The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet, offering versatility and portability.",
    "specs": {
      "Brand": "Lenovo",
      "Category": "Laptops",
      "Warranty": "6 months warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "20.84 x 22.68 x 17.39 cm",
      "Weight": "9 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 40,
    "isNew": true,
    "createdAt": "2026-04-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-la-05",
    "name": "New DELL XPS 13 9300 Laptop",
    "brand": "Dell",
    "category": "Laptops",
    "price": 124499,
    "originalPrice": 141299,
    "rating": 2.7,
    "reviewCount": 1366,
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/3.webp"
    ],
    "description": "The New DELL XPS 13 9300 Laptop is a compact and powerful device, featuring a virtually borderless InfinityEdge display and high-end performance for various tasks.",
    "specs": {
      "Brand": "Dell",
      "Category": "Laptops",
      "Warranty": "2 year warranty",
      "ReturnPolicy": "60 days return policy",
      "Availability": "In Stock",
      "Dimensions": "13.76 x 29 x 21.42 cm",
      "Weight": "2 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 74,
    "isNew": false,
    "createdAt": "2026-05-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-la-06",
    "name": "iPad Mini 2021 Starlight",
    "brand": "Apple",
    "category": "Laptops",
    "price": 41499,
    "originalPrice": 43099,
    "rating": 3.2,
    "reviewCount": 2187,
    "images": [
      "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/1.webp",
      "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/2.webp",
      "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/3.webp",
      "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/4.webp"
    ],
    "description": "The iPad Mini 2021 in Starlight is a compact and powerful tablet from Apple. Featuring a stunning Retina display, powerful A-series chip, and a sleek design, it offers a premium tablet experience.",
    "specs": {
      "Brand": "Apple",
      "Category": "Laptops",
      "Warranty": "2 year warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "17.03 x 5.34 x 29.62 cm",
      "Weight": "5 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 47,
    "isNew": false,
    "createdAt": "2026-06-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-la-07",
    "name": "Samsung Galaxy Tab S8 Plus Grey",
    "brand": "Samsung",
    "category": "Laptops",
    "price": 49799,
    "originalPrice": 57399,
    "rating": 4.7,
    "reviewCount": 2260,
    "images": [
      "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp",
      "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/2.webp",
      "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/3.webp",
      "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/4.webp"
    ],
    "description": "The Samsung Galaxy Tab S8 Plus in Grey is a high-performance Android tablet by Samsung. With a large AMOLED display, powerful processor, and S Pen support, it's ideal for productivity and entertainment.",
    "specs": {
      "Brand": "Samsung",
      "Category": "Laptops",
      "Warranty": "3 months warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "6.11 x 25.85 x 26.85 cm",
      "Weight": "1 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 62,
    "isNew": true,
    "createdAt": "2026-07-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-la-08",
    "name": "Samsung Galaxy Tab White",
    "brand": "Samsung",
    "category": "Laptops",
    "price": 28999,
    "originalPrice": 35499,
    "rating": 3.7,
    "reviewCount": 2333,
    "images": [
      "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/1.webp",
      "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/2.webp",
      "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/3.webp",
      "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/4.webp"
    ],
    "description": "The Samsung Galaxy Tab in White is a sleek and versatile Android tablet. With a vibrant display, long-lasting battery, and a range of features, it offers a great user experience for various tasks.",
    "specs": {
      "Brand": "Samsung",
      "Category": "Laptops",
      "Warranty": "3 months warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "15.05 x 5.37 x 11.82 cm",
      "Weight": "5 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 92,
    "isNew": false,
    "createdAt": "2026-08-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-el-01",
    "name": "Amazon Echo Plus",
    "brand": "Amazon",
    "category": "Electronics",
    "price": 8299,
    "originalPrice": 9399,
    "rating": 5,
    "reviewCount": 207,
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/2.webp"
    ],
    "description": "The Amazon Echo Plus is a smart speaker with built-in Alexa voice control. It features premium sound quality and serves as a hub for controlling smart home devices.",
    "specs": {
      "Brand": "Amazon",
      "Category": "Electronics",
      "Warranty": "6 months warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "12.68 x 15.24 x 27.46 cm",
      "Weight": "5 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 61,
    "isNew": true,
    "createdAt": "2026-01-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-el-02",
    "name": "Apple Airpods",
    "brand": "Apple",
    "category": "Electronics",
    "price": 10799,
    "originalPrice": 12799,
    "rating": 4.2,
    "reviewCount": 280,
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/2.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/3.webp"
    ],
    "description": "The Apple Airpods offer a seamless wireless audio experience. With easy pairing, high-quality sound, and Siri integration, they are perfect for on-the-go listening.",
    "specs": {
      "Brand": "Apple",
      "Category": "Electronics",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "25.79 x 18.38 x 11.53 cm",
      "Weight": "4 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 67,
    "isNew": false,
    "createdAt": "2026-02-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-el-03",
    "name": "Apple AirPods Max Silver",
    "brand": "Apple",
    "category": "Electronics",
    "price": 45599,
    "originalPrice": 52799,
    "rating": 3.5,
    "reviewCount": 353,
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp"
    ],
    "description": "The Apple AirPods Max in Silver are premium over-ear headphones with high-fidelity audio, adaptive EQ, and active noise cancellation. Experience immersive sound in style.",
    "specs": {
      "Brand": "Apple",
      "Category": "Electronics",
      "Warranty": "No warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "24.88 x 14.9 x 27.54 cm",
      "Weight": "2 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 59,
    "isNew": false,
    "createdAt": "2026-03-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-el-04",
    "name": "Apple Airpower Wireless Charger",
    "brand": "Apple",
    "category": "Electronics",
    "price": 6599,
    "originalPrice": 6899,
    "rating": 3.7,
    "reviewCount": 426,
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp"
    ],
    "description": "The Apple AirPower Wireless Charger provides a convenient way to charge your compatible Apple devices wirelessly. Simply place your devices on the charging mat for effortless charging.",
    "specs": {
      "Brand": "Apple",
      "Category": "Electronics",
      "Warranty": "2 year warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "Low Stock",
      "Dimensions": "25.25 x 25.44 x 10.98 cm",
      "Weight": "5 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 1,
    "isNew": true,
    "createdAt": "2026-04-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-el-05",
    "name": "Apple HomePod Mini Cosmic Grey",
    "brand": "Apple",
    "category": "Electronics",
    "price": 8299,
    "originalPrice": 10099,
    "rating": 4.6,
    "reviewCount": 499,
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/1.webp"
    ],
    "description": "The Apple HomePod Mini in Cosmic Grey is a compact smart speaker that delivers impressive audio and integrates seamlessly with the Apple ecosystem for a smart home experience.",
    "specs": {
      "Brand": "Apple",
      "Category": "Electronics",
      "Warranty": "3 months warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "16.02 x 29.2 x 19.81 cm",
      "Weight": "10 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 27,
    "isNew": false,
    "createdAt": "2026-05-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-el-06",
    "name": "Apple iPhone Charger",
    "brand": "Apple",
    "category": "Electronics",
    "price": 1699,
    "originalPrice": 2099,
    "rating": 4.2,
    "reviewCount": 572,
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/2.webp"
    ],
    "description": "The Apple iPhone Charger is a high-quality charger designed for fast and efficient charging of your iPhone. Ensure your device stays powered up and ready to go.",
    "specs": {
      "Brand": "Apple",
      "Category": "Electronics",
      "Warranty": "1 year warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "13.63 x 26.25 x 5.95 cm",
      "Weight": "1 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 31,
    "isNew": false,
    "createdAt": "2026-06-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-el-07",
    "name": "Apple MagSafe Battery Pack",
    "brand": "Apple",
    "category": "Electronics",
    "price": 8299,
    "originalPrice": 9999,
    "rating": 3.6,
    "reviewCount": 645,
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/1.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/2.webp"
    ],
    "description": "The Apple MagSafe Battery Pack is a portable and convenient way to add extra battery life to your MagSafe-compatible iPhone. Attach it magnetically for a secure connection.",
    "specs": {
      "Brand": "Apple",
      "Category": "Electronics",
      "Warranty": "2 year warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "Low Stock",
      "Dimensions": "15.4 x 11.89 x 19.67 cm",
      "Weight": "6 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 1,
    "isNew": true,
    "createdAt": "2026-07-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-el-08",
    "name": "Apple Watch Series 4 Gold",
    "brand": "Apple",
    "category": "Electronics",
    "price": 28999,
    "originalPrice": 32999,
    "rating": 2.7,
    "reviewCount": 718,
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/1.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/2.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/3.webp"
    ],
    "description": "The Apple Watch Series 4 in Gold is a stylish and advanced smartwatch with features like heart rate monitoring, fitness tracking, and a beautiful Retina display.",
    "specs": {
      "Brand": "Apple",
      "Category": "Electronics",
      "Warranty": "6 months warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "27.69 x 28.03 x 7.11 cm",
      "Weight": "6 kg"
    },
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#4B5563"
      },
      {
        "name": "Silver",
        "hex": "#E5E7EB"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      }
    ],
    "stock": 33,
    "isNew": false,
    "createdAt": "2026-08-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-fa-01",
    "name": "Blue & Black Check Shirt",
    "brand": "Fashion Trends",
    "category": "Fashion",
    "price": 2499,
    "originalPrice": 2999,
    "rating": 3.6,
    "reviewCount": 1439,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/4.webp"
    ],
    "description": "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
    "specs": {
      "Brand": "Fashion Trends",
      "Category": "Fashion",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "30 days return policy",
      "Availability": "In Stock",
      "Dimensions": "27.49 x 23.73 x 28.61 cm",
      "Weight": "4 kg"
    },
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1E3A8A"
      },
      {
        "name": "Classic Black",
        "hex": "#18181B"
      },
      {
        "name": "Olive Green",
        "hex": "#3F6212"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 38,
    "isNew": true,
    "createdAt": "2026-01-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-fa-02",
    "name": "Gigabyte Aorus Men Tshirt",
    "brand": "Gigabyte",
    "category": "Fashion",
    "price": 2099,
    "originalPrice": 2099,
    "rating": 3.2,
    "reviewCount": 1512,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/4.webp"
    ],
    "description": "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
    "specs": {
      "Brand": "Gigabyte",
      "Category": "Fashion",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "30 days return policy",
      "Availability": "In Stock",
      "Dimensions": "22.31 x 26.47 x 13.27 cm",
      "Weight": "4 kg"
    },
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1E3A8A"
      },
      {
        "name": "Classic Black",
        "hex": "#18181B"
      },
      {
        "name": "Olive Green",
        "hex": "#3F6212"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 90,
    "isNew": false,
    "createdAt": "2026-02-15",
    "deliveryDays": 2,
    "hasSaleBadge": false
  },
  {
    "id": "sn-fa-03",
    "name": "Man Plaid Shirt",
    "brand": "Classic Wear",
    "category": "Fashion",
    "price": 2899,
    "originalPrice": 3599,
    "rating": 3.5,
    "reviewCount": 1585,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/4.webp"
    ],
    "description": "The Man Plaid Shirt is a timeless and versatile men's shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.",
    "specs": {
      "Brand": "Classic Wear",
      "Category": "Fashion",
      "Warranty": "1 week warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "9.34 x 5.97 x 10.85 cm",
      "Weight": "3 kg"
    },
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1E3A8A"
      },
      {
        "name": "Classic Black",
        "hex": "#18181B"
      },
      {
        "name": "Olive Green",
        "hex": "#3F6212"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 82,
    "isNew": false,
    "createdAt": "2026-03-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-fa-04",
    "name": "Man Short Sleeve Shirt",
    "brand": "Casual Comfort",
    "category": "Fashion",
    "price": 1699,
    "originalPrice": 1799,
    "rating": 2.9,
    "reviewCount": 1658,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/4.webp"
    ],
    "description": "The Man Short Sleeve Shirt is a breezy and stylish option for warm days. With a comfortable fit and short sleeves, it's perfect for a laid-back yet polished look.",
    "specs": {
      "Brand": "Casual Comfort",
      "Category": "Fashion",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "30 days return policy",
      "Availability": "Low Stock",
      "Dimensions": "5.02 x 16.57 x 9.6 cm",
      "Weight": "2 kg"
    },
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1E3A8A"
      },
      {
        "name": "Classic Black",
        "hex": "#18181B"
      },
      {
        "name": "Olive Green",
        "hex": "#3F6212"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 2,
    "isNew": true,
    "createdAt": "2026-04-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-fa-05",
    "name": "Men Check Shirt",
    "brand": "Urban Chic",
    "category": "Fashion",
    "price": 2299,
    "originalPrice": 2599,
    "rating": 2.7,
    "reviewCount": 1731,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/4.webp"
    ],
    "description": "The Men Check Shirt is a classic and versatile shirt featuring a stylish check pattern. Suitable for various occasions, it adds a smart and polished touch to your wardrobe.",
    "specs": {
      "Brand": "Urban Chic",
      "Category": "Fashion",
      "Warranty": "No warranty",
      "ReturnPolicy": "30 days return policy",
      "Availability": "In Stock",
      "Dimensions": "23.48 x 7.03 x 27.33 cm",
      "Weight": "10 kg"
    },
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1E3A8A"
      },
      {
        "name": "Classic Black",
        "hex": "#18181B"
      },
      {
        "name": "Olive Green",
        "hex": "#3F6212"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 95,
    "isNew": false,
    "createdAt": "2026-05-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-fa-06",
    "name": "Blue Frock",
    "brand": "ShopNest Verified",
    "category": "Fashion",
    "price": 2499,
    "originalPrice": 2799,
    "rating": 4.2,
    "reviewCount": 2406,
    "images": [
      "https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp",
      "https://cdn.dummyjson.com/product-images/tops/blue-frock/2.webp",
      "https://cdn.dummyjson.com/product-images/tops/blue-frock/3.webp",
      "https://cdn.dummyjson.com/product-images/tops/blue-frock/4.webp"
    ],
    "description": "The Blue Frock is a charming and stylish dress for various occasions. With a vibrant blue color and a comfortable design, it adds a touch of elegance to your wardrobe.",
    "specs": {
      "Brand": "ShopNest Verified",
      "Category": "Fashion",
      "Warranty": "Lifetime warranty",
      "ReturnPolicy": "60 days return policy",
      "Availability": "In Stock",
      "Dimensions": "24.25 x 5.91 x 8.79 cm",
      "Weight": "5 kg"
    },
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1E3A8A"
      },
      {
        "name": "Classic Black",
        "hex": "#18181B"
      },
      {
        "name": "Olive Green",
        "hex": "#3F6212"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 52,
    "isNew": false,
    "createdAt": "2026-06-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-fa-07",
    "name": "Girl Summer Dress",
    "brand": "ShopNest Verified",
    "category": "Fashion",
    "price": 1699,
    "originalPrice": 2099,
    "rating": 4.8,
    "reviewCount": 2479,
    "images": [
      "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/1.webp",
      "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/2.webp",
      "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/3.webp",
      "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/4.webp"
    ],
    "description": "The Girl Summer Dress is a cute and breezy dress designed for warm weather. With playful patterns and lightweight fabric, it's perfect for keeping cool and stylish during the summer.",
    "specs": {
      "Brand": "ShopNest Verified",
      "Category": "Fashion",
      "Warranty": "Lifetime warranty",
      "ReturnPolicy": "60 days return policy",
      "Availability": "In Stock",
      "Dimensions": "26.19 x 20.65 x 10.1 cm",
      "Weight": "5 kg"
    },
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1E3A8A"
      },
      {
        "name": "Classic Black",
        "hex": "#18181B"
      },
      {
        "name": "Olive Green",
        "hex": "#3F6212"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 43,
    "isNew": true,
    "createdAt": "2026-07-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-fa-08",
    "name": "Gray Dress",
    "brand": "ShopNest Verified",
    "category": "Fashion",
    "price": 2899,
    "originalPrice": 3399,
    "rating": 2.7,
    "reviewCount": 2552,
    "images": [
      "https://cdn.dummyjson.com/product-images/tops/gray-dress/1.webp",
      "https://cdn.dummyjson.com/product-images/tops/gray-dress/2.webp",
      "https://cdn.dummyjson.com/product-images/tops/gray-dress/3.webp",
      "https://cdn.dummyjson.com/product-images/tops/gray-dress/4.webp"
    ],
    "description": "The Gray Dress is a versatile and chic option for various occasions. With a neutral gray color, it can be dressed up or down, making it a wardrobe staple for any fashion-forward individual.",
    "specs": {
      "Brand": "ShopNest Verified",
      "Category": "Fashion",
      "Warranty": "1 month warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "11.91 x 25.72 x 18.55 cm",
      "Weight": "1 kg"
    },
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1E3A8A"
      },
      {
        "name": "Classic Black",
        "hex": "#18181B"
      },
      {
        "name": "Olive Green",
        "hex": "#3F6212"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 55,
    "isNew": false,
    "createdAt": "2026-08-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-sh-01",
    "name": "Nike Air Jordan 1 Red And Black",
    "brand": "Nike",
    "category": "Shoes",
    "price": 12399,
    "originalPrice": 12899,
    "rating": 4.8,
    "reviewCount": 1804,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/4.webp"
    ],
    "description": "The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features, making it a favorite among sneaker enthusiasts and athletes.",
    "specs": {
      "Brand": "Nike",
      "Category": "Shoes",
      "Warranty": "1 year warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "17.44 x 9.52 x 27 cm",
      "Weight": "3 kg"
    },
    "colors": [
      {
        "name": "Black / White",
        "hex": "#18181B"
      },
      {
        "name": "University Red",
        "hex": "#DC2626"
      },
      {
        "name": "Wolf Gray",
        "hex": "#9CA3AF"
      }
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "stock": 7,
    "isNew": true,
    "createdAt": "2026-01-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-sh-02",
    "name": "Nike Baseball Cleats",
    "brand": "Nike",
    "category": "Shoes",
    "price": 6599,
    "originalPrice": 8099,
    "rating": 3.9,
    "reviewCount": 1877,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/4.webp"
    ],
    "description": "Nike Baseball Cleats are designed for maximum traction and performance on the baseball field. They provide stability and support for players during games and practices.",
    "specs": {
      "Brand": "Nike",
      "Category": "Shoes",
      "Warranty": "6 months warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "11.75 x 26.65 x 19.6 cm",
      "Weight": "9 kg"
    },
    "colors": [
      {
        "name": "Black / White",
        "hex": "#18181B"
      },
      {
        "name": "University Red",
        "hex": "#DC2626"
      },
      {
        "name": "Wolf Gray",
        "hex": "#9CA3AF"
      }
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "stock": 12,
    "isNew": false,
    "createdAt": "2026-02-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-sh-03",
    "name": "Puma Future Rider Trainers",
    "brand": "Puma",
    "category": "Shoes",
    "price": 7499,
    "originalPrice": 7799,
    "rating": 4.9,
    "reviewCount": 1950,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/4.webp"
    ],
    "description": "The Puma Future Rider Trainers offer a blend of retro style and modern comfort. Perfect for casual wear, these trainers provide a fashionable and comfortable option for everyday use.",
    "specs": {
      "Brand": "Puma",
      "Category": "Shoes",
      "Warranty": "5 year warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "17.45 x 15.58 x 23.13 cm",
      "Weight": "6 kg"
    },
    "colors": [
      {
        "name": "Black / White",
        "hex": "#18181B"
      },
      {
        "name": "University Red",
        "hex": "#DC2626"
      },
      {
        "name": "Wolf Gray",
        "hex": "#9CA3AF"
      }
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "stock": 90,
    "isNew": false,
    "createdAt": "2026-03-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-sh-04",
    "name": "Sports Sneakers Off White & Red",
    "brand": "Off White",
    "category": "Shoes",
    "price": 9999,
    "originalPrice": 10499,
    "rating": 4.8,
    "reviewCount": 2023,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/4.webp"
    ],
    "description": "The Sports Sneakers in Off White and Red combine style and functionality, making them a fashionable choice for sports enthusiasts. The red and off-white color combination adds a bold and energetic touch.",
    "specs": {
      "Brand": "Off White",
      "Category": "Shoes",
      "Warranty": "1 week warranty",
      "ReturnPolicy": "30 days return policy",
      "Availability": "In Stock",
      "Dimensions": "14.37 x 23.44 x 12.84 cm",
      "Weight": "7 kg"
    },
    "colors": [
      {
        "name": "Black / White",
        "hex": "#18181B"
      },
      {
        "name": "University Red",
        "hex": "#DC2626"
      },
      {
        "name": "Wolf Gray",
        "hex": "#9CA3AF"
      }
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "stock": 17,
    "isNew": true,
    "createdAt": "2026-04-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-sh-05",
    "name": "Sports Sneakers Off White Red",
    "brand": "Off White",
    "category": "Shoes",
    "price": 9099,
    "originalPrice": 9099,
    "rating": 4.7,
    "reviewCount": 2096,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/4.webp"
    ],
    "description": "Another variant of the Sports Sneakers in Off White Red, featuring a unique design. These sneakers offer style and comfort for casual occasions.",
    "specs": {
      "Brand": "Off White",
      "Category": "Shoes",
      "Warranty": "3 months warranty",
      "ReturnPolicy": "60 days return policy",
      "Availability": "In Stock",
      "Dimensions": "21.43 x 9.86 x 28.5 cm",
      "Weight": "9 kg"
    },
    "colors": [
      {
        "name": "Black / White",
        "hex": "#18181B"
      },
      {
        "name": "University Red",
        "hex": "#DC2626"
      },
      {
        "name": "Wolf Gray",
        "hex": "#9CA3AF"
      }
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "stock": 62,
    "isNew": false,
    "createdAt": "2026-05-15",
    "deliveryDays": 1,
    "hasSaleBadge": false
  },
  {
    "id": "sn-sh-06",
    "name": "Black & Brown Slipper",
    "brand": "Comfort Trends",
    "category": "Shoes",
    "price": 1699,
    "originalPrice": 1799,
    "rating": 2.5,
    "reviewCount": 1685,
    "images": [
      "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/2.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/3.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/4.webp"
    ],
    "description": "The Black & Brown Slipper is a comfortable and stylish choice for casual wear. Featuring a blend of black and brown colors, it adds a touch of sophistication to your relaxation.",
    "specs": {
      "Brand": "Comfort Trends",
      "Category": "Shoes",
      "Warranty": "Lifetime warranty",
      "ReturnPolicy": "60 days return policy",
      "Availability": "Low Stock",
      "Dimensions": "21.35 x 26.21 x 17 cm",
      "Weight": "5 kg"
    },
    "colors": [
      {
        "name": "Black / White",
        "hex": "#18181B"
      },
      {
        "name": "University Red",
        "hex": "#DC2626"
      },
      {
        "name": "Wolf Gray",
        "hex": "#9CA3AF"
      }
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "stock": 3,
    "isNew": false,
    "createdAt": "2026-06-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-sh-07",
    "name": "Calvin Klein Heel Shoes",
    "brand": "Calvin Klein",
    "category": "Shoes",
    "price": 6599,
    "originalPrice": 6799,
    "rating": 4.9,
    "reviewCount": 1758,
    "images": [
      "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/2.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/3.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/4.webp"
    ],
    "description": "Calvin Klein Heel Shoes are elegant and sophisticated, designed for formal occasions. With a classic design and high-quality materials, they complement your stylish ensemble.",
    "specs": {
      "Brand": "Calvin Klein",
      "Category": "Shoes",
      "Warranty": "2 year warranty",
      "ReturnPolicy": "60 days return policy",
      "Availability": "In Stock",
      "Dimensions": "29.12 x 20.94 x 20.65 cm",
      "Weight": "6 kg"
    },
    "colors": [
      {
        "name": "Black / White",
        "hex": "#18181B"
      },
      {
        "name": "University Red",
        "hex": "#DC2626"
      },
      {
        "name": "Wolf Gray",
        "hex": "#9CA3AF"
      }
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "stock": 93,
    "isNew": true,
    "createdAt": "2026-07-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-sh-08",
    "name": "Golden Shoes Woman",
    "brand": "Fashion Diva",
    "category": "Shoes",
    "price": 4099,
    "originalPrice": 4799,
    "rating": 3.3,
    "reviewCount": 1831,
    "images": [
      "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/2.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/3.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/4.webp"
    ],
    "description": "The Golden Shoes for Women are a glamorous choice for special occasions. Featuring a golden hue and stylish design, they add a touch of luxury to your outfit.",
    "specs": {
      "Brand": "Fashion Diva",
      "Category": "Shoes",
      "Warranty": "6 months warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "16.38 x 20.06 x 8.8 cm",
      "Weight": "4 kg"
    },
    "colors": [
      {
        "name": "Black / White",
        "hex": "#18181B"
      },
      {
        "name": "University Red",
        "hex": "#DC2626"
      },
      {
        "name": "Wolf Gray",
        "hex": "#9CA3AF"
      }
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "stock": 88,
    "isNew": false,
    "createdAt": "2026-08-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-be-01",
    "name": "Essence Mascara Lash Princess",
    "brand": "Essence",
    "category": "Beauty",
    "price": 829,
    "originalPrice": 929,
    "rating": 2.6,
    "reviewCount": 253,
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
    ],
    "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    "specs": {
      "Brand": "Essence",
      "Category": "Beauty",
      "Warranty": "1 week warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "15.14 x 13.08 x 22.99 cm",
      "Weight": "4 kg"
    },
    "colors": [
      {
        "name": "Natural Nude",
        "hex": "#FBCFE8"
      },
      {
        "name": "Classic Scarlet",
        "hex": "#E11D48"
      }
    ],
    "stock": 99,
    "isNew": true,
    "createdAt": "2026-01-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-be-02",
    "name": "Eyeshadow Palette with Mirror",
    "brand": "Glamour Beauty",
    "category": "Beauty",
    "price": 1699,
    "originalPrice": 2099,
    "rating": 2.9,
    "reviewCount": 326,
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp"
    ],
    "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    "specs": {
      "Brand": "Glamour Beauty",
      "Category": "Beauty",
      "Warranty": "1 year warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "9.26 x 22.47 x 27.67 cm",
      "Weight": "9 kg"
    },
    "colors": [
      {
        "name": "Natural Nude",
        "hex": "#FBCFE8"
      },
      {
        "name": "Classic Scarlet",
        "hex": "#E11D48"
      }
    ],
    "stock": 34,
    "isNew": false,
    "createdAt": "2026-02-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-be-03",
    "name": "Powder Canister",
    "brand": "Velvet Touch",
    "category": "Beauty",
    "price": 1199,
    "originalPrice": 1299,
    "rating": 4.6,
    "reviewCount": 399,
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp"
    ],
    "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    "specs": {
      "Brand": "Velvet Touch",
      "Category": "Beauty",
      "Warranty": "3 months warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "29.27 x 27.93 x 20.59 cm",
      "Weight": "8 kg"
    },
    "colors": [
      {
        "name": "Natural Nude",
        "hex": "#FBCFE8"
      },
      {
        "name": "Classic Scarlet",
        "hex": "#E11D48"
      }
    ],
    "stock": 89,
    "isNew": false,
    "createdAt": "2026-03-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-be-04",
    "name": "Red Lipstick",
    "brand": "Chic Cosmetics",
    "category": "Beauty",
    "price": 1099,
    "originalPrice": 1299,
    "rating": 4.4,
    "reviewCount": 472,
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp"
    ],
    "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
    "specs": {
      "Brand": "Chic Cosmetics",
      "Category": "Beauty",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "18.11 x 28.38 x 22.17 cm",
      "Weight": "1 kg"
    },
    "colors": [
      {
        "name": "Natural Nude",
        "hex": "#FBCFE8"
      },
      {
        "name": "Classic Scarlet",
        "hex": "#E11D48"
      }
    ],
    "stock": 91,
    "isNew": true,
    "createdAt": "2026-04-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-be-05",
    "name": "Red Nail Polish",
    "brand": "Nail Couture",
    "category": "Beauty",
    "price": 749,
    "originalPrice": 849,
    "rating": 4.3,
    "reviewCount": 545,
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp"
    ],
    "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
    "specs": {
      "Brand": "Nail Couture",
      "Category": "Beauty",
      "Warranty": "1 month warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "21.63 x 16.48 x 29.84 cm",
      "Weight": "8 kg"
    },
    "colors": [
      {
        "name": "Natural Nude",
        "hex": "#FBCFE8"
      },
      {
        "name": "Classic Scarlet",
        "hex": "#E11D48"
      }
    ],
    "stock": 79,
    "isNew": false,
    "createdAt": "2026-05-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-be-06",
    "name": "Calvin Klein CK One",
    "brand": "Calvin Klein",
    "category": "Beauty",
    "price": 4099,
    "originalPrice": 4199,
    "rating": 4.4,
    "reviewCount": 618,
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp"
    ],
    "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    "specs": {
      "Brand": "Calvin Klein",
      "Category": "Beauty",
      "Warranty": "1 week warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "29.36 x 27.76 x 20.72 cm",
      "Weight": "7 kg"
    },
    "colors": [
      {
        "name": "Natural Nude",
        "hex": "#FBCFE8"
      },
      {
        "name": "Classic Scarlet",
        "hex": "#E11D48"
      }
    ],
    "stock": 29,
    "isNew": false,
    "createdAt": "2026-06-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-be-07",
    "name": "Chanel Coco Noir Eau De",
    "brand": "Chanel",
    "category": "Beauty",
    "price": 10799,
    "originalPrice": 12899,
    "rating": 4.3,
    "reviewCount": 691,
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/3.webp"
    ],
    "description": "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    "specs": {
      "Brand": "Chanel",
      "Category": "Beauty",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "24.5 x 25.7 x 25.98 cm",
      "Weight": "7 kg"
    },
    "colors": [
      {
        "name": "Natural Nude",
        "hex": "#FBCFE8"
      },
      {
        "name": "Classic Scarlet",
        "hex": "#E11D48"
      }
    ],
    "stock": 58,
    "isNew": true,
    "createdAt": "2026-07-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-be-08",
    "name": "Dior J'adore",
    "brand": "Dior",
    "category": "Beauty",
    "price": 7499,
    "originalPrice": 8799,
    "rating": 3.8,
    "reviewCount": 764,
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/3.webp"
    ],
    "description": "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    "specs": {
      "Brand": "Dior",
      "Category": "Beauty",
      "Warranty": "1 week warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "27.67 x 28.28 x 11.83 cm",
      "Weight": "4 kg"
    },
    "colors": [
      {
        "name": "Natural Nude",
        "hex": "#FBCFE8"
      },
      {
        "name": "Classic Scarlet",
        "hex": "#E11D48"
      }
    ],
    "stock": 98,
    "isNew": false,
    "createdAt": "2026-08-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ho-01",
    "name": "Annibale Colombo Bed",
    "brand": "Annibale Colombo",
    "category": "Home & Kitchen",
    "price": 157699,
    "originalPrice": 172499,
    "rating": 4.8,
    "reviewCount": 983,
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/3.webp"
    ],
    "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
    "specs": {
      "Brand": "Annibale Colombo",
      "Category": "Home & Kitchen",
      "Warranty": "1 year warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "28.16 x 25.36 x 17.28 cm",
      "Weight": "10 kg"
    },
    "colors": [
      {
        "name": "Natural Wood",
        "hex": "#78350F"
      },
      {
        "name": "Matte Charcoal",
        "hex": "#374151"
      }
    ],
    "stock": 88,
    "isNew": true,
    "createdAt": "2026-01-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ho-02",
    "name": "Annibale Colombo Sofa",
    "brand": "Annibale Colombo",
    "category": "Home & Kitchen",
    "price": 207499,
    "originalPrice": 242399,
    "rating": 3.9,
    "reviewCount": 1056,
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/3.webp"
    ],
    "description": "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
    "specs": {
      "Brand": "Annibale Colombo",
      "Category": "Home & Kitchen",
      "Warranty": "Lifetime warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "12.75 x 20.55 x 19.06 cm",
      "Weight": "6 kg"
    },
    "colors": [
      {
        "name": "Natural Wood",
        "hex": "#78350F"
      },
      {
        "name": "Matte Charcoal",
        "hex": "#374151"
      }
    ],
    "stock": 60,
    "isNew": false,
    "createdAt": "2026-02-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ho-03",
    "name": "Bedside Table African Cherry",
    "brand": "Furniture Co.",
    "category": "Home & Kitchen",
    "price": 24899,
    "originalPrice": 30799,
    "rating": 2.9,
    "reviewCount": 1129,
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/3.webp"
    ],
    "description": "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
    "specs": {
      "Brand": "Furniture Co.",
      "Category": "Home & Kitchen",
      "Warranty": "5 year warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "13.47 x 24.99 x 27.35 cm",
      "Weight": "2 kg"
    },
    "colors": [
      {
        "name": "Natural Wood",
        "hex": "#78350F"
      },
      {
        "name": "Matte Charcoal",
        "hex": "#374151"
      }
    ],
    "stock": 64,
    "isNew": false,
    "createdAt": "2026-03-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ho-04",
    "name": "Knoll Saarinen Executive Conference Chair",
    "brand": "Knoll",
    "category": "Home & Kitchen",
    "price": 41499,
    "originalPrice": 42399,
    "rating": 4.9,
    "reviewCount": 1202,
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/3.webp"
    ],
    "description": "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
    "specs": {
      "Brand": "Knoll",
      "Category": "Home & Kitchen",
      "Warranty": "2 year warranty",
      "ReturnPolicy": "60 days return policy",
      "Availability": "In Stock",
      "Dimensions": "13.81 x 7.5 x 5.62 cm",
      "Weight": "10 kg"
    },
    "colors": [
      {
        "name": "Natural Wood",
        "hex": "#78350F"
      },
      {
        "name": "Matte Charcoal",
        "hex": "#374151"
      }
    ],
    "stock": 26,
    "isNew": true,
    "createdAt": "2026-04-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ho-05",
    "name": "Wooden Bathroom Sink With Mirror",
    "brand": "Bath Trends",
    "category": "Home & Kitchen",
    "price": 66399,
    "originalPrice": 72799,
    "rating": 3.6,
    "reviewCount": 1275,
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/3.webp"
    ],
    "description": "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
    "specs": {
      "Brand": "Bath Trends",
      "Category": "Home & Kitchen",
      "Warranty": "3 year warranty",
      "ReturnPolicy": "60 days return policy",
      "Availability": "Low Stock",
      "Dimensions": "7.98 x 8.88 x 28.46 cm",
      "Weight": "10 kg"
    },
    "colors": [
      {
        "name": "Natural Wood",
        "hex": "#78350F"
      },
      {
        "name": "Matte Charcoal",
        "hex": "#374151"
      }
    ],
    "stock": 7,
    "isNew": false,
    "createdAt": "2026-05-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ho-06",
    "name": "Decoration Swing",
    "brand": "ShopNest Verified",
    "category": "Home & Kitchen",
    "price": 4999,
    "originalPrice": 5599,
    "rating": 3.2,
    "reviewCount": 919,
    "images": [
      "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/2.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/3.webp"
    ],
    "description": "The Decoration Swing is a charming addition to your home decor. Crafted with intricate details, it adds a touch of elegance and whimsy to any room.",
    "specs": {
      "Brand": "ShopNest Verified",
      "Category": "Home & Kitchen",
      "Warranty": "1 week warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "23.84 x 15.19 x 26.05 cm",
      "Weight": "4 kg"
    },
    "colors": [
      {
        "name": "Natural Wood",
        "hex": "#78350F"
      },
      {
        "name": "Matte Charcoal",
        "hex": "#374151"
      }
    ],
    "stock": 47,
    "isNew": false,
    "createdAt": "2026-06-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ho-07",
    "name": "Family Tree Photo Frame",
    "brand": "ShopNest Verified",
    "category": "Home & Kitchen",
    "price": 2499,
    "originalPrice": 2899,
    "rating": 4.5,
    "reviewCount": 992,
    "images": [
      "https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp"
    ],
    "description": "The Family Tree Photo Frame is a sentimental and stylish way to display your cherished family memories. With multiple photo slots, it tells the story of your loved ones.",
    "specs": {
      "Brand": "ShopNest Verified",
      "Category": "Home & Kitchen",
      "Warranty": "1 month warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "17.27 x 14.81 x 29.11 cm",
      "Weight": "1 kg"
    },
    "colors": [
      {
        "name": "Natural Wood",
        "hex": "#78350F"
      },
      {
        "name": "Matte Charcoal",
        "hex": "#374151"
      }
    ],
    "stock": 77,
    "isNew": true,
    "createdAt": "2026-07-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ho-08",
    "name": "House Showpiece Plant",
    "brand": "ShopNest Verified",
    "category": "Home & Kitchen",
    "price": 3299,
    "originalPrice": 3599,
    "rating": 4.7,
    "reviewCount": 1065,
    "images": [
      "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/1.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/2.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/3.webp"
    ],
    "description": "The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance. It adds greenery and style to any space.",
    "specs": {
      "Brand": "ShopNest Verified",
      "Category": "Home & Kitchen",
      "Warranty": "1 year warranty",
      "ReturnPolicy": "No return policy",
      "Availability": "In Stock",
      "Dimensions": "8.55 x 14.62 x 17.25 cm",
      "Weight": "8 kg"
    },
    "colors": [
      {
        "name": "Natural Wood",
        "hex": "#78350F"
      },
      {
        "name": "Matte Charcoal",
        "hex": "#374151"
      }
    ],
    "stock": 28,
    "isNew": false,
    "createdAt": "2026-08-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ac-01",
    "name": "Brown Leather Belt Watch",
    "brand": "Fashion Timepieces",
    "category": "Accessories",
    "price": 7499,
    "originalPrice": 7999,
    "rating": 4.2,
    "reviewCount": 2169,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/3.webp"
    ],
    "description": "The Brown Leather Belt Watch is a stylish timepiece with a classic design. Featuring a genuine leather strap and a sleek dial, it adds a touch of sophistication to your look.",
    "specs": {
      "Brand": "Fashion Timepieces",
      "Category": "Accessories",
      "Warranty": "1 year warranty",
      "ReturnPolicy": "30 days return policy",
      "Availability": "In Stock",
      "Dimensions": "16.65 x 6.15 x 20.18 cm",
      "Weight": "10 kg"
    },
    "colors": [
      {
        "name": "Obsidian Black",
        "hex": "#09090B"
      },
      {
        "name": "Cognac Brown",
        "hex": "#9A3412"
      },
      {
        "name": "Polished Silver",
        "hex": "#D1D5DB"
      }
    ],
    "stock": 32,
    "isNew": true,
    "createdAt": "2026-01-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ac-02",
    "name": "Longines Master Collection",
    "brand": "Longines",
    "category": "Accessories",
    "price": 124499,
    "originalPrice": 150399,
    "rating": 3.9,
    "reviewCount": 2242,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/3.webp"
    ],
    "description": "The Longines Master Collection is an elegant and refined watch known for its precision and craftsmanship. With a timeless design, it's a symbol of luxury and sophistication.",
    "specs": {
      "Brand": "Longines",
      "Category": "Accessories",
      "Warranty": "1 week warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "15.39 x 10.06 x 20.32 cm",
      "Weight": "4 kg"
    },
    "colors": [
      {
        "name": "Obsidian Black",
        "hex": "#09090B"
      },
      {
        "name": "Cognac Brown",
        "hex": "#9A3412"
      },
      {
        "name": "Polished Silver",
        "hex": "#D1D5DB"
      }
    ],
    "stock": 100,
    "isNew": false,
    "createdAt": "2026-02-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ac-03",
    "name": "Rolex Cellini Date Black Dial",
    "brand": "Rolex",
    "category": "Accessories",
    "price": 746999,
    "originalPrice": 819799,
    "rating": 5,
    "reviewCount": 2315,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/3.webp"
    ],
    "description": "The Rolex Cellini Date with Black Dial is a classic and prestigious watch. With a black dial and date complication, it exudes sophistication and is a symbol of Rolex's heritage.",
    "specs": {
      "Brand": "Rolex",
      "Category": "Accessories",
      "Warranty": "3 months warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "13.46 x 26.1 x 17.9 cm",
      "Weight": "2 kg"
    },
    "colors": [
      {
        "name": "Obsidian Black",
        "hex": "#09090B"
      },
      {
        "name": "Cognac Brown",
        "hex": "#9A3412"
      },
      {
        "name": "Polished Silver",
        "hex": "#D1D5DB"
      }
    ],
    "stock": 40,
    "isNew": false,
    "createdAt": "2026-03-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ac-04",
    "name": "Rolex Cellini Moonphase",
    "brand": "Rolex",
    "category": "Accessories",
    "price": 1078999,
    "originalPrice": 1308199,
    "rating": 2.6,
    "reviewCount": 2388,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/3.webp"
    ],
    "description": "The Rolex Cellini Moonphase is a masterpiece of horology, featuring a moon phase complication and exquisite design. It reflects Rolex's commitment to precision and elegance.",
    "specs": {
      "Brand": "Rolex",
      "Category": "Accessories",
      "Warranty": "6 months warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "26.06 x 25.19 x 13.17 cm",
      "Weight": "2 kg"
    },
    "colors": [
      {
        "name": "Obsidian Black",
        "hex": "#09090B"
      },
      {
        "name": "Cognac Brown",
        "hex": "#9A3412"
      },
      {
        "name": "Polished Silver",
        "hex": "#D1D5DB"
      }
    ],
    "stock": 36,
    "isNew": true,
    "createdAt": "2026-04-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ac-05",
    "name": "Rolex Datejust",
    "brand": "Rolex",
    "category": "Accessories",
    "price": 912999,
    "originalPrice": 948399,
    "rating": 3.7,
    "reviewCount": 2461,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/3.webp"
    ],
    "description": "The Rolex Datejust is an iconic and versatile timepiece with a date window. Known for its timeless design and reliability, it's a symbol of Rolex's watchmaking excellence.",
    "specs": {
      "Brand": "Rolex",
      "Category": "Accessories",
      "Warranty": "2 year warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "23.11 x 19.97 x 27.04 cm",
      "Weight": "4 kg"
    },
    "colors": [
      {
        "name": "Obsidian Black",
        "hex": "#09090B"
      },
      {
        "name": "Cognac Brown",
        "hex": "#9A3412"
      },
      {
        "name": "Polished Silver",
        "hex": "#D1D5DB"
      }
    ],
    "stock": 86,
    "isNew": false,
    "createdAt": "2026-05-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ac-06",
    "name": "Rolex Submariner Watch",
    "brand": "Rolex",
    "category": "Accessories",
    "price": 1161999,
    "originalPrice": 1223799,
    "rating": 2.7,
    "reviewCount": 2534,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/3.webp"
    ],
    "description": "The Rolex Submariner is a legendary dive watch with a rich history. Known for its durability and water resistance, it's a symbol of adventure and exploration.",
    "specs": {
      "Brand": "Rolex",
      "Category": "Accessories",
      "Warranty": "5 year warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "In Stock",
      "Dimensions": "17.69 x 12.48 x 8.75 cm",
      "Weight": "4 kg"
    },
    "colors": [
      {
        "name": "Obsidian Black",
        "hex": "#09090B"
      },
      {
        "name": "Cognac Brown",
        "hex": "#9A3412"
      },
      {
        "name": "Polished Silver",
        "hex": "#D1D5DB"
      }
    ],
    "stock": 55,
    "isNew": false,
    "createdAt": "2026-06-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ac-07",
    "name": "Black Sun Glasses",
    "brand": "Fashion Shades",
    "category": "Accessories",
    "price": 2499,
    "originalPrice": 2599,
    "rating": 4.4,
    "reviewCount": 1822,
    "images": [
      "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp",
      "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/2.webp",
      "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/3.webp"
    ],
    "description": "The Black Sun Glasses are a classic and stylish choice, featuring a sleek black frame and tinted lenses. They provide both UV protection and a fashionable look.",
    "specs": {
      "Brand": "Fashion Shades",
      "Category": "Accessories",
      "Warranty": "No warranty",
      "ReturnPolicy": "7 days return policy",
      "Availability": "In Stock",
      "Dimensions": "18.51 x 15.69 x 10.11 cm",
      "Weight": "1 kg"
    },
    "colors": [
      {
        "name": "Obsidian Black",
        "hex": "#09090B"
      },
      {
        "name": "Cognac Brown",
        "hex": "#9A3412"
      },
      {
        "name": "Polished Silver",
        "hex": "#D1D5DB"
      }
    ],
    "stock": 60,
    "isNew": true,
    "createdAt": "2026-07-15",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-ac-08",
    "name": "Classic Sun Glasses",
    "brand": "Fashion Shades",
    "category": "Accessories",
    "price": 2099,
    "originalPrice": 2199,
    "rating": 3.9,
    "reviewCount": 1895,
    "images": [
      "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp",
      "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/2.webp",
      "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/3.webp"
    ],
    "description": "The Classic Sun Glasses offer a timeless design with a neutral frame and UV-protected lenses. These sunglasses are versatile and suitable for various occasions.",
    "specs": {
      "Brand": "Fashion Shades",
      "Category": "Accessories",
      "Warranty": "6 months warranty",
      "ReturnPolicy": "90 days return policy",
      "Availability": "Low Stock",
      "Dimensions": "19.87 x 16.73 x 11.07 cm",
      "Weight": "8 kg"
    },
    "colors": [
      {
        "name": "Obsidian Black",
        "hex": "#09090B"
      },
      {
        "name": "Cognac Brown",
        "hex": "#9A3412"
      },
      {
        "name": "Polished Silver",
        "hex": "#D1D5DB"
      }
    ],
    "stock": 1,
    "isNew": false,
    "createdAt": "2026-08-15",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-bk-01",
    "name": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "brand": "Robert C. Martin",
    "category": "Books",
    "price": 699,
    "originalPrice": 999,
    "rating": 4.7,
    "reviewCount": 3820,
    "images": [
      "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg"
    ],
    "description": "Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. A timeless guide to software craft, readability, and refactoring.",
    "specs": {
      "Author": "Robert C. Martin",
      "Publisher": "Prentice Hall",
      "Language": "English",
      "Format": "Paperback, 464 pages",
      "ISBN-13": "978-0132350884"
    },
    "stock": 40,
    "isNew": false,
    "createdAt": "2026-03-10",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-bk-02",
    "name": "Designing Data-Intensive Applications",
    "brand": "Martin Kleppmann",
    "category": "Books",
    "price": 1899,
    "originalPrice": 2499,
    "rating": 4.9,
    "reviewCount": 4210,
    "images": [
      "https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg"
    ],
    "description": "Data is at the center of many challenges in system design today. Explore the principles, algorithms, and practical trade-offs for distributed systems, replication, and streaming.",
    "specs": {
      "Author": "Martin Kleppmann",
      "Publisher": "O'Reilly Media",
      "Language": "English",
      "Format": "Paperback, 616 pages",
      "ISBN-13": "978-1449373320"
    },
    "stock": 40,
    "isNew": false,
    "createdAt": "2026-04-12",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-bk-03",
    "name": "The Pragmatic Programmer: Your Journey To Mastery (20th Anniversary)",
    "brand": "David Thomas, Andrew Hunt",
    "category": "Books",
    "price": 1499,
    "originalPrice": 1999,
    "rating": 4.8,
    "reviewCount": 2950,
    "images": [
      "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg"
    ],
    "description": "One of the most significant books on modern programming practices. Covers career development, architectural responsibility, and keeping code flexible and adaptable.",
    "specs": {
      "Author": "David Thomas, Andrew Hunt",
      "Publisher": "Addison-Wesley",
      "Language": "English",
      "Format": "Paperback, 352 pages",
      "ISBN-13": "978-0135957059"
    },
    "stock": 40,
    "isNew": false,
    "createdAt": "2026-05-18",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-bk-04",
    "name": "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    "brand": "James Clear",
    "category": "Books",
    "price": 499,
    "originalPrice": 799,
    "rating": 4.8,
    "reviewCount": 8430,
    "images": [
      "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg"
    ],
    "description": "No matter your goals, Atomic Habits offers a proven framework for improving every day. Learn how microscopic changes lead to remarkable results over time.",
    "specs": {
      "Author": "James Clear",
      "Publisher": "Avery",
      "Language": "English",
      "Format": "Paperback, 320 pages",
      "ISBN-13": "978-0735211292"
    },
    "stock": 40,
    "isNew": true,
    "createdAt": "2026-06-01",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-bk-05",
    "name": "Clean Architecture: A Craftsman’s Guide to Software Structure and Design",
    "brand": "Robert C. Martin",
    "category": "Books",
    "price": 899,
    "originalPrice": 1299,
    "rating": 4.7,
    "reviewCount": 2410,
    "images": [
      "https://covers.openlibrary.org/b/isbn/9780134494166-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780134494166-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780134494166-L.jpg"
    ],
    "description": "By applying universal rules of software architecture, you can dramatically improve developer productivity throughout the life of any software system.",
    "specs": {
      "Author": "Robert C. Martin",
      "Publisher": "Prentice Hall",
      "Language": "English",
      "Format": "Paperback, 432 pages",
      "ISBN-13": "978-0134494166"
    },
    "stock": 40,
    "isNew": false,
    "createdAt": "2026-05-02",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-bk-06",
    "name": "The Design of Everyday Things",
    "brand": "Don Norman",
    "category": "Books",
    "price": 599,
    "originalPrice": 899,
    "rating": 4.6,
    "reviewCount": 3120,
    "images": [
      "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg"
    ],
    "description": "Even the smartest among us can feel inept as we fail to figure out which light switch or oven burner to turn on, or whether to push, pull, or slide a door. The ultimate primer on design usability.",
    "specs": {
      "Author": "Don Norman",
      "Publisher": "Basic Books",
      "Language": "English",
      "Format": "Paperback, 368 pages",
      "ISBN-13": "978-0201616224"
    },
    "stock": 40,
    "isNew": false,
    "createdAt": "2026-04-18",
    "deliveryDays": 1,
    "hasSaleBadge": true
  },
  {
    "id": "sn-bk-07",
    "name": "Head First Design Patterns: Building Extensible and Maintainable Software",
    "brand": "Eric Freeman, Elisabeth Robson",
    "category": "Books",
    "price": 1399,
    "originalPrice": 1899,
    "rating": 4.7,
    "reviewCount": 2780,
    "images": [
      "https://covers.openlibrary.org/b/isbn/9780596007126-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780596007126-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780596007126-L.jpg"
    ],
    "description": "You want to learn about the patterns that matter, why they matter, how and when to apply them, and the object-oriented design principles on which they’re based.",
    "specs": {
      "Author": "Eric Freeman, Elisabeth Robson",
      "Publisher": "O'Reilly Media",
      "Language": "English",
      "Format": "Paperback, 694 pages",
      "ISBN-13": "978-0596007126"
    },
    "stock": 40,
    "isNew": false,
    "createdAt": "2026-06-11",
    "deliveryDays": 2,
    "hasSaleBadge": true
  },
  {
    "id": "sn-bk-08",
    "name": "Deep Work: Rules for Focused Success in a Distracted World",
    "brand": "Cal Newport",
    "category": "Books",
    "price": 549,
    "originalPrice": 799,
    "rating": 4.6,
    "reviewCount": 5120,
    "images": [
      "https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg",
      "https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg"
    ],
    "description": "Deep work is the ability to focus without distraction on a cognitively demanding task. It’s a skill that allows you to quickly master complicated information and produce better results in less time.",
    "specs": {
      "Author": "Cal Newport",
      "Publisher": "Grand Central Publishing",
      "Language": "English",
      "Format": "Paperback, 304 pages",
      "ISBN-13": "978-0385547345"
    },
    "stock": 40,
    "isNew": true,
    "createdAt": "2026-06-25",
    "deliveryDays": 1,
    "hasSaleBadge": true
  }
];

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
        : `Free delivery in ${p.deliveryDays} days`,
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
