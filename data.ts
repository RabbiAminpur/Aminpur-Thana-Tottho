
import { CategoryId, Category, InformationItem, Article } from './types';

export const CATEGORIES: Category[] = [
  { id: CategoryId.EDUCATION, title: 'শিক্ষা প্রতিষ্ঠান', icon: 'graduation-cap', color: 'bg-emerald-500' },
  { id: CategoryId.HOSPITAL, title: 'হাসপাতাল ও ক্লিনিক', icon: 'hospital', color: 'bg-rose-500' },
  { id: CategoryId.DOCTORS, title: 'ডাক্তারগণ', icon: 'stethoscope', color: 'bg-teal-500' },
  { id: CategoryId.CITIZEN_SERVICE, title: 'নাগরিক সেবা', icon: 'user-check', color: 'bg-purple-600' },
  { id: CategoryId.UNION, title: 'ইউনিয়ন পরিষদ', icon: 'building', color: 'bg-blue-600' },
  { id: CategoryId.COURIER, title: 'কুরিয়ার সার্ভিস', icon: 'package', color: 'bg-orange-500' },
  { id: CategoryId.TRANSPORT, title: 'পরিবহন সেবা', icon: 'bus', color: 'bg-amber-500' },
  { id: CategoryId.SIGHTSEEING, title: 'দর্শনীয় স্থান', icon: 'camera', color: 'bg-pink-500' },
  { id: CategoryId.MEDIA, title: 'গণমাধ্যম ও সাংবাদিক', icon: 'mic', color: 'bg-red-600' },
  { id: CategoryId.GOVT, title: 'সরকারী অফিস', icon: 'govt-building', color: 'bg-indigo-600' },
  { id: CategoryId.NEWS, title: 'খবরাখবর', icon: 'news', color: 'bg-rose-600' },
  { id: CategoryId.OTHERS, title: 'অন্যান্য', icon: 'plus-circle', color: 'bg-slate-500' },
];

export const INFO_ITEMS: InformationItem[] = [
  {
    id: '1',
    categoryId: CategoryId.UNION,
    name: 'জাতপুর ইউনিয়ন পরিষদ',
    image: 'https://images.unsplash.com/photo-1590060153074-303de9911bd7?q=80&w=800',
    description: 'আমিনপুর থানার ১নং ইউনিয়ন পরিষদ। এটি একটি অত্যন্ত গুরুত্বপূর্ণ প্রশাসনিক এলাকা। যমুনা নদীর কোল ঘেঁষে গড়ে ওঠা এই ইউনিয়নের অধিকাংশ মানুষ কৃষি এবং ব্যবসার সাথে জড়িত।',
    location: 'জাতপুর বাজার, আমিনপুর, পাবনা।',
    phone: '০১৭০০-১১১২২২',
    infoSections: [
      {
        id: 'sec1',
        title: 'প্রশাসনিক তথ্য',
        fields: [
          { label: 'চেয়ারম্যান', value: 'মোঃ নজরুল ইসলাম' },
          { label: 'সচিব', value: 'মোঃ রফিকুল ইসলাম' }
        ]
      }
    ],
    staff: [
      {
        id: 'st1',
        name: 'মোঃ নজরুল ইসলাম',
        designation: 'চেয়ারম্যান',
        image: 'https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=400',
        phone: '০১৭০০-১১১২২২',
        facebook: 'https://facebook.com',
        bio: 'জনপ্রতিনিধি হিসেবে গত ১০ বছর ধরে দায়িত্বরত আছেন।'
      }
    ]
  }
];

export const ARTICLES: Article[] = [];
