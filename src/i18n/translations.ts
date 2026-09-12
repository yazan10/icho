export type Language = 'ar' | 'en';
export type Currency = 'USD' | 'ILS';

export let exchangeRateILS = 3.70; // fallback only

export async function refreshExchangeRateILS() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!res.ok) throw new Error('Exchange rate request failed');

    const data = await res.json();
    const rate = Number(data?.rates?.ILS);

    if (rate && Number.isFinite(rate)) {
      exchangeRateILS = Number(rate.toFixed(4));
    }
  } catch {
    exchangeRateILS = 3.70;
  }
}

export const translations = {
  ar: {
    // Navigation
    platformName: 'ايكو فولورز',
    platformSubtitle: 'المنصة الأقوى لخدمات السوشيال ميديا ⚡',
    navServices: 'الخدمات والأسعار',
    navWhyUs: 'لماذا نحن؟',
    navAbout: 'شرح المنصة',
    navFaq: 'الأسئلة الشائعة',
    navSupport: 'الدعم الفني',
    welcomeUser: 'أهلاً،',
    ipLabel: 'IP الجهاز:',
    
    // Hero
    heroBadge: 'سيرفر كرتوني 3D مباشر للنمو الرقمي والتسويق',
    heroTitlePart1: 'اشتري لحساباتك متابعين',
    heroTitlePart2: 'بأسلوب 3D مبتكر وسرعة خارقة',
    heroDescription: 'نوفر لك أفضل خدمات زيادة المتابعين، اللايكات، المشاهدات وتوثيق الحسابات الرسمية بأعلى جودة وثبات دائم.',
    heroCtaOrder: 'اختر خدمتك وابدأ الطلب',
    heroCtaWhatsapp: 'تواصل مباشر عبر الواتساب',

    // Features Chips
    featSpeedTitle: 'تنفيذ فوري 100%',
    featSpeedDesc: 'بدء الخدمة خلال ثوانٍ من الطلب',
    featGuaranteeTitle: 'ضمان تعويض حقيقي',
    featGuaranteeDesc: 'ضمان من 30 يوم لغاية 365 يوم',
    featRealTitle: 'تفاعل حقيقي 3D',
    featRealDesc: 'متابعين بحسابات نشطة وموثوقة',
    featSecureTitle: 'بدون كلمة سر',
    featSecureDesc: 'فقط نحتاج اسم الحساب أو الرابط',

    // Categories
    catAll: 'جميع الخدمات',
    catInstagram: 'إنستغرام',
    catTikTok: 'تيك توك',
    catYouTube: 'يوتيوب',
    catFacebook: 'فيسبوك',
    catTelegram: 'تلغرام',
    catTwitter: 'منصة X',
    catSubscriptions: 'الاشتراكات الرقمية',
    sectionSocial: 'خدمات السوشيال ميديا',
    sectionDigital: 'الاشتراكات الرقمية',

    // Service Card
    speedLabel: 'السرعة:',
    guaranteeLabel: 'الضمان:',
    pricePer1000Label: 'السعر لكل 1,000:',
    orderNow: 'طلب الخدمة الآن',

    // Order Modal
    orderTitle: 'تأكيد طلب الخدمة',
    quantityLabel: 'الكمية المطلوبة:',
    minMaxLabel: 'الحد الأدنى - الأقصى:',
    targetAccountLabel: 'رابط الحساب أو اليوزر المطلوب (Target):',
    targetAccountPlaceholder: 'مثال: @username أو رابط المنشور',
    summaryTitle: 'ملخص التكلفة والتنفيذ:',
    totalPriceLabel: 'المبلغ الإجمالي المطلوب:',
    copiedSuccessAlert: 'تم نسخ نص تفاصيل الطلب بنجاح! جاري التوجيه إلى الواتساب...',
    confirmWhatsappBtn: 'تأكيد الطلب واستكمال العملية عبر الواتساب',
    whatsappNotice: 'سيتم فتح الواتساب برقم (+970598951793) ومرفق به النص المنسوخ',

    // Name Modal
    nameModalTitle: 'أهلاً بك في منصتنا الرقمية 3D ✨',
    nameModalDesc: 'يرجى كتابة اسمك للمرة الأولى على هذا الجهاز لربطه تلقائياً بعنوان IP الخاص بك.',
    nameInputLabel: 'اسمك الكامل:',
    nameInputPlaceholder: 'مثال: يزن سلامة',
    nameInputError: 'يرجى كتابة اسمك للمتابعة',
    nameSubmitBtn: 'حفظ ودخول المنصة',

    // Support Modal
    supportTitle: 'الدعم الفني والخدمات الخاصة',
    supportSub: 'فريقنا متواجد على مدار 24 ساعة لمساعدتك',
    directWhatsappBtn: 'الواتساب المباشر',
    devInstaBtn: 'انستغرام المطور',
    emailLabel: 'البريد الإلكتروني للتواصل:',
    phoneLabel: 'رقم الواتساب مع المفتاح الدولي:',
    subjectLabel: 'موضوع الرسالة:',
    messageLabel: 'تفاصيل الاستفسار أو المشكلة:',
    messagePlaceholder: 'اكتب استفسارك هنا...',
    sendTicketBtn: 'إرسال تذكرة الدعم الفني',
    ticketSentSuccess: 'تم إرسال تذكرة الدعم الفني بنجاح! سيتم الرد عليك فوراً.',

    // FAQ Section
    faqSectionTitle: 'الأسئلة الشائعة والإجابات 💡',
    faqQ1: 'هل أحتاج لإعطائكم كلمة سر حساسي؟',
    faqA1: 'لا على الإطلاق! نحن لا نطلب كلمة السر أبداً، فقط نحتاج اسم المستخدم (اليوزر) أو رابط المنشور المراد تزويده بالخدمة.',
    faqQ2: 'كم تستغرق الخدمة للبدء في حساسي؟',
    faqA2: 'تبدأ المعالجة فوريًا وتظهر النتايج خلال دقائق معدودة من إرسال الطلب عبر الواتساب.',
    faqQ3: 'ما هو ضمان عدم النقص في المتابعين؟',
    faqA3: 'جميع خدماتنا المزودة ببادج VIP تضمن تعويض أي نقص تلقائياً لمدة تصل إلى سنة كاملة (365 يوم).',
    faqQ4: 'كيف يتم الدفع واستكمال الطلب؟',
    faqA4: 'يتم احتساب السعر تلقائياً في المنصة، وعند الضغط على زر التأكيد يتم نسخ التفاصيل وتحويلك فوراً للواتساب للتأكيد والدفع بمرونة.',

    // Security Toast
    secRightClickToast: 'عفواً، تم تعطيل النقر الأيمن لحماية الكود والتصاميم 🔒',
    secDevToolsToast: 'عفواً، أدوات المطور والتفتيش محظورة لحماية الخصوصية والأمان 🛡️',

    // Footer
    footerDesc: 'شرح عن المنصة: ايكو فولورز ⭐ 4.9/5 هي منصة النمو الرقمي الأولى لزيادة متابعين انستغرام وتيك توك ويوتيوب وفيسبوك وتلغرام ومنصة X، بالإضافة للاشتراكات الرقمية. تنفيذ فوري، ضمان تعويض حتى 365 يوم، بدون كلمة سر، ودعم واتساب 24/7.',
    footerDevBy: 'تم التطوير بواسطة',
    footerRights: 'كافة الحقوق محفوظة لمنصة ايكو فولورز.',

    // Admin Password Modal
    adminModalTitle: 'بوابة الإدارة المشفرة 🔒',
    adminModalSub: 'يرجى إدخال كلمة المرور للوصول إلى لوحة التحكم',
    adminPassLabel: 'كلمة المرور:',
    adminPassErr: 'كلمة المرور غير صحيحة!',
    adminLoginBtn: 'تسجيل الدخول للأدمن'
  },
  en: {
    // Navigation
    platformName: 'Eco Followers',
    platformSubtitle: 'The Ultimate Social Media Growth Platform ⚡',
    navServices: 'Services & Pricing',
    navWhyUs: 'Why Us?',
    navAbout: 'About',
    navFaq: 'FAQ',
    navSupport: 'Support',
    welcomeUser: 'Welcome,',
    ipLabel: 'Device IP:',
    
    // Hero
    heroBadge: '3D Cartoon Live Server for Digital Growth',
    heroTitlePart1: 'Buy Followers for Your Accounts',
    heroTitlePart2: 'With 3D Style & High Speed',
    heroDescription: 'We provide top-quality services for followers, likes, views, and official account verifications with 100% stability.',
    heroCtaOrder: 'Select Service & Order',
    heroCtaWhatsapp: 'Direct WhatsApp Support',

    // Features Chips
    featSpeedTitle: '100% Instant Start',
    featSpeedDesc: 'Processing starts in seconds',
    featGuaranteeTitle: 'Real Refill Guarantee',
    featGuaranteeDesc: '30 to 365 days auto refill',
    featRealTitle: '3D Real Engagement',
    featRealDesc: 'Active & trustworthy accounts',
    featSecureTitle: 'No Password Needed',
    featSecureDesc: 'Only account link or username',

    // Categories
    catAll: 'All Services',
    catInstagram: 'Instagram',
    catTikTok: 'TikTok',
    catYouTube: 'YouTube',
    catFacebook: 'Facebook',
    catTelegram: 'Telegram',
    catTwitter: 'X / Twitter',
    catSubscriptions: 'Digital Subscriptions',
    sectionSocial: 'Social Media Services',
    sectionDigital: 'Digital Subscriptions',

    // Service Card
    speedLabel: 'Speed:',
    guaranteeLabel: 'Guarantee:',
    pricePer1000Label: 'Price per 1,000:',
    orderNow: 'Order Service',

    // Order Modal
    orderTitle: 'Confirm Order Details',
    quantityLabel: 'Requested Quantity:',
    minMaxLabel: 'Min - Max:',
    targetAccountLabel: 'Target Account Link / Username:',
    targetAccountPlaceholder: 'e.g. @username or post URL',
    summaryTitle: 'Cost & Delivery Summary:',
    totalPriceLabel: 'Total Price:',
    copiedSuccessAlert: 'Order text copied to clipboard! Redirecting to WhatsApp...',
    confirmWhatsappBtn: 'Confirm & Complete via WhatsApp',
    whatsappNotice: 'Opens WhatsApp at (+970598951793) with formatted order text',

    // Name Modal
    nameModalTitle: 'Welcome to 3D Digital Platform ✨',
    nameModalDesc: 'Please enter your name once on this device to link it with your device IP.',
    nameInputLabel: 'Your Full Name:',
    nameInputPlaceholder: 'e.g. Yaz Salameh',
    nameInputError: 'Please enter your name to proceed',
    nameSubmitBtn: 'Save & Continue',

    // Support Modal
    supportTitle: 'Technical Support & Special Orders',
    supportSub: 'Our team is available 24/7 to assist you',
    directWhatsappBtn: 'Direct WhatsApp',
    devInstaBtn: 'Developer Instagram',
    emailLabel: 'Contact Email:',
    phoneLabel: 'WhatsApp Phone Number:',
    subjectLabel: 'Subject:',
    messageLabel: 'Message Details:',
    messagePlaceholder: 'Type your inquiry here...',
    sendTicketBtn: 'Send Support Ticket',
    ticketSentSuccess: 'Support ticket sent successfully! We will reply promptly.',

    // FAQ Section
    faqSectionTitle: 'Frequently Asked Questions 💡',
    faqQ1: 'Do you need my account password?',
    faqA1: 'Never! We never ask for passwords. We only need your username or post URL.',
    faqQ2: 'How long does it take to start?',
    faqA2: 'Order processing begins instantly and results show up within minutes after confirming via WhatsApp.',
    faqQ3: 'What is the follower drop guarantee?',
    faqA3: 'All services with a VIP badge include auto refill for up to 365 days.',
    faqQ4: 'How do I complete payment & order?',
    faqA4: 'The price is calculated live. Clicking confirm copies the text and redirects you straight to WhatsApp for flexible payment.',

    // Security Toast
    secRightClickToast: 'Right click disabled for security & design protection 🔒',
    secDevToolsToast: 'Developer inspection tools disabled for privacy 🛡️',

    // Footer
    footerDesc: 'About: Eco Followers ⭐ 4.9/5 is the top-rated growth platform for Instagram, TikTok, YouTube, Facebook, Telegram and X followers plus digital subscriptions. Instant start, up to 365-day refill guarantee, no password needed, 24/7 WhatsApp support.',
    footerDevBy: 'Developed by',
    footerRights: 'All rights reserved for Eco Followers Platform.',

    // Admin Password Modal
    adminModalTitle: 'Encrypted Admin Portal 🔒',
    adminModalSub: 'Enter password to access control panel',
    adminPassLabel: 'Admin Password:',
    adminPassErr: 'Incorrect password!',
    adminLoginBtn: 'Login to Admin Panel'
  }
};
