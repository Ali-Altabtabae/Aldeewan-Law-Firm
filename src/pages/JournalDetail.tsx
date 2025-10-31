import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getJournalById } from "@/api/journalApi";
import { Journal } from "@/types/Journal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const JournalDetail = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();

  const [journal, setJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getJournalById(id)
      .then(setJournal)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            Journal not found
          </h1>
          <Link to="/journals">
            <Button>Back to Journals</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "en" ? "en-US" : "ar-AE",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />

      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <Link to="/journals">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft
              className={`${language === "ar" ? "ml-2" : "mr-2"} w-4 h-4`}
            />
            {language === "en" ? "Back to Journals" : "العودة إلى المجلات"}
          </Button>
        </Link>

        <div className="bg-card rounded-lg shadow-elegant overflow-hidden">
          <div className="aspect-video overflow-hidden">
            <img
              src={journal.image_url}
              alt={language === "en" ? journal.title_en : journal.title_ar}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="font-serif text-4xl font-bold text-primary mb-6">
              {language === "en" ? journal.title_en : journal.title_ar}
            </h1>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-5 h-5 text-accent" />
                <span className="font-medium">
                  {t("journals.by")}{" "}
                  {language === "en"
                    ? journal.author_name_en
                    : journal.author_name_ar}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5 text-accent" />
                <span>{formatDate(journal.published_date)}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {language === "en" ? journal.content_en : journal.content_ar}
              </p>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default JournalDetail;
