
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
  {
    id: 'union-1',
    categoryId: CategoryId.UNION,
    name: 'জাতপুর ইউনিয়ন পরিষদ',
    image: 'https://images.unsplash.com/photo-1590060153074-303de9911bd7?q=80&w=800&auto=format&fit=crop',
    description: 'আমিনপুর থানার ১নং ইউনিয়ন পরিষদ। এটি একটি ঐতিহ্যবাহী প্রশাসনিক এলাকা।',
    location: 'জাতপুর বাজার, আমিনপুর, পাবনা।',
    phone: '০১৭০০-১১১২২২',
    chairman: 'মোঃ নজরুল ইসলাম',
    fullDetails: 'জাতপুর ইউনিয়ন আমিনপুর থানার একটি অত্যন্ত গুরুত্বপূর্ণ ইউনিয়ন। যমুনা নদীর কোল ঘেঁষে গড়ে ওঠা এই ইউনিয়নের অধিকাংশ মানুষ কৃষি এবং ব্যবসার সাথে জড়িত।',
    gallery: [
      'https://images.unsplash.com/photo-1590060153074-303de9911bd7?q=80&w=800',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800'
    ]
  },
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
    fullDetails: 'আমিনপুর উচ্চ বিদ্যালয় অত্র অঞ্চলের একটি অন্যতম সেরা বিদ্যাপীঠ। প্রতি বছর এখান থেকে অসংখ্য শিক্ষার্থী কৃতিত্বের সাথে উত্তীর্ণ হয়।',
    gallery: [
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800',
      'https://images.unsplash.com/photo-1523050335456-adaba834597d?q=80&w=800',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800'
    ],
    staff: [
      {
        id: 'st-1',
        name: 'মোঃ আব্দুল লতিফ',
        designation: 'প্রধান শিক্ষক',
        image: 'https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=400',
        phone: '০১৭০০-১২২২৩৩',
        bio: 'গত ২০ বছর ধরে শিক্ষার প্রসারে কাজ করছেন।'
      },
      {
        id: 'st-2',
        name: 'মোছাঃ ফাতেমা খাতুন',
        designation: 'সহকারী প্রধান শিক্ষক',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
        bio: 'গণিত বিভাগের সিনিয়র শিক্ষক।'
      }
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
    fullDetails: '২৪ ঘণ্টা জরুরী বিভাগ, প্যাথলজি ও অপারেশন থিয়েটার সুবিধা সম্পন্ন একটি আধুনিক হাসপাতাল।',
    gallery: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800'
    ],
    staff: [
      {
        id: 'st-h1',
        name: 'ডাঃ মোস্তাফিজুর রহমান',
        designation: 'মেডিসিন বিশেষজ্ঞ',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400',
        phone: '০১৭০০-৪৫৪৫৫৫',
        bio: 'মেডিসিন বিভাগে ১০ বছরের অভিজ্ঞতা।'
      }
    ]
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
    content: 'আমিনপুর থানায় নতুন ভারপ্রাপ্ত কর্মকর্তা (ওসি) হিসেবে দায়িত্ব গ্রহণ করেছেন। তিনি এলাকার শান্তি-শৃঙ্খলা বজায় রাখতে সকলের সহযোগিতা কামনা করেছেন।'
  },
  {
    id: 'art-2',
    title: 'জাতপুর বাজারে অগ্নিকাণ্ড, ব্যাপক ক্ষয়ক্ষতি',
    image: 'https://images.unsplash.com/photo-1542353436-312f0ee5930b?q=80&w=800',
    date: '১২ মে ২০২৪',
    excerpt: 'জাতপুর বাজারে ভয়াবহ অগ্নিকাণ্ডে অন্তত ৫টি দোকান ভস্মীভূত হয়েছে...',
    author: 'স্টাফ রিপোর্টার',
    content: 'গতরাত ২টায় জাতপুর বাজারে ভয়াবহ অগ্নিকাণ্ডের ঘটনা ঘটেছে। ফায়ার সার্ভিসের ২ টি ইউনিট ৩ ঘণ্টার চেষ্টায় আগুন নিয়ন্ত্রণে আনে।'
  },
  {
    id: 'art-3',
    title: 'আমিনপুর স্কুলে বার্ষিক ক্রীড়া প্রতিযোগিতা সম্পন্ন',
    image: 'https://images.unsplash.com/photo-1502639532281-80f18390ca7b?q=80&w=800',
    date: '১৪ মে ২০২৪',
    excerpt: 'আমিনপুর উচ্চ বিদ্যালয়ে আনন্দঘন পরিবেশে বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হয়েছে...',
    author: 'মীর রাব্বি হোসেন',
    content: 'আমিনপুর উচ্চ বিদ্যালয়ের খেলার মাঠে বার্ষিক ক্রীড়া প্রতিযোগিতা ও পুরস্কার বিতরণী অনুষ্ঠান সম্পন্ন হয়েছে।'
  }
];
