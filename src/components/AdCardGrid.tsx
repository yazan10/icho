import React from 'react';
import type { AdCampaign } from '../types';
import { ExternalLink, Megaphone, Sparkles, ArrowLeft } from 'lucide-react';

interface AdCardGridProps {
  ads: AdCampaign[];
}

export const AdCardGrid: React.FC<AdCardGridProps> = ({ ads }) => {
  const cardAds = ads.filter((ad) => ad.active && ad.type === 'card_box');

  if (cardAds.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 bg-amber-50/50 border-y-4 border-black relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8 relative z-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-amber-300 border-2 border-black text-[11px] font-black shadow-[2px_2px_0px_#000000] mb-2">
              <Megaphone className="w-3.5 h-3.5 animate-bounce" />
              <span>مساحة الإعلانات المباشرة 📢</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black ibm-700">عروض ومواقع الرعاة المعتمدين</h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-700 font-semibold max-w-xl">
            اضغط على بطاقة الإعلان للانتقال المباشر إلى موقع المعلن أو فتح تفاصيل العرض الحصري.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {cardAds.map((ad) => (
            <a
              key={ad.id}
              href={ad.url || 'https://wa.me/970598951793'}
              target="_blank"
              rel="noreferrer"
              className="group relative block h-full rounded-[24px] border-4 border-black bg-gradient-to-br from-white via-amber-50/30 to-orange-50/50 shadow-[8px_8px_0px_#000000] transition-all hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_#000000] flex flex-col justify-between overflow-hidden"
            >
              {/* Ticket Notches */}
              <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-amber-50/50 border-3 border-black z-20 hidden sm:block" />
              <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-amber-50/50 border-3 border-black z-20 hidden sm:block" />

              {/* Top Banner Tag Header */}
              <div className="bg-black text-white px-5 py-3 border-b-3 border-black flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs font-black tracking-wide text-amber-300">
                    {ad.badgeText || 'إعلان ترويجي'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700">
                  <ExternalLink className="w-3 h-3 text-amber-300" />
                  <span>رابط خارجي</span>
                </div>
              </div>

              {/* Main Ad Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-black ibm-700 leading-snug mb-2 group-hover:text-amber-900 transition-colors">
                    {ad.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed font-semibold text-zinc-700">
                    {ad.description}
                  </p>
                </div>

                <div className="border-t-2 border-dashed border-zinc-400/80 pt-4 mt-2">
                  <div className="w-full py-3 px-4 rounded-xl bg-black text-white font-black text-xs flex items-center justify-between border-2 border-black shadow-[3px_3px_0px_#71717a] group-hover:bg-amber-400 group-hover:text-black group-hover:shadow-[4px_4px_0px_#000000] transition-all">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-300 group-hover:text-black" />
                      <span>{ad.buttonText || 'زيارة العرض الآن'}</span>
                    </span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
