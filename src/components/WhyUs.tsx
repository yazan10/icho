import React from 'react';
import type { Language } from '../i18n/translations';
import { Zap, ShieldCheck, HeartHandshake, Lock, Headphones, RefreshCw } from 'lucide-react';

interface WhyUsProps {
  lang: Language;
}

export const WhyUs: React.FC<WhyUsProps> = ({ lang }) => {
  const features = [
    {
      icon: Zap,
      title: lang === 'ar' ? 'سيرفرات 3D فائقة السرعة' : 'Ultra Fast 3D Servers',
      desc: lang === 'ar' ? 'تبدأ معالجة جميع الطلبات تلقائياً فور تأكيدها عبر الواتساب بدون أي تأخير.' : 'Automatic order processing starts immediately upon confirmation without delay.'
    },
    {
      icon: ShieldCheck,
      title: lang === 'ar' ? 'ضمان التعبئة والتعويض' : 'Refill & Replacement Guarantee',
      desc: lang === 'ar' ? 'تغطية ضمان حقيقية تصل لـ 365 يومًا لتعويض أي نقص قد يحدث.' : 'Real refill coverage up to 365 days to replace any drop automatically.'
    },
    {
      icon: Lock,
      title: lang === 'ar' ? 'أمان وخصوصية 100%' : '100% Secure & Private',
      desc: lang === 'ar' ? 'لا نطلب كلمات السر إطلاقاً، فقط اسم الحساب أو رابط التزويد.' : 'We never request your account password, only username or URL link.'
    },
    {
      icon: HeartHandshake,
      title: lang === 'ar' ? 'متابعين بحسابات حقيقية' : 'Real Active Followers',
      desc: lang === 'ar' ? 'حسابات حقيقية ونشطة تدعم ظهور حسابك بالترند وسطوح الأكسبلور.' : 'Real active profiles supporting your account growth and explore reach.'
    },
    {
      icon: Headphones,
      title: lang === 'ar' ? 'دعم فني مباشر 24/7' : '24/7 Direct Support',
      desc: lang === 'ar' ? 'فريق المطور والإدارة متواجد دائماً للرد على استفساراتك الفورية.' : 'Developer & support team available around the clock for direct help.'
    },
    {
      icon: RefreshCw,
      title: lang === 'ar' ? 'مرونة العملة والدفع' : 'Flexible Currency & Payment',
      desc: lang === 'ar' ? 'دعم التحويل الفوري بالدولار ($) والشيقل (₪) بسهولة تامة.' : 'Full support for USD ($) and ILS (₪) transactions with ease.'
    }
  ];

  return (
    <section id="why-us" className="py-10 sm:py-12 md:py-14 bg-white border-y-4 border-black scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-5 lg:px-8 space-y-8 sm:space-y-10">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="cartoon-badge px-4 py-1.5 text-xs inline-block">
            {lang === 'ar' ? 'لماذا تختار منصتنا؟' : 'Why Choose Us?'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black ibm-700">
            {lang === 'ar' ? 'معايير الجودة والأمان الرقمي ⚡' : 'Quality & Security Standards ⚡'}
          </h2>
          <p className="text-sm text-zinc-600 font-semibold">
            {lang === 'ar' ? 'نقدم لك تجربة نمو رقمي بأسلوب 3D مبتكر وبأعلى مقاييس الثبات والأمان.' : 'Experience digital growth with 3D cartoon style and highest safety standards.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="cartoon-card p-5 sm:p-6 space-y-3 min-h-[250px]">
                <div className="w-12 h-12 rounded-2xl bg-black text-white border-2 border-black flex items-center justify-center font-bold shadow-[3px_3px_0px_#71717a]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-black ibm-700">{f.title}</h3>
                <p className="text-xs text-zinc-600 font-semibold leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
