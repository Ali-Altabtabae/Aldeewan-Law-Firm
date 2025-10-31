export interface Lawyer {
  _id?: string;
  name_en: string;
  name_ar: string;
  title_en: string;
  title_ar: string;
  bio_en: string;
  bio_ar: string;
  specialties_en: string[];
  specialties_ar: string[];
  education_en: string[];
  education_ar: string[];
  experience_years: number;
  email: string;
  phone: string;
  image_url: string;
}
