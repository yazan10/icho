import React from 'react';
import { Lock, ShieldOff, Mail, Phone } from 'lucide-react';

interface SecurityLockScreenProps {
  ip: string;
}

export const SecurityLockScreen: React.FC<SecurityLockScreenProps> = ({ ip }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-white flex items-center justify-center p-4 dir-rtl select-none">
      <div className="max-w-md w-full cartoon-panel p-8 text-center space-y-6 bg-white shadow-[10px_10px_0px_#000000]">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-black text-white border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_#71717a]">
          <ShieldOff className="w-10 h-10 animate-pulse text-white" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-black ibm-700">تم حظر وصول هذا الجهاز من المنصة</h1>
          <p className="text-xs font-semibold text-zinc-600">
            تم رصد نشاط مريب أو انتهاك لقواعد أمان 3D الخاصة بالمنصة من عنوان الـ IP الخاص بك.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-100 border-2 border-black space-y-1 text-xs font-bold text-zinc-800">
          <div className="flex justify-between items-center text-zinc-600">
            <span>عنوان الـ IP المحظور:</span>
            <span className="font-mono text-black font-black bg-white px-2 py-0.5 rounded border border-black">{ip}</span>
          </div>
          <div className="flex justify-between items-center text-zinc-600">
            <span>حالة الوصول:</span>
            <span className="text-black font-black">محظور دائم (Blocked)</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold text-zinc-500">يرجى التواصل مع فريق الدعم الفني لفك الحظر:</p>
          
          <div className="flex flex-col gap-2">
            <a
              href="mailto:yazsalaq1@gmail.com"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border-2 border-black hover:bg-zinc-100 text-black text-xs font-black shadow-[2px_2px_0px_#000000]"
            >
              <Mail className="w-4 h-4 text-black" />
              <span>البريد الإلكتروني: yazsalaq1@gmail.com</span>
            </a>
            
            <a
              href="https://wa.me/970598951793"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 btn-cartoon-black text-xs"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>الواتساب الفوري (+970598951793)</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-zinc-400 pt-4 border-t-2 border-black">
          <Lock className="w-3.5 h-3.5" />
          <span>نظام أمان 3D المحمي بالكامل</span>
        </div>
      </div>
    </div>
  );
};
