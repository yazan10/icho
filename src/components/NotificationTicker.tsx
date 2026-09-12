import React from 'react';
import type { SystemNotification } from '../types';
import { Bell, Sparkles } from 'lucide-react';

interface NotificationTickerProps {
  notifications: SystemNotification[];
}

export const NotificationTicker: React.FC<NotificationTickerProps> = ({ notifications }) => {
  const activeNotifications = notifications.filter((n) => n.active);

  if (activeNotifications.length === 0) return null;

  // Multiply notifications if list is short to ensure seamless infinite looping without gaps
  const listToDisplay = activeNotifications.length < 3
    ? [...activeNotifications, ...activeNotifications, ...activeNotifications]
    : activeNotifications;

  const renderGroup = (groupKey: string) => (
    <div key={groupKey} className="inline-flex items-center gap-6 shrink-0 pr-6" dir="rtl">
      {listToDisplay.map((n, idx) => (
        <div key={`${groupKey}-${n.id}-${idx}`} className="inline-flex items-center gap-2.5 shrink-0 whitespace-nowrap text-xs sm:text-sm font-bold text-black">
          <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />
          <span>{n.title ? `${n.title}: ` : ''}{n.text}</span>
          <span className="text-[10px] text-zinc-600 font-mono bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 rounded font-bold">
            ({n.date})
          </span>
          <span className="text-zinc-300 mx-2 font-bold">•</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-white border-b-3 border-black py-2.5 px-4 overflow-hidden relative select-none z-20">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Fixed Title Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black text-white text-xs font-black shrink-0 border-2 border-black shadow-[2px_2px_0px_#71717a] z-10" dir="rtl">
          <Bell className="w-3.5 h-3.5 animate-bounce text-white shrink-0" />
          <span>التحديثات</span>
        </div>

        {/* Endless Seamless Marquee Track */}
        <div className="flex-1 overflow-hidden relative flex items-center" dir="ltr">
          <div className="ticker-container flex items-center whitespace-nowrap">
            {renderGroup('g1')}
            {renderGroup('g2')}
            {renderGroup('g3')}
            {renderGroup('g4')}
          </div>
        </div>
      </div>
    </div>
  );
};
