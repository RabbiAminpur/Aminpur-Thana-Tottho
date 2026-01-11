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
  { 
    id: CategoryId.CITIZEN_SERVICE, 
    title: 'নাগরিক সেবা', 
    icon: 'user-check', 
    color: 'bg-purple-600',
    subCategories: [
      { id: 'birth-reg', title: 'জন্ম নিবন্ধন' },
      { id: 'death-reg', title: 'মৃত্যু নিবন্ধন' },
      { id: 'trade-license', title: 'ট্রেড লাইসেন্স' },
      { id: 'character-cert', title: 'চারিত্রিক সনদ' },
      { id: 'inheritance-cert', title: 'ওয়ারিশ সনদ' },
      { id: 'e-porcha', title: 'ই-পর্চা' },
      { id: 'e-khatian', title: 'ই-খতিয়ান' },
    ]
  },
  { 
    id: CategoryId.UNION, 
    title: 'ইউনিয়ন পরিষদ', 
    icon: 'building', 
    color: 'bg-blue-600',
    subCategories: [
      { id: 'jatpur', title: 'জাতপুর ইউনিয়ন' },
      { id: 'ruppur', title: 'রূপপুর ইউনিয়ন' },
      { id: 'masumdia', title: 'মাশুমদিিয়া ইউনিয়ন' },
      { id: 'puran-bharenga', title: 'পুরাণ ভারেঙ্গা ইউনিয়ন' },
      { id: 'khas-aminpur', title: 'খাস আমিনপুর ইউনিয়ন' },
      { id: 'sagarkandi', title: 'সাগরকান্দি ইউনিয়ন' },
      { id: 'raninagar', title: 'রানীনগর ইউনিয়ন' },
      { id: 'ahmadpur', title: 'আহম্মদপুর ইউনিয়ন' },
    ]
  },
  { id: CategoryId.COURIER, title: 'কুরিয়ার সার্ভিস', icon: 'package', color: 'bg-orange-500' },
  { 
    id: CategoryId.TRANSPORT, 
    title: 'পরিবহন সেবা', 
    icon: 'bus', 
    color: 'bg-amber-500',
    subCategories: [
      { id: 'bus', title: 'বাস' },
      { id: 'train', title: 'ট্রেন' },
      { id: 'ferry', title: 'ফেরি' },
      { id: 'launch', title: 'লঞ্চ' },
      { id: 'speedboat', title: 'স্পিডবোট' },
    ]
  },
  { id: CategoryId.SIGHTSEEING, title: 'দর্শনীয় স্থান', icon: 'camera', color: 'bg-pink-500' },
  { id: CategoryId.MEDIA, title: 'গণমাধ্যম ও সাংবাদিক', icon: 'mic', color: 'bg-red-600' },
  { id: CategoryId.GOVT, title: 'সরকারী অফিস', icon: 'govt-building', color: 'bg-indigo-600' },
  { id: CategoryId.NEWS, title: 'খবরাখবর', icon: 'news', color: 'bg-rose-600' },
  { id: CategoryId.OTHERS, title: 'অন্যান্য', icon: 'plus-circle', color: 'bg-slate-500' },
];

