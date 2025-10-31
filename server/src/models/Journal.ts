import mongoose, { Schema, Document } from "mongoose";

export interface IJournal extends Document {
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

const JournalSchema = new Schema<IJournal>({
  title_en: String,
  title_ar: String,
  content_en: String,
  content_ar: String,
  excerpt_en: String,
  excerpt_ar: String,
  author_id: String,
  author_name_en: String,
  author_name_ar: String,
  published_date: String,
  image_url: String
});

export default mongoose.model<IJournal>("Journal", JournalSchema);
