
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

export interface TableRow {
  label: string;
  value: string;
}

export interface DynamicTable {
  id: string;
  title: string;
  rows: TableRow[];
}

export interface InformationItem {
  id: string;
  categoryId: CategoryId;
  name: string;
  image: string;
  gallery: string[];
  description: string;
  location: string;
  phone: string;
  estYear?: string;
  eiin?: string;
  staff: StaffProfile[];
  chairman?: string;
  fullDetails?: string;
  tables: DynamicTable[];
}

export interface Article {
  id: string;
  title: string;
  image: string;
  date: string;
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
