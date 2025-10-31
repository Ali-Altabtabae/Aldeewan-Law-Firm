import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLawyerById, addLawyer, updateLawyer } from "@/api/lawyerApi";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Lawyer } from "@/types/Lawyer";

type LawyerFormProps = {
  mode: "add" | "edit";
};

const LawyerForm = ({ mode }: LawyerFormProps) => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Lawyer>>({});

  // ✅ Fetch existing lawyer if editing
  useEffect(() => {
    if (mode === "edit" && id) {
      setLoading(true);
      getLawyerById(id)
        .then((data) => setFormData(data))
        .catch(() =>
          toast({
            title: language === "en" ? "Error" : "خطأ",
            description:
              language === "en"
                ? "Failed to load lawyer details"
                : "فشل في تحميل بيانات المحامي",
            variant: "destructive",
          })
        )
        .finally(() => setLoading(false));
    }
  }, [id, mode, language]);

  // ✅ Handle text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle array inputs (comma-separated lists)
  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Lawyer
  ) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("adminToken") || "";

    try {
      if (mode === "add") {
        await addLawyer(formData, token);
      } else if (mode === "edit" && id) {
        await updateLawyer(id, formData, token);
      }

      toast({
        title: language === "en" ? "Success" : "تم الحفظ بنجاح",
        description:
          language === "en"
            ? mode === "add"
              ? "Lawyer added successfully"
              : "Lawyer updated successfully"
            : mode === "add"
            ? "تمت إضافة المحامي بنجاح"
            : "تم تعديل بيانات المحامي بنجاح",
      });

      navigate("/admin/lawyers");
    } catch {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description:
          language === "en"
            ? "Failed to save lawyer"
            : "فشل في حفظ بيانات المحامي",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && mode === "edit") {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        {language === "en" ? "Loading lawyer data..." : "جارٍ تحميل البيانات..."}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground py-16 px-6 sm:px-10">
        <Card className="max-w-4xl mx-auto shadow-elegant border-2 border-border/50">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-primary text-3xl font-serif">
              {language === "en"
                ? mode === "add"
                  ? "Add New Lawyer"
                  : "Edit Lawyer"
                : mode === "add"
                ? "إضافة محامٍ جديد"
                : "تعديل بيانات المحامي"}
            </CardTitle>
            <Button variant="outline" onClick={() => navigate("/admin/lawyers")}>
              {language === "en" ? "Back" : "رجوع"}
            </Button>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name_en">
                    {language === "en" ? "Name (English)" : "الاسم بالإنجليزية"}
                  </Label>
                  <Input
                    id="name_en"
                    name="name_en"
                    value={formData.name_en || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div dir="rtl">
                  <Label htmlFor="name_ar">
                    {language === "en" ? "Name (Arabic)" : "الاسم بالعربية"}
                  </Label>
                  <Input
                    id="name_ar"
                    name="name_ar"
                    value={formData.name_ar || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="title_en">
                    {language === "en"
                      ? "Title (English)"
                      : "المسمى الوظيفي بالإنجليزية"}
                  </Label>
                  <Input
                    id="title_en"
                    name="title_en"
                    value={formData.title_en || ""}
                    onChange={handleChange}
                  />
                </div>

                <div dir="rtl">
                  <Label htmlFor="title_ar">
                    {language === "en"
                      ? "Title (Arabic)"
                      : "المسمى الوظيفي بالعربية"}
                  </Label>
                  <Input
                    id="title_ar"
                    name="title_ar"
                    value={formData.title_ar || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio_en">
                  {language === "en" ? "Bio (English)" : "نبذة بالإنجليزية"}
                </Label>
                <Textarea
                  id="bio_en"
                  name="bio_en"
                  value={formData.bio_en || ""}
                  onChange={handleChange}
                  className="min-h-[100px]"
                />
              </div>
              <div dir="rtl">
                <Label htmlFor="bio_ar">
                  {language === "en" ? "Bio (Arabic)" : "نبذة بالعربية"}
                </Label>
                <Textarea
                  id="bio_ar"
                  name="bio_ar"
                  value={formData.bio_ar || ""}
                  onChange={handleChange}
                  className="min-h-[100px]"
                />
              </div>

              {/* Specialties */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="specialties_en">
                    {language === "en"
                      ? "Specialties (English, comma-separated)"
                      : "التخصصات بالإنجليزية (افصل بينها بفاصلة)"}
                  </Label>
                  <Input
                    id="specialties_en"
                    value={(formData.specialties_en || []).join(", ")}
                    onChange={(e) => handleArrayChange(e, "specialties_en")}
                  />
                </div>

                <div dir="rtl">
                  <Label htmlFor="specialties_ar">
                    {language === "en"
                      ? "Specialties (Arabic, comma-separated)"
                      : "التخصصات بالعربية (افصل بينها بفاصلة)"}
                  </Label>
                  <Input
                    id="specialties_ar"
                    value={(formData.specialties_ar || []).join(", ")}
                    onChange={(e) => handleArrayChange(e, "specialties_ar")}
                  />
                </div>
              </div>

              {/* Education */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="education_en">
                    {language === "en"
                      ? "Education (English, comma-separated)"
                      : "التعليم بالإنجليزية (افصل بينها بفاصلة)"}
                  </Label>
                  <Input
                    id="education_en"
                    value={(formData.education_en || []).join(", ")}
                    onChange={(e) => handleArrayChange(e, "education_en")}
                  />
                </div>

                <div dir="rtl">
                  <Label htmlFor="education_ar">
                    {language === "en"
                      ? "Education (Arabic, comma-separated)"
                      : "التعليم بالعربية (افصل بينها بفاصلة)"}
                  </Label>
                  <Input
                    id="education_ar"
                    value={(formData.education_ar || []).join(", ")}
                    onChange={(e) => handleArrayChange(e, "education_ar")}
                  />
                </div>
              </div>

              {/* Experience + Contact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="experience_years">
                    {language === "en"
                      ? "Years of Experience"
                      : "سنوات الخبرة"}
                  </Label>
                  <Input
                    type="number"
                    id="experience_years"
                    name="experience_years"
                    value={formData.experience_years || 0}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">
                    {language === "en" ? "Email" : "البريد الإلكتروني"}
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">
                    {language === "en" ? "Phone" : "رقم الهاتف"}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <Label htmlFor="image_url">
                  {language === "en" ? "Image URL" : "رابط الصورة"}
                </Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={formData.image_url || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading}
              >
                {loading
                  ? language === "en"
                    ? "Saving..."
                    : "جارٍ الحفظ..."
                  : language === "en"
                  ? mode === "add"
                    ? "Add Lawyer"
                    : "Save Changes"
                  : mode === "add"
                  ? "إضافة المحامي"
                  : "حفظ التغييرات"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default LawyerForm;
