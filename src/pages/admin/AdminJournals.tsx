import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getJournals, deleteJournal } from "@/api/journalApi";
import { Journal } from "@/types/Journal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Edit, Trash2 } from "lucide-react";

const AdminJournals = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  // ✅ Protect route
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  // ✅ Fetch journals
  const fetchJournals = async () => {
    try {
      const data = await getJournals();
      setJournals(data);
    } catch {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description:
          language === "en"
            ? "Failed to load journals"
            : "فشل في تحميل المقالات",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchJournals();
  }, [language]);

  // ✅ Delete
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      language === "en"
        ? "Are you sure you want to delete this journal?"
        : "هل أنت متأكد من حذف هذا المقال؟"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken") || "";
      await deleteJournal(id, token);
      toast({
        title: language === "en" ? "Deleted" : "تم الحذف",
        description:
          language === "en"
            ? "Journal deleted successfully"
            : "تم حذف المقال بنجاح",
      });
      fetchJournals();
    } catch {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description:
          language === "en" ? "Failed to delete journal" : "فشل في حذف المقال",
        variant: "destructive",
      });
    }
  };

  // ✅ Edit redirect
  const handleEdit = (id: string) => {
    navigate(`/admin/journals/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center flex-wrap mb-12 gap-3">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">
              {language === "en" ? "Manage Journals" : "إدارة المقالات"}
            </h1>
            <p className="text-muted-foreground">
              {language === "en"
                ? "Add, edit, or delete journal entries"
                : "إضافة أو تعديل أو حذف المقالات"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/admin/journals/add")}
              className="bg-primary text-white"
            >
              {language === "en" ? "Add New Journal" : "إضافة مقال جديد"}
            </Button>
            <Button
              onClick={() => navigate("/admin/dashboard")}
              variant="outline"
            >
              {language === "en" ? "Back to Dashboard" : "العودة للوحة التحكم"}
            </Button>
          </div>
        </div>

        {journals.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            {language === "en"
              ? "No journals found."
              : "لا توجد مقالات حالياً."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals.map((journal) => (
              <Card
                key={journal._id}
                className="overflow-hidden border-2 hover:border-accent hover:shadow-hover transition-all duration-300 group flex flex-col h-full"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={journal.image_url || "/placeholder.png"}
                    alt={
                      language === "en" ? journal.title_en : journal.title_ar
                    }
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <CardTitle className="font-serif text-xl font-semibold mb-2 text-primary">
                    {language === "en" ? journal.title_en : journal.title_ar}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                    {language === "en"
                      ? journal.excerpt_en
                      : journal.excerpt_ar}
                  </p>
                  <p className="text-muted-foreground text-xs mb-4">
                    {language === "en"
                      ? `Published: ${journal.published_date}`
                      : `تاريخ النشر: ${journal.published_date}`}
                  </p>
                </CardContent>
                <CardFooter className="mt-auto flex justify-center gap-3 border-t border-border pt-4">
                  <div className="flex gap-2 justify-center">
                    <Button
                      size="icon"
                      className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                      onClick={() => handleEdit(journal._id!)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="bg-secondary hover:bg-secondary/90 flex items-center gap-2"
                      onClick={() => handleDelete(journal._id!)}
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

export default AdminJournals;
