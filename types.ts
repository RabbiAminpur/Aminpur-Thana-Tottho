
export enum CategoryId {
  EDUCATION = 'education',
  HOSPITAL = 'hospital',
  DOCTORS = 'doctors',
  CITIZEN_SERVICE = 'citizen_service',
  UNION = 'union',
  COURIER = 'courier',
  TRANSPORT = 'transport',
  SIGHTSEEING = 'sightseeing',
  MEDIA = 'media',
  GOVT = 'govt',
  NEWS = 'news',
  OTHERS = 'others'
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

export interface InformationItem {
  id: string;
  categoryId: CategoryId;
  name: string;
  image: string;
  description: string;
  location: string;
  phone: string;
  infoSections: InfoSection[];
  staff: StaffProfile[];
}

export interface Article {
  id: string;
  title: string;
  images: string[];
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
