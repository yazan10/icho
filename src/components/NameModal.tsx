import React, { useState } from 'react';
import type { Language } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { UserCheck, Sparkles, Shield, Wifi } from 'lucide-react';

interface NameModalProps {
  userIp: string;
  lang: Language;
  onSaveName: (name: string) => void;
}

export const NameModal: React.FC<NameModalProps> = ({ userIp, lang, onSaveName }) => {
  const t = translations[lang];
  const [nameInput, setNameInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || nameInput.trim().length < 2) {
      setError(t.nameInputError);
      return;
    }
    onSaveName(nameInput.trim());
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 dir-rtl select-none">
      <div className="max-w-md w-full cartoon-panel p-6 sm:p-8 space-y-6 relative overflow-hidden bg-white">
        
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-black text-white border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_#71717a]">
            <Sparkles className="w-8 h-8 animate-pulse text-white" />
          </div>

          <h2 className="text-2xl font-black text-black ibm-700">{t.nameModalTitle}</h2>
          <p className="text-xs font-semibold text-zinc-600 leading-relaxed">
            {t.nameModalDesc}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-black block">{t.nameInputLabel}</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                setError('');
              }}
              placeholder={t.nameInputPlaceholder}
              className="w-full px-4 py-3.5 rounded-2xl bg-zinc-100 border-3 border-black font-black text-black text-sm outline-none placeholder:text-zinc-400 shadow-[3px_3px_0px_#000000]"
              autoFocus
            />
            {error && <p className="text-xs text-red-600 font-bold pt-1">{error}</p>}
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-100 border-2 border-black flex items-center justify-between text-xs font-bold text-zinc-700">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-black" />
              <span>{t.ipLabel}</span>
            </div>
            <span className="font-mono text-black bg-white px-2 py-1 rounded-md border-2 border-black">
              {userIp || '0.0.0.0'}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 btn-cartoon-black text-sm flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>{t.nameSubmitBtn}</span>
          </button>
        </form>

        <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-zinc-500 text-center">
          <Shield className="w-3.5 h-3.5 text-black" />
          <span>3D Security & Device Identification System</span>
        </div>
      </div>
    </div>
  );
};
