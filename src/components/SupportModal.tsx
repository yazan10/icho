import React, { useState } from 'react';
import type { SupportTicket } from '../types';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { X, Headphones, Send, Mail, Phone, CheckCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';

interface SupportModalProps {
  userName: string;
  userIp: string;
  lang: Language;
  onClose: () => void;
  onTicketCreated: (ticket: SupportTicket) => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  userName,
  userIp,
  lang,
  onClose,
  onTicketCreated
}) => {
  const t = translations[lang];
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [subject, setSubject] = useState('استفسار عن خدمة / طلب جديد');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || message.length < 5) {
      setErrorMsg('يرجى تفصيل الاستفسار بشكل أكبر');
      return;
    }

    const newTicket: SupportTicket = {
      id: 'TCK-' + Math.floor(10000 + Math.random() * 90000),
      userName: userName || 'زائر',
      userIp: userIp || '0.0.0.0',
      email: email || 'yazsalaq1@gmail.com',
      whatsapp: whatsapp || '+970598951793',
      subject,
      message,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    onTicketCreated(newTicket);
    setSentSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 dir-rtl select-none">
      <div className="max-w-md w-full cartoon-panel p-6 sm:p-8 space-y-6 relative overflow-hidden bg-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-3 border-black pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black text-white border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#71717a]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-black ibm-700">{t.supportTitle}</h2>
              <p className="text-xs text-zinc-500 font-bold">{t.supportSub}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-zinc-100 border-2 border-black text-black shadow-[2px_2px_0px_#000000]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Contact Links */}
        <div className="grid grid-cols-2 gap-2.5 text-xs font-bold">
          <a
            href="https://wa.me/970598951793"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-2xl bg-zinc-100 border-2 border-black hover:bg-zinc-200 text-black flex items-center gap-2 shadow-[2px_2px_0px_#000000]"
          >
            <Phone className="w-4 h-4 text-black shrink-0" />
            <div className="truncate">
              <span className="block font-black text-[11px]">{t.directWhatsappBtn}</span>
              <span className="font-mono text-[10px] text-zinc-600">+970598951793</span>
            </div>
          </a>

          <a
            href="https://instagram.com/yaz.salaqq"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-2xl bg-zinc-100 border-2 border-black hover:bg-zinc-200 text-black flex items-center gap-2 shadow-[2px_2px_0px_#000000]"
          >
            <InstagramIcon className="w-4 h-4 text-black shrink-0" />
            <div className="truncate">
              <span className="block font-black text-[11px]">{t.devInstaBtn}</span>
              <span className="font-mono text-[10px] text-zinc-600">@yaz.salaqq</span>
            </div>
          </a>
        </div>

        {sentSuccess ? (
          <div className="p-6 rounded-2xl bg-black text-white border-3 border-black text-center space-y-3 shadow-[4px_4px_0px_#71717a]">
            <CheckCircle className="w-12 h-12 text-white mx-auto animate-bounce" />
            <h3 className="text-lg font-black ibm-700">{t.ticketSentSuccess}</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-black text-black block">{t.emailLabel}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yazsalaq1@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black text-xs font-bold outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-black block">{t.phoneLabel}</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+970598951793"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black text-xs font-bold outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-black block">{t.subjectLabel}</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black text-xs font-bold outline-none"
              >
                <option value="استفسار عن خدمة / طلب جديد">استفسار عن خدمة / طلب جديد</option>
                <option value="طلب باقة خاصة / كمية كبيرة">طلب باقة خاصة / كمية كبيرة</option>
                <option value="مشكلة في تنفيذ طلب سابق">مشكلة في تنفيذ طلب سابق</option>
                <option value="اقتراح أو ملاحظة للمطور">اقتراح أو ملاحظة للمطور</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-black block">{t.messageLabel}</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setErrorMsg('');
                }}
                placeholder={t.messagePlaceholder}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black text-xs font-bold outline-none"
              ></textarea>
              {errorMsg && <p className="text-xs text-red-600 font-bold pt-1">{errorMsg}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 btn-cartoon-black text-xs flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{t.sendTicketBtn}</span>
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-zinc-500 text-center">
              <Mail className="w-3.5 h-3.5 text-black" />
              <span>yazsalaq1@gmail.com</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
