import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getJournals } from "@/api/journalApi";
import { Journal } from "@/types/Journal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Journals = () => {
  const { language, t } = useLanguage();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJournals()
      .then(setJournals)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            {t("journals.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("journals.subtitle")}
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {journals.map((journal) => (
            <Card
              key={journal._id}
              className="overflow-hidden hover:shadow-hover transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 aspect-video md:aspect-square overflow-hidden">
                  <img
                    src={journal.image_url}
                    alt={
                      language === "en" ? journal.title_en : journal.title_ar
                    }
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="md:col-span-2 p-6">
                  <h2 className="font-serif text-2xl font-semibold mb-3 text-primary group-hover:text-accent transition-colors">
                    {language === "en" ? journal.title_en : journal.title_ar}
                  </h2>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>
                        {language === "en"
                          ? journal.author_name_en
                          : journal.author_name_ar}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(journal.published_date)}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {language === "en"
                      ? journal.excerpt_en
                      : journal.excerpt_ar}
                  </p>

                  <Link to={`/journals/${journal._id}`}>
                    <Button
                      variant="outline"
                      className="border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      {t("journals.readmore")}
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Journals;