export const INFO_ITEMS: InformationItem[] = [
  {
    id: "1768143287323",
    categoryId: CategoryId.EDUCATION,
    subCategoryId: "high-school",
    name: "আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয়",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/25/%E0%A6%86%E0%A6%AE%E0%A6%BF%E0%A6%A8%E0%A6%AA%E0%A7%81%E0%A6%B0_%E0%A6%86%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A8_%E0%A6%89%E0%A6%A6%E0%A7%8D%E0%A6%A6%E0%A6%BF%E0%A6%A8_%E0%A6%89%E0%A6%9A%E0%A7%8D%E0%A6%9A_%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A6%AF%E0%A6%BC_-_%E0%A6%AE%E0%A7%80%E0%A6%B0_%E0%A6%B0%E0%A6%BE%E0%A6%AC%E0%A7%8D%E0%A6%AC%E0%A6%BF_%E0%A6%B9%E0%A7%8B%E0%A6%B8%E0%A7%87%E0%A6%A8.jpg",
    description: "আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয় অত্র অঞ্চলের একটি স্বনামধন্য উচ্চ বিদ্যালয়। এটি ১৯৬৭ সালে প্রতিষ্ঠিত হয় এবং গুণগত শিক্ষা প্রসারে অগ্রণী ভূমিকা পালন করছে।",
    location: "আমিনপুর বাজারের পশ্চিম পাশে",
    phone: "+৮৮০১৭৪৫৫৫৫৫৫৫",
    infoSections: [],
    staff: [
      {
        id: "1768143393177",
        name: "তারেক রহমান",
        designation: "প্রধান শিক্ষক",
        image: "https://www.aljazeera.com/wp-content/uploads/2024/01/349B2U6-highres-1704353492.jpg",
        joiningDate: "১২-১২-২০২৫",
        educationalQualification: "পিএইচডি",
        phone: "+৮৮০১৭৫৫৬৬৭৭৮৮৮৮",
        facebook: "https://facebook.com/rabbi.aminpur"
      }
    ],
    establishmentYear: "১৯৬৭"
  },
  // --- COLLEGES ---
  {
    id: 'edu-col-1',
    categoryId: CategoryId.EDUCATION,
    subCategoryId: 'college',
    name: 'জাতপুর কলেজ',
    image: 'https://images.unsplash.com/photo-1523050853051-f7539076b01b?q=80&w=800',
    description: 'জাতপুর কলেজ আমিনপুর থানার একটি ঐতিহ্যবাহী শিক্ষা প্রতিষ্ঠান। এটি অত্র অঞ্চলের উচ্চশিক্ষা প্রসারে গুরুত্বপূর্ণ ভূমিকা পালন করে আসছে। এখানে মানবিক, বিজ্ঞান ও ব্যবসায় শিক্ষা শাখায় পাঠদান করা হয়।',
    location: 'জাতপুর বাজার, আমিনপুর, পাবনা।',
    phone: '০১৭২২-০০০০০০',
    establishmentYear: '১৯৬৭',
    infoSections: [],
    staff: [
      {
        id: 'st-col-1',
        name: 'মো. আসাদুল হক',
        designation: 'অধ্যক্ষ',
        image: 'https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=400',
        educationalQualification: 'এম.এ (বাংলা), রাজশাহী বিশ্ববিদ্যালয়',
        experience: '১৮ বছরের শিক্ষকতা ও প্রশাসনিক অভিজ্ঞতা।',
        phone: '০১৭২২-১১২২৩৩',
        address: 'আমিনপুর, পাবনা।',
        joiningDate: '০১/০১/২০১০'
      }
    ]
  },
  {
    id: 'edu-col-2',
    categoryId: CategoryId.EDUCATION,
    subCategoryId: 'college',
    name: 'আমিনপুর ডিগ্রী কলেজ',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800',
    description: 'আমিনপুর ডিগ্রী কলেজ অত্র এলাকার অন্যতম আধুনিক ও মানসম্মত শিক্ষা প্রতিষ্ঠান। মনোরম পরিবেশে দক্ষ শিক্ষক মণ্ডলীর তত্ত্বাবধানে এখানে পাঠদান করা হয়।',
    location: 'আমিনপুর বাজার, পাবনা।',
    phone: '০১৭৩৩-০০০০০০',
    establishmentYear: '১৯৯৪',
    infoSections: [],
    staff: [
      {
        id: 'st-col-2',
        name: 'ড. মো. মতিউর রহমান',
        designation: 'ভারপ্রাপ্ত অধ্যক্ষ',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
        educationalQualification: 'পিএইচডি (অর্থনীতি), ঢাকা বিশ্ববিদ্যালয়',
        experience: '১৫ বছরের শিক্ষকতা জীবন।',
        phone: '০১৭৩৩-৪৪৫৫৬৬',
        address: 'বেড়া, পাবনা।',
        joiningDate: '১০/০৫/২০১২'
      }
    ]
  },

  // --- HIGH SCHOOLS ---
  {
    id: 'edu-hs-1',
    categoryId: CategoryId.EDUCATION,
    subCategoryId: 'high-school',
    name: 'জাতপুর উচ্চ বিদ্যালয়',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800',
    description: 'আমিনপুর থানার প্রাচীনতম ও স্বনামধন্য মাধ্যমিক বিদ্যালয়গুলোর মধ্যে জাতপুর উচ্চ বিদ্যালয় অন্যতম। খেলাধুলা এবং সাংস্কৃতিক কর্মকাণ্ডেও এই বিদ্যালয়ের বিশেষ খ্যাতি রয়েছে।',
    location: 'জাতপুর, আমিনপুর, পাবনা।',
    phone: '০১৭৪৪-০০০০০০',
    establishmentYear: '১৯৪৪',
    infoSections: [],
    staff: [
      {
        id: 'st-hs-1',
        name: 'মোঃ আব্দুল মান্নান',
        designation: 'প্রধান শিক্ষক',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400',
        educationalQualification: 'বি.এসসি (গণিত), বি.এড',
        experience: '২২ বছরের শিক্ষকতা জীবন।',
        phone: '০১৭৪৪-১১২২৩৩',
        address: 'আমিনপুর, পাবনা।',
        joiningDate: '১৫/০৩/২০০৫'
      }
    ]
  },
  {
    id: 'edu-hs-2',
    categoryId: CategoryId.EDUCATION,
    subCategoryId: 'high-school',
    name: 'মাশুমদিয়া উচ্চ বিদ্যালয়',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800',
    description: 'যমুনা নদীর তীরে অবস্থিত মাশুমদিয়া উচ্চ বিদ্যালয়টি অত্র অঞ্চলের শিক্ষার আলো ছড়িয়ে দিচ্ছে। জেএসসি ও এসএসসি পরীক্ষায় নিয়মিত ভালো ফলাফলের জন্য এটি সুপরিচিত।',
    location: 'মাশুমদিয়া, আমিনপুর, পাবনা।',
    phone: '০১৭৫৫-০০০০০০',
    establishmentYear: '১৯৫৮',
    infoSections: [],
    staff: [
      {
        id: 'st-hs-2',
        name: 'মোঃ হাফিজুর রহমান',
        designation: 'প্রধান শিক্ষক',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400',
        educationalQualification: 'এম.এ (ইংরেজি), বি.এড',
        experience: '২০ বছরের শিক্ষকতা জীবন।',
        phone: '০১৭৫৫-৭৭৮৮৯৯',
        address: 'মাশুমদিিয়া, পাবনা।',
        joiningDate: '২০/০৯/২০০৮'
      }
    ]
  },

  // --- MADRASAS ---
  {
    id: 'edu-mad-1',
    categoryId: CategoryId.EDUCATION,
    subCategoryId: 'madrasa',
    name: 'জাতপুর সিনিয়র মাদ্রাসা',
    image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=800',
    description: 'ইসলামী শিক্ষা ও আধুনিক শিক্ষার সমন্বয়ে জাতপুর সিনিয়র মাদ্রাসাটি পরিচালিত হয়ে আসছে। এখানে আলিম পর্যায় পর্যন্ত পাঠদান করা হয়।',
    location: 'জাতপুর, আমিনপুর, পাবনা।',
    phone: '০১৭৬৬-০০০০০০',
    establishmentYear: '১৯৫২',
    infoSections: [],
    staff: [
      {
        id: 'st-mad-1',
        name: 'মাওলানা মোঃ ইসমাইল হোসেন',
        designation: 'অধ্যক্ষ',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
        educationalQualification: 'কামিল (হাদিস), ফাজিল (ডিগ্রী)',
        experience: '২৫ বছরের শিক্ষকতা ও ধর্মীয় গবেষণা।',
        phone: '০১৭৬৬-৩৩৪৪৫৫',
        address: 'আমিনপুর বাজার, পাবনা।',
        joiningDate: '০১/০১/১৯৯৮'
      }
    ]
  },

  // --- PRIMARY SCHOOLS ---
  {
    id: 'edu-pri-1',
    categoryId: CategoryId.EDUCATION,
    subCategoryId: 'primary',
    name: 'আমিনপুর সরকারি প্রাথমিক বিদ্যালয়',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800',
    description: 'অত্র অঞ্চলের শিশুদের প্রাথমিক শিক্ষা নিশ্চিত করতে এই বিদ্যালয়টি নিরলসভাবে কাজ করে যাচ্ছে। এটি সরকারের প্রাথমিক শিক্ষা অধিদপ্তরের অধীনে পরিচালিত।',
    location: 'আমিনপুর বাজার সংলগ্ন, পাবনা।',
    phone: '০১৭৭৭-০০০০০০',
    establishmentYear: '১৯৭২',
    infoSections: [],
    staff: [
      {
        id: 'st-pri-1',
        name: 'মিসেস সুলতানা পারভীন',
        designation: 'প্রধান শিক্ষক',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
        educationalQualification: 'বি.এ, সি-ইন-এড',
        experience: '১৫ বছরের শিক্ষকতা জীবন।',
        phone: '০১৭৭৭-৯৯০০১১',
        address: 'পাবনা সদর।',
        joiningDate: '১০/০৬/২০১৫'
      }
    ]
  },

  // --- KINDERGARTENS ---
  {
    id: 'edu-kg-1',
    categoryId: CategoryId.EDUCATION,
    subCategoryId: 'kindergarten',
    name: 'লিটল জুয়েলস কিন্ডারগার্টেন',
    image: 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=800',
    description: 'শিশুদের খেলাধুলা ও আনন্দের মাধ্যমে মানসম্মত আধুনিক শিক্ষা প্রদানের লক্ষ্যে লিটল জুয়েলস কিন্ডারগার্টেন প্রতিষ্ঠিত। এখানে শিশুদের সৃজনশীল বিকাশে বিশেষ জোর দেওয়া হয়।',
    location: 'আমিনপুর চৌরাস্তা, পাবনা।',
    phone: '০১৭৮৮-০০০০০০',
    establishmentYear: '২০১০',
    infoSections: [],
    staff: [
      {
        id: 'st-kg-1',
        name: 'মো. তরিকুল ইসলাম',
        designation: 'পরিচালক',
        image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400',
        educationalQualification: 'এম.বি.এ (মার্কেটিং)',
        experience: '১২ বছরের শিক্ষা ব্যবস্থাপনা অভিজ্ঞতা।',
        phone: '০১৭৮৮-৫৫৬৬৭৭',
        address: 'আমিনপুর, পাবনা।',
        joiningDate: '০১/০১/২০১০'
      }
    ]
  }
];

export const ARTICLES: Article[] = [];