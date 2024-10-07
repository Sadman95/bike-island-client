import { generateUUID } from './_mockfunc';
export const offers = [
  {
    id: generateUUID(),
    title: 'Get 10% off on your first order',
    description: 'Use the code: NEW10',
    image:
			'https://purepng.com/public/uploads/large/purepng.com-us-bank-logologobrand-logoiconslogos-251519940417jbyiu.png',
  },
  {
    id: generateUUID(),
    title: 'Free shipping on orders over $50',
    description: 'No code needed, auto checkout',
    image:
			'https://komunikamedia.co.id/wp-content/uploads/2019/02/Logo-Bank-BNI-PNG.png',
  },
  {
    id: generateUUID(),
    title: 'Buy one, get one 50% off',
    description: 'Use code: BOGO50 at checkout',
    image:
			'https://logos-world.net/wp-content/uploads/2020/11/HDFC-Bank-Logo.png',
  },
  {
    id: generateUUID(),
    title: '20% off all electronics',
    description: 'Limited time offer, ends Sunday',
    image:
			'https://logos-world.net/wp-content/uploads/2021/03/Lloyds-Bank-Logo.png',
  },
];

export const featuredCycles = [
  {
    id: 1,
    category: 'Mountain',
    featuredImage:
			'https://static.vecteezy.com/system/resources/previews/007/286/727/non_2x/mountain-bike-adventure-banner-illustration-vector.jpg',
  },
  {
    id: 2,
    category: 'Hybrid',
    featuredImage:
			'https://www.firefoxbikes.com/on/demandware.static/-/Sites-firefox-navigation/default/dw03c9ff14/PLPBanner/offers/Monsoon-web-banner-1920x1023.jpg',
  },
  {
    id: 3,
    category: 'Women',
    featuredImage:
			'https://th.bing.com/th?id=OIF.b58JAanA7dHc%2fd8WWiIVqQ&rs=1&pid=ImgDetMain',
  },
  {
    id: 4,
    category: 'Geared',
    featuredImage:
			'https://th.bing.com/th/id/OIP.28BnMrHLlFva3gV96fCDEAHaD4?rs=1&pid=ImgDetMain',
  },
];

export const brands = [
  { id: 1, name: 'Brand A', logo: 'assets/brands-mock/brand-1.png' },
  { id: 2, name: 'Brand B', logo: 'assets/brands-mock/brand-2.png' },
  { id: 3, name: 'Brand C', logo: 'assets/brands-mock/brand-3.png' },
  { id: 4, name: 'Brand D', logo: 'assets/brands-mock/brand-4.png' },
  { id: 5, name: 'Brand E', logo: 'assets/brands-mock/brand-5.png' },
  { id: 6, name: 'Brand F', logo: 'assets/brands-mock/brand-6.png' },
  // Add more brands as needed
];