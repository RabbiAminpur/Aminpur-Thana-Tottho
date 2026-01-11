
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
  email?: string;
  facebook?: string;
  website?: string;
  bio?: string;
}

export interface CustomField {
  label: string;
  value: string;
}

export interface InfoSection {
  id: string;
  title: string;
  fields: CustomField[];
}

export interface InformationItem {
  id: string;
  categoryId: CategoryId;
  name: string;
  image: string;
  description: string;
  location: string;
  phone: string;
  infoSections?: InfoSection[]; // Multiple "Tables" or "Grids" of information
  gallery?: string[];
  staff?: StaffProfile[];
}

export interface Article {
  id: string;
  title: string;
  images: string[];
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
