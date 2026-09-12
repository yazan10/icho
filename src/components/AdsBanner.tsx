import React, { useState } from 'react';
import type { AdCampaign } from '../types';
import { Megaphone, X, Sparkles, ExternalLink } from 'lucide-react';

interface AdsBannerProps {
  ads: AdCampaign[];
}

export const AdsBanner: React.FC<AdsBannerProps> = ({ ads }) => {
  const activeAds = ads.filter((ad) => ad.active);
  const popupAd = activeAds.find((ad) => ad.type === 'popup');
  const topBannerAd = activeAds.find((ad) => ad.type === 'top_banner');
  const cardAds = activeAds.filter((ad) => ad.type === 'card_box');

  const [dismissPopup, setDismissPopup] = useState(false);
  const [dismissTopBanner, setDismissTopBanner] = useState(false);

  return (
    <>
      {/* Top 3D Cartoon Banner Ad */}
      {topBannerAd && !dismissTopBanner && (
        <div className="w-full bg-black text-white border-b-3 border-black px-4 py-2.5 text-xs sm:text-sm font-bold shadow-[0_4px_0px_#71717a] relative z-30">
          <a
            href={topBannerAd.url || 'https://wa.me/970598951793'}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 max-w-7xl mx-auto text-center sm:text-right flex-1 hover:opacity-90 transition-opacity"
          >
            <span className="px-2.5 py-0.5 rounded-full bg-white text-black border border-white text-[11px] font-black shrink-0">
              {topBannerAd.badgeText || 'إعلان مهم 📢'}
            </span>
            <span className="font-bold text-white truncate">
              {topBannerAd.title} - <span className="text-zinc-300 font-semibold">{topBannerAd.description}</span>
            </span>
          </a>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              onClick={() => setDismissTopBanner(true)}
              className="p-1 rounded-md text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {cardAds.length > 0 && (
        <section className="py-6 sm:py-8 bg-amber-50/40 border-b-4 border-black">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-black text-amber-300 text-[10px] font-black uppercase mb-1">
                  📢 إعلانات حصرية
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-black ibm-700">تابع عروض الإعلانات المميزة</h2>
              </div>
              <p className="text-xs text-zinc-600 font-semibold">اضغط على أي بطاقة لزيارة موقع العميل مباشرة.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {cardAds.map((ad) => (
                <a
                  key={ad.id}
                  href={ad.url || 'https://wa.me/970598951793'}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block rounded-[24px] border-4 border-black bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 shadow-[6px_6px_0px_#000000] hover:-translate-y-1 hover:shadow-[10px_10px_0px_#000000] transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="bg-black text-white px-4 py-2.5 border-b-3 border-black flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300">{ad.badgeText || 'إعلان'}</span>
                    {ad.discountPercentage && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-black border border-black">
                        خصم {ad.discountPercentage}%
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base sm:text-lg font-black text-black ibm-700 leading-snug group-hover:text-amber-900 transition-colors">
                      {ad.title}
                    </h3>
                    <p className="text-xs font-semibold leading-relaxed text-zinc-700">
                      {ad.description}
                    </p>
                  </div>

                  <div className="px-5 pb-5">
                    <div className="w-full py-2.5 px-3.5 rounded-xl bg-black text-white font-black text-xs flex items-center justify-between border-2 border-black group-hover:bg-amber-400 group-hover:text-black transition-all shadow-[2px_2px_0px_#71717a]">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:text-black" />
                        <span>{ad.buttonText || 'زيارة العرض'}</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3D Cartoon Modal Popup Ad */}
      {popupAd && !dismissPopup && (
        <div className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 dir-rtl select-none">
          <div className="max-w-lg w-full cartoon-panel p-6 sm:p-8 space-y-6 relative overflow-hidden bg-white">
            {/* Close Button */}
            <button
              onClick={() => setDismissPopup(true)}
              className="absolute top-4 left-4 p-2 rounded-xl bg-white hover:bg-zinc-100 border-2 border-black text-black shadow-[2px_2px_0px_#000000]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Accent */}
            <div className="w-16 h-16 rounded-2xl bg-black text-white border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_#71717a]">
              <Megaphone className="w-8 h-8 animate-bounce text-white" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="cartoon-badge px-3 py-1 text-xs">
                  {popupAd.badgeText || 'حملة إعلانية 3D'}
                </span>
                {popupAd.discountPercentage && (
                  <span className="cartoon-badge-white px-3 py-1 text-xs">
                    خصم {popupAd.discountPercentage}%
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-black text-black ibm-700 leading-snug">
                {popupAd.title}
              </h2>

              <p className="text-sm font-semibold text-zinc-600 leading-relaxed">
                {popupAd.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://wa.me/970598951793"
                target="_blank"
                rel="noreferrer"
                onClick={() => setDismissPopup(true)}
                className="flex-1 py-3.5 px-6 btn-cartoon-black text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{popupAd.buttonText}</span>
              </a>

              <button
                onClick={() => setDismissPopup(true)}
                className="py-3.5 px-6 btn-cartoon-white text-sm"
              >
                إغلاق الإعلان
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
