// ===== PRODUCT DATA =====

const products = [
  {
    id: 'comb-black-blue',
    name: 'Black & Blue Combination Bracelet',
    category: 'combination',
    categoryName: 'Combination (Cracked & Plain)',
    type: 'Colour + golden beads',
    price: 150,
    comboPrice: 260,
    description: 'Stunning combination of deep black and vibrant blue cracked beads interspersed with plain beads, creating a bold yet elegant look perfect for any occasion.',
    images: ['assets/images/products/comb-black-blue/1.jpg', 'assets/images/products/comb-black-blue/2.jpg'],
    thumbnails: ['assets/images/products/comb-black-blue/thumb-1.jpg', 'assets/images/products/comb-black-blue/thumb-2.jpg'],
    video: 'assets/videos/comb-black-blue/1.mp4',
    colors: ['Black', 'Blue'],
    inStock: true,
    badge: 'Popular'
  },
  {
    id: 'comb-blue-transparent',
    name: 'Blue & Transparent Combination Bracelet',
    category: 'combination',
    categoryName: 'Combination (Cracked & Plain)',
    type: 'Colour + golden beads',
    price: 150,
    comboPrice: 260,
    description: 'Beautiful blend of blue cracked beads with transparent plain beads, giving a cool, refreshing crystal-like appearance that sparkles in the light.',
    images: ['assets/images/products/comb-blue-transparent/1.jpg', 'assets/images/products/comb-blue-transparent/2.jpg'],
    thumbnails: ['assets/images/products/comb-blue-transparent/thumb-1.jpg', 'assets/images/products/comb-blue-transparent/thumb-2.jpg'],
    video: 'assets/videos/comb-blue-transparent/1.mp4',
    colors: ['Blue', 'Transparent'],
    inStock: true,
    badge: ''
  },
  {
    id: 'comb-light-blue-transparent',
    name: 'Light Blue & Transparent Combination Bracelet',
    category: 'combination',
    categoryName: 'Combination (Cracked & Plain)',
    type: 'Colour + golden beads',
    price: 150,
    comboPrice: 260,
    description: 'Delicate light blue cracked beads paired with transparent plain beads for a soft, airy, and ethereal bracelet style perfect for everyday elegance.',
    images: ['assets/images/products/comb-light-blue-transparent/1.jpg', 'assets/images/products/comb-light-blue-transparent/2.jpg'],
    thumbnails: ['assets/images/products/comb-light-blue-transparent/thumb-1.jpg', 'assets/images/products/comb-light-blue-transparent/thumb-2.jpg'],
    video: 'assets/videos/comb-light-blue-transparent/1.mp4',
    colors: ['Light Blue', 'Transparent'],
    inStock: true,
    badge: 'New'
  },
  {
    id: 'comb-pink-golden',
    name: 'Pink & Golden Combination Bracelet',
    category: 'combination',
    categoryName: 'Combination (Cracked & Plain)',
    type: 'Colour + golden beads',
    price: 150,
    comboPrice: 260,
    description: 'Romantic pink cracked beads combined with shimmering golden plain beads, perfect for adding a touch of warmth and femininity to any outfit.',
    images: ['assets/images/products/comb-pink-golden/ai-1.jpg', 'assets/images/products/comb-pink-golden/1.jpg', 'assets/images/products/comb-pink-golden/2.jpg'],
    thumbnails: ['assets/images/products/comb-pink-golden/thumb-ai-1.jpg', 'assets/images/products/comb-pink-golden/thumb-1.jpg', 'assets/images/products/comb-pink-golden/thumb-2.jpg'],
    video: 'assets/videos/comb-pink-golden/1.mp4',
    colors: ['Pink', 'Golden'],
    inStock: true,
    badge: 'Bestseller'
  },
  {
    id: 'comb-purple-golden',
    name: 'Purple & Golden Combination Bracelet',
    category: 'combination',
    categoryName: 'Combination (Cracked & Plain)',
    type: 'Colour + golden beads',
    price: 150,
    comboPrice: 260,
    description: 'Regal purple cracked beads paired with shimmering golden plain beads, creating a luxurious and eye-catching combination fit for royalty.',
    images: ['assets/images/products/comb-purple-golden/1.jpg', 'assets/images/products/comb-purple-golden/2.jpg'],
    thumbnails: ['assets/images/products/comb-purple-golden/thumb-1.jpg', 'assets/images/products/comb-purple-golden/thumb-2.jpg'],
    video: 'assets/videos/comb-purple-golden/1.mp4',
    colors: ['Purple', 'Golden'],
    inStock: true,
    badge: ''
  },
  {
    id: 'comb-purple-green',
    name: 'Purple & Green Combination Bracelet',
    category: 'combination',
    categoryName: 'Combination (Cracked & Plain)',
    type: 'Colour + golden beads',
    price: 150,
    comboPrice: 260,
    description: 'A vibrant pairing of purple and green cracked beads with plain beads, inspired by nature\'s most beautiful colour combinations. Truly unique!',
    images: ['assets/images/products/comb-purple-green/1.jpg', 'assets/images/products/comb-purple-green/2.jpg'],
    thumbnails: ['assets/images/products/comb-purple-green/thumb-1.jpg', 'assets/images/products/comb-purple-green/thumb-2.jpg'],
    video: 'assets/videos/comb-purple-green/1.mp4',
    colors: ['Purple', 'Green'],
    inStock: true,
    badge: ''
  },
  {
    id: 'cracked-green',
    name: 'Green Cracked Beads Bracelet',
    category: 'cracked',
    categoryName: 'Cracked Beads',
    type: 'Simple one-colour',
    price: 120,
    comboPrice: 230,
    description: 'Pure green cracked beads creating a nature-inspired bracelet with a beautiful crackle effect that catches and plays with the light beautifully.',
    images: ['assets/images/products/cracked-green/ai-1.jpg', 'assets/images/products/cracked-green/1.jpg', 'assets/images/products/cracked-green/2.jpg'],
    thumbnails: ['assets/images/products/cracked-green/thumb-ai-1.jpg', 'assets/images/products/cracked-green/thumb-1.jpg', 'assets/images/products/cracked-green/thumb-2.jpg'],
    video: 'assets/videos/cracked-green/1.mp4',
    colors: ['Green'],
    inStock: true,
    badge: ''
  },
  {
    id: 'cracked-red',
    name: 'Red Cracked Beads Bracelet',
    category: 'cracked',
    categoryName: 'Cracked Beads',
    type: 'Simple one-colour',
    price: 120,
    comboPrice: 230,
    description: 'Bold red cracked beads forming a passionate and eye-catching bracelet, perfect for making a confident statement wherever you go.',
    images: ['assets/images/products/cracked-red/1.jpg'],
    thumbnails: ['assets/images/products/cracked-red/thumb-1.jpg'],
    video: 'assets/videos/cracked-red/1.mp4',
    colors: ['Red'],
    inStock: true,
    badge: ''
  },
  {
    id: 'wire-green-white',
    name: 'Green & White Wire Bracelet',
    category: 'wire',
    categoryName: 'Wire Bracelet',
    type: 'Wire craft bracelet',
    price: 180,
    comboPrice: 320,
    description: 'Intricately handcrafted wire bracelet featuring delicate green and white beads for an exquisite, modern artisanal statement.',
    images: ['assets/images/products/wire-green-white/1.jpg'],
    thumbnails: ['assets/images/products/wire-green-white/thumb-1.jpg'],
    video: 'assets/videos/wire-green-white/1.mp4',
    colors: ['Green', 'White'],
    inStock: true,
    badge: 'New'
  },
  {
    id: 'wire-white',
    name: 'White Pearl Wire Bracelet',
    category: 'wire',
    categoryName: 'Wire Bracelet',
    type: 'Wire craft bracelet',
    price: 180,
    comboPrice: 320,
    description: 'Minimalist and timeless white wire bracelet delicately wrapped with luminous pearls and beads. Lightweight, adjustable, and effortlessly chic.',
    images: ['assets/images/products/wire-white/1.jpg'],
    thumbnails: ['assets/images/products/wire-white/thumb-1.jpg'],
    video: 'assets/videos/wire-white/1.mp4',
    colors: ['White'],
    inStock: true,
    badge: 'Popular'
  },
  {
    id: 'keyring-ribbon',
    name: 'Handcrafted Ribbon Keyring Charm',
    category: 'keyring',
    categoryName: 'Keyring & Charms',
    type: 'Handmade Bag Charm / Keyring',
    price: 140,
    comboPrice: 250,
    description: 'Adorably styled ribbon and beaded charm keychain, perfect as an accessory for bags, purses, keys, or as a thoughtful gift.',
    images: ['assets/images/products/keyring-ribbon/1.jpg', 'assets/images/products/keyring-ribbon/2.jpg', 'assets/images/products/keyring-ribbon/3.jpg'],
    thumbnails: ['assets/images/products/keyring-ribbon/thumb-1.jpg', 'assets/images/products/keyring-ribbon/thumb-2.jpg', 'assets/images/products/keyring-ribbon/thumb-3.jpg'],
    video: 'assets/videos/keyring-ribbon/1.mp4',
    colors: ['Pink', 'White', 'Ribbon'],
    inStock: true,
    badge: 'Trending'
  }
];

