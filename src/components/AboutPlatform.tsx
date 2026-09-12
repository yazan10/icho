import React from 'react';
import type { Language } from '../i18n/translations';
import { Star, BadgeCheck, Zap, ShieldCheck, Headphones, CreditCard } from 'lucide-react';

interface AboutPlatformProps {
  lang: Language;
}

function StarsRow({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 sm:w-5 sm:h-5 ${i < count ? 'fill-yellow-400 text-black' : 'text-zinc-300'}`}
        />
      ))}
    </span>
  );
}

export const AboutPlatform: React.FC<AboutPlatformProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const reviews = isAr
    ? [
        { name: 'محمد خ.', text: 'أفضل منصة جربتها لزيادة متابعين انستغرام، التنفيذ كان سريع والضمان حقيقي.', stars: 5 },
        { name: 'سارة أ.', text: 'طلبت مشتركين يوتيوب وساعات مشاهدة، كل شي وصل بثبات وتعويض تلقائي.', stars: 5 },
        { name: 'أحمد ر.', text: 'دعم الواتساب رد علي بنفس الدقيقة، والاشتراكات الرقمية أسعارها ممتازة.', stars: 5 },
      ]
    : [
        { name: 'Mohammad K.', text: 'Best panel for Instagram growth, fast start and real refill guarantee.', stars: 5 },
        { name: 'Sara A.', text: 'Ordered YouTube subs + watch hours, stable delivery with auto refill.', stars: 5 },
        { name: 'Ahmad R.', text: 'WhatsApp support replied in a minute, digital subs prices are great.', stars: 5 },
      ];

  return (
    <section id="about" aria-label={isAr ? 'شرح عن منصة ايكو فولورز' : 'About Eco Followers'} className="py-10 sm:py-14 bg-zinc-50 border-y-4 border-black scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-5 lg:px-8 space-y-8">
        {/* Header + Rating */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="cartoon-badge-white px-4 py-1.5 text-xs inline-block">
            {isAr ? '⭐ شرح عن المنصة' : '⭐ About the Platform'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-black ibm-700 leading-tight">
            {isAr ? 'ما هي منصة ايكو فولورز؟ ولماذا يقيّمها العملاء 4.9/5؟' : 'What is Eco Followers? Why do clients rate it 4.9/5?'}
          </h2>

          {/* Aggregate stars */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <StarsRow count={5} />
            <p className="text-sm font-black text-black">
              {isAr ? '4.9 من 5 — بناءً على 2,314 تقييم موثّق' : '4.9 out of 5 — based on 2,314 verified reviews'}
            </p>
          </div>
        </div>

        {/* SEO article */}
        <article className="cartoon-panel bg-white p-5 sm:p-8 space-y-4 text-sm sm:text-[15px] leading-loose font-semibold text-zinc-800">
          <p>
            {isAr ? (
              <>
                <strong className="text-black">ايكو فولورز (Eco Followers)</strong> هي منصة عربية متخصصة في{' '}
                <strong className="text-black">زيادة متابعين انستغرام، متابعين تيك توك، مشتركين يوتيوب، متابعين فيسبوك، أعضاء تلغرام ومتابعين منصة X</strong>{' '}
                بالإضافة إلى <strong className="text-black">الاشتراكات الرقمية</strong> وخدمات{' '}
                <strong className="text-black">اللايكات، المشاهدات، مشاهدات الريلز، ساعات المشاهدة وتوثيق الحسابات</strong>. نعمل بنظام سيرفرات 3D سريعة
                مع <strong className="text-black">تنفيذ فوري وضمان تعويض حتى 365 يوم</strong> وبدون طلب كلمة السر أبداً.
              </>
            ) : (
              <>
                <strong className="text-black">Eco Followers</strong> is an Arabic growth platform for{' '}
                <strong className="text-black">Instagram followers, TikTok followers, YouTube subscribers, Facebook followers, Telegram members and X followers</strong>{' '}
                plus <strong className="text-black">digital subscriptions</strong> and{' '}
                <strong className="text-black">likes, views, Reels views, watch-hours and verification</strong>. Fast 3D servers with{' '}
                <strong className="text-black">instant start and up to 365-day refill guarantee</strong> — never asking for your password.
              </>
            )}
          </p>
          <p>
            {isAr
              ? 'طريقة الطلب بسيطة: اختر القسم (خدمات السوشيال ميديا أو الاشتراكات الرقمية)، حدد الخدمة والكمية، أدخل اليوزر أو الرابط، ثم أكّد عبر الواتساب. السعر يُحتسب تلقائياً بالشيقل (₪) أو الدولار ($) مع دعم فني بشري على مدار 24/7.'
              : 'Ordering is simple: pick a department (Social Media Services or Digital Subscriptions), choose quantity, enter your username or link, then confirm via WhatsApp. Live pricing in ILS (₪) or USD ($) with 24/7 human support.'}
          </p>

          {/* Mini features for SEO keywords */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm font-bold text-black">
            <li className="flex items-center gap-2 bg-zinc-100 border-2 border-black rounded-xl px-3 py-2">
              <Zap className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'زيادة متابعين ولايكات ومشاهدات فورية' : 'Instant followers, likes & views'}</span>
            </li>
            <li className="flex items-center gap-2 bg-zinc-100 border-2 border-black rounded-xl px-3 py-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'ضمان تعويض حقيقي حتى 365 يوم' : 'Real refill guarantee up to 365 days'}</span>
            </li>
            <li className="flex items-center gap-2 bg-zinc-100 border-2 border-black rounded-xl px-3 py-2">
              <BadgeCheck className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'بدون كلمة سر — فقط اليوزر أو الرابط' : 'No password — username or link only'}</span>
            </li>
            <li className="flex items-center gap-2 bg-zinc-100 border-2 border-black rounded-xl px-3 py-2">
              <CreditCard className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'اشتراكات رقمية ودفع مرن عبر واتساب' : 'Digital subs & flexible WhatsApp payment'}</span>
            </li>
          </ul>
        </article>

        {/* Reviews with stars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <figure key={i} className="cartoon-card p-5 space-y-3">
              <StarsRow count={r.stars} />
              <blockquote className="text-xs sm:text-sm font-bold text-zinc-800 leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="flex items-center gap-2 text-xs font-black text-black">
                <span className="w-8 h-8 rounded-full bg-black text-yellow-300 flex items-center justify-center text-sm">
                  {r.name.charAt(0)}
                </span>
                <span>{r.name}</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {isAr ? 'عميل موثّق' : 'Verified'}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs font-black text-black">
          <span className="bg-white border-2 border-black rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5" /> {isAr ? 'دعم 24/7' : '24/7 support'}
          </span>
          <span className="bg-white border-2 border-black rounded-full px-3 py-1.5">+12 خدمة نشطة</span>
          <span className="bg-white border-2 border-black rounded-full px-3 py-1.5">ILS ₪ / USD $</span>
          <span className="bg-black text-yellow-300 border-2 border-black rounded-full px-3 py-1.5">⭐ 4.9/5</span>
        </div>
      </div>
    </section>
  );
};
