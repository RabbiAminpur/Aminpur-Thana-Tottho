
export enum CategoryId {
  EDUCATION = 'education',
  HOSPITAL = 'hospital',
  DOCTORS = 'doctors',
  POLICE = 'police',
  UNION = 'union',
  GOVT = 'govt',
  SIGHTSEEING = 'sightseeing',
  SOCIAL_MEDIA = 'social_media',
  MEDIA = 'media',
  FIRE_SERVICE = 'fire_service',
  MARKET = 'market',
  COURIER = 'courier',
  TRANSPORT = 'transport',
  NEWS = 'news',
  OTHERS = 'others'
}

export interface StaffProfile {
  id: string;
  name: string;
  designation: string;
  image: string;
  phone?: string;
  bio?: string;
}

export interface CustomField {
  label: string;
  value: string;
}

export interface InformationItem {
  id: string;
  categoryId: CategoryId;
  name: string;
  image: string; // Main display image
  description: string;
  location: string;
  phone: string;
  customFields?: CustomField[];
  gallery?: string[];
  staff?: StaffProfile[];
}

export interface Article {
  id: string;
  title: string;
  images: string[]; // Support multiple images
  date: string;
  time?: string;
  excerpt: string;
  content: string;
  author: string;
}

export interface Category {
  id: CategoryId;
  title: string;
  icon: string;
  color: string;
}