// Categories for filter
const categories = [
  { id: 'all', name: 'All Products', count: 11 },
  { id: 'combination', name: 'Combination (Cracked & Plain)', count: 6 },
  { id: 'cracked', name: 'Cracked Beads', count: 2 },
  { id: 'wire', name: 'Wire Bracelet', count: 2 },
  { id: 'keyring', name: 'Keyrings & Charms', count: 1 },
  { id: 'charm', name: 'Charm Bracelet', count: 0, comingSoon: true },
  { id: 'plain', name: 'Plain Beads', count: 0, comingSoon: true },
  { id: 'seed', name: 'Seed Beads', count: 0, comingSoon: true }
];

// Pricing tiers for reference
const pricingTiers = [
  { type: 'Simple one-colour', single: 120, combo: 230, note: 'Price to be confirmed' },
  { type: 'Colour + golden beads', single: 150, combo: 260 },
  { type: 'Colour + charm', single: 220, combo: 400 },
  { type: 'Colour + golden beads + charm', single: 270, combo: 500 },
  { type: 'Colour + keychain', single: 320, combo: 600 },
  { type: 'Colour + golden beads + keychain', single: 340, combo: 650 }
];

// Hero images for homepage
const heroImages = [
  'assets/images/hero/ai-1.jpg',
  'assets/images/hero/ai-2.jpg',
  'assets/images/hero/1.jpg',
  'assets/images/hero/2.jpg',
  'assets/images/hero/3.jpg',
  'assets/images/hero/4.jpg',
  'assets/images/hero/5.jpg',
  'assets/images/hero/6.jpg',
  'assets/images/hero/7.jpg'
];

// Config
const config = {
  whatsappNumber: '919XXXXXXXXX',
  instagramUsername: 'handmadeheaven2407',
  instagramUrl: 'https://www.instagram.com/handmadeheaven2407?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw==',
  brandName: 'Handmade Heaven',
  currency: '₹',
  shippingNote: 'Shipping charges extra'
};
