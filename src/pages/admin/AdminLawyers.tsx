import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getLawyers, deleteLawyer } from "@/api/lawyerApi";
import { Lawyer } from "@/types/Lawyer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlusCircle, ArrowLeft, Edit, Trash2 } from "lucide-react";

const AdminLawyers = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  // ✅ Protect route
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  // ✅ Fetch lawyers
  const fetchLawyers = async () => {
    try {
      const data = await getLawyers();
      setLawyers(data);
    } catch {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description:
          language === "en"
            ? "Failed to load lawyers"
            : "فشل في تحميل قائمة المحامين",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, [language]);

  // ✅ Handle delete
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      language === "en"
        ? "Are you sure you want to delete this lawyer?"
        : "هل أنت متأكد من حذف هذا المحامي؟"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken") || "";
      await deleteLawyer(id, token);
      toast({
        title: language === "en" ? "Deleted" : "تم الحذف",
        description:
          language === "en"
            ? "Lawyer deleted successfully"
            : "تم حذف المحامي بنجاح",
      });
      fetchLawyers(); // refresh list
    } catch {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description:
          language === "en" ? "Failed to delete lawyer" : "فشل في حذف المحامي",
        variant: "destructive",
      });
    }
  };

  // ✅ Handle edit redirect
  const handleEdit = (id: string) => {
    navigate(`/admin/lawyers/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* Header Section */}
      <section className="py-16 bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">
              {language === "en" ? "Manage Lawyers" : "إدارة المحامين"}
            </h1>
            <p className="text-muted-foreground">
              {language === "en"
                ? "Add, edit, and organize your firm's team profiles."
                : "إضافة وتعديل وتنظيم ملفات فريق عمل المكتب."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => navigate("/admin/lawyers/add")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <PlusCircle
                className={`${language === "ar" ? "ml-2" : "mr-2"} w-5 h-5`}
              />
              {language === "en" ? "Add New Lawyer" : "إضافة محامٍ جديد"}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/dashboard")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft
                className={`${language === "ar" ? "ml-2" : "mr-2"} w-5 h-5`}
              />
              {language === "en" ? "Back to Dashboard" : "العودة للوحة التحكم"}
            </Button>
          </div>
        </div>
      </section>

      {/* Lawyers Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {lawyers.length === 0 ? (
            <p className="text-center text-muted-foreground py-12 text-lg">
              {language === "en"
                ? "No lawyers found."
                : "لا يوجد محامون حالياً."}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {lawyers.map((lawyer) => (
                <Card
                  key={lawyer._id}
                  className="overflow-hidden border-2 hover:border-accent hover:shadow-hover transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={lawyer.image_url || "/placeholder.png"}
                      alt={language === "en" ? lawyer.name_en : lawyer.name_ar}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-serif text-xl font-semibold mb-2 text-primary">
                      {language === "en" ? lawyer.name_en : lawyer.name_ar}
                    </h3>
                    <p className="text-accent font-medium mb-3">
                      {language === "en" ? lawyer.title_en : lawyer.title_ar}
                    </p>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                      {language === "en" ? lawyer.bio_en : lawyer.bio_ar}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto flex justify-center gap-3 border-t border-border pt-4">
                    <div className="flex gap-3 justify-center">
                      <Button
                        size="icon"
                        className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                        onClick={() => handleEdit(lawyer._id!)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="bg-secondary hover:bg-secondary/90 flex items-center gap-2"
                        onClick={() => handleDelete(lawyer._id!)}
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
      </section>

      <Footer />
    </div>
  );
};

export default AdminLawyers;
