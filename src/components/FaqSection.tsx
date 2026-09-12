import React, { useState } from 'react';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: t.faqQ1, a: t.faqA1 },
    { q: t.faqQ2, a: t.faqA2 },
    { q: t.faqQ3, a: t.faqA3 },
    { q: t.faqQ4, a: t.faqA4 },
  ];

  return (
    <section id="faq" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
      
      <div className="text-center space-y-3">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-black text-white border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_#000000]">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-black ibm-700">
          {t.faqSectionTitle}
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="cartoon-card overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-right flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-black text-base text-black ibm-700 bg-white hover:bg-zinc-50 transition-colors"
              >
                <span className="flex items-start sm:items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-black text-white text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{faq.q}</span>
                </span>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="p-5 pt-0 border-t-2 border-black text-xs font-semibold text-zinc-700 leading-relaxed bg-zinc-50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
