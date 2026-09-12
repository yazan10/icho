import React from 'react';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { Sparkles, ShieldCheck, Zap, MessageCircle, TrendingUp, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  userName: string;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ userName, lang }) => {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden py-10 sm:py-14 md:py-16 lg:py-20 bg-zinc-50 border-b-4 border-black">
      
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8 text-center space-y-6 sm:space-y-8">
        
        {/* Top 3D Cartoon Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-3 border-black text-black text-[11px] sm:text-xs md:text-sm font-black shadow-[4px_4px_0px_#000000]">
          <Sparkles className="w-4 h-4 text-black animate-pulse" />
          <span>{t.heroBadge}</span>
        </div>

        {/* Hero Title with IBM Plex Sans Arabic Weight 700 */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black ibm-700 leading-[1.1] tracking-tight">
            {t.heroTitlePart1} <br />
            <span className="inline-block px-4 py-1 mt-2 bg-black text-white rounded-2xl border-3 border-black shadow-[5px_5px_0px_#71717a]">
              {t.heroTitlePart2}
            </span>
          </h1>

          <p className="text-zinc-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
            {userName ? `${t.welcomeUser} ${userName}! ` : ''}
            {t.heroDescription}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1">
          <a
            href="#services"
            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 btn-cartoon-black text-sm sm:text-base flex items-center justify-center gap-2 group"
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:animate-bounce" />
            <span>{t.heroCtaOrder}</span>
          </a>

          <a
            href="https://wa.me/970598951793"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 btn-cartoon-white text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            <span>{t.heroCtaWhatsapp}</span>
          </a>
        </div>

        {/* 3D Cartoon Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto pt-6 sm:pt-8">
          <div className="p-5 cartoon-card text-right space-y-2">
            <div className="w-10 h-10 rounded-xl bg-black text-white border-2 border-black flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-black text-sm ibm-700">{t.featSpeedTitle}</h3>
            <p className="text-xs text-zinc-600 font-semibold">{t.featSpeedDesc}</p>
          </div>

          <div className="p-5 cartoon-card text-right space-y-2">
            <div className="w-10 h-10 rounded-xl bg-black text-white border-2 border-black flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-black text-sm ibm-700">{t.featGuaranteeTitle}</h3>
            <p className="text-xs text-zinc-600 font-semibold">{t.featGuaranteeDesc}</p>
          </div>

          <div className="p-5 cartoon-card text-right space-y-2">
            <div className="w-10 h-10 rounded-xl bg-black text-white border-2 border-black flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-black text-sm ibm-700">{t.featRealTitle}</h3>
            <p className="text-xs text-zinc-600 font-semibold">{t.featRealDesc}</p>
          </div>

          <div className="p-5 cartoon-card text-right space-y-2">
            <div className="w-10 h-10 rounded-xl bg-black text-white border-2 border-black flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-black text-sm ibm-700">{t.featSecureTitle}</h3>
            <p className="text-xs text-zinc-600 font-semibold">{t.featSecureDesc}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
