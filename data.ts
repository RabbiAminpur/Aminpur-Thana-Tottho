
import { CategoryId, Category, InformationItem, Article } from './types';

export const CATEGORIES: Category[] = [
  { id: CategoryId.EDUCATION, title: 'শিক্ষা প্রতিষ্ঠান', icon: 'graduation-cap', color: 'bg-blue-500' },
  { id: CategoryId.HOSPITAL, title: 'হাসপাতাল ও ক্লিনিক', icon: 'hospital', color: 'bg-red-500' },
  { id: CategoryId.DOCTORS, title: 'ডাক্তারগণ', icon: 'stethoscope', color: 'bg-teal-500' },
  { id: CategoryId.POLICE, title: 'পুলিশ ও প্রশাসন', icon: 'shield', color: 'bg-indigo-600' },
  { id: CategoryId.UNION, title: 'ইউনিয়ন পরিষদ', icon: 'building', color: 'bg-emerald-600' },
  { id: CategoryId.GOVT, title: 'সরকারী অফিস', icon: 'briefcase', color: 'bg-orange-500' },
  { id: CategoryId.SIGHTSEEING, title: 'দর্শনীয় স্থান', icon: 'camera', color: 'bg-purple-500' },
  { id: CategoryId.SOCIAL_MEDIA, title: 'সামাজিক মাধ্যম', icon: 'share-2', color: 'bg-pink-500' },
  { id: CategoryId.MEDIA, title: 'সাংবাদিক ও গণমাধ্যম', icon: 'mic', color: 'bg-cyan-600' },
  { id: CategoryId.FIRE_SERVICE, title: 'ফায়ার সার্ভিস', icon: 'flame', color: 'bg-red-600' },
  { id: CategoryId.MARKET, title: 'হাট-বাজার', icon: 'shopping-cart', color: 'bg-amber-600' },
  { id: CategoryId.OTHERS, title: 'অন্যান্য', icon: 'plus-circle', color: 'bg-slate-500' },
  { id: CategoryId.NEWS, title: 'খবরাখবর', icon: 'newspaper', color: 'bg-rose-500' },
];

