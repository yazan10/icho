import React, { useState } from 'react';
import type { AdCampaign, SystemNotification, BlockedIP, SupportTicket, Order, Service, ActivityLog } from '../types';
import {
  Megaphone,
  Bell,
  ShieldOff,
  Headphones,
  ShoppingBag,
  Plus,
  Trash2,
  LogOut,
  Sparkles,
  ExternalLink,
  Layers,
  Activity,
  Eye,
  Search,
  CreditCard,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface AdminDashboardProps {
  ads: AdCampaign[];
  notifications: SystemNotification[];
  blockedIPs: BlockedIP[];
  supportTickets: SupportTicket[];
  orders: Order[];
  services: Service[];
  activityLogs?: ActivityLog[];
  onUpdateAds: (ads: AdCampaign[]) => void;
  onUpdateNotifications: (notifs: SystemNotification[]) => void;
  onUpdateBlockedIPs: (ips: BlockedIP[]) => void;
  onUpdateSupportTickets: (tickets: SupportTicket[]) => void;
  onUpdateServices: (services: Service[]) => void;
  onClearActivityLogs?: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  ads,
  notifications,
  blockedIPs,
  supportTickets,
  orders,
  services,
  activityLogs = [],
  onUpdateAds,
  onUpdateNotifications,
  onUpdateBlockedIPs,
  onUpdateSupportTickets,
  onUpdateServices,
  onClearActivityLogs,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'ads' | 'notifs' | 'ip' | 'tickets' | 'orders' | 'services' | 'subs' | 'logs'>('ads');

  // Activity Log Search State
  const [logSearch, setLogSearch] = useState('');

  // Ad Form State
  const [adTitle, setAdTitle] = useState('');
  const [adDesc, setAdDesc] = useState('');
  const [adBadge, setAdBadge] = useState('عرض خاص 🔥');
  const [adDiscount] = useState<number>(20);
  const [adType, setAdType] = useState<'popup' | 'top_banner'>('popup');

  // Notif Form State
  const [notifTitle, setNotifTitle] = useState('إشعار جديد');
  const [notifText, setNotifText] = useState('');
  const [notifType] = useState<'info' | 'warning' | 'discount' | 'urgent'>('info');

  // IP Block Form State
  const [blockIpInput, setBlockIpInput] = useState('');
  const [blockReason, setBlockReason] = useState('محاولة فحص كود مصدري أو سلوك مشبوه');

  // --- SERVICE FORM STATE ---
  const [serviceForm, setServiceForm] = useState({
    category: 'instagram' as Service['category'],
    name: '',
    description: '',
    pricePer1000Str: '32',
    currency: 'ILS' as 'ILS' | 'USD',
    pricingType: 'per_1000' as 'per_1000' | 'fixed',
    minQuantityStr: '1000',
    maxQuantityStr: '100000',
    speed: '1,000 - 5,000 / يومياً',
    guarantee: 'ضمان سنة كاملة (365 يوم)',
    badge: ''
  });
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const resetServiceForm = () => {
    setServiceForm({
      category: 'instagram',
      name: '',
      description: '',
      pricePer1000Str: '32',
      currency: 'ILS',
      pricingType: 'per_1000',
      minQuantityStr: '1000',
      maxQuantityStr: '100000',
      speed: '1,000 - 5,000 / يومياً',
      guarantee: 'ضمان سنة كاملة (365 يوم)',
      badge: ''
    });
    setEditingServiceId(null);
  };

  const handleAddOrUpdateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.name.trim() || !serviceForm.description.trim()) return;

    const isFixed = serviceForm.pricingType === 'fixed' || serviceForm.category === 'subscriptions';

    const payload: Service = {
      id: editingServiceId || `SRV-${Date.now()}`,
      category: serviceForm.category,
      name: serviceForm.name.trim(),
      description: serviceForm.description.trim(),
      pricePer1000: parseFloat(serviceForm.pricePer1000Str) || (isFixed ? 25 : 32),
      currency: serviceForm.currency,
      pricingType: isFixed ? 'fixed' : 'per_1000',
      minQuantity: parseInt(serviceForm.minQuantityStr, 10) || (isFixed ? 1 : 1000),
      maxQuantity: parseInt(serviceForm.maxQuantityStr, 10) || (isFixed ? 12 : 100000),
      speed: serviceForm.speed.trim() || 'مباشر',
      guarantee: serviceForm.guarantee.trim() || 'ضمان 365 يوم',
      badge: serviceForm.badge.trim() || undefined,
      iconName: serviceForm.category
    };

    if (editingServiceId) {
      onUpdateServices(services.map((s) => (s.id === editingServiceId ? payload : s)));
    } else {
      onUpdateServices([payload, ...services]);
    }

    resetServiceForm();
  };

  const handleEditService = (service: Service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      category: service.category,
      name: service.name,
      description: service.description,
      pricePer1000Str: String(service.pricePer1000),
      currency: service.currency || 'ILS',
      pricingType: service.pricingType || (service.category === 'subscriptions' ? 'fixed' : 'per_1000'),
      minQuantityStr: String(service.minQuantity || 1000),
      maxQuantityStr: String(service.maxQuantity || 100000),
      speed: service.speed,
      guarantee: service.guarantee,
      badge: service.badge || ''
    });
  };

  const handleDeleteService = (serviceId: string) => {
    onUpdateServices(services.filter((s) => s.id !== serviceId));
    if (editingServiceId === serviceId) {
      resetServiceForm();
    }
    if (editingSubId === serviceId) {
      resetSubForm();
    }
  };

  // --- DIGITAL SUBSCRIPTION FORM STATE (dedicated quick-add) ---
  const [subForm, setSubForm] = useState({
    name: '',
    description: '',
    priceStr: '25',
    currency: 'ILS' as 'ILS' | 'USD',
    minQuantityStr: '1',
    maxQuantityStr: '12',
    speed: 'تفعيل فوري',
    guarantee: 'ضمان كامل المدة',
    badge: ''
  });
  const [editingSubId, setEditingSubId] = useState<string | null>(null);

  const resetSubForm = () => {
    setSubForm({
      name: '',
      description: '',
      priceStr: '25',
      currency: 'ILS',
      minQuantityStr: '1',
      maxQuantityStr: '12',
      speed: 'تفعيل فوري',
      guarantee: 'ضمان كامل المدة',
      badge: ''
    });
    setEditingSubId(null);
  };

  const digitalServices = services.filter((s) => s.category === 'subscriptions');

  const handleAddOrUpdateSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subForm.name.trim() || !subForm.description.trim()) return;

    const payload: Service = {
      id: editingSubId || `SUB-${Date.now()}`,
      category: 'subscriptions',
      name: subForm.name.trim(),
      description: subForm.description.trim(),
      pricePer1000: parseFloat(subForm.priceStr) || 25,
      currency: subForm.currency,
      pricingType: 'fixed',
      minQuantity: parseInt(subForm.minQuantityStr, 10) || 1,
      maxQuantity: parseInt(subForm.maxQuantityStr, 10) || 12,
      speed: subForm.speed.trim() || 'تفعيل فوري',
      guarantee: subForm.guarantee.trim() || 'ضمان كامل المدة',
      badge: subForm.badge.trim() || undefined,
      iconName: 'subscriptions'
    };

    if (editingSubId) {
      onUpdateServices(services.map((s) => (s.id === editingSubId ? payload : s)));
    } else {
      onUpdateServices([payload, ...services]);
    }

    resetSubForm();
  };

  const handleEditSub = (service: Service) => {
    setEditingSubId(service.id);
    setSubForm({
      name: service.name,
      description: service.description,
      priceStr: String(service.pricePer1000),
      currency: service.currency || 'ILS',
      minQuantityStr: String(service.minQuantity || 1),
      maxQuantityStr: String(service.maxQuantity || 12),
      speed: service.speed,
      guarantee: service.guarantee,
      badge: service.badge || ''
    });
  };

  const handleUpdatePrice = (serviceId: string, newPriceStr: string) => {
    const numPrice = parseFloat(newPriceStr) || 0;
    onUpdateServices(
      services.map((s) => (s.id === serviceId ? { ...s, pricePer1000: numPrice } : s))
    );
  };

  // --- REORDER SERVICES (up / down arrows) ---
  const handleMoveService = (serviceId: string, direction: 'up' | 'down') => {
    const idx = services.findIndex((s) => s.id === serviceId);
    if (idx === -1) return;
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= services.length) return;
    const next = [...services];
    [next[idx], next[target]] = [next[target], next[idx]];
    onUpdateServices(next);
  };

  // --- REORDER SUBSCRIPTIONS within their own section ---
  const handleMoveSub = (serviceId: string, direction: 'up' | 'down') => {
    const subIndices = services
      .map((s, i) => (s.category === 'subscriptions' ? i : -1))
      .filter((i) => i !== -1);
    const pos = subIndices.findIndex((i) => services[i].id === serviceId);
    if (pos === -1) return;
    const targetPos = direction === 'up' ? pos - 1 : pos + 1;
    if (targetPos < 0 || targetPos >= subIndices.length) return;
    const next = [...services];
    const a = subIndices[pos];
    const b = subIndices[targetPos];
    [next[a], next[b]] = [next[b], next[a]];
    onUpdateServices(next);
  };

  // --- AD HANDLERS ---
  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adTitle.trim() || !adDesc.trim()) return;

    const newAd: AdCampaign = {
      id: 'AD-' + Date.now(),
      title: adTitle,
      description: adDesc,
      badgeText: adBadge,
      discountPercentage: adDiscount,
      buttonText: 'احصل على العرض عبر الواتساب',
      active: true,
      type: adType,
      createdAt: new Date().toISOString()
    };

    onUpdateAds([newAd, ...ads]);
    setAdTitle('');
    setAdDesc('');
  };

  const handleToggleAd = (id: string) => {
    onUpdateAds(ads.map((ad) => (ad.id === id ? { ...ad, active: !ad.active } : ad)));
  };

  const handleDeleteAd = (id: string) => {
    onUpdateAds(ads.filter((ad) => ad.id !== id));
  };

  // --- NOTIFICATION HANDLERS ---
  const handleAddNotif = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifText.trim()) return;

    const newNotif: SystemNotification = {
      id: 'NOTIF-' + Date.now(),
      title: notifTitle.trim() || 'إشعار جديد',
      text: notifText,
      type: notifType,
      active: true,
      date: 'الآن'
    };

    onUpdateNotifications([newNotif, ...notifications]);
    setNotifTitle('إشعار جديد');
    setNotifText('');
  };

  const handleToggleNotif = (id: string) => {
    onUpdateNotifications(notifications.map((n) => (n.id === id ? { ...n, active: !n.active } : n)));
  };

  const handleDeleteNotif = (id: string) => {
    onUpdateNotifications(notifications.filter((n) => n.id !== id));
  };

  // --- IP BLOCK HANDLERS ---
  const handleBlockIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockIpInput.trim()) return;

    const newBlock: BlockedIP = {
      id: 'BLK-' + Date.now(),
      ip: blockIpInput.trim(),
      reason: blockReason,
      blockedAt: new Date().toLocaleDateString('ar-EG')
    };

    onUpdateBlockedIPs([newBlock, ...blockedIPs]);
    setBlockIpInput('');
  };

  const handleUnblockIp = (id: string) => {
    onUpdateBlockedIPs(blockedIPs.filter((b) => b.id !== id));
  };

  // --- TICKET HANDLERS ---
  const handleUpdateTicketStatus = (id: string, status: 'open' | 'in_progress' | 'closed') => {
    onUpdateSupportTickets(
      supportTickets.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-black dir-rtl p-4 sm:p-6 lg:p-8 select-none">
      
      {/* Top 3D Cartoon Admin Bar */}
      <header className="max-w-7xl mx-auto cartoon-panel p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-black text-white border-2 border-black flex items-center justify-center font-bold shadow-[3px_3px_0px_#71717a]">
            <Sparkles className="w-6 h-6 animate-pulse text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-black ibm-700">لوحة التحكم والإدارة الفائقة 3D</h1>
              <span className="cartoon-badge px-3 py-0.5 text-xs">
                نشط (VIP Admin)
              </span>
            </div>
            <p className="text-xs font-bold text-zinc-600">إدارة الإعلانات، الإشعارات المباشرة للمستخدمين، حظر الـ IP، وتحديث الأسعار</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="btn-cartoon-black px-5 py-3 text-xs flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>الخروج من لوحة الأدمن</span>
        </button>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="cartoon-card p-5 space-y-1">
            <span className="text-xs font-bold text-zinc-500 block">إجمالي طلبات الواتساب:</span>
            <span className="text-2xl font-black text-black ibm-700">{orders.length}</span>
          </div>

          <div className="cartoon-card p-5 space-y-1">
            <span className="text-xs font-bold text-zinc-500 block">الحملات الإعلانية:</span>
            <span className="text-2xl font-black text-black ibm-700">{ads.length}</span>
          </div>

          <div className="cartoon-card p-5 space-y-1">
            <span className="text-xs font-bold text-zinc-500 block">الأجهزة المحظورة (IPs):</span>
            <span className="text-2xl font-black text-black ibm-700">{blockedIPs.length}</span>
          </div>

          <div className="cartoon-card p-5 space-y-1">
            <span className="text-xs font-bold text-zinc-500 block">تذاكر الدعم الفني:</span>
            <span className="text-2xl font-black text-black ibm-700">{supportTickets.length}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'ads', label: 'نظام الإعلانات (Ads)', icon: Megaphone },
            { id: 'notifs', label: 'بث الإشعارات لليوزر', icon: Bell },
            { id: 'ip', label: 'حظر وفك الـ IP', icon: ShieldOff },
            { id: 'tickets', label: 'تذاكر الدعم الفني', icon: Headphones },
            { id: 'orders', label: 'سجل الطلبات', icon: ShoppingBag },
            { id: 'services', label: 'إدارة الخدمات والأسعار', icon: Layers },
            { id: 'subs', label: 'إضافة خدمات الاشتراكات 💳', icon: CreditCard },
            { id: 'logs', label: 'سجل النشاط والاحصائيات', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all shrink-0 border-3 border-black ${
                  isActive
                    ? 'bg-black text-white shadow-[4px_4px_0px_#71717a] scale-105'
                    : 'bg-white hover:bg-zinc-100 text-black shadow-[3px_3px_0px_#000000]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- TAB CONTENT: ADS SYSTEM --- */}
        {activeTab === 'ads' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="cartoon-panel p-6 space-y-4 bg-white">
              <h3 className="text-lg font-black text-black ibm-700 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>إنشاء إعلان جديد في المنصة</span>
              </h3>

              <form onSubmit={handleAddAd} className="space-y-4 text-xs font-bold">
                <div className="space-y-1">
                  <label className="text-black block">عنوان الإعلان الرئيسي:</label>
                  <input
                    type="text"
                    value={adTitle}
                    onChange={(e) => setAdTitle(e.target.value)}
                    placeholder="مثال: 🔥 خصم 40% على خدمات تيك توك اليوم"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-black block">تفاصيل الإعلان:</label>
                  <textarea
                    rows={3}
                    value={adDesc}
                    onChange={(e) => setAdDesc(e.target.value)}
                    placeholder="اكتب وصف الإعلان والشروط هنا..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-black block">نص البادج:</label>
                    <input
                      type="text"
                      value={adBadge}
                      onChange={(e) => setAdBadge(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-black block">نوع الإعلان:</label>
                    <select
                      value={adType}
                      onChange={(e) => setAdType(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    >
                      <option value="popup">نافذة منبثقة (Popup)</option>
                      <option value="top_banner">شريط أعلى الموقع (Banner)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 btn-cartoon-black text-xs"
                >
                  إطلاق الإعلان فوراً
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 cartoon-panel p-6 space-y-4 bg-white">
              <h3 className="text-lg font-black text-black ibm-700">قائمة الإعلانات النشطة ({ads.length})</h3>

              <div className="space-y-4">
                {ads.map((ad) => (
                  <div key={ad.id} className="p-4 rounded-2xl bg-zinc-100 border-2 border-black flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border border-black ${ad.active ? 'bg-black text-white' : 'bg-zinc-300 text-zinc-700'}`}>
                          {ad.active ? 'نشط الآن 🟢' : 'معطل ⚪'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white text-black font-mono border border-black text-[10px]">
                          {ad.type}
                        </span>
                        <span className="text-xs font-black text-black">{ad.badgeText}</span>
                      </div>
                      <h4 className="font-black text-sm text-black pt-1">{ad.title}</h4>
                      <p className="text-xs text-zinc-600 font-semibold">{ad.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleAd(ad.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-black ${
                          ad.active ? 'bg-white text-black' : 'bg-black text-white'
                        }`}
                      >
                        {ad.active ? 'تعطيل' : 'تفعيل'}
                      </button>

                      <button
                        onClick={() => handleDeleteAd(ad.id)}
                        className="p-2 rounded-xl bg-black text-white border-2 border-black hover:bg-zinc-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: NOTIFICATIONS BROADCAST --- */}
        {activeTab === 'notifs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="cartoon-panel p-6 space-y-4 bg-white">
              <h3 className="text-lg font-black text-black ibm-700 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>إرسال إشعار مباشر لجميع المستخدمين</span>
              </h3>

              <form onSubmit={handleAddNotif} className="space-y-4 text-xs font-bold">
                <div className="space-y-1">
                  <label className="text-black block">عنوان الإشعار:</label>
                  <input
                    type="text"
                    value={notifTitle}
                    onChange={(e) => setNotifTitle(e.target.value)}
                    placeholder="مثال: تحديث خوادم المتابعين"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-black block">نص الإشعار:</label>
                  <input
                    type="text"
                    value={notifText}
                    onChange={(e) => setNotifText(e.target.value)}
                    placeholder="مثال: 🚀 تم تزويد سرعة خوادم إنستغرام وتخفيض الأسعار!"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 btn-cartoon-black text-xs"
                >
                  بث الإشعار أعلى المنصة فوراً
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 cartoon-panel p-6 space-y-4 bg-white">
              <h3 className="text-lg font-black text-black ibm-700">شريط الإشعارات الحالية للمستخدمين ({notifications.length})</h3>

              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3.5 rounded-xl bg-zinc-100 border-2 border-black flex items-center justify-between gap-3 text-xs font-bold">
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full border border-black ${n.active ? 'bg-black animate-ping' : 'bg-zinc-400'}`}></span>
                      <span className="text-black">{n.text}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleNotif(n.id)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-black border border-black ${n.active ? 'bg-white text-black' : 'bg-black text-white'}`}
                      >
                        {n.active ? 'إيقاف' : 'تنشيط'}
                      </button>

                      <button
                        onClick={() => handleDeleteNotif(n.id)}
                        className="p-1.5 rounded-lg bg-black text-white hover:bg-zinc-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: IP BLOCK & UNBLOCK SYSTEM --- */}
        {activeTab === 'ip' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="cartoon-panel p-6 space-y-4 bg-white">
              <h3 className="text-lg font-black text-black ibm-700 flex items-center gap-2">
                <ShieldOff className="w-5 h-5" />
                <span>حظر IP جديد مباشرة</span>
              </h3>

              <form onSubmit={handleBlockIp} className="space-y-4 text-xs font-bold">
                <div className="space-y-1">
                  <label className="text-black block">عنوان الـ IP المراد حظره:</label>
                  <input
                    type="text"
                    value={blockIpInput}
                    onChange={(e) => setBlockIpInput(e.target.value)}
                    placeholder="مثال: 185.220.101.42"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 border-2 border-black text-black font-mono outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-black block">سبب الحظر:</label>
                  <input
                    type="text"
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 btn-cartoon-black text-xs"
                >
                  حظر هذا الـ IP فوراً وإغلاق المنصة عليه
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 cartoon-panel p-6 space-y-4 bg-white">
              <h3 className="text-lg font-black text-black ibm-700">قائمة عناوين الـ IP المحظورة ({blockedIPs.length})</h3>

              <div className="space-y-3">
                {blockedIPs.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-4 text-center font-bold">لا يوجد أي IP محظور حالياً.</p>
                ) : (
                  blockedIPs.map((b) => (
                    <div key={b.id} className="p-4 rounded-2xl bg-zinc-100 border-2 border-black flex items-center justify-between gap-4 text-xs font-bold">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-black text-sm bg-white px-2 py-0.5 rounded border border-black">{b.ip}</span>
                          <span className="text-[10px] text-zinc-500">({b.blockedAt})</span>
                        </div>
                        <p className="text-zinc-600 text-[11px]">{b.reason}</p>
                      </div>

                      <button
                        onClick={() => handleUnblockIp(b.id)}
                        className="px-4 py-2 btn-cartoon-white text-xs"
                      >
                        فك الحظر (Unblock)
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: SUPPORT TICKETS --- */}
        {activeTab === 'tickets' && (
          <div className="cartoon-panel p-6 space-y-4 bg-white">
            <h3 className="text-lg font-black text-black ibm-700">تذاكر الدعم الفني ({supportTickets.length})</h3>

            <div className="space-y-4">
              {supportTickets.length === 0 ? (
                <p className="text-xs text-zinc-500 py-6 text-center font-bold">لا توجد رسائل دعم حالياً.</p>
              ) : (
                supportTickets.map((t) => (
                  <div key={t.id} className="p-5 rounded-2xl bg-zinc-100 border-2 border-black space-y-3 text-xs font-bold">
                    <div className="flex items-center justify-between border-b-2 border-black pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-black text-sm">{t.userName}</span>
                        <span className="text-zinc-500 font-mono">({t.userIp})</span>
                        <span className="px-2 py-0.5 rounded-full bg-white text-black font-mono border border-black text-[10px]">
                          {t.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={t.status}
                          onChange={(e) => handleUpdateTicketStatus(t.id, e.target.value as any)}
                          className="px-3 py-1 rounded-xl bg-white border-2 border-black text-black text-xs font-bold outline-none"
                        >
                          <option value="open">مفتوحة (Open)</option>
                          <option value="in_progress">قيد المتابعة</option>
                          <option value="closed">مغلقة (Closed)</option>
                        </select>

                        <a
                          href={`https://wa.me/${t.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded-xl bg-black text-white border border-black text-xs font-bold flex items-center gap-1"
                        >
                          <span>واتساب</span>
                          <ExternalLink className="w-3 h-3 text-white" />
                        </a>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-black text-black block">الموضوع: {t.subject}</span>
                      <p className="text-zinc-800 leading-relaxed bg-white p-3 rounded-xl border border-black">
                        {t.message}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-1">
                      <span>البريد: {t.email}</span>
                      <span>التاريخ: {new Date(t.createdAt).toLocaleString('ar-EG')}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: ORDERS LOG --- */}
        {activeTab === 'orders' && (
          <div className="cartoon-panel p-6 space-y-4 bg-white">
            <h3 className="text-lg font-black text-black ibm-700">سجل طلبات الواتساب ({orders.length})</h3>

            <div className="space-y-3">
              {orders.length === 0 ? (
                <p className="text-xs text-zinc-500 py-6 text-center font-bold">لم يتم إنشاء طلبات بعد.</p>
              ) : (
                orders.map((o) => (
                  <div key={o.id} className="p-4 rounded-2xl bg-zinc-100 border-2 border-black flex items-center justify-between gap-4 text-xs font-bold">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-black text-sm">{o.serviceName}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white text-black border border-black font-mono text-[10px]">{o.id}</span>
                      </div>
                      <p className="text-zinc-600">
                        العميل: <strong className="text-black">{o.userName}</strong> ({o.userIp}) | الكمية: {o.quantity.toLocaleString()} | Target: {o.targetAccount}
                      </p>
                    </div>

                    <div className="text-left">
                      <span className="text-base font-black text-black ibm-700 block">{o.totalPrice} $</span>
                      <span className="text-[10px] text-zinc-500">{new Date(o.createdAt).toLocaleTimeString('ar-EG')}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: SERVICES & PRICES --- */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)] gap-8">
            <div className="cartoon-panel p-6 space-y-4 bg-white">
              <h3 className="text-lg font-black text-black ibm-700 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>{editingServiceId ? 'تعديل خدمة حاليّة' : 'إضافة خدمة جديدة'}</span>
              </h3>

              <form onSubmit={handleAddOrUpdateService} className="space-y-4 text-xs font-bold">
                <div className="space-y-1">
                  <label className="text-black block">اسم الخدمة:</label>
                  <input
                    type="text"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-black block">الوصف:</label>
                  <textarea
                    rows={3}
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-black block">القسم:</label>
                    <select
                      value={serviceForm.category}
                      onChange={(e) => {
                        const nextCat = e.target.value as Service['category'];
                        setServiceForm({
                          ...serviceForm,
                          category: nextCat,
                          pricingType: nextCat === 'subscriptions' ? 'fixed' : serviceForm.pricingType,
                          minQuantityStr: nextCat === 'subscriptions' && serviceForm.minQuantityStr === '1000' ? '1' : serviceForm.minQuantityStr,
                          maxQuantityStr: nextCat === 'subscriptions' && serviceForm.maxQuantityStr === '100000' ? '12' : serviceForm.maxQuantityStr,
                        });
                      }}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none font-bold"
                    >
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="youtube">YouTube</option>
                      <option value="facebook">Facebook</option>
                      <option value="telegram">Telegram</option>
                      <option value="twitter">Twitter</option>
                      <option value="subscriptions">💳 الاشتراكات الرقمية</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-black block">نوع السعر:</label>
                    <select
                      value={serviceForm.pricingType}
                      onChange={(e) => setServiceForm({ ...serviceForm, pricingType: e.target.value as 'per_1000' | 'fixed' })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none font-bold"
                    >
                      <option value="per_1000">لكل 1000 (سوشيال)</option>
                      <option value="fixed">سعر ثابت (اشتراكات)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-black block">العملة (Currency):</label>
                    <select
                      value={serviceForm.currency}
                      onChange={(e) => setServiceForm({ ...serviceForm, currency: e.target.value as 'ILS' | 'USD' })}
                      className="w-full px-3 py-2.5 rounded-xl bg-yellow-300 font-black border-2 border-black text-black outline-none"
                    >
                      <option value="ILS">الشيقل (₪ ILS)</option>
                      <option value="USD">الدولار ($ USD)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-black block">{serviceForm.pricingType === 'fixed' || serviceForm.category === 'subscriptions' ? 'السعر الثابت:' : 'السعر / 1000:'}</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={serviceForm.pricePer1000Str}
                      onChange={(e) => setServiceForm({ ...serviceForm, pricePer1000Str: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black font-black outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">

                  <div className="space-y-1">
                    <label className="text-black block">الحد الأدنى:</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={serviceForm.minQuantityStr}
                      onChange={(e) => setServiceForm({ ...serviceForm, minQuantityStr: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black font-bold outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-black block">الحد الأعلى:</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={serviceForm.maxQuantityStr}
                      onChange={(e) => setServiceForm({ ...serviceForm, maxQuantityStr: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-black block">السرعة:</label>
                    <input
                      type="text"
                      value={serviceForm.speed}
                      onChange={(e) => setServiceForm({ ...serviceForm, speed: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-black block">الضمان:</label>
                    <input
                      type="text"
                      value={serviceForm.guarantee}
                      onChange={(e) => setServiceForm({ ...serviceForm, guarantee: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-black block">بادج الخدمة (اختياري):</label>
                  <input
                    type="text"
                    value={serviceForm.badge}
                    onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                    placeholder="مثال: شائع"
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button type="submit" className="flex-1 py-3.5 px-4 btn-cartoon-black text-xs">
                    {editingServiceId ? 'حفظ التعديل' : 'إضافة الخدمة'}
                  </button>
                  {editingServiceId && (
                    <button type="button" onClick={resetServiceForm} className="px-3 py-3 rounded-xl bg-white border-2 border-black text-black text-xs font-black">
                      إلغاء
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="cartoon-panel p-6 space-y-4 bg-white">
              <h3 className="text-lg font-black text-black ibm-700">قائمة الخدمات الحالية ({services.length})</h3>

              <div className="space-y-3">
                {services.map((serv, idx) => (
                  <div key={serv.id} className="p-4 rounded-2xl bg-zinc-100 border-2 border-black space-y-3 text-xs font-bold">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-black block text-sm">{serv.name}</span>
                          {serv.badge && <span className="px-2 py-0.5 rounded-full bg-white text-black border border-black text-[10px]">{serv.badge}</span>}
                        </div>
                        <p className="text-zinc-600 text-[11px] leading-relaxed">{serv.description}</p>
                        <span className="text-zinc-500 font-mono text-[11px]">{serv.category} • {serv.speed}</span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1 bg-white rounded-xl border-2 border-black p-1">
                          <button
                            onClick={() => handleMoveService(serv.id, 'up')}
                            disabled={idx === 0}
                            title="تحريك للأعلى"
                            className="p-1.5 rounded-lg bg-zinc-100 text-black border border-black hover:bg-yellow-300 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMoveService(serv.id, 'down')}
                            disabled={idx === services.length - 1}
                            title="تحريك للأسفل"
                            className="p-1.5 rounded-lg bg-zinc-100 text-black border border-black hover:bg-yellow-300 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                        <button onClick={() => handleEditService(serv)} className="px-3 py-2 rounded-xl bg-black text-white border-2 border-black text-[11px] font-black">
                          تعديل
                        </button>
                        <button onClick={() => handleDeleteService(serv.id)} className="px-3 py-2 rounded-xl bg-white text-black border-2 border-black text-[11px] font-black">
                          حذف
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-black pt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-600">{serv.category === 'subscriptions' || serv.pricingType === 'fixed' ? 'السعر الثابت:' : 'السعر / 1000:'}</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={serv.pricePer1000}
                          onChange={(e) => handleUpdatePrice(serv.id, e.target.value)}
                          className="w-24 px-3 py-1.5 rounded-xl bg-white border-2 border-black text-black font-black text-sm outline-none"
                        />
                        <span className="text-black font-black bg-yellow-300 px-2 py-0.5 rounded border border-black">
                          {serv.currency === 'USD' ? '$ USD' : '₪ ILS'}
                        </span>
                      </div>

                      <div className="text-zinc-500 text-[11px]">
                        الحد الأدنى: {serv.minQuantity} • الحد الأعلى: {serv.maxQuantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: DIGITAL SUBSCRIPTIONS QUICK-ADD --- */}
        {activeTab === 'subs' && (
          <div className="grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)] gap-8">
            <div className="cartoon-panel p-6 space-y-4 bg-white">
              <h3 className="text-lg font-black text-black ibm-700 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <span>{editingSubId ? 'تعديل اشتراك' : 'إضافة خدمة اشتراك جديدة 💳'}</span>
              </h3>
              <p className="text-[11px] font-bold text-zinc-500 leading-relaxed">
                هذا الفورم يضيف مباشرة في قسم الاشتراكات الرقمية بسعر ثابت (بدون نظام لكل 1000).
              </p>

              <form onSubmit={handleAddOrUpdateSub} className="space-y-4 text-xs font-bold">
                <div className="space-y-1">
                  <label className="text-black block">اسم الاشتراك:</label>
                  <input
                    type="text"
                    value={subForm.name}
                    onChange={(e) => setSubForm({ ...subForm, name: e.target.value })}
                    placeholder="مثال: نتفلكس شهر - حساب خاص"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-black block">الوصف:</label>
                  <textarea
                    rows={3}
                    value={subForm.description}
                    onChange={(e) => setSubForm({ ...subForm, description: e.target.value })}
                    placeholder="مثال: حساب خاص بك، تفعيل فوري، ضمان كامل المدة..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-black block">السعر الثابت:</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={subForm.priceStr}
                      onChange={(e) => setSubForm({ ...subForm, priceStr: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black font-black outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-black block">العملة:</label>
                    <select
                      value={subForm.currency}
                      onChange={(e) => setSubForm({ ...subForm, currency: e.target.value as 'ILS' | 'USD' })}
                      className="w-full px-3 py-2.5 rounded-xl bg-yellow-300 font-black border-2 border-black text-black outline-none"
                    >
                      <option value="ILS">الشيقل (₪ ILS)</option>
                      <option value="USD">الدولار ($ USD)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-black block">الحد الأدنى (عدد):</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={subForm.minQuantityStr}
                      onChange={(e) => setSubForm({ ...subForm, minQuantityStr: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black font-bold outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-black block">الحد الأعلى (عدد):</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={subForm.maxQuantityStr}
                      onChange={(e) => setSubForm({ ...subForm, maxQuantityStr: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-black block">السرعة / التفعيل:</label>
                    <input
                      type="text"
                      value={subForm.speed}
                      onChange={(e) => setSubForm({ ...subForm, speed: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-black block">الضمان:</label>
                    <input
                      type="text"
                      value={subForm.guarantee}
                      onChange={(e) => setSubForm({ ...subForm, guarantee: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-black block">بادج (اختياري):</label>
                  <input
                    type="text"
                    value={subForm.badge}
                    onChange={(e) => setSubForm({ ...subForm, badge: e.target.value })}
                    placeholder="مثال: الأكثر طلباً 🔥"
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-black outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button type="submit" className="flex-1 py-3.5 px-4 btn-cartoon-black text-xs">
                    {editingSubId ? 'حفظ تعديل الاشتراك' : 'إضافة الاشتراك للقسم 💳'}
                  </button>
                  {editingSubId && (
                    <button type="button" onClick={resetSubForm} className="px-3 py-3 rounded-xl bg-white border-2 border-black text-black text-xs font-black">
                      إلغاء
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="cartoon-panel p-6 space-y-4 bg-white">
              <h3 className="text-lg font-black text-black ibm-700">اشتراكات القسم الحالية ({digitalServices.length})</h3>

              {digitalServices.length === 0 ? (
                <p className="text-xs text-zinc-500 py-6 text-center font-bold">لا توجد اشتراكات بعد — أضف أول اشتراك من الفورم.</p>
              ) : (
                <div className="space-y-3">
                  {digitalServices.map((serv, subIdx) => (
                    <div key={serv.id} className="p-4 rounded-2xl bg-zinc-100 border-2 border-black space-y-3 text-xs font-bold">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-black block text-sm">{serv.name}</span>
                            {serv.badge && <span className="px-2 py-0.5 rounded-full bg-white text-black border border-black text-[10px]">{serv.badge}</span>}
                          </div>
                          <p className="text-zinc-600 text-[11px] leading-relaxed">{serv.description}</p>
                          <span className="text-zinc-500 font-mono text-[11px]">subscriptions • {serv.speed}</span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1 bg-white rounded-xl border-2 border-black p-1">
                            <button
                              onClick={() => handleMoveSub(serv.id, 'up')}
                              disabled={subIdx === 0}
                              title="تحريك للأعلى"
                              className="p-1.5 rounded-lg bg-zinc-100 text-black border border-black hover:bg-yellow-300 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleMoveSub(serv.id, 'down')}
                              disabled={subIdx === digitalServices.length - 1}
                              title="تحريك للأسفل"
                              className="p-1.5 rounded-lg bg-zinc-100 text-black border border-black hover:bg-yellow-300 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                          <button onClick={() => handleEditSub(serv)} className="px-3 py-2 rounded-xl bg-black text-white border-2 border-black text-[11px] font-black">
                            تعديل
                          </button>
                          <button onClick={() => handleDeleteService(serv.id)} className="px-3 py-2 rounded-xl bg-white text-black border-2 border-black text-[11px] font-black">
                            حذف
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-black pt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-600">السعر الثابت:</span>
                          <input
                            type="text"
                            inputMode="decimal"
                            value={serv.pricePer1000}
                            onChange={(e) => handleUpdatePrice(serv.id, e.target.value)}
                            className="w-24 px-3 py-1.5 rounded-xl bg-white border-2 border-black text-black font-black text-sm outline-none"
                          />
                          <span className="text-black font-black bg-yellow-300 px-2 py-0.5 rounded border border-black">
                            {serv.currency === 'USD' ? '$ USD' : '₪ ILS'}
                          </span>
                        </div>

                        <div className="text-zinc-500 text-[11px]">
                          الحد الأدنى: {serv.minQuantity} • الحد الأعلى: {serv.maxQuantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: DETAILED ACTIVITY LOGS & VISITOR ANALYTICS --- */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            
            {/* Stats Overview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="cartoon-panel p-5 bg-amber-100 space-y-1">
                <div className="flex items-center justify-between text-black">
                  <span className="text-xs font-black">إجمالي سجلات النشاط</span>
                  <Activity className="w-5 h-5 text-black" />
                </div>
                <span className="text-3xl font-black text-black ibm-700">{activityLogs.length}</span>
              </div>

              <div className="cartoon-panel p-5 bg-white space-y-1">
                <div className="flex items-center justify-between text-black">
                  <span className="text-xs font-black">الأجهزة والـ IPs الفريدة</span>
                  <Eye className="w-5 h-5 text-black" />
                </div>
                <span className="text-3xl font-black text-black ibm-700">
                  {new Set(activityLogs.map(l => l.ip)).size}
                </span>
              </div>

              <div className="cartoon-panel p-5 bg-white space-y-1">
                <div className="flex items-center justify-between text-black">
                  <span className="text-xs font-black">مشاهدات وتفاعل الإعلانات</span>
                  <Megaphone className="w-5 h-5 text-black" />
                </div>
                <span className="text-3xl font-black text-black ibm-700">
                  {activityLogs.filter(l => l.actionType === 'ad_view' || l.actionType === 'ad_click').length}
                </span>
              </div>

              <div className="cartoon-panel p-5 bg-white space-y-1">
                <div className="flex items-center justify-between text-black">
                  <span className="text-xs font-black">طلبات خدمات الواتساب</span>
                  <ShoppingBag className="w-5 h-5 text-black" />
                </div>
                <span className="text-3xl font-black text-black ibm-700">{orders.length}</span>
              </div>
            </div>

            {/* Log Search & Filter Controls */}
            <div className="cartoon-panel p-6 bg-white space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-96">
                  <input
                    type="text"
                    value={logSearch}
                    onChange={(e) => setLogSearch(e.target.value)}
                    placeholder="ابحث بالـ IP، السلوك، أو تفاصيل النشاط..."
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-zinc-100 border-2 border-black text-xs font-bold outline-none"
                  />
                  <Search className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                {onClearActivityLogs && activityLogs.length > 0 && (
                  <button
                    onClick={onClearActivityLogs}
                    className="btn-cartoon-white px-4 py-2 text-xs flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                    <span>مسح السجلات</span>
                  </button>
                )}
              </div>

              {/* Logs Table */}
              <div className="overflow-x-auto rounded-2xl border-2 border-black">
                <table className="w-full text-right text-xs">
                  <thead className="bg-black text-amber-300 font-black">
                    <tr>
                      <th className="p-3 border-b-2 border-black">الوقت</th>
                      <th className="p-3 border-b-2 border-black">عنوان IP</th>
                      <th className="p-3 border-b-2 border-black">نوع الجهاز</th>
                      <th className="p-3 border-b-2 border-black">الإجراء</th>
                      <th className="p-3 border-b-2 border-black">التفاصيل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-black font-bold">
                    {activityLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-zinc-500 font-bold">
                          لا توجد سجلات نشاط حالياً
                        </td>
                      </tr>
                    ) : (
                      activityLogs
                        .filter(log => !logSearch || log.ip.includes(logSearch) || log.details.includes(logSearch) || log.actionType.includes(logSearch))
                        .map((log) => (
                          <tr key={log.id} className="hover:bg-amber-50">
                            <td className="p-3 font-mono text-[11px] text-zinc-600">
                              {new Date(log.timestamp).toLocaleTimeString('ar-EG')}
                            </td>
                            <td className="p-3 font-mono font-black">
                              <span className="bg-zinc-100 px-2 py-1 rounded border border-black">{log.ip}</span>
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full bg-zinc-200 text-black text-[10px]">
                                {log.deviceType === 'mobile' ? '📱 جوال' : '💻 كمبيوتر'}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="px-2.5 py-1 rounded-lg bg-black text-yellow-300 font-black text-[11px] inline-block">
                                {log.actionType === 'visit' && '👁️ زيارة موقع'}
                                {log.actionType === 'ad_view' && '📢 مشاهدة إعلان'}
                                {log.actionType === 'ad_click' && '🔥 نقر إعلان'}
                                {log.actionType === 'service_view' && '⚡ معاينة خدمة'}
                                {log.actionType === 'service_order' && '🛒 طلب خدمة'}
                                {log.actionType === 'support_ticket' && '🎧 رسالة دعم'}
                              </span>
                            </td>
                            <td className="p-3 text-zinc-800">{log.details}</td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
