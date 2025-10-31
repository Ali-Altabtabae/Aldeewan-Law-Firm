export interface Video {
  _id?: string; // MongoDB ID
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  youtube_url: string;
  thumbnail_url: string;
  lawyer_id: string;
  lawyer_name_en: string;
  lawyer_name_ar: string;
  published_date: string;
}
