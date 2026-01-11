
import { CategoryId, Category, InformationItem, Article } from './types';

export const CATEGORIES: Category[] = [
  { id: CategoryId.EDUCATION, title: 'শিক্ষা প্রতিষ্ঠান', icon: 'graduation-cap', color: 'bg-blue-500' },
  { id: CategoryId.HOSPITAL, title: 'হাসপাতাল ও ক্লিনিক', icon: 'hospital', color: 'bg-red-500' },
  { id: CategoryId.DOCTORS, title: 'ডাক্তারগণ', icon: 'stethoscope', color: 'bg-teal-500' },
  { id: CategoryId.POLICE, title: 'পুলিশ ও প্রশাসন', icon: 'shield', color: 'bg-indigo-600' },
  { id: CategoryId.UNION, title: 'ইউনিয়ন পরিষদ', icon: 'building', color: 'bg-emerald-600' },
  { id: CategoryId.GOVT, title: 'সরকারী অফিস', icon: 'govt-building', color: 'bg-orange-500' },
  { id: CategoryId.COURIER, title: 'কুরিয়ার সার্ভিস', icon: 'courier', color: 'bg-blue-600' },
  { id: CategoryId.TRANSPORT, title: 'পরিবহন সেবা', icon: 'bus', color: 'bg-indigo-500' },
  { id: CategoryId.SIGHTSEEING, title: 'দর্শনীয় স্থান', icon: 'camera', color: 'bg-purple-500' },
  { id: CategoryId.SOCIAL_MEDIA, title: 'সামাজিক মাধ্যম', icon: 'share-2', color: 'bg-pink-500' },
  { id: CategoryId.MEDIA, title: 'সাংবাদিক ও গণমাধ্যম', icon: 'mic', color: 'bg-cyan-600' },
  { id: CategoryId.FIRE_SERVICE, title: 'ফায়ার সার্ভিস', icon: 'fire', color: 'bg-red-600' },
  { id: CategoryId.MARKET, title: 'হাট-বাজার', icon: 'shopping-cart', color: 'bg-amber-600' },
  { id: CategoryId.OTHERS, title: 'অন্যান্য', icon: 'plus-circle', color: 'bg-slate-500' },
  { id: CategoryId.NEWS, title: 'খবরাখবর', icon: 'news', color: 'bg-rose-500' },
];

