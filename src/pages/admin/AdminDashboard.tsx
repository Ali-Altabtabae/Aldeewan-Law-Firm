import { Link } from 'react-router-dom';
import { Users, BookOpen, Video, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminDashboard = () => {
  const { language, t } = useLanguage();

  const adminSections = [
    {
      title: t('admin.manage.lawyers'),
      icon: Users,
      description: language === 'en' 
        ? 'Add, edit, and manage lawyer profiles'
        : 'إضافة وتحرير وإدارة ملفات المحامين',
      link: '/admin/lawyers',
    },
    {
      title: t('admin.manage.journals'),
      icon: BookOpen,
      description: language === 'en'
        ? 'Create and manage journal entries'
        : 'إنشاء وإدارة مقالات المجلة',
      link: '/admin/journals',
    },
    {
      title: t('admin.manage.videos'),
      icon: Video,
      description: language === 'en'
        ? 'Add and manage educational videos'
        : 'إضافة وإدارة مقاطع الفيديو التعليمية',
      link: '/admin/videos',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">
              {t('admin.dashboard')}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage your law firm website content'
                : 'إدارة محتوى موقع مكتب المحاماة الخاص بك'}
            </p>
          </div>
          <Link to="/admin/login">
            <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
              <LogOut className={`${language === 'ar' ? 'ml-2' : 'mr-2'} w-4 h-4`} />
              {t('nav.logout')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adminSections.map((section, index) => (
            <Link key={index} to={section.link}>
              <Card className="hover:shadow-hover transition-all duration-300 group cursor-pointer h-full">
                <CardHeader>
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <section.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <CardTitle className="text-primary group-hover:text-accent transition-colors">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="mt-8 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-primary">
              {language === 'en' ? 'Quick Stats' : 'إحصائيات سريعة'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <div className="text-muted-foreground">{t('nav.lawyers')}</div>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <div className="text-muted-foreground">{t('nav.journals')}</div>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <div className="text-muted-foreground">{t('nav.videos')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
