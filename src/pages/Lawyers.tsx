import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getLawyers } from "@/api/lawyerApi";
import { Lawyer } from "@/types/Lawyer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Lawyers = () => {
  const { language, t } = useLanguage();

  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLawyers()
      .then(setLawyers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-3 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            {t("lawyers.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("lawyers.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lawyers.map((lawyer) => (
            <Card
              key={lawyer._id}
              className="overflow-hidden border-2 hover:border-accent hover:shadow-hover transition-all duration-300 group flex flex-col h-full"
            >
              <div className="w-full h-56 sm:h-64 md:h-72 overflow-hidden mb-2">
                <img
                  src={lawyer.image_url}
                  alt={language === "en" ? lawyer.name_en : lawyer.name_ar}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4 sm:p-5">
                <h2 className="font-serif text-2xl font-semibold mb-2 text-primary text-center">
                  {language === "en" ? lawyer.name_en : lawyer.name_ar}
                </h2>
                <p className="text-accent font-medium mb-2 text-center">
                  {language === "en" ? lawyer.title_en : lawyer.title_ar}
                </p>
                <div className="flex flex-wrap gap-2 mb-1 justify-center">
                  {(language === "en"
                    ? lawyer.education_en
                    : lawyer.education_ar
                  )
                    .slice(0, 3)
                    .map((education, index) => (
                      <Badge key={index} variant="outline">
                        {education}
                      </Badge>
                    ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex justify-center gap-3 border-t border-border pt-4">
                <Link to={`/lawyers/${lawyer._id}`}>
                  <Button variant="outline" className="w-full border-primary hover:bg-primary hover:text-primary-foreground">
                    {t("lawyers.view")}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lawyers;
