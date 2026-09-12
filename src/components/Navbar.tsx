import React, { useState } from 'react';
import type { Language, Currency } from '../i18n/translations';
import { translations } from '../i18n/translations';
import {
  Sparkles,
  Headphones,
  User,
  Wifi,
  Globe,
  DollarSign,
  Menu,
  X,
  Zap,
  HelpCircle,
  ShieldCheck,
  Lock,
  MessageCircle
} from 'lucide-react';

interface NavbarProps {
  userName: string;
  userIp: string;
  lang: Language;
  currency: Currency;
  onToggleLang: () => void;
  onToggleCurrency: () => void;
  onOpenSupport: () => void;
  onOpenAdminPrompt: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userName,
  userIp,
  lang,
  currency,
  onToggleLang,
  onToggleCurrency,
  onOpenSupport,
  onOpenAdminPrompt
}) => {
  const t = translations[lang];
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    const nextCount = logoClickCount + 1;
    if (nextCount >= 6) {
      setLogoClickCount(0);
      onOpenAdminPrompt();
    } else {
      setLogoClickCount(nextCount);
      setTimeout(() => {
        setLogoClickCount(0);
      }, 3000);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b-4 border-black shadow-[0_4px_0px_#000000]">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            
            {/* Logo Section */}
            <div
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 cursor-pointer select-none group min-w-0"
              title="Logo"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black text-white border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000] group-hover:translate-y-[-2px] transition-transform shrink-0">
                <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-300" />
              </div>

              <div className="min-w-0">
                <h1 className="text-sm sm:text-xl lg:text-2xl font-black text-black ibm-700 tracking-tight flex items-center gap-1.5 flex-wrap">
                  <span>{t.platformName}</span>
                  <span className="text-[8px] sm:text-[10px] px-2 py-0.5 rounded-full bg-black text-yellow-300 border-2 border-black font-bold">
                    3D PRO
                  </span>
                </h1>
                <p className="text-[9px] sm:text-[11px] font-bold text-zinc-600 truncate">{t.platformSubtitle}</p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-black">
              <a href="#services" className="hover:underline underline-offset-4 py-1">{t.navServices}</a>
              <a href="#about" className="hover:underline underline-offset-4 py-1">{t.navAbout}</a>
              <a href="#why-us" className="hover:underline underline-offset-4 py-1">{t.navWhyUs}</a>
              <a href="#faq" className="hover:underline underline-offset-4 py-1">{t.navFaq}</a>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleCurrency}
                className="px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-zinc-100 border-3 border-black font-black text-[10px] sm:text-xs text-black shadow-[2px_2px_0px_#000000] active:translate-y-[2px] transition-all flex items-center gap-1"
                title="تغيير العملة (Dollar / Shekel)"
              >
                <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{currency === 'USD' ? 'USD ($)' : 'ILS (₪)'}</span>
              </button>

              <button
                onClick={onToggleLang}
                className="hidden sm:flex px-2.5 py-2 rounded-xl bg-black text-white hover:bg-zinc-800 border-3 border-black font-black text-xs shadow-[2px_2px_0px_#71717a] transition-all items-center gap-1.5"
                title="تغيير اللغة (Arabic / English)"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              {userName && (
                <div className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 border-2 border-black text-xs font-bold text-black">
                  <User className="w-3.5 h-3.5" />
                  <span>{t.welcomeUser} {userName}</span>
                  <span className="text-zinc-400">|</span>
                  <Wifi className="w-3 h-3 text-zinc-600" />
                  <span className="font-mono text-[10px] text-zinc-500">{userIp}</span>
                </div>
              )}

              <button
                onClick={onOpenSupport}
                className="hidden sm:flex btn-cartoon-white px-3 py-2 text-xs items-center gap-1.5"
              >
                <Headphones className="w-4 h-4" />
                <span>{t.navSupport}</span>
              </button>

              {/* Mobile Hamburger Drawer Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2.5 rounded-xl bg-amber-300 border-3 border-black text-black font-black shadow-[3px_3px_0px_#000000] active:translate-y-0.5 transition-all flex items-center justify-center"
                title="القائمة الجانبية"
              >
                <Menu className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY & SIDE DRAWER (Web App Side Menu) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          
          {/* Backdrop Blur */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Slide-in Drawer Container */}
          <div className="relative w-[85%] max-w-[340px] h-full bg-yellow-300 border-l-4 border-black p-5 flex flex-col justify-between shadow-[-10px_0px_0px_#000000] overflow-y-auto animate-in slide-in-from-right duration-200">
            
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b-3 border-black pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-black text-amber-300 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-black ibm-700">{t.platformName}</h2>
                    <span className="text-[10px] font-bold text-zinc-800 bg-white px-2 py-0.5 rounded border border-black inline-block">
                      تطبيق الويب VIP
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000] active:translate-y-0.5"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              {/* User Identity Card */}
              <div className="bg-white p-3.5 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000000] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-black flex items-center gap-1.5">
                    <User className="w-4 h-4 text-black" />
                    {userName ? `${t.welcomeUser} ${userName}` : (lang === 'ar' ? 'أهلاً بك يا زائر' : 'Welcome Guest')}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-black" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-600 bg-zinc-100 p-1.5 rounded-xl border border-black">
                  <Wifi className="w-3 h-3 text-black" />
                  <span>IP: {userIp || '127.0.0.1'}</span>
                </div>
              </div>

              {/* Navigation Menu List */}
              <nav className="space-y-2.5 text-sm font-black text-black">
                <a
                  href="#services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border-3 border-black shadow-[3px_3px_0px_#000000] hover:bg-amber-100 transition-all"
                >
                  <Zap className="w-5 h-5 text-black" />
                  <span>{t.navServices}</span>
                </a>

                <a
                  href="#why-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border-3 border-black shadow-[3px_3px_0px_#000000] hover:bg-amber-100 transition-all"
                >
                  <ShieldCheck className="w-5 h-5 text-black" />
                  <span>{t.navWhyUs}</span>
                </a>

                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border-3 border-black shadow-[3px_3px_0px_#000000] hover:bg-amber-100 transition-all"
                >
                  <HelpCircle className="w-5 h-5 text-black" />
                  <span>{t.navAbout}</span>
                </a>

                <a
                  href="#faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border-3 border-black shadow-[3px_3px_0px_#000000] hover:bg-amber-100 transition-all"
                >
                  <HelpCircle className="w-5 h-5 text-black" />
                  <span>{t.navFaq}</span>
                </a>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSupport();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white border-3 border-black shadow-[3px_3px_0px_#000000] hover:bg-amber-100 transition-all text-right"
                >
                  <Headphones className="w-5 h-5 text-black" />
                  <span>{t.navSupport}</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdminPrompt();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-black text-amber-300 border-3 border-black shadow-[3px_3px_0px_#000000] transition-all text-right mt-4"
                >
                  <Lock className="w-5 h-5 text-amber-300" />
                  <span>لوحة التحكم الخاصة (Admin)</span>
                </button>
              </nav>
            </div>

            {/* Quick Currency & Language Toggles Footer */}
            <div className="space-y-3 pt-4 border-t-3 border-black">
              <div className="grid grid-cols-2 gap-2 text-xs font-black">
                <button
                  onClick={onToggleCurrency}
                  className="p-2.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center gap-1.5"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>{currency === 'USD' ? 'USD ($)' : 'ILS (₪)'}</span>
                </button>

                <button
                  onClick={onToggleLang}
                  className="p-2.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center gap-1.5"
                >
                  <Globe className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
                </button>
              </div>

              <a
                href="https://wa.me/970598951793"
                target="_blank"
                rel="noreferrer"
                className="w-full p-3 rounded-2xl bg-emerald-500 text-white border-3 border-black shadow-[3px_3px_0px_#000000] font-black text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>دعم الواتساب المباشر</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
