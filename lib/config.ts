export type VehicleSize = 'small' | 'medium' | 'large'
export type PackageTier = 'basic' | 'premium' | 'extreme' | 'interior' | 'buffing'

export const siteConfig = {
  company: {
    name:      'GP Mobile Car Wash & Detail',
    shortName: 'GP Mobile',
    tagline:   'We Come to You!',
    legalName: 'GP Mobile Car Wash & Detail',
    phone:     '(402) 601-6929',
    phoneHref: 'tel:+14026016929',
    email:     'gpmobilecarwash@gmail.com',
    serviceArea:     'Greater Lincoln, Nebraska',
    serviceAreaLong: 'Serving Lincoln, NE and surrounding areas',
    serviceRadius: 35,
    address: {
      street: '5901 Fremont Street',
      city:   'Lincoln',
      state:  'NE',
      zip:    '68507',
      full:   '5901 Fremont Street, Lincoln, NE 68507',
    },
    giftCardUrl: 'https://squareup.com/gift/HQDD559P065DH/order',
  },

  reviews: {
    rating:    4.9,
    count:     '70+',
    googleUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJidLX1Qm5locRs3wYyFdyrek',
  },

  hours: [
    { day: 'Monday – Friday', time: '8:00 AM – 4:00 PM' },
    { day: 'Saturday',        time: 'By Appointment'     },
    { day: 'Sunday',          time: 'Closed'              },
  ],

  vehicleSizes: [
    { id: 'small',  label: 'Small',  sub: 'Sedan, coupe, hatchback',  image: '/vehicle-sizes/small.jpg'  },
    { id: 'medium', label: 'Medium', sub: '2-Row SUV or crossover',   image: '/vehicle-sizes/medium.jpg' },
    { id: 'large',  label: 'Large',  sub: 'Van, 3-Row SUV, or truck', image: '/vehicle-sizes/large.jpg'  },
  ] as { id: VehicleSize; label: string; sub: string; image: string }[],

  packages: [
    {
      id:          'basic',
      name:        'Basic',
      description: 'A quick, thorough refresh for the outside of your vehicle.',
      includes: [
        'Exterior wash',
        'Exterior windows',
        'Wipe down dash',
        'Clean tires',
        'Vacuum floors',
        'Door jambs',
      ],
      prices: { small: 85, medium: 90, large: 95 },
    },
    {
      id:          'premium',
      name:        'Premium',
      description: 'Our most popular package — a full interior and exterior clean.',
      includes: [
        'Exterior wash',
        'Interior detail',
        'Interior & exterior windows',
        'Full vacuum',
        'Light wheel scrub',
        'Clean tires',
        'Detail rims',
        'Door jambs',
      ],
      prices: { small: 155, medium: 165, large: 175 },
      popular: true,
    },
    {
      id:          'extreme',
      name:        'Extreme',
      description: 'The complete top-to-bottom detail, inside and out.',
      includes: [
        'Full interior & exterior detail',
        'Bumper detail',
        'Mirror detail',
        'Interior trim dress',
        'Carpet shampoo',
        'Seat vacuum',
        'Ceiling clean',
        'Trunk by request',
      ],
      prices: { small: 245, medium: 255, large: 270 },
    },
    {
      id:          'interior',
      name:        'Interior Only',
      description: 'A deep clean for the inside of your vehicle only.',
      includes: [
        'Full interior detail',
        'Interior windows',
        'Full vacuum',
        'Interior trim dress',
      ],
      prices: { small: 195, medium: 205, large: 215 },
    },
    {
      id:          'buffing',
      name:        'Buffing',
      description: 'Machine buff and paint sealant for a deep, protected shine.',
      includes: [
        '3-step machine buff',
        'Paint correction pass',
        'Protective sealant',
        'Exterior wash included',
      ],
      prices: { small: 250, medium: 300, large: 350 },
    },
  ] as {
    id: PackageTier
    name: string
    description: string
    includes: string[]
    prices: Record<VehicleSize, number>
    popular?: boolean
  }[],

  beforeAfterPhotos: [
    { id: 'headlight',  label: 'Headlight Restoration',   beforeSrc: '/gallery/headlight-before.jpg',  afterSrc: '/gallery/headlight-after.jpg'  },
    { id: 'mirror',     label: 'Exterior Mirror Detail',  beforeSrc: '/gallery/mirror-before.jpg',     afterSrc: '/gallery/mirror-after.jpg'     },
    { id: 'headlight2', label: 'Headlight Restoration',   beforeSrc: '/gallery/headlight2-before.jpg', afterSrc: '/gallery/headlight2-after.jpg' },
    { id: 'carpet',     label: 'Carpet Shampoo',          beforeSrc: '/gallery/carpet-before.jpg',     afterSrc: '/gallery/carpet-after.jpg'     },
  ],

  addons: [
    { id: 'odor',      label: 'Odor Treatment (Ozone)',   description: 'Eliminates smoke, pet, and mildew odors at the source.', price: 175 },
    { id: 'headlight', label: 'Headlight Restoration',    description: 'Removes fog and yellowing for clear, bright headlights.', price: 75  },
    { id: 'pethair',   label: 'Pet Hair Removal',         description: 'Deep extraction of embedded pet hair from carpet & seats.', price: 35 },
  ],

  quoteOnlyServices: [
    { id: 'ceramic', name: 'Ceramic Coating',    description: 'Long-term paint protection with a high-gloss, hydrophobic finish.' },
    { id: 'fleet',   name: 'Fleet Washing',      description: 'Recurring wash & detail service for business and fleet vehicles.' },
    { id: 'rvboat',  name: 'RV & Boat Detailing', description: 'Full interior and exterior detailing sized for RVs and boats.' },
  ],

  whyUs: [
    { icon: 'Store',    title: 'Drop Off or We Come to You', body: 'Bring your vehicle to our shop, or let our fully equipped mobile unit come to your home, office, or job site — your choice, same price.' },
    { icon: 'MapPin',   title: '35-Mile Service Area',   body: 'We serve Lincoln, NE and every community within a 35-mile radius.' },
    { icon: 'Clock',    title: 'Flexible Scheduling',    body: 'Weekday appointments Monday through Friday, plus Saturdays by appointment.' },
    { icon: 'Droplets', title: 'Detail-Focused',         body: 'From a quick exterior wash to a full ceramic coating — we treat every vehicle like our own.' },
  ],

  galleryItems: [
    { label: 'Exterior Wash & Wax',      before: 'Road grime, dust, and water spots', after: 'Clean, streak-free shine',           tag: 'Exterior' },
    { label: 'Full Interior Detail',     before: 'Crumbs, dust, and stains',          after: 'Vacuumed, wiped, and fresh',          tag: 'Interior' },
    { label: 'Carpet & Seat Shampoo',    before: 'Set-in stains and odor',            after: 'Deep-cleaned carpet and upholstery',  tag: 'Extreme' },
    { label: '3-Step Buff & Seal',       before: 'Dull, swirl-marked paint',          after: 'Deep gloss with protective sealant',  tag: 'Buffing' },
    { label: 'Wheel & Tire Detail',      before: 'Brake dust and grime',              after: 'Detailed rims and dressed tires',     tag: 'Premium' },
    { label: 'Pet Hair Removal',         before: 'Embedded hair in seats & carpet',   after: 'Fully extracted, fabric restored',    tag: 'Add-On' },
  ],

  social: {
    facebook:  'https://www.facebook.com/GPMobileCarWash1/',
    instagram: 'https://www.instagram.com/gpmobilecarwash',
    tiktok:    'https://www.tiktok.com/@gpmobilecardetail',
    youtube:   'https://www.youtube.com/@mobilecarwash1',
    x:         'https://x.com/gpmobilecarwash',
    linkedin:  'https://www.linkedin.com/in/nelson-orellana-5264a532/',
    google:    'https://google.com',
  },

  seo: {
    title:       'GP Mobile Car Wash & Detail | Lincoln, NE Car Wash & Detailing',
    description: 'Car wash and detailing serving Lincoln, NE and a 35-mile radius. Drop off at our shop or we come to you. Wash, detail, buffing, and ceramic coating. Call (402) 601-6929.',
    keywords:    'car wash Lincoln NE, mobile detailing Lincoln Nebraska, car detailing Lincoln, ceramic coating Lincoln NE, drop off car wash Lincoln NE',
  },
} as const

export function getPrice(tier: PackageTier, size: VehicleSize): number {
  const pkg = siteConfig.packages.find(p => p.id === tier)
  return pkg ? pkg.prices[size] : 0
}
