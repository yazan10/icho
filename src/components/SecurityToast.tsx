import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface SecurityToastProps {
  show: boolean;
  message: string;
}

export const SecurityToast: React.FC<SecurityToastProps> = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-black text-white border-3 border-black shadow-[6px_6px_0px_#71717a] animate-bounce">
        <div className="p-1.5 rounded-xl bg-zinc-800 text-white">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs font-black tracking-wide">{message}</span>
      </div>
    </div>
  );
};
