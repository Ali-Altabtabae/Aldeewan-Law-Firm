import { useParams, Link } from "react-router-dom";
import { Mail, Phone, GraduationCap, Briefcase, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getLawyers } from "@/api/lawyerApi";
import { Lawyer } from "@/types/Lawyer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LawyerProfile = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();

  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLawyers()
      .then((data) => {
        const found = data.find((l) => l._id === id);
        setLawyer(found || null);
      })
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

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            {language === "en" ? "Lawyer not found" : "المحامي غير موجود"}
          </h1>
          <Link to="/lawyers">
            {language === "en" ? "Back to Lawyers" : "العودة إلى المحامين"}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <Link to="/lawyers">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft
              className={`${language === "ar" ? "ml-2" : "mr-2"} w-4 h-4`}
            />
            {language === "en" ? "Back to Lawyers" : "العودة إلى المحامين"}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 shadow-elegant">
            <CardContent className="p-0">
              <div className="aspect-square overflow-hidden">
                <img
                  src={lawyer.image_url}
                  alt={language === "en" ? lawyer.name_en : lawyer.name_ar}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                    {language === "en" ? lawyer.name_en : lawyer.name_ar}
                  </h1>
                  <p className="text-accent font-medium text-lg">
                    {language === "en" ? lawyer.title_en : lawyer.title_ar}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {lawyer.experience_years} {t("lawyers.years")}
                  </Badge>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent" />
                    <a
                      href={`mailto:${lawyer.email}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {lawyer.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-accent" />
                    <a
                      href={`tel:${lawyer.phone}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {lawyer.phone}
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Briefcase className="w-6 h-6 text-accent" />
                  {language === "en" ? "About" : "نبذة"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "en" ? lawyer.bio_en : lawyer.bio_ar}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <GraduationCap className="w-6 h-6 text-accent" />
                  {language === "en" ? "Specialties" : "التخصصات"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(language === "en"
                    ? lawyer.specialties_en
                    : lawyer.specialties_ar
                  ).map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-base py-2"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <GraduationCap className="w-6 h-6 text-accent" />
                  {language === "en" ? "Education" : "التعليم"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {(language === "en"
                    ? lawyer.education_en
                    : lawyer.education_ar
                  ).map((edu, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                      <span className="text-muted-foreground">{edu}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LawyerProfile;