export const INFO_ITEMS: InformationItem[] = [
  {
    id: 'edu-1',
    categoryId: CategoryId.EDUCATION,
    name: 'আমিনপুর উচ্চ বিদ্যালয়',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop',
    description: 'আমিনপুর থানার একটি ঐতিহ্যবাহী শিক্ষা প্রতিষ্ঠান।',
    location: 'আমিনপুর বাজার সংলগ্ন, পাবনা।',
    phone: '০১৭০০-০০০০০০',
    estYear: '১৯৬৫',
    eiin: '১১০০০০',
    fullDetails: 'আমিনপুর উচ্চ বিদ্যালয় অত্র অঞ্চলের একটি অন্যতম সেরা বিদ্যাপীঠ। প্রতি বছর এখান থেকে অসংখ্য শিক্ষার্থী কৃতিত্বের সাথে উত্তীর্ণ হয়। বিদ্যালয়ের পরিবেশ অত্যন্ত মনোরম এবং শিক্ষার মান অত্যন্ত উন্নত।',
    teachers: [
      { name: 'মোঃ আব্দুল লতিফ', designation: 'প্রধান শিক্ষক', image: 'https://i.pravatar.cc/150?u=teacher1' },
      { name: 'মোছাঃ ফাতেমা খাতুন', designation: 'সহকারী শিক্ষক', image: 'https://i.pravatar.cc/150?u=teacher2' }
    ]
  },
  {
    id: 'hosp-1',
    categoryId: CategoryId.HOSPITAL,
    name: 'আমিনপুর জেনারেল হাসপাতাল',
    image: 'https://images.unsplash.com/photo-1586773860418-d3b97976c647?q=80&w=800&auto=format&fit=crop',
    description: 'আধুনিক চিকিৎসা সেবা সম্বলিত বেসরকারী হাসপাতাল।',
    location: 'থানা মোড়, আমিনপুর।',
    phone: '০১৭০০-১১১২২২',
    fullDetails: '২৪ ঘণ্টা জরুরী বিভাগ, প্যাথলজি ও অপারেশন থিয়েটার সুবিধা সম্পন্ন একটি আধুনিক হাসপাতাল। এখানে বিশেষজ্ঞ ডাক্তারগণ নিয়মিত রোগী দেখেন।',
    doctors: [
      { name: 'ডাঃ মোস্তাফিজুর রহমান', specialty: 'মেডিসিন বিশেষজ্ঞ', image: 'https://i.pravatar.cc/150?u=dr1', phone: '০১৭০০-১২৩৪৫৬' },
      { name: 'ডাঃ তানিয়া আহমেদ', specialty: 'গাইনী বিশেষজ্ঞ', image: 'https://i.pravatar.cc/150?u=dr2', phone: '০১৭০০-৬৫৪৩২১' }
    ]
  },
  {
    id: 'pol-1',
    categoryId: CategoryId.POLICE,
    name: 'আমিনপুর থানা ভবন',
    image: 'https://images.unsplash.com/photo-1593115057323-bc1ac9ad269c?q=80&w=800&auto=format&fit=crop',
    description: 'জনগণের জান-মালের নিরাপত্তায় নিয়োজিত।',
    location: 'আমিনপুর, পাবনা।',
    phone: '০১৩২০-১২৩৪৫৬',
    fullDetails: 'আমিনপুর থানা পাবনা জেলার একটি গুরুত্বপূর্ণ থানা। আইন শৃঙ্খলা পরিস্থিতি নিয়ন্ত্রণে এই থানার ভূমিকা অপরিসীম। যেকোনো বিপদে সরাসরি যোগাযোগ করুন।'
  },
  {
      id: 'sight-1',
      categoryId: CategoryId.SIGHTSEEING,
      name: 'যমুনা নদী পাড়',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop',
      description: 'প্রাকৃতিক সৌন্দর্যে ঘেরা মনোরম স্থান।',
      location: 'মাঝিগ্রাম ঘাট, আমিনপুর।',
      phone: 'প্রযোজ্য নয়',
      fullDetails: 'যমুনা নদীর পাড়ে অবস্থিত এই স্থানটি বিকেলে সময় কাটানোর জন্য অত্যন্ত চমৎকার। শীতকালে এখানে পিকনিকের ভালো ব্যবস্থা রয়েছে। পর্যটকদের জন্য এটি একটি আকর্ষণীয় স্থান।'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'আমিনপুর থানায় নতুন ওসি যোগদান',
    image: 'https://images.unsplash.com/photo-1555854816-809728a67301?q=80&w=800&auto=format&fit=crop',
    date: '১০ মে ২০২৪',
    excerpt: 'আমিনপুর থানায় নতুন ভারপ্রাপ্ত কর্মকর্তা (ওসি) হিসেবে দায়িত্ব গ্রহণ করেছেন...',
    author: 'নিজস্ব প্রতিবেদক',
    content: 'আমিনপুর থানায় নতুন ভারপ্রাপ্ত কর্মকর্তা (ওসি) হিসেবে দায়িত্ব গ্রহণ করেছেন। তিনি এলাকার শান্তি-শৃঙ্খলা বজায় রাখতে সকলের সহযোগিতা কামনা করেছেন। এর আগে তিনি অন্য একটি থানায় অত্যন্ত দক্ষতার সাথে দায়িত্ব পালন করেছেন। তিনি মাদক ও সন্ত্রাসের বিরুদ্ধে জিরো টলারেন্স ঘোষণা করেছেন।'
  },
  {
    id: 'art-2',
    title: 'করোনা সচেতনতায় আমিনপুর স্কুলগুলোর উদ্যোগ',
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=800&auto=format&fit=crop',
    date: '০৮ মে ২০২৪',
    excerpt: 'শিক্ষার্থীদের স্বাস্থ্য সচেতন করতে মাস্ক বিতরণ ও সচেতনতামূলক সভা অনুষ্ঠিত হয়েছে...',
    author: 'মীর রাব্বি হোসেন',
    content: 'আমিনপুর থানার বিভিন্ন শিক্ষা প্রতিষ্ঠানে শিক্ষার্থীদের স্বাস্থ্য সচেতন করতে মাস্ক বিতরণ ও সচেতনতামূলক সভা অনুষ্ঠিত হয়েছে। স্থানীয় প্রশাসনের সহায়তায় এই কর্মসূচি পালিত হয়। শিক্ষকরা শিক্ষার্থীদের নিয়মিত হাত ধোয়া এবং স্বাস্থ্যবিধি মেনে চলার গুরুত্ব সম্পর্কে বিস্তারিত আলোচনা করেন।'
  },
  {
    id: 'art-3',
    title: 'বোরো ধান কাটার উৎসবে আমিনপুর',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    date: '০৫ মে ২০২৪',
    excerpt: 'মাঠে মাঠে এখন ধান কাটার ধুম পড়েছে, কৃষকের মুখে হাসির ঝিলিক...',
    author: 'নিজস্ব প্রতিবেদক',
    content: 'আমিনপুর থানার বিশাল এলাকা জুড়ে এখন বোরো ধান কাটার উৎসব চলছে। এবার ফলন ভালো হওয়ায় কৃষকরা অত্যন্ত খুশি। মাঠের পর মাঠ সোনালী ধানে ভরে উঠেছে। কৃষকরা দল বেঁধে গান গেয়ে ধান কাটছেন। তবে শ্রমিকের কিছুটা অভাব থাকলেও তারা আনন্দ চিত্তে ফসল ঘরে তুলছেন।'
  }
];