export const INFO_ITEMS: InformationItem[] = [
  // Union Parishads
  {
    id: 'union-1',
    categoryId: CategoryId.UNION,
    name: 'জাতপুর ইউনিয়ন পরিষদ',
    image: 'https://images.unsplash.com/photo-1590060153074-303de9911bd7?q=80&w=800&auto=format&fit=crop',
    description: 'আমিনপুর থানার ১নং ইউনিয়ন পরিষদ। এটি একটি ঐতিহ্যবাহী প্রশাসনিক এলাকা।',
    location: 'জাতপুর বাজার, আমিনপুর, পাবনা।',
    phone: '০১৭০০-১১১২২২',
    chairman: 'মোঃ নজরুল ইসলাম',
    fullDetails: 'জাতপুর ইউনিয়ন আমিনপুর থানার একটি অত্যন্ত গুরুত্বপূর্ণ ইউনিয়ন। যমুনা নদীর কোল ঘেঁষে গড়ে ওঠা এই ইউনিয়নের অধিকাংশ মানুষ কৃষি এবং ব্যবসার সাথে জড়িত। এখানকার শিক্ষা হার অত্যন্ত সন্তোষজনক।'
  },
  {
    id: 'union-2',
    categoryId: CategoryId.UNION,
    name: 'মাসুন্দিয়া ইউনিয়ন পরিষদ',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    description: 'আমিনপুর থানার ২নং ইউনিয়ন পরিষদ। কৃষি ও অর্থনীতিতে সমৃদ্ধ এলাকা।',
    location: 'মাসুন্দিয়া বাজার, আমিনপুর, পাবনা।',
    phone: '০১৭০০-৩৩৩৪৪৪',
    chairman: 'মোঃ মাইন উদ্দিন',
    fullDetails: 'মাসুন্দিয়া ইউনিয়ন তার উর্বর কৃষি জমির জন্য পরিচিত। এখানকার উৎপাদিত ফসল অত্র অঞ্চলের চাহিদা মিটিয়ে বাইরেও সরবরাহ করা হয়। ইউনিয়নে বেশ কিছু সরকারি প্রাথমিক ও উচ্চ বিদ্যালয় রয়েছে।'
  },
  {
    id: 'union-3',
    categoryId: CategoryId.UNION,
    name: 'পুরানভারেঙ্গা ইউনিয়ন পরিষদ',
    image: 'https://images.unsplash.com/photo-1493916665398-143bcbc8e162?q=80&w=800&auto=format&fit=crop',
    description: 'আমিনপুর থানার ৩নং ইউনিয়ন পরিষদ। ঐতিহ্যে ঘেরা একটি ইউনিয়ন।',
    location: 'পুরানভারেঙ্গা, আমিনপুর, পাবনা।',
    phone: '০১৭০০-৫৫৫৬৬৬',
    chairman: 'মোঃ রফিকুল ইসলাম',
    fullDetails: 'পুরানভারেঙ্গা ইউনিয়ন তার ঐতিহাসিক নিদর্শনের জন্য বিখ্যাত। এখানকার মানুষ অত্যন্ত সহজ-সরল এবং অতিথিপরায়ণ। ইউনিয়নের অবকাঠামো দিন দিন উন্নত হচ্ছে।'
  },
  {
    id: 'union-4',
    categoryId: CategoryId.UNION,
    name: 'রূপপুর ইউনিয়ন পরিষদ',
    image: 'https://images.unsplash.com/photo-1510519133417-2ad7c30ee743?q=80&w=800&auto=format&fit=crop',
    description: 'আমিনপুর থানার ৪নং ইউনিয়ন পরিষদ। দেশের অন্যতম গুরুত্বপূর্ণ এলাকা।',
    location: 'রূপপুর মোড়, আমিনপুর, পাবনা।',
    phone: '০১৭০০-৭৭৭৮৮৮',
    chairman: 'মোঃ শাহ আলম',
    fullDetails: 'রূপপুর ইউনিয়ন বর্তমানে বাংলাদেশের অর্থনীতির একটি কেন্দ্রবিন্দু। পারমাণবিক বিদ্যুৎ কেন্দ্রের নিকটবর্তী হওয়ায় এর গুরুত্ব বহুগুণ বেড়ে গেছে। এখানকার যোগাযোগ ব্যবস্থা অত্যন্ত উন্নত।'
  },
  {
    id: 'union-5',
    categoryId: CategoryId.UNION,
    name: 'সাগরকান্দি ইউনিয়ন পরিষদ',
    image: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?q=80&w=800&auto=format&fit=crop',
    description: 'আমিনপুর থানার ৫নং ইউনিয়ন পরিষদ। লোকজ সংস্কৃতির চারণভূমি।',
    location: 'সাগরকান্দি বাজার, আমিনপুর, পাবনা।',
    phone: '০১৭০০-৯৯৯০০০',
    chairman: 'মোঃ আব্দুল মান্নান',
    fullDetails: 'সাগরকান্দি ইউনিয়ন তার সমৃদ্ধ সংস্কৃতির জন্য পরিচিত। এখানকার হাট-বাজার এবং ধান-পাটের ব্যবসা অত্র অঞ্চলের অর্থনীতির মূল চালিকাশক্তি। এখানে একটি বড় সরকারি গুদাম অবস্থিত।'
  },
  {
    id: 'union-6',
    categoryId: CategoryId.UNION,
    name: 'আহমেদপুর ইউনিয়ন পরিষদ',
    image: 'https://images.unsplash.com/photo-1572248521340-96466043bc20?q=80&w=800&auto=format&fit=crop',
    description: 'আমিনপুর থানার ৬নং ইউনিয়ন পরিষদ। বর্ধিষ্ণু ও উন্নত ইউনিয়ন।',
    location: 'আহমেদপুর, আমিনপুর, পাবনা।',
    phone: '০১৭০০-১১১০০০',
    chairman: 'মোঃ জাকির হোসেন',
    fullDetails: 'আহমেদপুর ইউনিয়ন রাজনৈতিক এবং সামাজিকভাবে অত্যন্ত সচেতন একটি এলাকা। এখানকার রাস্তাঘাট উন্নত এবং গ্রামীণ অর্থনীতি অত্যন্ত স্থিতিশীল। এখানে একটি আদর্শ গ্রাম প্রকল্প চালু রয়েছে।'
  },
  {
    id: 'union-7',
    categoryId: CategoryId.UNION,
    name: 'রানীনগর ইউনিয়ন পরিষদ',
    image: 'https://images.unsplash.com/photo-1444858291040-58f756a3bcd6?q=80&w=800&auto=format&fit=crop',
    description: 'আমিনপুর থানার ৭নং ইউনিয়ন পরিষদ। মৎস্য সম্পদে ভরপুর এলাকা।',
    location: 'রানীনগর বাজার, আমিনপুর, পাবনা।',
    phone: '০১৭০০-২২২০০০',
    chairman: 'মোঃ খোরশেদ আলম',
    fullDetails: 'রানীনগর ইউনিয়নটি যমুনা নদীর কোল ঘেঁষে অবস্থিত। এখানকার নদী এবং খালের মৎস্য সম্পদ অত্র এলাকার মানুষের আমিষের চাহিদা পূরণ করে। এখানকার মানুষের মাঝে ভ্রাতৃত্ববোধ প্রবল।'
  },
  {
    id: 'union-8',
    categoryId: CategoryId.UNION,
    name: 'ঢালারচর ইউনিয়ন পরিষদ',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
    description: 'আমিনপুর থানার ৮নং ইউনিয়ন পরিষদ। বিশাল চর এলাকা সম্বলিত ইউনিয়ন।',
    location: 'ঢালারচর বাজার, আমিনপুর, পাবনা।',
    phone: '০১৭০০-৩৩৩০০০',
    chairman: 'মোঃ কোরবান আলী',
    fullDetails: 'ঢালারচর ইউনিয়নটি মূলত চর এলাকা নিয়ে গঠিত। যমুনা নদীর মাঝখানে বিশাল এই চরের উর্বর পলি মাটিতে বাদাম এবং গমের ব্যাপক ফলন হয়। এটি আমিনপুর থানার আয়তনে অন্যতম বড় ইউনিয়ন।'
  },

  // Existing institutions
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
    fullDetails: 'আমিনপুর উচ্চ বিদ্যালয় অত্র অঞ্চলের একটি অন্যতম সেরা বিদ্যাপীঠ। প্রতি বছর এখান থেকে অসংখ্য শিক্ষার্থী কৃতিত্বের সাথে উত্তীর্ণ হয়। বিদ্যালয়ে শিক্ষার মান অত্যন্ত উন্নত।',
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
    fullDetails: 'আমিনপুর থানা পাবনা জেলার একটি গুরুত্বপূর্ণ থানা। আইন শৃঙ্খলা পরিস্থিতি নিয়ন্ত্রণে এই থানার ভূমিকা অপরিসীম।'
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
    content: 'আমিনপুর থানায় নতুন ভারপ্রাপ্ত কর্মকর্তা (ওসি) হিসেবে দায়িত্ব গ্রহণ করেছেন। তিনি এলাকার শান্তি-শৃঙ্খলা বজায় রাখতে সকলের সহযোগিতা কামনা করেছেন। তিনি মাদক ও সন্ত্রাসের বিরুদ্ধে জিরো টলারেন্স ঘোষণা করেছেন।'
  },
  {
    id: 'art-2',
    title: 'করোনা সচেতনতায় আমিনপুর স্কুলগুলোর উদ্যোগ',
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=800&auto=format&fit=crop',
    date: '০৮ মে ২০২৪',
    excerpt: 'শিক্ষার্থীদের স্বাস্থ্য সচেতন করতে মাস্ক বিতরণ ও সচেতনতামূলক সভা অনুষ্ঠিত হয়েছে...',
    author: 'মীর রাব্বি হোসেন',
    content: 'আমিনপুর থানার বিভিন্ন শিক্ষা প্রতিষ্ঠানে শিক্ষার্থীদের স্বাস্থ্য সচেতন করতে মাস্ক বিতরণ ও সচেতনতামূলক সভা অনুষ্ঠিত হয়েছে। স্থানীয় প্রশাসনের সহায়তায় এই কর্মসূচি পালিত হয়।'
  },
  {
    id: 'art-3',
    title: 'বোরো ধান কাটার উৎসবে আমিনপুর',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    date: '০৫ মে ২০২৪',
    excerpt: 'মাঠে মাঠে এখন ধান কাটার ধুম পড়েছে, কৃষকের মুখে হাসির ঝিলিক...',
    author: 'নিজস্ব প্রতিবেদক',
    content: 'আমিনপুর থানার বিশাল এলাকা জুড়ে এখন বোরো ধান কাটার উৎসব চলছে। এবার ফলন ভালো হওয়ায় কৃষকরা অত্যন্ত খুশি। মাঠের পর মাঠ সোনালী ধানে ভরে উঠেছে।'
  }
];
