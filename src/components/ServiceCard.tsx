import React from 'react';
import type { Service } from '../types';
import type { Language, Currency } from '../i18n/translations';
import { translations, exchangeRateILS } from '../i18n/translations';
import { Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { InstagramIcon, TikTokIcon, YouTubeIcon, FacebookIcon, TelegramIcon, TwitterIcon, SubscriptionsIcon } from './Icons';
import { getServiceIconComponent } from './ServiceIcons';
import { LockOpen } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  lang: Language;
  currency: Currency;
  onSelectService: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  lang,
  currency,
  onSelectService
}) => {
  const t = translations[lang];

  const getIcon = (srv: Service) => {
    // Custom icon chosen per-service from the icon library
    if (srv.iconName) {
      const CustomIcon = getServiceIconComponent(srv.iconName);
      return <CustomIcon className="w-5 h-5 text-black" />;
    }
    switch (srv.category) {
      case 'instagram': return <InstagramIcon className="w-5 h-5 text-black" />;
      case 'tiktok': return <TikTokIcon className="w-5 h-5 text-black" />;
      case 'youtube': return <YouTubeIcon className="w-5 h-5 text-black" />;
      case 'facebook': return <FacebookIcon className="w-5 h-5 text-black" />;
      case 'telegram': return <TelegramIcon className="w-5 h-5 text-black" />;
      case 'twitter': return <TwitterIcon className="w-5 h-5 text-black" />;
      case 'subscriptions': return <SubscriptionsIcon className="w-5 h-5 text-black" />;
      case 'unlock': return <LockOpen className="w-5 h-5 text-black" />;
      default: return <Zap className="w-5 h-5 text-black" />;
    }
  };

  // Price formatting: fixed price for subscriptions & unlock, per-1000 for SMM
  const isFixedPrice = service.pricingType === 'fixed' || service.category === 'subscriptions' || service.category === 'unlock';
  const serviceCurrency = service.currency || 'ILS';
  const displayPrice = isFixedPrice
    ? (serviceCurrency === 'ILS'
        ? (currency === 'ILS' ? `${service.pricePer1000} ₪` : `$${(service.pricePer1000 / exchangeRateILS).toFixed(2)}`)
        : (currency === 'USD' ? `$${service.pricePer1000}` : `${(service.pricePer1000 * exchangeRateILS).toFixed(2)} ₪`))
    : (serviceCurrency === 'ILS'
      ? (currency === 'ILS' ? `${service.pricePer1000} ₪` : `$${(service.pricePer1000 / exchangeRateILS).toFixed(2)}`)
      : (currency === 'USD' ? `$${service.pricePer1000}` : `${(service.pricePer1000 * exchangeRateILS).toFixed(2)} ₪`));

  // Numeric service ID display for SMM style
  const serviceCode = service.id.split('-').reduce((acc, part) => acc + (part.charCodeAt(0) || 0), 21000);

  return (
    <div className="h-full min-h-[340px] p-5 sm:p-6 flex flex-col justify-between space-y-5 relative group overflow-hidden bg-yellow-300 border-4 border-black rounded-[24px] shadow-[8px_8px_0px_#000000] transition-all hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_#000000]">
      
      <div className="space-y-4">
        {/* Category & Badge */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black text-amber-300 border-2 border-black text-xs font-black">
            {getIcon(service)}
            <span className="uppercase text-[11px] tracking-wider">{service.category}</span>
          </div>

          <span className="bg-black text-white px-3 py-1 text-[11px] font-black rounded-full border-2 border-black shadow-[2px_2px_0px_#000000]">
            #{serviceCode}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-black text-black ibm-700 leading-snug">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-900 font-bold leading-relaxed bg-yellow-200/90 p-3 rounded-xl border-2 border-black/80">
          {service.description}
        </p>

        {/* Features Meta */}
        <div className="space-y-2 pt-3 border-t-2 border-black text-xs font-bold text-black">
          <div className="flex items-center justify-between">
            <span className="text-zinc-800 flex items-center gap-1.5 font-bold">
              <Zap className="w-3.5 h-3.5 text-black" />
              {t.speedLabel}
            </span>
            <span className="font-extrabold text-black bg-yellow-100 px-2 py-0.5 rounded border border-black">{service.speed}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-800 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              {t.guaranteeLabel}
            </span>
            <span className="font-extrabold text-black bg-yellow-100 px-2 py-0.5 rounded border border-black">{service.guarantee}</span>
          </div>
        </div>
      </div>

      {/* Footer Price & Order Action */}
      <div className="pt-4 border-t-3 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-bold text-zinc-800 block uppercase tracking-wider">{isFixedPrice ? (lang === 'ar' ? 'السعر:' : 'Price:') : t.pricePer1000Label}</span>
          <span className="text-xl sm:text-2xl font-black text-black ibm-700 bg-white px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] inline-block">
            {displayPrice}
          </span>
        </div>

        <button
          onClick={() => onSelectService(service)}
          className="w-full sm:w-auto bg-black text-amber-300 border-3 border-black px-5 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-yellow-400 hover:text-black shadow-[4px_4px_0px_#000000] active:translate-y-0.5 transition-all"
        >
          <span>{t.orderNow}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>

    </div>
  );
};
