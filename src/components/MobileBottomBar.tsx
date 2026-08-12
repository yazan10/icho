import React from 'react';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { ArrowUp, Headphones, Home, ShieldCheck, Grid3X3 } from 'lucide-react';

interface MobileBottomBarProps {
  lang: Language;
  onOpenSupport: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ lang, onOpenSupport }) => {
  const t = translations[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="mx-auto w-full max-w-[520px] border-t-[3px] border-black bg-white/95 px-2 pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_0px_#000000] backdrop-blur-sm rounded-t-3xl">
        <div className="flex items-center justify-between gap-1.5">
          <a
            href="#top"
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center rounded-2xl bg-black px-1 text-[10px] font-black text-white"
          >
            <Home className="mb-1 h-4 w-4" />
            <span>الرئيسية</span>
          </a>

          <a
            href="#services"
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center rounded-2xl border-2 border-black bg-white px-1 text-[9px] font-black text-black"
          >
            <Grid3X3 className="mb-1 h-4 w-4" />
            <span>{t.navServices}</span>
          </a>

          <a
            href="#why-us"
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center rounded-2xl bg-zinc-100 px-1 text-[9px] font-black text-black"
          >
            <ShieldCheck className="mb-1 h-4 w-4" />
            <span>{t.navWhyUs}</span>
          </a>

          <button
            onClick={onOpenSupport}
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center rounded-2xl bg-zinc-900 px-1 text-[9px] font-black text-white"
          >
            <Headphones className="mb-1 h-4 w-4" />
            <span>{t.navSupport}</span>
          </button>

          <button
            onClick={scrollToTop}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-zinc-100"
            aria-label="العودة للأعلى"
          >
            <ArrowUp className="h-4 w-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
