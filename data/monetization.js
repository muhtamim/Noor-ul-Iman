// ====== Monetization Configuration ======
// Replace placeholder IDs with your actual accounts

const ADSENSE_CLIENT_ID = 'ca-pub-XXXXXXXXXXXXXXXX'; // Replace with your AdSense client ID
const ADSENSE_ENABLED = false; // Set to true after getting AdSense approval

// Donation links — replace with your actual accounts
const donationOptions = {
  // International
  buymeacoffee: 'https://buymeacoffee.com/your-handle',
  patreon: 'https://www.patreon.com/your-handle',
  paypal: 'https://www.paypal.me/your-handle',
  github_sponsors: 'https://github.com/sponsors/muhtamim',

  // Bangladesh local
  bkash: '01XXXXXXXXX',  // Replace with your bKash number
  nagad: '01XXXXXXXXX',  // Replace with your Nagad number
  rocket: '01XXXXXXXXX', // Replace with your Rocket number

  // Crypto (optional)
  btc: 'YOUR_BTC_ADDRESS',
  eth: 'YOUR_ETH_ADDRESS'
};

// Affiliate links — Islamic products
const affiliateProducts = [
  {
    title: 'Quran Mushaf (Premium Edition)',
    desc: 'Beautiful hardcover Arabic Quran with Tajweed coloring',
    price: '$25-40',
    image: 'https://placehold.co/300x200/10b981/white?text=Quran+Mushaf',
    link: 'https://amzn.to/YOUR_AFFILIATE_LINK',
    badge: 'Bestseller'
  },
  {
    title: 'Premium Prayer Mat',
    desc: 'Soft thick prayer mat with compass and Qibla finder',
    price: '$30-60',
    image: 'https://placehold.co/300x200/f59e0b/white?text=Prayer+Mat',
    link: 'https://amzn.to/YOUR_AFFILIATE_LINK',
    badge: 'Top Rated'
  },
  {
    title: 'Digital Tasbih Counter',
    desc: 'Electronic dhikr counter with LCD display',
    price: '$8-15',
    image: 'https://placehold.co/300x200/8b5cf6/white?text=Tasbih',
    link: 'https://amzn.to/YOUR_AFFILIATE_LINK',
    badge: 'Bestseller'
  },
  {
    title: 'Riyad-us-Saliheen (Hadith Book)',
    desc: 'Classic hadith collection in English/Arabic',
    price: '$15-25',
    image: 'https://placehold.co/300x200/0ea5e9/white?text=Riyad-us-Saliheen',
    link: 'https://amzn.to/YOUR_AFFILIATE_LINK'
  },
  {
    title: 'Islamic Calligraphy Wall Art',
    desc: 'Quran verses beautifully calligraphed',
    price: '$20-100',
    image: 'https://placehold.co/300x200/dc2626/white?text=Islamic+Art',
    link: 'https://amzn.to/YOUR_AFFILIATE_LINK'
  },
  {
    title: 'Kaaba Replica Decor',
    desc: 'Beautiful 3D printed Kaaba model for home',
    price: '$25-50',
    image: 'https://placehold.co/300x200/1e293b/white?text=Kaaba+Model',
    link: 'https://amzn.to/YOUR_AFFILIATE_LINK'
  }
];

// Premium tier features (coming soon)
const premiumFeatures = [
  { icon: 'check', title: 'Ad-free experience', desc: 'No banner or interstitial ads anywhere' },
  { icon: 'check', title: 'Offline Quran download', desc: 'Read & listen to entire Quran offline' },
  { icon: 'check', title: 'Unlimited bookmarks & notes', desc: 'Save unlimited verses with personal notes' },
  { icon: 'check', title: 'Premium reciters', desc: 'Access 20+ exclusive Qari recordings' },
  { icon: 'check', title: 'Custom prayer notifications', desc: 'Set personalized azan sounds & alerts' },
  { icon: 'check', title: 'Cloud sync across devices', desc: 'Sync bookmarks, progress everywhere' },
  { icon: 'check', title: 'Family accounts (up to 5)', desc: 'Share premium with family members' },
  { icon: 'check', title: 'Early access to new features', desc: 'Get new features before public release' }
];

// Sponsorship tiers
const sponsorTiers = [
  { name: 'Supporter', amount: '$5/mo', badge: '🌱',
    perks: ['Ad-free reading', 'Supporter badge', 'Early access'] },
  { name: 'Patron', amount: '$15/mo', badge: '✨',
    perks: ['Everything in Supporter', 'Premium reciters', 'Offline Quran', 'Cloud sync'] },
  { name: 'Benefactor', amount: '$50/mo', badge: '🌟',
    perks: ['Everything in Patron', 'Family accounts (5 members)', 'Priority support', 'Custom theme'] }
];
