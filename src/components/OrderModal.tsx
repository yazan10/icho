import React, { useState } from 'react';
import type { Service, Order } from '../types';
import type { Language, Currency } from '../i18n/translations';
import { translations, exchangeRateILS } from '../i18n/translations';
import { X, ShoppingBag, Send, ShieldCheck, Copy, AlertCircle } from 'lucide-react';

interface OrderModalProps {
  service: Service | null;
  userName: string;
  userIp: string;
  lang: Language;
  currency: Currency;
  onClose: () => void;
  onOrderCreated: (order: Order) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  service,
  userName,
  userIp,
  lang,
  currency,
  onClose,
  onOrderCreated
}) => {
  const [quantity, setQuantity] = useState<number>(service?.minQuantity || 1000);
  const [targetAccount, setTargetAccount] = useState<string>('');
  const [copiedAlert, setCopiedAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!service) return null;
  const t = translations[lang];

  const totalPriceUSD = service.pricePer1000 > 0
    ? Number(((quantity / 1000) * service.pricePer1000).toFixed(2))
    : service.pricePer1000;

  const totalPriceILS = Number((totalPriceUSD * exchangeRateILS).toFixed(2));
  const displayTotal = currency === 'USD' ? `${totalPriceUSD} $` : `${totalPriceILS} ₪`;
  const orderPreviewRows = [
    { label: lang === 'ar' ? 'العميل' : 'Customer', value: userName || (lang === 'ar' ? 'زائر' : 'Guest') },
    { label: lang === 'ar' ? 'الخدمة' : 'Service', value: service.name },
    { label: lang === 'ar' ? 'الكمية' : 'Quantity', value: `${quantity.toLocaleString()} ${lang === 'ar' ? 'حبة' : 'units'}` },
    { label: lang === 'ar' ? 'الهدف' : 'Target', value: targetAccount || (lang === 'ar' ? 'غير محدد' : 'Not specified') },
    { label: lang === 'ar' ? 'السعر' : 'Price', value: displayTotal },
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
${lang === 'ar' ? 'يرجى إرسال هذه التفاصيل للواتساب لإكمال الدفع والطلب.' : 'Please send this to WhatsApp to complete the payment and order.'}`;

  const handleConfirmOrder = async () => {
    if (!targetAccount.trim()) {
      setErrorMsg(t.targetAccountPlaceholder);
      return;
    }

    const orderText = `📌 طلب جديد من منصة ${t.platformName}:
👤 اسم العميل: ${userName || 'زائر'}
🌐 IP الجهاز: ${userIp || 'غير معرف'}
🚀 الخدمة: ${service.name}
📊 الكمية المطلوبة: ${quantity.toLocaleString()}
🔗 حساب الهدف / الرابط: ${targetAccount}
💰 السعر الإجمالي: ${displayTotal} (${currency})
---------------------------------
${lang === 'ar' ? 'يرجى تأكيد الطلب وإرسال الدفع عبر الواتساب لإكمال العملية.' : 'Please confirm the order and send payment via WhatsApp to complete the process.'}`;

    const whatsappMessage = `${invoiceText}

${lang === 'ar' ? 'أرسل هذه الفاتورة لتأكيد الحجز والدفع.' : 'Send this invoice to confirm the booking and payment.'}`;

    // 1. Copy formatted text to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(orderText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = orderText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedAlert(true);
    } catch (e) {
      console.log('Clipboard copy fallback', e);
    }

    // 2. Save order to state
    const newOrder: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      userName: userName || 'زائر',
      userIp: userIp || '0.0.0.0',
      serviceName: service.name,
      quantity,
      targetAccount,
      totalPrice: totalPriceUSD,
      status: 'pending_whatsapp',
      createdAt: new Date().toISOString()
    };
    onOrderCreated(newOrder);

    // 3. Open WhatsApp after delay
    setTimeout(() => {
      const whatsappUrl = `https://wa.me/970598951793?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 dir-rtl select-none">
      <div className="max-w-lg w-full cartoon-panel p-6 sm:p-8 space-y-6 relative overflow-hidden bg-white">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b-3 border-black pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-black text-white border-2 border-black flex items-center justify-center font-bold shadow-[3px_3px_0px_#71717a]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black text-zinc-500 uppercase block">{service.category}</span>
              <h2 className="text-lg font-black text-black ibm-700 line-clamp-1">{service.name}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-zinc-100 border-2 border-black text-black shadow-[2px_2px_0px_#000000] active:translate-y-[2px]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-5">
          
          {/* Quantity Selector */}
          {service.maxQuantity > 1 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-zinc-700 font-bold">
                <label>{t.quantityLabel}</label>
                <span className="text-zinc-500">
                  ({t.minMaxLabel} {service.minQuantity.toLocaleString()} - {service.maxQuantity.toLocaleString()})
                </span>
              </div>

              <input
                type="number"
                min={service.minQuantity}
                max={service.maxQuantity}
                step={service.minQuantity >= 1000 ? 500 : 100}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(service.minQuantity, parseInt(e.target.value) || service.minQuantity))}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-100 border-3 border-black font-black text-black text-base outline-none shadow-[3px_3px_0px_#000000]"
              />

              {/* Preset buttons */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[1000, 2500, 5000, 10000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantity(preset)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-black border-2 border-black transition-all ${
                      quantity === preset
                        ? 'bg-black text-white shadow-[2px_2px_0px_#71717a]'
                        : 'bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_#000000]'
                    }`}
                  >
                    {preset.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Target Link / Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-black block">
              {t.targetAccountLabel}
            </label>
            <input
              type="text"
              value={targetAccount}
              onChange={(e) => {
                setTargetAccount(e.target.value);
                setErrorMsg('');
              }}
              placeholder={t.targetAccountPlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-zinc-100 border-3 border-black text-black text-sm outline-none font-bold placeholder:text-zinc-400 shadow-[3px_3px_0px_#000000]"
            />
            {errorMsg && (
              <div className="flex items-center gap-1 text-xs text-red-600 font-bold pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Invoice Table Preview */}
          <div className="rounded-2xl border-3 border-black bg-zinc-100 p-3 shadow-[4px_4px_0px_#000000]">
            <div className="mb-3 flex items-center justify-between border-b-2 border-black pb-2">
              <div>
                <div className="text-[10px] font-black text-zinc-500 uppercase">{t.platformName}</div>
                <div className="text-xs font-black text-black">{lang === 'ar' ? 'فاتورة الطلب' : 'Order Invoice'}</div>
              </div>
              <div className="rounded-xl border-2 border-black bg-white px-2 py-1 text-[10px] font-black text-black">
                {lang === 'ar' ? 'قيد المعالجة' : 'Pending'}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border-2 border-black bg-white">
              <table className="w-full text-left text-[11px] font-bold text-black">
                <tbody>
                  {orderPreviewRows.map((row) => (
                    <tr key={row.label} className="border-b border-black last:border-b-0">
                      <td className="bg-zinc-100 px-3 py-2 font-black text-zinc-600">{row.label}</td>
                      <td className="px-3 py-2 font-black text-black">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 flex items-center justify-between border-t-2 border-black pt-2 text-xs font-black text-black">
              <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
              <span className="rounded-xl border-2 border-black bg-white px-2 py-1 text-sm text-black ibm-700">
                {displayTotal}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-100 border-3 border-black space-y-2 text-xs font-bold shadow-[4px_4px_0px_#000000]">
            <div className="flex justify-between items-center text-zinc-700">
              <span>{t.speedLabel}</span>
              <span className="font-black text-black">{service.speed}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-700">
              <span>{t.guaranteeLabel}</span>
              <span className="font-black text-black">{service.guarantee}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t-2 border-black text-sm font-black text-black">
              <span>{t.totalPriceLabel}</span>
              <span className="text-xl font-black text-black ibm-700 bg-white px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000]">
                {displayTotal}
              </span>
            </div>
          </div>

          {/* Copied Feedback Alert */}
          {copiedAlert && (
            <div className="p-3 rounded-xl bg-black text-white border-2 border-black text-xs font-bold flex items-center gap-2 animate-bounce">
              <Copy className="w-4 h-4 text-white" />
              <span>{t.copiedSuccessAlert}</span>
            </div>
          )}

          {/* Action Button */}
          <button
            type="button"
            onClick={handleConfirmOrder}
            className="w-full py-4 px-6 btn-cartoon-black text-sm flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إرسال الفاتورة في الواتساب لإكمال الدفع والطلب' : 'Send Invoice in WhatsApp to complete payment & order'}</span>
          </button>

          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-zinc-500 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-black" />
            <span>{t.whatsappNotice}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
