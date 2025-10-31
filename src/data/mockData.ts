import lawyer1Pic from "../assets/lawyer1-pic.jpg"

export interface Lawyer {
  id: string;
  name_en: string;
  name_ar: string;
  title_en: string;
  title_ar: string;
  bio_en: string;
  bio_ar: string;
  specialties_en: string[];
  specialties_ar: string[];
  education_en: string[];
  education_ar: string[];
  experience_years: number;
  email: string;
  phone: string;
  image_url: string;
}

export interface Journal {
  id: string;
  title_en: string;
  title_ar: string;
  content_en: string;
  content_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  author_id: string;
  author_name_en: string;
  author_name_ar: string;
  published_date: string;
  image_url: string;
}

export interface Video {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  youtube_url: string;
  thumbnail_url: string;
  lawyer_id: string;
  lawyer_name_en: string;
  lawyer_name_ar: string;
  published_date: string;
}

export const mockLawyers: Lawyer[] = [
  {
    id: '1',
    name_en: 'Husian Altabtabaei',
    name_ar: 'حسين عبدالجليل الطبطبائي',
    title_en: 'Senior Partner - Lawyer',
    title_ar: 'شريك أول - محامي ',
    bio_en: 'Dr. Ahmed Al-Mansouri is a distinguished legal expert with over 25 years of experience in corporate law and commercial litigation. He has successfully represented major corporations in complex merger and acquisition transactions, and has been recognized as one of the leading corporate lawyers in the region.',
    bio_ar: 'د. أحمد المنصوري خبير قانوني بارز يتمتع بخبرة تزيد عن 25 عامًا في قانون الشركات والتقاضي التجاري. لقد مثل بنجاح شركات كبرى في معاملات الدمج والاستحواذ المعقدة، وتم الاعتراف به كواحد من أبرز محامي الشركات في المنطقة.',
    specialties_en: ['Corporate Law', 'Mergers & Acquisitions', 'Commercial Litigation', 'Contract Law'],
    specialties_ar: ['قانون الشركات', 'عمليات الدمج والاستحواذ', 'التقاضي التجاري', 'قانون العقود'],
    education_en: [
      'PhD in Law - Harvard Law School',
      'LLM in Corporate Law - Oxford University',
      'Bachelor of Laws - Cairo University'
    ],
    education_ar: [
      'دكتوراه في القانون - كلية الحقوق بجامعة هارفارد',
      'ماجستير في قانون الشركات - جامعة أكسفورد',
      'بكالوريوس في القانون - جامعة القاهرة'
    ],
    experience_years: 25,
    email: 'a.almansouri@alnajah-law.com',
    phone: '+971 4 XXX 1001',
    image_url: '/lawyer1-pic.jpg'
  },
  {
    id: '2',
    name_en: 'Fatima Al-Zahra',
    name_ar: 'فاطمة الزهراء',
    title_en: 'Partner - Family Law',
    title_ar: 'شريكة - قانون الأسرة',
    bio_en: 'Fatima Al-Zahra specializes in family law and has dedicated her career to helping families navigate complex legal matters with compassion and expertise. With 18 years of experience, she is known for her empathetic approach and successful resolution of sensitive family disputes.',
    bio_ar: 'تتخصص فاطمة الزهراء في قانون الأسرة وكرست حياتها المهنية لمساعدة العائلات في التعامل مع المسائل القانونية المعقدة بتعاطف وخبرة. مع 18 عامًا من الخبرة، تُعرف بنهجها المتعاطف والحل الناجح للنزاعات العائلية الحساسة.',
    specialties_en: ['Family Law', 'Divorce Proceedings', 'Child Custody', 'Estate Planning'],
    specialties_ar: ['قانون الأسرة', 'إجراءات الطلاق', 'حضانة الأطفال', 'تخطيط التركات'],
    education_en: [
      'LLM in Family Law - University of London',
      'Bachelor of Laws - American University of Sharjah'
    ],
    education_ar: [
      'ماجستير في قانون الأسرة - جامعة لندن',
      'بكالوريوس في القانون - الجامعة الأمريكية في الشارقة'
    ],
    experience_years: 18,
    email: 'f.alzahra@alnajah-law.com',
    phone: '+971 4 XXX 1002',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    name_en: 'Khalid Hassan',
    name_ar: 'خالد حسن',
    title_en: 'Senior Associate - Criminal Defense',
    title_ar: 'محامي أول - الدفاع الجنائي',
    bio_en: 'Khalid Hassan is a skilled criminal defense attorney with a strong track record of defending clients in high-profile cases. His 15 years of experience in criminal law have made him one of the most sought-after defense attorneys in the region.',
    bio_ar: 'خالد حسن محامي دفاع جنائي ماهر يتمتع بسجل قوي في الدفاع عن العملاء في القضايا البارزة. جعلته خبرته البالغة 15 عامًا في القانون الجنائي واحدًا من أكثر محامي الدفاع المطلوبين في المنطقة.',
    specialties_en: ['Criminal Defense', 'White Collar Crime', 'Appeals', 'Legal Consultation'],
    specialties_ar: ['الدفاع الجنائي', 'جرائم ذوي الياقات البيضاء', 'الاستئناف', 'الاستشارات القانونية'],
    education_en: [
      'LLM in Criminal Law - New York University',
      'Bachelor of Laws - Dubai University'
    ],
    education_ar: [
      'ماجستير في القانون الجنائي - جامعة نيويورك',
      'بكالوريوس في القانون - جامعة دبي'
    ],
    experience_years: 15,
    email: 'k.hassan@alnajah-law.com',
    phone: '+971 4 XXX 1003',
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  }
];

