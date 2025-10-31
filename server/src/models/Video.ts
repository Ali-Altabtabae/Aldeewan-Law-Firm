import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
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

const VideoSchema = new Schema<IVideo>({
  title_en: String,
  title_ar: String,
  description_en: String,
  description_ar: String,
  youtube_url: String,
  thumbnail_url: String,
  lawyer_id: String,
  lawyer_name_en: String,
  lawyer_name_ar: String,
  published_date: String
});

export default mongoose.model<IVideo>("Video", VideoSchema);
