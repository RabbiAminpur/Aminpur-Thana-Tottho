
import { CategoryId, Category, InformationItem } from './types';

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
];

export const INFO_ITEMS: InformationItem[] = [
  {
    id: 'edu-1',
    categoryId: CategoryId.EDUCATION,
    name: 'আমিনপুর উচ্চ বিদ্যালয়',
    image: 'https://picsum.photos/seed/school1/800/400',
    description: 'আমিনপুর থানার একটি ঐতিহ্যবাহী শিক্ষা প্রতিষ্ঠান।',
    location: 'আমিনপুর বাজার সংলগ্ন, পাবনা।',
    phone: '০১৭০০-০০০০০০',
    estYear: '১৯৬৫',
    eiin: '১১০০০০',
    fullDetails: 'আমিনপুর উচ্চ বিদ্যালয় অত্র অঞ্চলের একটি অন্যতম সেরা বিদ্যাপীঠ। প্রতি বছর এখান থেকে অসংখ্য শিক্ষার্থী কৃতিত্বের সাথে উত্তীর্ণ হয়।',
    teachers: [
      { name: 'মোঃ আব্দুল লতিফ', designation: 'প্রধান শিক্ষক', image: 'https://picsum.photos/seed/teacher1/100/100' },
      { name: 'মোছাঃ ফাতেমা খাতুন', designation: 'সহকারী শিক্ষক', image: 'https://picsum.photos/seed/teacher2/100/100' }
    ]
  },
  {
    id: 'hosp-1',
    categoryId: CategoryId.HOSPITAL,
    name: 'আমিনপুর জেনারেল হাসপাতাল',
    image: 'https://picsum.photos/seed/hosp1/800/400',
    description: 'আধুনিক চিকিৎসা সেবা সম্বলিত বেসরকারী হাসপাতাল।',
    location: 'থানা মোড়, আমিনপুর।',
    phone: '০১৭০০-১১১২২২',
    fullDetails: '২৪ ঘণ্টা জরুরী বিভাগ, প্যাথলজি ও অপারেশন থিয়েটার সুবিধা সম্পন্ন একটি আধুনিক হাসপাতাল।',
    doctors: [
      { name: 'ডাঃ মোস্তাফিজুর রহমান', specialty: 'মেডিসিন বিশেষজ্ঞ', image: 'https://picsum.photos/seed/dr1/100/100', phone: '০১৭০০-১২৩৪৫৬' },
      { name: 'ডাঃ তানিয়া আহমেদ', specialty: 'গাইনী বিশেষজ্ঞ', image: 'https://picsum.photos/seed/dr2/100/100', phone: '০১৭০০-৬৫৪৩২১' }
    ]
  },
  {
    id: 'pol-1',
    categoryId: CategoryId.POLICE,
    name: 'আমিনপুর থানা ভবন',
    image: 'https://picsum.photos/seed/police/800/400',
    description: 'জনগণের জান-মালের নিরাপত্তায় নিয়োজিত।',
    location: 'আমিনপুর, পাবনা।',
    phone: '০১৩২০-১২৩৪৫৬',
    fullDetails: 'আমিনপুর থানা পাবনা জেলার একটি গুরুত্বপূর্ণ থানা। আইন শৃঙ্খলা পরিস্থিতি নিয়ন্ত্রণে এই থানার ভূমিকা অপরিসীম।'
  },
  {
      id: 'sight-1',
      categoryId: CategoryId.SIGHTSEEING,
      name: 'যমুনা নদী পাড়',
      image: 'https://picsum.photos/seed/river/800/400',
      description: 'প্রাকৃতিক সৌন্দর্যে ঘেরা মনোরম স্থান।',
      location: 'মাঝিগ্রাম ঘাট, আমিনপুর।',
      phone: 'প্রযোজ্য নয়',
      fullDetails: 'যমুনা নদীর পাড়ে অবস্থিত এই স্থানটি বিকেলে সময় কাটানোর জন্য অত্যন্ত চমৎকার। শীতকালে এখানে পিকনিকের ভালো ব্যবস্থা রয়েছে।'
  }
];
