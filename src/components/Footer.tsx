import React from 'react';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { Sparkles, Mail, Phone, Shield } from 'lucide-react';
import { InstagramIcon } from './Icons';

interface FooterProps {
  lang: Language;
  onOpenSupport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenSupport }) => {
  const t = translations[lang];

  return (
    <footer className="w-full bg-black text-white border-t-4 border-black pt-12 pb-10 sm:pt-14 sm:pb-12 dir-rtl select-none">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8 space-y-8 sm:space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Col 1: Platform Branding */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-black border-2 border-white flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white ibm-700">{t.platformName} | 3D Platform Pro</h2>
            </div>

            <p className="text-xs font-semibold text-zinc-400 max-w-md leading-relaxed">
              {t.footerDesc}
            </p>

            <div className="flex items-center gap-3 text-xs font-bold text-zinc-400 pt-2">
              <span className="flex items-center gap-1 text-white">
                <Shield className="w-4 h-4 text-white" />
                <span>3D Protection & Encryption 100%</span>
              </span>
            </div>
          </div>

          {/* Col 2: Direct Contact Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-white ibm-700">معلومات التواصل المباشر</h3>
            <ul className="space-y-2.5 text-xs font-bold text-zinc-400">
              <li>
                <a
                  href="https://instagram.com/yaz.salaqq"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors min-w-0"
                >
                  <InstagramIcon className="w-4 h-4 text-white shrink-0" />
                  <span className="break-words">انستغرام المطور: yaz.salaqq</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:yazsalaq1@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors min-w-0"
                >
                  <Mail className="w-4 h-4 text-white shrink-0" />
                  <span className="break-words">البريد الإلكتروني: yazsalaq1@gmail.com</span>
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/970598951793"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors min-w-0"
                >
                  <Phone className="w-4 h-4 text-white shrink-0" />
                  <span className="break-words">الواتساب المباشر: +970598951793</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-white ibm-700">روابط المنصة</h3>
            <ul className="space-y-2 text-xs font-bold text-zinc-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">{t.navServices}</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">{t.navAbout}</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">{t.navWhyUs}</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">{t.navFaq}</a>
              </li>
              <li>
                <button onClick={onOpenSupport} className="hover:text-white transition-colors">
                  {t.navSupport}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-500">
          <p>© {new Date().getFullYear()} {t.footerRights}</p>

          <div className="flex items-center gap-1">
            <span>{t.footerDevBy}</span>
            <a
              href="https://instagram.com/yaz.salaqq"
              target="_blank"
              rel="noreferrer"
              className="font-black text-white hover:underline underline-offset-4"
            >
              yaz.salaqq
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