export const mockJournals: Journal[] = [
  {
    id: '1',
    title_en: 'Understanding Corporate Governance in the UAE',
    title_ar: 'فهم حوكمة الشركات في الإمارات العربية المتحدة',
    content_en: 'Corporate governance has become increasingly important in the UAE business landscape. This comprehensive guide explores the key principles of corporate governance, regulatory requirements, and best practices for companies operating in the UAE. We examine recent legislative changes and their impact on corporate structures, board responsibilities, and shareholder rights.',
    content_ar: 'أصبحت حوكمة الشركات ذات أهمية متزايدة في مشهد الأعمال في دولة الإمارات العربية المتحدة. يستكشف هذا الدليل الشامل المبادئ الرئيسية لحوكمة الشركات والمتطلبات التنظيمية وأفضل الممارسات للشركات العاملة في دولة الإمارات العربية المتحدة. نفحص التغييرات التشريعية الأخيرة وتأثيرها على هياكل الشركات ومسؤوليات مجلس الإدارة وحقوق المساهمين.',
    excerpt_en: 'An in-depth look at corporate governance principles and their application in the UAE business environment.',
    excerpt_ar: 'نظرة متعمقة على مبادئ حوكمة الشركات وتطبيقها في بيئة الأعمال في دولة الإمارات العربية المتحدة.',
    author_id: '1',
    author_name_en: 'Dr. Ahmed Al-Mansouri',
    author_name_ar: 'د. أحمد المنصوري',
    published_date: '2024-01-15',
    image_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop'
  },
  {
    id: '2',
    title_en: 'Family Law Reform: Recent Developments',
    title_ar: 'إصلاح قانون الأسرة: التطورات الأخيرة',
    content_en: 'Recent reforms in family law have significantly impacted how family matters are handled in our legal system. This article discusses the major changes in custody laws, divorce procedures, and inheritance rights. We provide practical guidance for families navigating these new legal frameworks.',
    content_ar: 'أثرت الإصلاحات الأخيرة في قانون الأسرة بشكل كبير على كيفية التعامل مع المسائل العائلية في نظامنا القانوني. يناقش هذا المقال التغييرات الرئيسية في قوانين الحضانة وإجراءات الطلاق وحقوق الميراث. نقدم إرشادات عملية للعائلات التي تتنقل عبر هذه الأطر القانونية الجديدة.',
    excerpt_en: 'Exploring recent changes in family law and their implications for families in the region.',
    excerpt_ar: 'استكشاف التغييرات الأخيرة في قانون الأسرة وآثارها على العائلات في المنطقة.',
    author_id: '2',
    author_name_en: 'Fatima Al-Zahra',
    author_name_ar: 'فاطمة الزهراء',
    published_date: '2024-02-10',
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop'
  },
  {
    id: '3',
    title_en: 'Criminal Law Updates: Your Rights as a Defendant',
    title_ar: 'تحديثات القانون الجنائي: حقوقك كمتهم',
    content_en: 'Understanding your rights in criminal proceedings is crucial. This journal entry covers recent updates in criminal procedure, defendant rights, and important legal precedents. We discuss the importance of legal representation and how to navigate the criminal justice system effectively.',
    content_ar: 'فهم حقوقك في الإجراءات الجنائية أمر بالغ الأهمية. يغطي هذا المقال التحديثات الأخيرة في الإجراءات الجنائية وحقوق المتهمين والسوابق القانونية المهمة. نناقش أهمية التمثيل القانوني وكيفية التعامل مع نظام العدالة الجنائية بفعالية.',
    excerpt_en: 'A comprehensive guide to defendant rights and recent developments in criminal law.',
    excerpt_ar: 'دليل شامل لحقوق المتهمين والتطورات الأخيرة في القانون الجنائي.',
    author_id: '3',
    author_name_en: 'Khalid Hassan',
    author_name_ar: 'خالد حسن',
    published_date: '2024-02-20',
    image_url: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=600&fit=crop'
  }
];

