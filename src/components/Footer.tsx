import { Scale, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-secondary p-2 rounded-lg">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold">
                {language === 'en' ? 'Al-Najah Law Firm' : 'مكتب النجاح للمحاماة'}
              </h3>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              {language === 'en' 
                ? 'Excellence in legal representation for over 25 years.'
                : 'التميز في التمثيل القانوني لأكثر من 25 عامًا.'}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-secondary">
              {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/80">{t('footer.address')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/80">{t('footer.phone')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/80">{t('footer.email')}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-secondary">
              {language === 'en' ? 'Office Hours' : 'ساعات العمل'}
            </h4>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-secondary" />
              <span className="text-primary-foreground/80">{t('footer.hours')}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © {new Date().getFullYear()} {language === 'en' ? 'Al-Najah Law Firm' : 'مكتب النجاح للمحاماة'}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
