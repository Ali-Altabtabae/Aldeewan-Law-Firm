import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { getVideos, deleteVideo } from "@/api/videoApi";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Video } from "@/types/Video";
import { Edit, Trash2 } from "lucide-react";

const AdminVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  // ✅ Protect route
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  // ✅ Fetch videos
  const fetchVideos = async () => {
    try {
      const data = await getVideos();
      setVideos(data);
    } catch {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description:
          language === "en"
            ? "Failed to load videos"
            : "فشل في تحميل قائمة الفيديوهات",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [language]);

  // ✅ Handle delete
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      language === "en"
        ? "Are you sure you want to delete this video?"
        : "هل أنت متأكد من حذف هذا الفيديو؟"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken") || "";
      await deleteVideo(id, token);
      toast({
        title: language === "en" ? "Deleted" : "تم الحذف",
        description:
          language === "en"
            ? "Video deleted successfully"
            : "تم حذف الفيديو بنجاح",
      });
      fetchVideos(); // refresh list
    } catch {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description:
          language === "en" ? "Failed to delete video" : "فشل في حذف الفيديو",
        variant: "destructive",
      });
    }
  };

  // ✅ Handle edit
  const handleEdit = (id: string) => {
    navigate(`/admin/videos/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center flex-wrap gap-3 mb-10">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">
              {language === "en" ? "Manage Videos" : "إدارة الفيديوهات"}
            </h1>
            <p className="text-muted-foreground">
              {language === "en"
                ? "Add, edit, or delete educational videos"
                : "إضافة أو تعديل أو حذف مقاطع الفيديو التعليمية"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/admin/videos/add")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {language === "en" ? "Add New Video" : "إضافة فيديو جديد"}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/dashboard")}
            >
              {language === "en" ? "Back to Dashboard" : "العودة للوحة التحكم"}
            </Button>
          </div>
        </div>

        {/* Video List */}
        {videos.length === 0 ? (
          <p className="text-center text-muted-foreground py-16 text-lg">
            {language === "en"
              ? "No videos available yet."
              : "لا توجد فيديوهات حالياً."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Card
                key={video._id}
                className="overflow-hidden border-2 hover:border-accent hover:shadow-hover transition-all duration-300 group flex flex-col h-full"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail_url || "/placeholder.png"}
                    alt={language === "en" ? video.title_en : video.title_ar}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-2 text-primary">
                    {language === "en" ? video.title_en : video.title_ar}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {language === "en"
                      ? video.description_en
                      : video.description_ar}
                  </p>
                  <p className="text-sm text-accent mb-3">
                    {language === "en"
                      ? `Lawyer: ${video.lawyer_name_en || "N/A"}`
                      : `المحامي: ${video.lawyer_name_ar || "غير محدد"}`}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {language === "en"
                      ? `Published: ${video.published_date || "—"}`
                      : `تاريخ النشر: ${video.published_date || "—"}`}
                  </p>
                </CardContent>
                <CardFooter className="mt-auto flex justify-center gap-3 border-t border-border pt-4">
                  <div className="flex gap-2 justify-center">
                    <Button
                      size="icon"
                      className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                      onClick={() => handleEdit(video._id!)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="bg-secondary hover:bg-secondary/90 flex items-center gap-2"
                      onClick={() => handleDelete(video._id!)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminVideos;
