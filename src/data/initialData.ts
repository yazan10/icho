import type { Service, AdCampaign, SystemNotification } from '../types';

export const INITIAL_SERVICES: Service[] = [
  // Instagram Services
  {
    id: 'ig-followers-vip',
    category: 'instagram',
    name: 'متابعين إنستغرام عرب مكس VIP (ضمان عدم النقص 365 يوم)',
    description: 'متابعين حقيقيين عاليي الجودة مع ضمان التعبئة التلقائية وتفاعل حسابات نشطة.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 100000,
    speed: '1,000 - 5,000 / يومياً',
    guarantee: 'ضمان سنة كاملة (365 يوم)',
    badge: 'الأكثر طلباً 🔥',
    iconName: 'Instagram'
  },
  {
    id: 'ig-likes-speed',
    category: 'instagram',
    name: 'لايكات إنستغرام فورية وسريعة جداً',
    description: 'تسليم فوري ومباشر خلال ثوانٍ معدودة من إنشاء الطلب.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 50000,
    speed: 'فوري (0 - 5 دقائق)',
    guarantee: 'آمن 100%',
    iconName: 'Instagram'
  },
  {
    id: 'ig-reels-views',
    category: 'instagram',
    name: 'مشاهدات ريلز إنستغرام (تساعد بالوصول للأكسبلور)',
    description: 'مشاهدات عالية الجودة تزيد من نسبة وصول مقطع الريلز لصفحة الإكسبلور.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 1000000,
    speed: '100,000 / يومياً',
    guarantee: 'وصول أكسبلور ممتاز',
    badge: 'توفير خارق ⚡',
    iconName: 'Instagram'
  },
  {
    id: 'ig-verification-badge',
    category: 'instagram',
    name: 'خدمة توثيق الحسابات بالعلامة الزرقاء (Meta Verified)',
    description: 'مساعدة واستشارة متكاملة لتوثيق حسابك الشخصي أو التجاري رسمياً.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 10000,
    speed: 'خلال 48 ساعة',
    guarantee: 'استرجاع كامل المبلغ في حال عدم القبول',
    badge: 'خدمة كبار الشخصيات VIP 💎',
    iconName: 'Instagram'
  },

  // TikTok Services
  {
    id: 'tt-followers-real',
    category: 'tiktok',
    name: 'متابعين تيك توك حقيقيين (فتح بث مباشر Live)',
    description: 'متابعين متفاعلين للوصول لشرط 1,000 متابع وفتح البث المباشر فوراً.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 50000,
    speed: '2,000 / يومياً',
    guarantee: 'ضمان 60 يوم',
    badge: 'فتح البث 🔴',
    iconName: 'Video'
  },
  {
    id: 'tt-views-viral',
    category: 'tiktok',
    name: 'مشاهدات فيديو تيك توك فورية (دعم الفايرال)',
    description: 'رفع مشاهدات الفيديو لزيادة تصدر الترد والاستكشاف بسرعة قياسية.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 5000000,
    speed: 'فوري جداً',
    guarantee: 'ثبات دائم',
    iconName: 'Video'
  },
  {
    id: 'tt-likes-instant',
    category: 'tiktok',
    name: 'إعجابات (لايكات) تيك توك مكس حقيقي',
    description: 'زيادة إعجابات الفيديوهات لتطوير مستوى التفاعل.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 100000,
    speed: '5,000 / يومياً',
    guarantee: 'ضمان 30 يوم',
    iconName: 'Video'
  },

  // YouTube Services
  {
    id: 'yt-subscribers',
    category: 'youtube',
    name: 'مشتركين يوتيوب ثابتين (لتفعيل الربح)',
    description: 'مشتركين حقيقيين ثابتين بدون نقص للوصول إلى شرط 1,000 مشترك.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 10000,
    speed: '200 - 500 / يومياً',
    guarantee: 'ضمان ثبات دائم 100%',
    badge: 'شروط تفعيل الربح 💰',
    iconName: 'Youtube'
  },
  {
    id: 'yt-watch-hours',
    category: 'youtube',
    name: 'ساعات مشاهدة يوتيوب (4,000 ساعة تفعيل الربح)',
    description: 'ساعات مشاهدة من فيديوهات طويلة لضمان تفعيل برنامج شركاء يوتيوب.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 4000,
    speed: 'خلال 3 - 5 أيام',
    guarantee: 'مقبول قانونياً بـ 100%',
    badge: 'ضمان القبول 🌟',
    iconName: 'Youtube'
  },

  // Facebook Services
  {
    id: 'fb-page-followers',
    category: 'facebook',
    name: 'متابعين وإعجابات صفحات فيسبوك (Facebook Page Likes/Followers)',
    description: 'زيادة هيبة الصفحة وتوثيقها بمتابعين حقيقيين.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 50000,
    speed: '1,000 / يومياً',
    guarantee: 'ضمان 90 يوم',
    iconName: 'Facebook'
  },

  // Telegram & Twitter
  {
    id: 'tg-members',
    category: 'telegram',
    name: 'أعضاء قنوات ومجموعات تلغرام عرب',
    description: 'زيادة مشتركين القناة وتنشيط المشاهدات التلقائية لأحدث 5 منشورات.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 100000,
    speed: '3,000 / يومياً',
    guarantee: 'ضمان 30 يوم',
    iconName: 'Send'
  },
  {
    id: 'tw-followers',
    category: 'twitter',
    name: 'متابعين منصة X (تويتر سابقاً) الخليج والعرب',
    description: 'متابعين من الشرق الأوسط لتعزيز الموثوقية وتصدر التغريدات.',
    pricePer1000: 32,
    currency: 'ILS',
    minQuantity: 1000,
    maxQuantity: 20000,
    speed: '500 - 1000 / يومياً',
    guarantee: 'ضمان 60 يوم',
    iconName: 'Twitter'
  }
];

