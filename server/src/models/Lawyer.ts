import mongoose, { Schema, Document } from "mongoose";

export interface ILawyer extends Document {
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

const LawyerSchema = new Schema<ILawyer>({
  name_en: String,
  name_ar: String,
  title_en: String,
  title_ar: String,
  bio_en: String,
  bio_ar: String,
  specialties_en: [String],
  specialties_ar: [String],
  education_en: [String],
  education_ar: [String],
  experience_years: Number,
  email: String,
  phone: String,
  image_url: String
});

export default mongoose.model<ILawyer>("Lawyer", LawyerSchema);
