export interface Journal {
  _id?: string; // MongoDB ID
  title_en: string;
  title_ar: string;
  content_en: string;
  content_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  author_id: string;
  author_name_en: string;
  author_name_ar: string;
  published_date: string;
  image_url: string;
}