export const INITIAL_ADS: AdCampaign[] = [
  {
    id: 'ad-summer-promo',
    title: '🔥 عرض الموسم الاستثنائي - خصم 30% علي كافة خدمات إنستغرام',
    description: 'احصل على خصم فوري ومباشر عند اختيار أي باقة متابعين أو مشاهدات ريلز! العرض ساري لفترة محدودة جداً.',
    discountPercentage: 30,
    badgeText: 'عرض خاص 🎁',
    buttonText: 'تصفح الخدمات وحصل الخصم',
    active: true,
    type: 'popup',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-youtube-pack',
    title: '⚡ باقة تفعيل الربح الشاملة لقنوات اليوتيوب',
    description: 'احصل على 1,000 مشترك + 4,000 ساعة مشاهدة بسعر استثنائي وضمان القبول في برنامج شركاء يوتيوب.',
    url: 'https://youtube.com',
    badgeText: 'باقة التفعيل 🔥',
    buttonText: 'فتح العرض',
    active: true,
    type: 'top_banner',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-instagram-machinery',
    title: 'متجر نمو إنستغرام 24/7',
    description: 'زيارة موقع العميل واستعراض أفضل باقات المتابعين والتفاعل في نفس الصفحة.',
    url: 'https://instagram.com',
    badgeText: 'موقع العميل',
    buttonText: 'زيارة الآن',
    active: true,
    type: 'card_box',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-tiktok-boost',
    title: 'حملة تيك توك خاصة بالفيديوهات الفايرال',
    description: 'شاهد العرض الخاص واضغط لتنتقل مباشرة إلى موقع المعلن.',
    url: 'https://tiktok.com',
    badgeText: 'حملة مميزة',
    buttonText: 'عرض المزيد',
    active: true,
    type: 'card_box',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    title: 'تحديث خوادم المتابعين',
    text: '🚀 تم تحديث خوادم زيادة المتابعين: سرعة فائقة في التنفيذ وتعبئة تلقائية!',
    type: 'info',
    active: true,
    date: 'اليوم'
  },
  {
    id: 'notif-2',
    title: 'خصم خاص',
    text: '💎 خصم 20% على باقات التوثيق بالعلامة الزرقاء لجميع الحسابات الحقيقية.',
    type: 'discount',
    active: true,
    date: 'اليوم'
  },
  {
    id: 'notif-3',
    title: 'دعم مباشر',
    text: '📞 يمكنك التواصل معنا مباشرة على مدار 24 ساعة عبر الواتساب لاستكمال طلبك.',
    type: 'urgent',
    active: true,
    date: 'مستمر'
  }
];
