import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.lawyers': 'Our Lawyers',
    'nav.journals': 'Journals',
    'nav.videos': 'Videos',
    'nav.admin': 'Admin',
    'nav.logout': 'Logout',
    
    // Home Page
    'home.hero.title': 'Excellence in Legal Representation',
    'home.hero.subtitle': 'Providing trusted legal counsel and comprehensive representation for over 25 years',
    'home.hero.cta': 'Schedule Consultation',
    'home.about.title': 'About Our Firm',
    'home.about.text': 'Al-Najah Law Firm has been a pillar of legal excellence in the region for over two decades. Our team of experienced attorneys specializes in corporate law, civil litigation, family law, and criminal defense. We pride ourselves on our commitment to justice, client satisfaction, and ethical practice.',
    'home.practices.title': 'Practice Areas',
    'home.practices.corporate': 'Corporate Law',
    'home.practices.corporate.desc': 'Business formation, contracts, and compliance',
    'home.practices.civil': 'Civil Litigation',
    'home.practices.civil.desc': 'Dispute resolution and court representation',
    'home.practices.family': 'Family Law',
    'home.practices.family.desc': 'Divorce, custody, and family matters',
    'home.practices.criminal': 'Criminal Defense',
    'home.practices.criminal.desc': 'Comprehensive criminal law representation',
    'home.team.title': 'Meet Our Team',
    'home.team.cta': 'View All Lawyers',
    
    // Lawyers Page
    'lawyers.title': 'Our Legal Team',
    'lawyers.subtitle': 'Expert attorneys committed to your success',
    'lawyers.view': 'View Profile',
    'lawyers.years': 'years of experience',
    
    // Journals Page
    'journals.title': 'Legal Insights & Journals',
    'journals.subtitle': 'Stay informed with the latest legal analysis and insights',
    'journals.readmore': 'Read More',
    'journals.by': 'By',
    
    // Videos Page
    'videos.title': 'Legal Educational Videos',
    'videos.subtitle': 'Learn from our experts through informative video content',
    'videos.watch': 'Watch on YouTube',
    
    // Admin
    'admin.login': 'Admin Login',
    'admin.email': 'Email',
    'admin.password': 'Password',
    'admin.signin': 'Sign In',
    'admin.dashboard': 'Admin Dashboard',
    'admin.manage.lawyers': 'Manage Lawyers',
    'admin.manage.journals': 'Manage Journals',
    'admin.manage.videos': 'Manage Videos',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add New',
    
    // Footer
    'footer.address': '123 Legal District, City Center',
    'footer.phone': '+971 4 XXX XXXX',
    'footer.email': 'contact@alnajah-law.com',
    'footer.hours': 'Sun - Thu: 9:00 AM - 6:00 PM',
    'footer.rights': 'All rights reserved.',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.lawyers': 'محامونا',
    'nav.journals': 'المجلات',
    'nav.videos': 'الفيديوهات',
    'nav.admin': 'الإدارة',
    'nav.logout': 'تسجيل الخروج',
    
    // Home Page
    'home.hero.title': 'التميز في التمثيل القانوني',
    'home.hero.subtitle': 'نقدم المشورة القانونية الموثوقة والتمثيل الشامل لأكثر من 25 عامًا',
    'home.hero.cta': 'حجز استشارة',
    'home.about.title': 'عن مكتبنا',
    'home.about.text': 'يعد مكتب النجاح للمحاماة ركيزة من ركائز التميز القانوني في المنطقة منذ أكثر من عقدين. يتخصص فريقنا من المحامين ذوي الخبرة في قانون الشركات والتقاضي المدني وقانون الأسرة والدفاع الجنائي. نحن نفخر بالتزامنا بالعدالة ورضا العملاء والممارسة الأخلاقية.',
    'home.practices.title': 'مجالات الممارسة',
    'home.practices.corporate': 'قانون الشركات',
    'home.practices.corporate.desc': 'تأسيس الأعمال والعقود والامتثال',
    'home.practices.civil': 'التقاضي المدني',
    'home.practices.civil.desc': 'حل النزاعات والتمثيل في المحاكم',
    'home.practices.family': 'قانون الأسرة',
    'home.practices.family.desc': 'الطلاق والحضانة والمسائل الأسرية',
    'home.practices.criminal': 'الدفاع الجنائي',
    'home.practices.criminal.desc': 'تمثيل شامل في القانون الجنائي',
    'home.team.title': 'تعرف على فريقنا',
    'home.team.cta': 'عرض جميع المحامين',
    
    // Lawyers Page
    'lawyers.title': 'فريقنا القانوني',
    'lawyers.subtitle': 'محامون خبراء ملتزمون بنجاحك',
    'lawyers.view': 'عرض الملف الشخصي',
    'lawyers.years': 'سنوات من الخبرة',
    
    // Journals Page
    'journals.title': 'رؤى ومجلات قانونية',
    'journals.subtitle': 'ابق على اطلاع بأحدث التحليلات والرؤى القانونية',
    'journals.readmore': 'اقرأ المزيد',
    'journals.by': 'بواسطة',
    
    // Videos Page
    'videos.title': 'مقاطع فيديو تعليمية قانونية',
    'videos.subtitle': 'تعلم من خبرائنا من خلال محتوى الفيديو المعلوماتي',
    'videos.watch': 'شاهد على يوتيوب',
    
    // Admin
    'admin.login': 'تسجيل دخول المسؤول',
    'admin.email': 'البريد الإلكتروني',
    'admin.password': 'كلمة المرور',
    'admin.signin': 'تسجيل الدخول',
    'admin.dashboard': 'لوحة تحكم المسؤول',
    'admin.manage.lawyers': 'إدارة المحامين',
    'admin.manage.journals': 'إدارة المجلات',
    'admin.manage.videos': 'إدارة الفيديوهات',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.add': 'إضافة جديد',
    
    // Footer
    'footer.address': '123 الحي القانوني، مركز المدينة',
    'footer.phone': '+971 4 XXX XXXX',
    'footer.email': 'contact@alnajah-law.com',
    'footer.hours': 'الأحد - الخميس: 9:00 ص - 6:00 م',
    'footer.rights': 'جميع الحقوق محفوظة.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