export const mockVideos: Video[] = [
  {
    id: '1',
    title_en: 'Introduction to Corporate Law in the UAE',
    title_ar: 'مقدمة في قانون الشركات في الإمارات العربية المتحدة',
    description_en: 'Dr. Ahmed Al-Mansouri provides an overview of corporate law fundamentals and how they apply to businesses in the UAE.',
    description_ar: 'يقدم د. أحمد المنصوري نظرة عامة على أساسيات قانون الشركات وكيفية تطبيقها على الشركات في دولة الإمارات العربية المتحدة.',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop',
    lawyer_id: '1',
    lawyer_name_en: 'Dr. Ahmed Al-Mansouri',
    lawyer_name_ar: 'د. أحمد المنصوري',
    published_date: '2024-01-20'
  },
  {
    id: '2',
    title_en: 'Navigating Divorce Proceedings',
    title_ar: 'التعامل مع إجراءات الطلاق',
    description_en: 'Fatima Al-Zahra discusses the legal aspects of divorce proceedings and offers guidance for those going through this difficult process.',
    description_ar: 'تناقش فاطمة الزهراء الجوانب القانونية لإجراءات الطلاق وتقدم الإرشاد لأولئك الذين يمرون بهذه العملية الصعبة.',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=450&fit=crop',
    lawyer_id: '2',
    lawyer_name_en: 'Fatima Al-Zahra',
    lawyer_name_ar: 'فاطمة الزهراء',
    published_date: '2024-02-05'
  },
  {
    id: '3',
    title_en: 'Understanding Your Rights in Criminal Cases',
    title_ar: 'فهم حقوقك في القضايا الجنائية',
    description_en: 'Khalid Hassan explains fundamental rights of defendants and what to expect during criminal proceedings.',
    description_ar: 'يشرح خالد حسن الحقوق الأساسية للمتهمين وما يمكن توقعه خلال الإجراءات الجنائية.',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&h=450&fit=crop',
    lawyer_id: '3',
    lawyer_name_en: 'Khalid Hassan',
    lawyer_name_ar: 'خالد حسن',
    published_date: '2024-02-15'
  }
];
