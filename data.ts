
import { CategoryId, Category, InformationItem, Article } from './types';

export const CATEGORIES: Category[] = [
  { 
    id: CategoryId.EDUCATION, 
    title: 'শিক্ষা প্রতিষ্ঠান', 
    icon: 'graduation-cap', 
    color: 'bg-emerald-500',
    subCategories: [
      { id: 'college', title: 'কলেজ' },
      { id: 'high-school', title: 'হাইস্কুল' },
      { id: 'primary', title: 'প্রাইমারি স্কুল' },
      { id: 'madrasa', title: 'মাদ্রাসা' },
      { id: 'kindergarten', title: 'কিন্ডারগার্টেন' },
    ]
  },
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
    id: 'edu-1',
    categoryId: CategoryId.EDUCATION,
    subCategoryId: 'college',
    name: 'জাতপুর কলেজ',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800',
    description: 'অত্র অঞ্চলের অন্যতম প্রধান উচ্চ শিক্ষা প্রতিষ্ঠান। এটি শিক্ষার মান উন্নয়নে অগ্রণী ভূমিকা পালন করছে।',
    location: 'জাতপুর, আমিনপুর, পাবনা।',
    phone: '০১৭০০-০০০০০১',
    establishmentYear: '১৯৬৭',
    infoSections: [],
    staff: [
      {
        id: 'teacher-1',
        name: 'ড. মো. আসাদুল হক',
        designation: 'অধ্যক্ষ',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
        educationalQualification: 'পিএইচডি (বাংলা), ঢাকা বিশ্ববিদ্যালয়',
        experience: '২৫ বছরের শিক্ষকতা ও প্রশাসনিক অভিজ্ঞতা',
        phone: '০১৭০০-১১২২৩৩',
        address: 'আমিনপুর বাজার, পাবনা',
        facebook: 'https://facebook.com',
        bio: 'শিক্ষার প্রসারে নিবেদিতপ্রাণ একজন ব্যক্তিত্ব।'
      }
    ]
  },
  {
    id: 'hosp-1',
    categoryId: CategoryId.HOSPITAL,
    name: 'আমিনপুর আধুনিক হাসপাতাল',
    image: 'https://images.unsplash.com/photo-1587350859728-1176946e8b0d?q=80&w=800',
    description: 'আধুনিক চিকিৎসা সেবা সম্বলিত একটি নির্ভরযোগ্য বেসরকারি হাসপাতাল।',
    location: 'আমিনপুর চৌরাস্তা, পাবনা।',
    phone: '০১৭০০-৯৯৮৮৭৭',
    establishmentYear: '২০০৫',
    infoSections: [],
    staff: [
      {
        id: 'doc-1',
        name: 'ডা. সিফাতুল্লাহ মাহমুদ',
        designation: 'এমবিবিএস, এফসিপিএস (মেডিসিন)',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400',
        educationalQualification: 'এমবিবিএস (রাজশাহী মেডিকেল), এফসিপিএস',
        experience: '১২ বছরের চিকিৎসা সেবা প্রদানের অভিজ্ঞতা',
        phone: '০১৭০০-৮৮৭৭৬৬',
        address: 'পাবনা সদর, পাবনা'
      }
    ]
  },
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
