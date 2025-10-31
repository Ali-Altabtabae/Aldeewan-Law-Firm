import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoById, addVideo, updateVideo } from "@/api/videoApi";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Video } from "@/types/Video";

type VideoFormProps = {
  mode: "add" | "edit";
};

const VideoForm = ({ mode }: VideoFormProps) => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Video>>({});

  // ✅ Fetch video if editing
  useEffect(() => {
    if (mode === "edit" && id) {
      setLoading(true);
      getVideoById(id)
        .then((data) => setFormData(data))
        .catch(() =>
          toast({
            title: language === "en" ? "Error" : "خطأ",
            description:
              language === "en"
                ? "Failed to load video details"
                : "فشل في تحميل بيانات الفيديو",
            variant: "destructive",
          })
        )
        .finally(() => setLoading(false));
    }
  }, [id, mode, language]);

  // ✅ Handle text input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("adminToken") || "";

    try {
      if (mode === "add") {
        await addVideo(formData, token);
      } else if (mode === "edit" && id) {
        await updateVideo(id, formData, token);
      }

      toast({
        title: language === "en" ? "Success" : "تم الحفظ بنجاح",
        description:
          language === "en"
            ? mode === "add"
              ? "Video added successfully"
              : "Video updated successfully"
            : mode === "add"
            ? "تمت إضافة الفيديو بنجاح"
            : "تم تعديل الفيديو بنجاح",
      });

      navigate("/admin/videos");
    } catch {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description:
          language === "en"
            ? "Failed to save video"
            : "فشل في حفظ الفيديو",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && mode === "edit") {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        {language === "en" ? "Loading video data..." : "جارٍ تحميل بيانات الفيديو..."}
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
                  ? "Add New Video"
                  : "Edit Video"
                : mode === "add"
                ? "إضافة فيديو جديد"
                : "تعديل الفيديو"}
            </CardTitle>
            <Button variant="outline" onClick={() => navigate("/admin/videos")}>
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

              {/* Descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="description_en">
                    {language === "en"
                      ? "Description (English)"
                      : "الوصف بالإنجليزية"}
                  </Label>
                  <Textarea
                    id="description_en"
                    name="description_en"
                    value={formData.description_en || ""}
                    onChange={handleChange}
                    className="min-h-[100px]"
                  />
                </div>

                <div dir="rtl">
                  <Label htmlFor="description_ar">
                    {language === "en"
                      ? "Description (Arabic)"
                      : "الوصف بالعربية"}
                  </Label>
                  <Textarea
                    id="description_ar"
                    name="description_ar"
                    value={formData.description_ar || ""}
                    onChange={handleChange}
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              {/* Video Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="youtube_url">
                    {language === "en" ? "YouTube URL" : "رابط اليوتيوب"}
                  </Label>
                  <Input
                    id="youtube_url"
                    name="youtube_url"
                    value={formData.youtube_url || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="thumbnail_url">
                    {language === "en" ? "Thumbnail URL" : "رابط الصورة المصغرة"}
                  </Label>
                  <Input
                    id="thumbnail_url"
                    name="thumbnail_url"
                    value={formData.thumbnail_url || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Lawyer Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="lawyer_name_en">
                    {language === "en"
                      ? "Lawyer Name (English)"
                      : "اسم المحامي بالإنجليزية"}
                  </Label>
                  <Input
                    id="lawyer_name_en"
                    name="lawyer_name_en"
                    value={formData.lawyer_name_en || ""}
                    onChange={handleChange}
                  />
                </div>

                <div dir="rtl">
                  <Label htmlFor="lawyer_name_ar">
                    {language === "en"
                      ? "Lawyer Name (Arabic)"
                      : "اسم المحامي بالعربية"}
                  </Label>
                  <Input
                    id="lawyer_name_ar"
                    name="lawyer_name_ar"
                    value={formData.lawyer_name_ar || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="published_date">
                    {language === "en" ? "Published Date" : "تاريخ النشر"}
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
                    ? "Add Video"
                    : "Save Changes"
                  : mode === "add"
                  ? "إضافة الفيديو"
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

export default VideoForm;
