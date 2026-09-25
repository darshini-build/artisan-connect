const svg = (label, colors = ['#d9f2d9', '#305f3b']) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0%" stop-color="${colors[0]}"/>
        <stop offset="100%" stop-color="${colors[1]}"/>
      </linearGradient>
    </defs>
    <rect width="300" height="200" fill="url(#g)"/>
    <circle cx="150" cy="78" r="38" fill="#fbe8d6"/>
    <path d="M100 160c14-30 40-42 50-42s36 12 50 42" fill="#f6c59c"/>
    <text x="150" y="180" text-anchor="middle" font-size="24" fill="#1b2f1b" font-family="Arial, sans-serif">${label}</text>
  </svg>
`)}`;

export const artisans = [
  {
    id: 'artisan-1',
    name: 'Meena Kumar',
    userType: 'Artisan',
    email: 'meena@example.com',
    password: 'artisan123',
    mobile: '9876543210',
    location: 'Chennai',
    craftType: 'Basketry',
    craftCategory: 'Bamboo Craft',
    experience: 12,
    photo: svg('Meena', ['#d7f3d9', '#3a6c46']),
    skills: ['Bamboo weaving', 'Natural dyeing', 'Packaging'],
    certifications: ['MSME training', 'Eco craft certification'],
    rating: 4.8,
    reviews: 128,
    products: 7,
    bio: 'Creates eco-friendly bamboo home accessories using traditional weaving methods.'
  },
  {
    id: 'artisan-2',
    name: 'Ravi Selvam',
    userType: 'Artisan',
    email: 'ravi@example.com',
    password: 'artisan123',
    mobile: '9876543211',
    location: 'Coimbatore',
    craftType: 'Wood Craft',
    craftCategory: 'Wood Craft',
    experience: 9,
    photo: svg('Ravi', ['#fce8d8', '#c97a42']),
    skills: ['Carving', 'Polishing', 'Custom orders'],
    certifications: ['State craft fellowship'],
    rating: 4.7,
    reviews: 96,
    products: 6,
    bio: 'Handcrafted wooden decor and utility items inspired by temple carvings.'
  },
  {
    id: 'artisan-3',
    name: 'Anitha Natarajan',
    userType: 'Artisan',
    email: 'anitha@example.com',
    password: 'artisan123',
    mobile: '9876543212',
    location: 'Madurai',
    craftType: 'Pottery',
    craftCategory: 'Pottery',
    experience: 15,
    photo: svg('Anitha', ['#f9e2d5', '#b75d47']),
    skills: ['Wheel pottery', 'Glazing', 'Mosaic art'],
    certifications: ['Clay craft workshop'],
    rating: 4.9,
    reviews: 205,
    products: 8,
    bio: 'Specializes in kiln-fired terracotta products and artistic clayware.'
  },
  {
    id: 'artisan-4',
    name: 'Sundaram Vel',
    userType: 'Artisan',
    email: 'sundaram@example.com',
    password: 'artisan123',
    mobile: '9876543213',
    location: 'Thanjavur',
    craftType: 'Traditional Painting',
    craftCategory: 'Traditional Painting',
    experience: 18,
    photo: svg('Sundaram', ['#f7e8b3', '#a77b23']),
    skills: ['Tanjore art', 'Gilding', 'Frame finishing'],
    certifications: ['Cultural heritage artist'],
    rating: 4.9,
    reviews: 174,
    products: 5,
    bio: 'Designs devotional and heritage paintings using gold leaf and natural pigments.'
  },
  {
    id: 'artisan-5',
    name: 'Kavitha Ganesan',
    userType: 'Artisan',
    email: 'kavitha@example.com',
    password: 'artisan123',
    mobile: '9876543214',
    location: 'Kanchipuram',
    craftType: 'Embroidery',
    craftCategory: 'Embroidery',
    experience: 11,
    photo: svg('Kavitha', ['#f2d9f3', '#7d4d81']),
    skills: ['Threadwork', 'Design tracing', 'Fabric finishing'],
    certifications: ['Textile design course'],
    rating: 4.6,
    reviews: 92,
    products: 4,
    bio: 'Creates detailed embroidered textile patterns for home and festive wear.'
  },
  {
    id: 'artisan-6',
    name: 'Palanisamy R',
    userType: 'Artisan',
    email: 'palanisamy@example.com',
    password: 'artisan123',
    mobile: '9876543215',
    location: 'Salem',
    craftType: 'Basketry',
    craftCategory: 'Basketry',
    experience: 14,
    photo: svg('Palanisamy', ['#dbeec9', '#577f39']),
    skills: ['Wicker weaving', 'Storage baskets', 'Organic finishing'],
    certifications: ['Rural artisan support program'],
    rating: 4.8,
    reviews: 144,
    products: 7,
    bio: 'Crafts durable woven storage baskets and utility products for households.'
  },
  {
    id: 'artisan-7',
    name: 'Lakshmi Narayan',
    userType: 'Artisan',
    email: 'lakshmi@example.com',
    password: 'artisan123',
    mobile: '9876543216',
    location: 'Tiruchirappalli',
    craftType: 'Jewelry',
    craftCategory: 'Jewelry',
    experience: 8,
    photo: svg('Lakshmi', ['#fde2d2', '#b05f58']),
    skills: ['Silver crafting', 'Gem setting', 'Packaging'],
    certifications: ['Design & finishing workshop'],
    rating: 4.7,
    reviews: 88,
    products: 5,
    bio: 'Creates lightweight traditional jewelry with modern minimal design appeal.'
  },
  {
    id: 'artisan-8',
    name: 'Vignesh Muthu',
    userType: 'Artisan',
    email: 'vignesh@example.com',
    password: 'artisan123',
    mobile: '9876543217',
    location: 'Villupuram',
    craftType: 'Handloom',
    craftCategory: 'Handloom',
    experience: 13,
    photo: svg('Vignesh', ['#dfeae5', '#486c69']),
    skills: ['Weaving', 'Natural fibers', 'Product design'],
    certifications: ['Handloom cooperative member'],
    rating: 4.8,
    reviews: 119,
    products: 6,
    bio: 'Produces handwoven fabric and household products with natural fiber blends.'
  }
]
