import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, Scale, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from "react";
import { getLawyers } from "@/api/lawyerApi";
import { Lawyer } from "@/types/Lawyer";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
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


  const practiceAreas = [
    {
      icon: Briefcase,
      title: t('home.practices.corporate'),
      description: t('home.practices.corporate.desc'),
    },
    {
      icon: Scale,
      title: t('home.practices.civil'),
      description: t('home.practices.civil.desc'),
    },
    {
      icon: Users,
      title: t('home.practices.family'),
      description: t('home.practices.family.desc'),
    },
    {
      icon: Shield,
      title: t('home.practices.criminal'),
      description: t('home.practices.criminal.desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-muted/50 opacity-90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 animate-fade-in">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary mb-8">
              {t('home.hero.subtitle')}
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-secondary-foreground font-semibold shadow-gold text-lg px-8 py-6"
            >
              {t('home.hero.cta')}
              <ArrowRight className={`${language === 'ar' ? 'mr-2' : 'ml-2'} w-5 h-5`} />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
              {t('home.about.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('home.about.text')}
            </p>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary text-center mb-12">
            {t('home.practices.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceAreas.map((area, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-accent hover:shadow-hover transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <area.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2 text-primary">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary text-center mb-12">
            {t('home.team.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {lawyers.slice(0, 3).map((lawyer) => (
              <Card 
                key={lawyer._id} 
                className="overflow-hidden hover:shadow-hover transition-all duration-300 group"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={lawyer.image_url} 
                    alt={language === 'en' ? lawyer.name_en : lawyer.name_ar}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-2 text-primary">
                    {language === 'en' ? lawyer.name_en : lawyer.name_ar}
                  </h3>
                  <p className="text-accent font-medium mb-4">
                    {language === 'en' ? lawyer.title_en : lawyer.title_ar}
                  </p>
                  <Link to={`/lawyers/${lawyer._id}`}>
                    <Button variant="outline" className="w-full border-primary hover:bg-primary hover:text-primary-foreground">
                      {t('lawyers.view')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/lawyers">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {t('home.team.cta')}
                <ArrowRight className={`${language === 'ar' ? 'mr-2' : 'ml-2'} w-5 h-5`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
