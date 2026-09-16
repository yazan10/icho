import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { SERVICE_ICONS, SERVICE_ICON_GROUPS, getServiceIconComponent } from './ServiceIcons';

interface IconPickerProps {
  value?: string;
  onChange: (key: string) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SERVICE_ICONS;
    return SERVICE_ICONS.filter(
      (e) =>
        e.label.toLowerCase().includes(q) ||
        e.labelEn.toLowerCase().includes(q) ||
        e.key.toLowerCase().includes(q)
    );
  }, [query]);

  const groups = useMemo(() => {
    const out: Record<string, typeof SERVICE_ICONS> = {};
    filtered.forEach((e) => {
      if (!out[e.group]) out[e.group] = [];
      out[e.group].push(e);
    });
    return out;
  }, [filtered]);

  const SelectedIcon = getServiceIconComponent(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-11 h-11 rounded-xl bg-black text-yellow-300 border-2 border-black flex items-center justify-center shrink-0">
          <SelectedIcon className="w-5 h-5" />
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن أيقونة: نتفلكس، تيك توك، سبوتيفاي..."
            className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-xs font-bold text-black outline-none placeholder:text-zinc-400"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="max-h-56 overflow-y-auto rounded-xl border-2 border-black bg-zinc-50 p-2 space-y-3">
        {Object.keys(groups).length === 0 && (
          <p className="text-[11px] font-bold text-zinc-500 text-center py-4">لا توجد أيقونة مطابقة للبحث.</p>
        )}
        {(Object.keys(groups) as Array<keyof typeof SERVICE_ICON_GROUPS>).map((g) => (
          <div key={g} className="space-y-1.5">
            <p className="text-[10px] font-black text-zinc-500 px-1">{SERVICE_ICON_GROUPS[g].ar}</p>
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5">
              {groups[g].map((entry) => {
                const Icon = entry.Component;
                const isActive = value === entry.key;
                return (
                  <button
                    key={entry.key}
                    type="button"
                    title={entry.label}
                    onClick={() => onChange(entry.key)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                      isActive
                        ? 'bg-black text-yellow-300 border-black shadow-[2px_2px_0px_#71717a]'
                        : 'bg-white text-black border-zinc-300 hover:border-black'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[8px] font-black leading-tight text-center truncate w-full">{entry.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
