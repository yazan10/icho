import React, { useState } from 'react';
import type { Service, Order } from '../types';
import type { Language, Currency } from '../i18n/translations';
import { translations, exchangeRateILS } from '../i18n/translations';
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  MessageCircle,
  Send,
  ShieldCheck,
  ShoppingBag,
  Zap
} from 'lucide-react';

interface ServiceOrderFlowProps {
  service: Service;
  userName: string;
  userIp: string;
  lang: Language;
  currency: Currency;
  onBack: () => void;
  onOrderCreated: (order: Order) => void;
}

export const ServiceOrderFlow: React.FC<ServiceOrderFlowProps> = ({
  service,
  userName,
  userIp,
  lang,
  currency,
  onBack,
  onOrderCreated
}) => {
  const t = translations[lang];
  const isFixedPrice = service.pricingType === 'fixed' || service.category === 'subscriptions';
  const [step, setStep] = useState<'details' | 'invoice'>('details');
  const [quantityStr, setQuantityStr] = useState<string>(String(service.minQuantity || (isFixedPrice ? 1 : 1000)));
  const [targetAccount, setTargetAccount] = useState<string>('');
  const [copiedAlert, setCopiedAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const quantity = Math.max(1, parseInt(quantityStr) || 0);

  // Compute total: fixed (qty * unit price) for subscriptions, per-1000 for SMM
  const servicePricePer1000 = service.pricePer1000 || 32;
  const serviceCurrency = service.currency || 'ILS';

  // Total in ILS & USD
  const totalILS = isFixedPrice
    ? (serviceCurrency === 'ILS'
        ? Number((quantity * servicePricePer1000).toFixed(2))
        : Number((quantity * servicePricePer1000 * exchangeRateILS).toFixed(2)))
    : (serviceCurrency === 'ILS'
      ? Number(((quantity / 1000) * servicePricePer1000).toFixed(2))
      : Number(((quantity / 1000) * servicePricePer1000 * exchangeRateILS).toFixed(2)));

  const totalUSD = isFixedPrice
    ? (serviceCurrency === 'USD'
        ? Number((quantity * servicePricePer1000).toFixed(2))
        : Number((totalILS / exchangeRateILS).toFixed(2)))
    : (serviceCurrency === 'USD'
      ? Number(((quantity / 1000) * servicePricePer1000).toFixed(2))
      : Number((totalILS / exchangeRateILS).toFixed(2)));

  const displayTotal = currency === 'ILS' ? `${totalILS} ₪` : `$${totalUSD}`;

  const invoiceRows = [
    { label: lang === 'ar' ? 'العميل' : 'Customer', value: userName || (lang === 'ar' ? 'زائر' : 'Guest') },
    { label: lang === 'ar' ? 'IP' : 'IP', value: userIp || 'N/A' },
    { label: lang === 'ar' ? 'الخدمة' : 'Service', value: service.name },
    { label: lang === 'ar' ? 'الكمية' : 'Quantity', value: `${quantity.toLocaleString()} ${lang === 'ar' ? 'حبة' : 'units'}` },
    { label: lang === 'ar' ? 'الحساب / الرابط' : 'Account / Link', value: targetAccount || (lang === 'ar' ? 'غير محدد' : 'Not specified') },
    { label: lang === 'ar' ? 'الإجمالي' : 'Total', value: displayTotal },
  ];

  const invoiceText = `📄 فاتورة طلب من منصة ${t.platformName}
━━━━━━━━━━━━━━━━━━━━━━
👤 ${lang === 'ar' ? 'العميل' : 'Customer'}: ${userName || (lang === 'ar' ? 'زائر' : 'Guest')}
🌐 ${lang === 'ar' ? 'IP الجهاز' : 'Device IP'}: ${userIp || 'N/A'}
🚀 ${lang === 'ar' ? 'الخدمة' : 'Service'}: ${service.name}
📊 ${lang === 'ar' ? 'الكمية' : 'Quantity'}: ${quantity.toLocaleString()}
🔗 ${lang === 'ar' ? 'الحساب أو الرابط' : 'Account / link'}: ${targetAccount}
💰 ${lang === 'ar' ? 'الإجمالي' : 'Total'}: ${displayTotal} (${currency})
━━━━━━━━━━━━━━━━━━━━━━
${lang === 'ar' ? 'يرجى إرسال هذه الفاتورة في الواتساب لإكمال الدفع والطلب.' : 'Please send this invoice in WhatsApp to complete payment and order.'}`;

  const handleCreateInvoice = async () => {
    if (!targetAccount.trim()) {
      setErrorMsg(t.targetAccountPlaceholder);
      return;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(invoiceText);
      }
      setCopiedAlert(true);
    } catch {
      setCopiedAlert(false);
    }

    setStep('invoice');
  };

  const handleSendToWhatsapp = () => {
    const newOrder: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      userName: userName || (lang === 'ar' ? 'زائر' : 'Guest'),
      userIp: userIp || '0.0.0.0',
      serviceName: service.name,
      quantity,
      targetAccount,
      totalPrice: totalILS,
      status: 'pending_whatsapp',
      createdAt: new Date().toISOString()
    };

    onOrderCreated(newOrder);
    const whatsappUrl = `https://wa.me/970598951793?text=${encodeURIComponent(invoiceText)}`;
    window.open(whatsappUrl, '_blank');
    onBack();
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-black dir-rtl px-4 py-5 sm:px-6 lg:px-8 select-none">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-center justify-between gap-3 rounded-3xl border-4 border-black bg-white p-4 shadow-[6px_6px_0px_#000000]">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-2xl border-3 border-black bg-zinc-100 px-3 py-2 text-xs font-black text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{lang === 'ar' ? 'العودة' : 'Back'}</span>
          </button>

          <div className="flex items-center gap-2 text-right">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white border-2 border-black shadow-[3px_3px_0px_#71717a]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-zinc-500">{service.category}</p>
              <h1 className="text-lg font-black text-black ibm-700">{service.name}</h1>
            </div>
          </div>
        </header>

        {step === 'details' ? (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[28px] border-4 border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_#000000]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white border-2 border-black shadow-[3px_3px_0px_#71717a]">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-500">{lang === 'ar' ? 'تفاصيل الخدمة' : 'Service details'}</p>
                  <h2 className="text-xl font-black text-black ibm-700">{service.name}</h2>
                </div>
              </div>

              <div className="space-y-4 text-sm font-bold text-zinc-700">
                <p className="rounded-2xl border-2 border-black bg-zinc-50 p-3 leading-relaxed">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-2xl border-2 border-black bg-zinc-100 p-3">
                    <p className="text-zinc-500">{t.speedLabel}</p>
                    <p className="mt-1 font-black text-black">{service.speed}</p>
                  </div>
                  <div className="rounded-2xl border-2 border-black bg-zinc-100 p-3">
                    <p className="text-zinc-500">{t.guaranteeLabel}</p>
                    <p className="mt-1 font-black text-black">{service.guarantee}</p>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-black bg-black p-3 text-white">
                  <p className="text-[10px] uppercase text-zinc-300">{isFixedPrice ? (lang === 'ar' ? 'السعر:' : 'Price:') : t.pricePer1000Label}</p>
                  <p className="mt-1 text-2xl font-black ibm-700">{displayTotal}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border-4 border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_#000000]">
              <div className="mb-4 flex items-center gap-2 text-black">
                <ShieldCheck className="h-5 w-5" />
                <h2 className="text-lg font-black ibm-700">{lang === 'ar' ? 'تحديد الطلب' : 'Order setup'}</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-black text-zinc-700">{isFixedPrice ? (lang === 'ar' ? 'العدد المطلوب:' : 'Quantity:') : t.quantityLabel}</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={quantityStr}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setQuantityStr(val);
                    }}
                    onBlur={() => {
                      const num = parseInt(quantityStr) || 0;
                      const minQ = service.minQuantity || (isFixedPrice ? 1 : 1000);
                      if (num < minQ) {
                        setQuantityStr(String(minQ));
                      }
                    }}
                    placeholder={isFixedPrice ? '1' : `الحد الأدنى ${service.minQuantity || 1000}`}
                    className="w-full rounded-2xl border-3 border-black bg-zinc-100 px-4 py-3 text-base font-black text-black outline-none shadow-[3px_3px_0px_#000000]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black text-zinc-700">{t.targetAccountLabel}</label>
                  <input
                    type="text"
                    value={targetAccount}
                    onChange={(e) => {
                      setTargetAccount(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder={t.targetAccountPlaceholder}
                    className="w-full rounded-2xl border-3 border-black bg-zinc-100 px-4 py-3 text-sm font-bold text-black outline-none placeholder:text-zinc-400 shadow-[3px_3px_0px_#000000]"
                  />
                  {errorMsg && (
                    <p className="mt-2 text-xs font-black text-red-600">{errorMsg}</p>
                  )}
                </div>

                <div className="rounded-2xl border-3 border-black bg-zinc-100 p-4 text-xs font-black text-black">
                  <div className="flex items-center justify-between">
                    <span>{lang === 'ar' ? 'القيمة الأولية' : 'Starting price'}</span>
                    <span>{service.pricePer1000} $</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t-2 border-black pt-2">
                    <span>{lang === 'ar' ? 'الإجمالي المتوقع' : 'Estimated total'}</span>
                    <span className="text-base text-black ibm-700">{displayTotal}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCreateInvoice}
                  className="w-full rounded-2xl border-3 border-black bg-black px-5 py-4 text-sm font-black text-white shadow-[5px_5px_0px_#71717a]"
                >
                  <span className="flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {lang === 'ar' ? 'إنشاء الفاتورة' : 'Create invoice'}
                  </span>
                </button>
              </div>
            </section>
          </div>
        ) : (
          <section className="rounded-[28px] border-4 border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_#000000]">
            <div className="mb-5 flex items-center justify-between gap-3 border-b-3 border-black pb-4">
              <div>
                <p className="text-[10px] font-black uppercase text-zinc-500">{t.platformName}</p>
                <h2 className="text-xl font-black text-black ibm-700">{lang === 'ar' ? 'الفاتورة النهائية' : 'Final invoice'}</h2>
              </div>
              <div className="rounded-2xl border-2 border-black bg-zinc-100 px-3 py-1 text-[10px] font-black text-black">
                {lang === 'ar' ? 'جاهزة للإرسال' : 'Ready to send'}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border-3 border-black bg-zinc-100">
              <table className="w-full text-left text-[12px] font-black text-black">
                <tbody>
                  {invoiceRows.map((row) => (
                    <tr key={row.label} className="border-b border-black last:border-b-0">
                      <td className="bg-zinc-200 px-3 py-3 text-zinc-600">{row.label}</td>
                      <td className="px-3 py-3 text-black">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {copiedAlert && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border-2 border-black bg-black px-3 py-2 text-xs font-black text-white">
                <Copy className="h-4 w-4" />
                <span>{lang === 'ar' ? 'تم نسخ نص الفاتورة' : 'Invoice text copied'}</span>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="flex-1 rounded-2xl border-3 border-black bg-white px-4 py-3 text-sm font-black text-black shadow-[3px_3px_0px_#000000]"
              >
                {lang === 'ar' ? 'تعديل البيانات' : 'Edit details'}
              </button>

              <button
                type="button"
                onClick={handleSendToWhatsapp}
                className="flex-1 rounded-2xl border-3 border-black bg-black px-4 py-3 text-sm font-black text-white shadow-[5px_5px_0px_#71717a]"
              >
                <span className="flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  {lang === 'ar' ? 'إرسال في الواتساب' : 'Send via WhatsApp'}
                </span>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border-2 border-black bg-zinc-100 px-3 py-2 text-[11px] font-black text-zinc-600">
              <CheckCircle2 className="h-4 w-4 text-black" />
              <span>{lang === 'ar' ? 'سيتم فتح الواتساب تلقائياً لإكمال الدفع والطلب.' : 'WhatsApp will open automatically to complete payment and order.'}</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
