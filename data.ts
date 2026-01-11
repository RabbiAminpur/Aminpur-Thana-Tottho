
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
    id: 'union-1',
    categoryId: CategoryId.UNION,
    subCategoryId: 'jatpur',
    name: 'জাতপুর ইউনিয়ন পরিষদ কার্যালয়',
    image: 'https://images.unsplash.com/photo-1590060153074-303de9911bd7?q=80&w=800',
    description: 'আমিনপুর থানার ১নং ইউনিয়ন পরিষদ। এটি একটি অত্যন্ত গুরুত্বপূর্ণ প্রশাসনিক এলাকা। যমুনা নদীর কোল ঘেঁষে গড়ে ওঠা এই ইউনিয়নের অধিকাংশ মানুষ কৃষি এবং ব্যবসার সাথে জড়িত।',
    location: 'জাতপুর বাজার, আমিনপুর, পাবনা।',
    phone: '০১৭০০-১১১২২২',
    establishmentYear: '১৯৬৩',
    infoSections: [
      {
        id: 'sec1',
        title: 'প্রশাসনিক তথ্য',
        fields: [
          { label: 'সচিব', value: 'মোঃ রফিকুল ইসলাম' },
          { label: 'গ্রাম সংখ্যা', value: '১৪টি' }
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
  {
    "id": "union-1",
    "categoryId": "union",
    "name": "জাতসাখিনী ইউনিয়ন পরিষদ",
    "image": "https://i.ibb.co/B50z5vPH/unnamed.webp",
    "description": "আমিনপুর থানার ১নং ইউনিয়ন পরিষদ। এটি একটি ঐতিহ্যবাহী প্রশাসনিক এলাকা।",
    "location": "জাতপুর বাজার, আমিনপুর, পাবনা।",
    "phone": "০১৭০০-১১১২২২",
    "chairman": "মোঃ নজরুল ইসলাম",
    "fullDetails": "জাতপুর ইউনিয়ন আমিনপুর থানার একটি অত্যন্ত গুরুত্বপূর্ণ ইউনিয়ন। যমুনা নদীর কোল ঘেঁষে গড়ে ওঠা এই ইউনিয়নের অধিকাংশ মানুষ কৃষি এবং ব্যবসার সাথে জড়িত।",
    "gallery": [
      "https://images.unsplash.com/photo-1590060153074-303de9911bd7?q=80&w=800",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800"
    ]
  }
  {
    "id": "1768143287323",
    "categoryId": "education",
    "name": "আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয়",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/25/%E0%A6%86%E0%A6%AE%E0%A6%BF%E0%A6%A8%E0%A6%AA%E0%A7%81%E0%A6%B0_%E0%A6%86%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A8_%E0%A6%89%E0%A6%A6%E0%A7%8D%E0%A6%A6%E0%A6%BF%E0%A6%A8_%E0%A6%89%E0%A6%9A%E0%A7%8D%E0%A6%9A_%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A6%AF%E0%A6%BC_-_%E0%A6%AE%E0%A7%80%E0%A6%B0_%E0%A6%B0%E0%A6%BE%E0%A6%AC%E0%A7%8D%E0%A6%AC%E0%A6%BF_%E0%A6%B9%E0%A7%8B%E0%A6%B8%E0%A7%87%E0%A6%A8.jpg",
    "description": "",
    "location": "আমিনপুর বাজারের পশ্চিম পাশে",
    "phone": "+৮৮০১৭৪৫৫৫৫৫৫৫",
    "infoSections": [],
    "staff": [
      {
        "id": "1768143393177",
        "name": "তারেক রহমান",
        "designation": "প্রধান শিক্ষক",
        "image": "https://www.aljazeera.com/wp-content/uploads/2024/01/349B2U6-highres-1704353492.jpg",
        "joiningDate": "১২-১২-২০২৫",
        "educationalQualification": "পিএইচডি",
        "phone": "+৮৮০১৭৫৫৬৬৭৭৮৮৮৮",
        "facebook": "facebook.com/rabbi.aminpur"
      }
    ],
    "establishmentYear": "১৯৬৭",
    "subCategoryId": "high-school"
  }
export const ARTICLES: Article[] = [];
export const INFO_ITEMS: InformationItem[] = [
  {
    "id": "union-1",
    "categoryId": "union",
    "name": "জাতসাখিনী ইউনিয়ন পরিষদ",
    "image": "https://i.ibb.co/B50z5vPH/unnamed.webp",
    "description": "আমিনপুর থানার ১নং ইউনিয়ন পরিষদ। এটি একটি ঐতিহ্যবাহী প্রশাসনিক এলাকা।",
    "location": "জাতপুর বাজার, আমিনপুর, পাবনা।",
    "phone": "০১৭০০-১১১২২২",
    "chairman": "মোঃ নজরুল ইসলাম",
    "fullDetails": "জাতপুর ইউনিয়ন আমিনপুর থানার একটি অত্যন্ত গুরুত্বপূর্ণ ইউনিয়ন। যমুনা নদীর কোল ঘেঁষে গড়ে ওঠা এই ইউনিয়নের অধিকাংশ মানুষ কৃষি এবং ব্যবসার সাথে জড়িত।",
    "gallery": [
      "https://images.unsplash.com/photo-1590060153074-303de9911bd7?q=80&w=800",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800"
    ]
  },
  {
    "id": "edu-1",
    "categoryId": "education",
    "name": "আমিনপুর উচ্চ বিদ্যালয়",
    "image": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
    "description": "আমিনপুর থানার একটি ঐতিহ্যবাহী শিক্ষা প্রতিষ্ঠান।",
    "location": "আমিনপুর বাজার সংলগ্ন, পাবনা।",
    "phone": "০১৭০০-০০০০০০",
    "estYear": "১৯৬৫",
    "eiin": "১১০০০০",
    "fullDetails": "আমিনপুর উচ্চ বিদ্যালয় অত্র অঞ্চলের একটি অন্যতম সেরা বিদ্যাপীঠ। প্রতি বছর এখান থেকে অসংখ্য শিক্ষার্থী কৃতিত্বের সাথে উত্তীর্ণ হয়।",
    "gallery": [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800",
      "https://images.unsplash.com/photo-1523050335456-adaba834597d?q=80&w=800",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800"
    ],
    "staff": [
      {
        "id": "st-1",
        "name": "মোঃ আব্দুল লতিফ",
        "designation": "প্রধান শিক্ষক",
        "image": "https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=400",
        "phone": "০১৭০০-১২২২৩৩",
        "bio": "গত ২০ বছর ধরে শিক্ষার প্রসারে কাজ করছেন।"
      },
      {
        "id": "st-2",
        "name": "মোছাঃ ফাতেমা খাতুন",
        "designation": "সহকারী প্রধান শিক্ষক",
        "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
        "bio": "গণিত বিভাগের সিনিয়র শিক্ষক।"
      }
    ]
  },
  {
    "id": "hosp-1",
    "categoryId": "hospital",
    "name": "আমিনপুর জেনারেল হাসপাতাল",
    "image": "https://images.unsplash.com/photo-1586773860418-d3b97976c647?q=80&w=800&auto=format&fit=crop",
    "description": "আধুনিক চিকিৎসা সেবা সম্বলিত বেসরকারী হাসপাতাল।",
    "location": "থানা মোড়, আমিনপুর।",
    "phone": "০১৭০০-১১১২২২",
    "fullDetails": "২৪ ঘণ্টা জরুরী বিভাগ, প্যাথলজি ও অপারেশন থিয়েটার সুবিধা সম্পন্ন একটি আধুনিক হাসপাতাল।",
    "gallery": [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800"
    ],
    "staff": [
      {
        "id": "st-h1",
        "name": "ডাঃ মোস্তাফিজুর রহমান",
        "designation": "মেডিসিন বিশেষজ্ঞ",
        "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400",
        "phone": "০১৭০০-৪৫৪৫৫৫",
        "bio": "মেডিসিন বিভাগে ১০ বছরের অভিজ্ঞতা।"
      }
    ]
  },
  {
    "id": "u50nw0xia",
    "categoryId": "news",
    "name": "পাবনায় ৮ বছরের শিশু ধর্ষণের অভিযোগে বৃদ্ধ গ্রেফতার",
    "image": "https://cdn.banglatribune.net/contents/cache/images/640x359x1/uploads/media/2025/11/18/8def2adc25e241571815f573d488d027-691bf00006575.jpg",
    "description": "পাবনার আমিনপুর থানার বুলন্দর চর এলাকায় ৮ বছরের এক শিশুকে ধর্ষণের অভিযোগে করা মামলায় ৭৫ বছর বয়সী তাকাই প্রামানিক নামে এক বৃদ্ধকে গ্রেফতার করেছে। ঘটনায় শিশুটির বাবা আমিনপুর থানায় মামলাটি করেন। ধর্ষণের শিকার শিশুটি বর্তমানে পাবনা জেনারেল হাসপাতালে চিকিৎসাধীন। গ্রেফতার বৃদ্ধ একই গ্রামের মৃত ছবেদ প্রামানিকের ছেলে।\n\nলিখিত এজাহার থেকে জানা গেছে, শনিবার (১৫ নভেম্বর) বিকালে শিশুটি চাচার বাড়ির সামনে অন্য শিশুদের সঙ্গে খেলাধুলা করছিল। এ সময় বৃদ্ধ তাকাই প্রামানিক তাকে খাবারের লোভ দেখিয়ে পাশের একটি ফাঁকা ঘরে নিয়ে যায়। সেখানে শিশুটিকে ধর্ষণ করে। পরে টাকা দেওয়ার প্রলোভন ও হত্যার হুমকি দিয়ে শিশুটিকে কাউকে কিছু বলতে নিষেধ করে। সন্ধ্যায় শিশুটির রক্তপাত শুরু হয়ে অসুস্থ হলে পরিবার বিষয়টি বুঝতে পারে।",
    "location": "",
    "phone": "",
    "gallery": [],
    "staff": []
  }
];
