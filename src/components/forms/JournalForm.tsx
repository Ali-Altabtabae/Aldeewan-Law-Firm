import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJournalById, addJournal, updateJournal } from "@/api/journalApi";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Journal } from "@/types/Journal";

type JournalFormProps = {
  mode: "add" | "edit";
};

const JournalForm = ({ mode }: JournalFormProps) => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Journal>>({});

  // ✅ Fetch existing journal if editing
  useEffect(() => {
    if (mode === "edit" && id) {
      setLoading(true);
      getJournalById(id)
        .then((data) => setFormData(data))
        .catch(() =>
          toast({
            title: language === "en" ? "Error" : "خطأ",
            description:
              language === "en"
                ? "Failed to load journal details"
                : "فشل في تحميل بيانات المقال",
            variant: "destructive",
          })
        )
        .finally(() => setLoading(false));
    }
  }, [id, mode, language]);

  // ✅ Handle inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("adminToken") || "";

    try {
      if (mode === "add") {
        await addJournal(formData, token);
      } else if (mode === "edit" && id) {
        await updateJournal(id, formData, token);
      }

      toast({
        title: language === "en" ? "Success" : "تم الحفظ بنجاح",
        description:
          language === "en"
            ? mode === "add"
              ? "Journal added successfully"
              : "Journal updated successfully"
            : mode === "add"
            ? "تمت إضافة المقال بنجاح"
            : "تم تعديل المقال بنجاح",
      });

      navigate("/admin/journals");
    } catch {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description:
          language === "en"
            ? "Failed to save journal"
            : "فشل في حفظ المقال",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && mode === "edit") {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        {language === "en" ? "Loading journal data..." : "جارٍ تحميل البيانات..."}
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
                  ? "Add New Journal"
                  : "Edit Journal"
                : mode === "add"
                ? "إضافة مقال جديد"
                : "تعديل المقال"}
            </CardTitle>
            <Button variant="outline" onClick={() => navigate("/admin/journals")}>
              {language === "en" ? "Back" : "رجوع"}
            </Button>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title_en">
                    {language === "en" ? "Title (English)" : "العنوان بالإنجليزية"}
                  </Label>
                  <Input
                    id="title_en"
                    name="title_en"
                    value={formData.title_en || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div dir="rtl">
                  <Label htmlFor="title_ar">
                    {language === "en" ? "Title (Arabic)" : "العنوان بالعربية"}
                  </Label>
                  <Input
                    id="title_ar"
                    name="title_ar"
                    value={formData.title_ar || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Excerpts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="excerpt_en">
                    {language === "en" ? "Excerpt (English)" : "مقتطف بالإنجليزية"}
                  </Label>
                  <Textarea
                    id="excerpt_en"
                    name="excerpt_en"
                    value={formData.excerpt_en || ""}
                    onChange={handleChange}
                    className="min-h-[80px]"
                  />
                </div>

                <div dir="rtl">
                  <Label htmlFor="excerpt_ar">
                    {language === "en" ? "Excerpt (Arabic)" : "مقتطف بالعربية"}
                  </Label>
                  <Textarea
                    id="excerpt_ar"
                    name="excerpt_ar"
                    value={formData.excerpt_ar || ""}
                    onChange={handleChange}
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content_en">
                  {language === "en" ? "Content (English)" : "المحتوى بالإنجليزية"}
                </Label>
                <Textarea
                  id="content_en"
                  name="content_en"
                  value={formData.content_en || ""}
                  onChange={handleChange}
                  className="min-h-[150px]"
                />
              </div>

              <div dir="rtl">
                <Label htmlFor="content_ar">
                  {language === "en" ? "Content (Arabic)" : "المحتوى بالعربية"}
                </Label>
                <Textarea
                  id="content_ar"
                  name="content_ar"
                  value={formData.content_ar || ""}
                  onChange={handleChange}
                  className="min-h-[150px]"
                />
              </div>

              {/* Author + Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="author_name_en">
                    {language === "en"
                      ? "Author Name (English)"
                      : "اسم الكاتب بالإنجليزية"}
                  </Label>
                  <Input
                    id="author_name_en"
                    name="author_name_en"
                    value={formData.author_name_en || ""}
                    onChange={handleChange}
                  />
                </div>

                <div dir="rtl">
                  <Label htmlFor="author_name_ar">
                    {language === "en"
                      ? "Author Name (Arabic)"
                      : "اسم الكاتب بالعربية"}
                  </Label>
                  <Input
                    id="author_name_ar"
                    name="author_name_ar"
                    value={formData.author_name_ar || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="published_date">
                    {language === "en"
                      ? "Published Date"
                      : "تاريخ النشر"}
                  </Label>
                  <Input
                    type="date"
                    id="published_date"
                    name="published_date"
                    value={formData.published_date || ""}
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
                    ? "Add Journal"
                    : "Save Changes"
                  : mode === "add"
                  ? "إضافة المقال"
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

export default JournalForm;
