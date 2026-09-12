import React, { useState } from 'react';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { Lock, KeyRound, X, AlertCircle } from 'lucide-react';

interface AdminModalProps {
  lang: Language;
  onClose: () => void;
  onAuthenticate: (password: string) => boolean;
}

export const AdminModal: React.FC<AdminModalProps> = ({ lang, onClose, onAuthenticate }) => {
  const t = translations[lang];
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAuthenticate(password);
    if (!success) {
      setErrorMsg(t.adminPassErr);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[160] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 dir-rtl select-none">
      <div className="max-w-md w-full cartoon-panel p-6 sm:p-8 space-y-6 relative overflow-hidden bg-white">
        
        <div className="flex items-center justify-between border-b-3 border-black pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black text-white border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#71717a]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-black ibm-700">{t.adminModalTitle}</h2>
              <p className="text-xs font-bold text-zinc-500">{t.adminModalSub}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-zinc-100 border-2 border-black text-black shadow-[2px_2px_0px_#000000]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-black block">{t.adminPassLabel}</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="••••••••••••"
                className="w-full px-4 py-3.5 rounded-2xl bg-zinc-100 border-3 border-black text-black text-sm outline-none font-mono font-bold shadow-[3px_3px_0px_#000000]"
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-zinc-500 absolute left-4 top-4" />
            </div>
            {errorMsg && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold pt-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 btn-cartoon-black text-xs flex items-center justify-center gap-2"
          >
            {t.adminLoginBtn}
          </button>
        </form>

        <p className="text-[11px] font-bold text-zinc-500 text-center flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-zinc-400" />
          <span>نظام الإدارة مشفر ومحمي بالكامل 256-bit 🔒</span>
        </p>

      </div>
    </div>
  );
};
