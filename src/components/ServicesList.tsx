import React, { useState, useMemo, useRef } from 'react';
import type { Service } from '../types';
import type { Language, Currency } from '../i18n/translations';
import { translations, exchangeRateILS } from '../i18n/translations';
import { ServiceCard } from './ServiceCard';
import {
  Grid,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Zap,
  Star,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import {
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  SubscriptionsIcon
} from './Icons';

interface ServicesListProps {
  services: Service[];
  lang: Language;
  currency: Currency;
  onSelectService: (service: Service) => void;
}

export const ServicesList: React.FC<ServicesListProps> = ({
  services,
  lang,
  currency,
  onSelectService
}) => {
  const t = translations[lang];

  // Main Departments: social media services vs digital subscriptions
  const [mainSection, setMainSection] = useState<'social' | 'digital'>('social');

  // Top Tabs State matching SMM Panel ( طلب جديد | الاشتراكات | قائمة المفضلة )
  const [activeTab, setActiveTab] = useState<'new_order' | 'subscriptions' | 'favorites'>('new_order');

  // Display Mode: 'smm_panel' (default as per screenshot) or 'yellow_cards'
  const [viewMode, setViewMode] = useState<'smm_panel' | 'yellow_cards'>('smm_panel');

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Active selected service in the panel dropdown
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || '');
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState<boolean>(false);

  // Quick Order Inputs inside panel
  const [panelQuantity, setPanelQuantity] = useState<number>(1000);
  const [panelTarget, setPanelTarget] = useState<string>('');

  // Favorites list state
  const [favorites, setFavorites] = useState<string[]>([]);

  // Category Options - Social only (subscriptions have their own department)
  const categories = [
    { id: 'all', label: lang === 'ar' ? 'جميع الأقسام والشبكات' : 'All Networks', icon: Grid },
    { id: 'instagram', label: lang === 'ar' ? 'إنستغرام [متابعين - لايكات - مشاهدات]' : 'Instagram Packages', icon: InstagramIcon },
    { id: 'tiktok', label: lang === 'ar' ? 'تيك توك [متابعين - مشاهدات - بث مباشر]' : 'TikTok Packages', icon: TikTokIcon },
    { id: 'youtube', label: lang === 'ar' ? 'يوتيوب [مشتركين - ساعات مشاهدة]' : 'YouTube Packages', icon: YouTubeIcon },
    { id: 'facebook', label: lang === 'ar' ? 'فيسبوك [متابعين صفحة - إعجابات]' : 'Facebook Packages', icon: FacebookIcon },
    { id: 'telegram', label: lang === 'ar' ? 'تلغرام [أعضاء - أعضاء مجموعات]' : 'Telegram Members', icon: TelegramIcon },
    { id: 'twitter', label: lang === 'ar' ? 'تويتر / منصة X [متابعين - تفاعل]' : 'Twitter / X Followers', icon: TwitterIcon },
  ];

  // Split departments
  const socialServices = useMemo(() => services.filter((s) => s.category !== 'subscriptions'), [services]);
  const digitalServices = useMemo(() => services.filter((s) => s.category === 'subscriptions'), [services]);

  const filteredDigitalServices = useMemo(() => {
    return digitalServices.filter((s) => {
      if (!searchQuery.trim()) return true;
      return (
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [digitalServices, searchQuery]);

  // Helper for Numeric Service Code
  const getServiceCode = (id: string) => {
    return id.split('-').reduce((acc, part) => acc + (part.charCodeAt(0) || 0), 21500);
  };

  // Filtered Services List based on search and category (social department only)
  const filteredServices = useMemo(() => {
    return socialServices.filter((s) => {
      const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
      const codeStr = getServiceCode(s.id).toString();
      const matchSearch = !searchQuery.trim() ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        codeStr.includes(searchQuery.trim());
      return matchCat && matchSearch;
    });
  }, [socialServices, selectedCategory, searchQuery]);

  // Current Active Service object
  const activeService = useMemo(() => {
    return socialServices.find(s => s.id === selectedServiceId) || filteredServices[0] || socialServices[0];
  }, [socialServices, selectedServiceId, filteredServices]);

  // Price calculations
  const calculatePrice = (srv: Service, qty: number) => {
    const usd = srv.pricePer1000 > 0 ? Number(((qty / 1000) * srv.pricePer1000).toFixed(2)) : srv.pricePer1000;
    const ils = Number((usd * exchangeRateILS).toFixed(2));
    return { usd, ils };
  };

  const activePrices = activeService ? calculatePrice(activeService, panelQuantity) : { usd: 0, ils: 0 };
  const displayPriceText = currency === 'USD' ? `${activePrices.usd} $` : `${activePrices.ils} ₪`;

  // Toggle Favorite
  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  // Horizontal Scroll Refs & Mouse Drag Handlers
  const catScrollRef = useRef<HTMLDivElement>(null);
  const tabScrollRef = useRef<HTMLDivElement>(null);

  const [isCatDragging, setIsCatDragging] = useState(false);
  const [catStartX, setCatStartX] = useState(0);
  const [catScrollLeft, setCatScrollLeft] = useState(0);

  const [isTabDragging, setIsTabDragging] = useState(false);
  const [tabStartX, setTabStartX] = useState(0);
  const [tabScrollLeft, setTabScrollLeft] = useState(0);

  const handleCatMouseDown = (e: React.MouseEvent) => {
    if (!catScrollRef.current) return;
    setIsCatDragging(true);
    setCatStartX(e.pageX - catScrollRef.current.offsetLeft);
    setCatScrollLeft(catScrollRef.current.scrollLeft);
  };

  const handleCatMouseUpOrLeave = () => {
    setIsCatDragging(false);
  };

  const handleCatMouseMove = (e: React.MouseEvent) => {
    if (!isCatDragging || !catScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - catScrollRef.current.offsetLeft;
    const walk = (x - catStartX) * 2;
    catScrollRef.current.scrollLeft = catScrollLeft - walk;
  };

  const handleTabMouseDown = (e: React.MouseEvent) => {
    if (!tabScrollRef.current) return;
    setIsTabDragging(true);
    setTabStartX(e.pageX - tabScrollRef.current.offsetLeft);
    setTabScrollLeft(tabScrollRef.current.scrollLeft);
  };

  const handleTabMouseUpOrLeave = () => {
    setIsTabDragging(false);
  };

  const handleTabMouseMove = (e: React.MouseEvent) => {
    if (!isTabDragging || !tabScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabScrollRef.current.offsetLeft;
    const walk = (x - tabStartX) * 2;
    tabScrollRef.current.scrollLeft = tabScrollLeft - walk;
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-8 sm:py-12 max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8 space-y-6 scroll-mt-20 select-none">
      
      {/* 0. MAIN DEPARTMENTS SWITCHER: Social Media vs Digital Subscriptions */}
      <div className="bg-white rounded-[24px] border-4 border-black p-3.5 sm:p-4 shadow-[6px_6px_0px_#000000] space-y-3">
        <div className="flex items-center gap-2 px-1">
          <span className="w-2.5 h-2.5 rounded-full bg-black border border-black animate-pulse" />
          <h2 className="text-sm sm:text-base md:text-lg font-black text-black ibm-700 tracking-tight">
            {lang === 'ar' ? 'أقسام المنصة' : 'Platform Departments'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setMainSection('social')}
            className={`px-5 py-3.5 rounded-2xl text-sm sm:text-base font-black border-3 border-black transition-all flex items-center justify-center gap-2 ${
              mainSection === 'social'
                ? 'bg-black text-yellow-300 shadow-[4px_4px_0px_#71717a] scale-[1.02]'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{lang === 'ar' ? 'خدمات السوشيال ميديا' : 'Social Media Services'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-400 text-black border border-black">{socialServices.length}</span>
          </button>
          <button
            onClick={() => setMainSection('digital')}
            className={`px-5 py-3.5 rounded-2xl text-sm sm:text-base font-black border-3 border-black transition-all flex items-center justify-center gap-2 ${
              mainSection === 'digital'
                ? 'bg-black text-yellow-300 shadow-[4px_4px_0px_#71717a] scale-[1.02]'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
            }`}
          >
            <SubscriptionsIcon className="w-5 h-5" />
            <span>{lang === 'ar' ? 'الاشتراكات الرقمية' : 'Digital Subscriptions'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-400 text-black border border-black">{digitalServices.length}</span>
          </button>
        </div>
      </div>

      {mainSection === 'digital' ? (
        /* ================= DIGITAL SUBSCRIPTIONS DEPARTMENT (managed from Admin) ================= */
        <div className="space-y-5">
          <div className="bg-white rounded-[28px] border-4 border-black p-5 sm:p-7 shadow-[8px_8px_0px_#000000] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black text-yellow-300 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#71717a]">
                <SubscriptionsIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-black ibm-700">
                  {lang === 'ar' ? 'قسم الاشتراكات الرقمية 💳' : 'Digital Subscriptions 💳'}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 font-bold">
                  {lang === 'ar'
                    ? 'اشتراكات التطبيقات والمنصات الرقمية - تضاف وتدار من لوحة الأدمن'
                    : 'App & platform subscriptions - added via Admin panel'}
                </p>
              </div>
            </div>
          </div>

          {filteredDigitalServices.length === 0 ? (
            <div className="bg-yellow-100 rounded-[28px] border-4 border-black p-8 sm:p-10 text-center space-y-3 shadow-[8px_8px_0px_#000000]">
              <SubscriptionsIcon className="w-12 h-12 text-zinc-400 mx-auto" />
              <p className="text-base font-black text-black">
                {lang === 'ar' ? 'لا توجد اشتراكات رقمية بعد' : 'No digital subscriptions yet'}
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 font-bold max-w-md mx-auto">
                {lang === 'ar'
                  ? 'هذا القسم فارغ حالياً. يمكنك إضافة اشتراكات جديدة من لوحة الأدمن ← تبويب (إضافة خدمات الاشتراكات 💳).'
                  : 'This section is empty. Add new items from Admin → Subscriptions tab.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredDigitalServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  lang={lang}
                  currency={currency}
                  onSelectService={onSelectService}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
      <>
      {/* 1. TOP TAB NAVIGATION BAR (طلب جديد | الاشتراكات | قائمة المفضلة) - MATCHING SCREENSHOT EXACTLY */}
      <div className="bg-white rounded-[24px] border-4 border-black p-3.5 sm:p-4 shadow-[6px_6px_0px_#000000] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-auto space-y-2">
          {/* Section Heading Badge */}
          <div className="flex items-center gap-2 px-1 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-black animate-pulse" />
            <h2 className="text-sm sm:text-base md:text-lg font-black text-black ibm-700 tracking-tight">
              {lang === 'ar' ? 'قم بتكبير حساباتك من هنا' : 'Grow Your Accounts From Here'}
            </h2>
          </div>

          <div
            ref={tabScrollRef}
            onMouseDown={handleTabMouseDown}
            onMouseLeave={handleTabMouseUpOrLeave}
            onMouseUp={handleTabMouseUpOrLeave}
            onMouseMove={handleTabMouseMove}
            className={`flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none touch-pan-x select-none scroll-smooth cursor-grab active:cursor-grabbing ${
              isTabDragging ? 'cursor-grabbing' : ''
            }`}
          >
            {/* Tab 1: طلب جديد (Highlighted Yellow as in Screenshot) */}
            <button
              onClick={() => setActiveTab('new_order')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black border-3 border-black transition-all shrink-0 flex items-center gap-2 ${
                activeTab === 'new_order'
                  ? 'bg-yellow-400 text-black shadow-[4px_4px_0px_#000000] scale-105'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span>{lang === 'ar' ? 'طلب جديد' : 'New Order'}</span>
            </button>

            {/* Tab 2: الاشتراكات */}
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black border-3 border-black transition-all shrink-0 flex items-center gap-2 ${
                activeTab === 'subscriptions'
                  ? 'bg-yellow-400 text-black shadow-[4px_4px_0px_#000000] scale-105'
                  : 'bg-amber-50 hover:bg-amber-100 text-zinc-900'
              }`}
            >
              <Layers className="w-4 h-4 text-black" />
              <span>{lang === 'ar' ? 'الاشتراكات' : 'Subscriptions'}</span>
            </button>

            {/* Tab 3: قائمة المفضلة */}
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black border-3 border-black transition-all shrink-0 flex items-center gap-2 ${
                activeTab === 'favorites'
                  ? 'bg-yellow-400 text-black shadow-[4px_4px_0px_#000000] scale-105'
                  : 'bg-amber-50 hover:bg-amber-100 text-zinc-900'
              }`}
            >
              <Star className="w-4 h-4 text-black" />
              <span>{lang === 'ar' ? 'قائمة المفضلة' : 'Favorites List'}</span>
              {favorites.length > 0 && (
                <span className="bg-black text-amber-300 px-2 py-0.5 rounded-full text-[10px]">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Arrows Helper for Tabs */}
          <div className="flex sm:hidden items-center justify-between px-1">
            <button
              type="button"
              onClick={() => scrollContainer(tabScrollRef, 'right')}
              className="p-1.5 rounded-lg bg-yellow-300 text-black border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-yellow-400"
              title="سحب لليسار"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-black text-black">اسحب للتنقل بين الأقسام 👈 👉</span>
            <button
              type="button"
              onClick={() => scrollContainer(tabScrollRef, 'left')}
              className="p-1.5 rounded-lg bg-yellow-300 text-black border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-yellow-400"
              title="سحب لليمين"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setViewMode(viewMode === 'smm_panel' ? 'yellow_cards' : 'smm_panel')}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-black text-amber-300 font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000000] hover:bg-yellow-400 hover:text-black transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {viewMode === 'smm_panel'
                ? (lang === 'ar' ? 'عرض الكروت الصفراء 🎴' : 'Yellow Cards View 🎴')
                : (lang === 'ar' ? 'عرض السيرفر المباشر SMM 📋' : 'SMM Panel View 📋')}
            </span>
          </button>
        </div>
      </div>

      {/* SEARCH BAR (MATCHING SCREENSHOT) */}
      <div className="relative">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-zinc-500">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === 'ar' ? 'ابحث عن اسم الخدمة أو الكود أو الشبكة...' : 'Search service name, ID, or network...'}
          className="w-full bg-white text-black font-bold text-sm sm:text-base pr-12 pl-4 py-3.5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000000] outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-zinc-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-zinc-200 text-black px-2 py-0.5 rounded-lg text-xs font-black"
          >
            مسح
          </button>
        )}
      </div>


      {/* MAIN CONTENT AREA BASED ON VIEW MODE */}
      {viewMode === 'smm_panel' && activeTab === 'new_order' ? (
        
        /* ================= SMM PANEL SELECTOR UI (MATCHING SCREENSHOT EXACTLY) ================= */
        <div className="bg-white rounded-[28px] border-4 border-black p-5 sm:p-7 shadow-[8px_8px_0px_#000000] space-y-6">
          
          {/* 1. القسم (Category Dropdown Selector) */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-black uppercase tracking-wider">
              {lang === 'ar' ? 'القسم' : 'Category'}
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  const firstInCat = services.find(s => e.target.value === 'all' || s.category === e.target.value);
                  if (firstInCat) setSelectedServiceId(firstInCat.id);
                }}
                className="w-full bg-amber-50/60 text-black font-extrabold text-xs sm:text-sm p-4 rounded-2xl border-3 border-black appearance-none cursor-pointer outline-none shadow-[3px_3px_0px_#000000] pr-4 pl-10"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="py-2 text-black font-bold">
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-black absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 2. الخدمة (Service Selector with ID Badge & Expandable Options) */}
          <div className="space-y-2 relative">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black text-black uppercase tracking-wider">
                {t.navServices || (lang === 'ar' ? 'الخدمة' : 'Service')}
              </label>
              {activeService && (
                <button
                  type="button"
                  onClick={() => toggleFavorite(activeService.id)}
                  className="text-[11px] font-black text-black bg-yellow-300 hover:bg-yellow-400 px-2.5 py-1 rounded-lg border-2 border-black flex items-center gap-1 transition-all"
                >
                  <Star className={`w-3.5 h-3.5 ${favorites.includes(activeService.id) ? 'fill-black text-black' : 'text-black'}`} />
                  <span>{favorites.includes(activeService.id) ? 'في المفضلة' : 'إضافة للمفضلة'}</span>
                </button>
              )}
            </div>

            {/* Custom Interactive Dropdown Box matching image */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                className="w-full bg-yellow-300 text-black font-black text-xs sm:text-sm p-4 rounded-2xl border-3 border-black text-right flex items-center justify-between gap-3 shadow-[4px_4px_0px_#000000] hover:bg-yellow-400 transition-all"
              >
                <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="bg-black text-white px-2.5 py-1 rounded-lg text-[11px] font-mono font-black shrink-0">
                    {activeService ? getServiceCode(activeService.id) : '21595'}
                  </span>
                  <span className="truncate">
                    {activeService ? activeService.name : (lang === 'ar' ? 'اختر الخدمة...' : 'Select service...')}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-black shrink-0 transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Options List matching image styling */}
              {isServiceDropdownOpen && (
                <div className="absolute z-50 top-full mt-2 w-full bg-white rounded-2xl border-4 border-black shadow-[10px_10px_0px_#000000] max-h-80 overflow-y-auto divide-y-2 divide-zinc-200">
                  {filteredServices.map((srv) => {
                    const code = getServiceCode(srv.id);
                    const isSelected = srv.id === (activeService?.id);
                    const srvCurrency = srv.currency || 'ILS';
                    const priceInIls = srvCurrency === 'ILS' 
                      ? srv.pricePer1000 
                      : (srv.pricePer1000 * exchangeRateILS).toFixed(2);

                    return (
                      <div
                        key={srv.id}
                        onClick={() => {
                          setSelectedServiceId(srv.id);
                          setIsServiceDropdownOpen(false);
                        }}
                        className={`p-3.5 cursor-pointer text-xs font-bold transition-colors flex flex-col gap-1 ${
                          isSelected
                            ? 'bg-blue-600 text-white font-extrabold'
                            : 'hover:bg-amber-100 text-black'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black ${isSelected ? 'bg-amber-300 text-black' : 'bg-red-500 text-white'}`}>
                              {code}
                            </span>
                            <span className="truncate font-black">{srv.name}</span>
                          </div>
                          <span className={`text-[10px] shrink-0 font-mono ${isSelected ? 'text-amber-200' : 'text-zinc-600'}`}>
                            ~ {priceInIls} ₪ / {srv.minQuantity >= 1000 ? '1,000' : 'حبة'}
                          </span>
                        </div>
                        <p className={`text-[11px] line-clamp-1 ${isSelected ? 'text-blue-100' : 'text-zinc-600'}`}>
                          [{srv.speed}] [{srv.guarantee}]
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>


          {/* 3. SERVICE DETAILS & NOTICE BOX WITH RED BULLETS (🔴) MATCHING SCREENSHOT EXACTLY */}
          {activeService && (
            <div className="bg-amber-50/90 rounded-2xl border-3 border-black p-5 shadow-[4px_4px_0px_#000000] space-y-3.5 relative overflow-hidden">
              <div className="flex items-center gap-2 text-black border-b-2 border-black/20 pb-2">
                <Info className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs sm:text-sm font-black ibm-700">تنبيهات وتفاصيل الخدمة المطلوبة 📌</h4>
              </div>

              <div className="space-y-2.5 text-xs font-bold text-zinc-800 leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="text-red-600 shrink-0 text-sm">🔴</span>
                  <span>
                    إذا كان لديك البروفايل أو الحساب مفاعلاً فإن الإضافات ستصل مباشرة وتتطلب تحديث السيرفر خلال 0-24 ساعة مع تفاعل تدريجي وآمن 100%.
                  </span>
                </p>

                <p className="flex items-start gap-2">
                  <span className="text-red-600 shrink-0 text-sm">🔴</span>
                  <span>
                    سرعة التنفيذ الحالية لهذه الخدمة: <strong className="text-black bg-yellow-300 px-1.5 py-0.5 rounded border border-black">{activeService.speed}</strong> والضمان المقدم: <strong className="text-black bg-yellow-300 px-1.5 py-0.5 rounded border border-black">{activeService.guarantee}</strong>.
                  </span>
                </p>

                <p className="flex items-start gap-2">
                  <span className="text-red-600 shrink-0 text-sm">🔴</span>
                  <span>
                    {activeService.description}
                  </span>
                </p>

                <p className="flex items-start gap-2">
                  <span className="text-red-600 shrink-0 text-sm">🔴</span>
                  <span>
                    يرجى التأكد من أن الحساب عام وليس خاص (Public) قبل إرسال الطلب لضمان سرعة الاكتدال التلقائي.
                  </span>
                </p>
              </div>
            </div>
          )}


          {/* 4. QUICK ORDER INPUTS & ACTION BUTTON */}
          {activeService && (
            <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Quantity Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-black">
                  {lang === 'ar' ? 'الكمية المطلوبة' : 'Quantity'} (حد أدنى: {activeService.minQuantity})
                </label>
                <input
                  type="number"
                  min={activeService.minQuantity}
                  max={activeService.maxQuantity}
                  value={panelQuantity}
                  onChange={(e) => setPanelQuantity(Math.max(1, parseInt(e.target.value) || 100))}
                  className="w-full bg-zinc-100 text-black font-black text-sm p-3.5 rounded-xl border-3 border-black outline-none shadow-[2px_2px_0px_#000000]"
                />
              </div>

              {/* Target Account Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-black">
                  {lang === 'ar' ? 'رابط الحساب / المنشور' : 'Account Link'}
                </label>
                <input
                  type="text"
                  value={panelTarget}
                  onChange={(e) => setPanelTarget(e.target.value)}
                  placeholder={lang === 'ar' ? 'ضع رابط حسابك هنا (مثلاً: @username أو link)' : 'Enter your account handle or link...'}
                  className="w-full bg-zinc-100 text-black font-bold text-xs sm:text-sm p-3.5 rounded-xl border-3 border-black outline-none shadow-[2px_2px_0px_#000000]"
                />
              </div>

              {/* Price Display & Order CTA */}
              <div className="md:col-span-2 bg-yellow-300 p-4 rounded-2xl border-3 border-black flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_#000000]">
                <div>
                  <span className="text-[11px] font-bold text-zinc-800 block">التكلفة الإجمالية للطلب:</span>
                  <span className="text-2xl font-black text-black ibm-700">
                    {displayPriceText}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectService(activeService)}
                  className="w-full sm:w-auto bg-black text-yellow-300 font-black text-sm px-6 py-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#71717a] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#000000] transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span>تأكيد واستكمال الطلب الآن ⚡</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>

            </div>
          )}

        </div>

      ) : activeTab === 'subscriptions' ? (

        /* ================= SUBSCRIPTIONS TAB ================= */
        <div className="bg-white rounded-[28px] border-4 border-black p-6 shadow-[8px_8px_0px_#000000] text-center space-y-4">
          <div className="inline-flex p-3 rounded-2xl bg-yellow-300 border-3 border-black shadow-[3px_3px_0px_#000000]">
            <Layers className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-xl font-black text-black ibm-700">باقات الاشتراكات الشهرية التلقائية ⚡</h3>
          <p className="text-xs sm:text-sm text-zinc-700 font-semibold max-w-xl mx-auto">
            تفاعل تلقائي شهري لكل منشور جديد تنشره على إنستغرام أو تيك توك بدون الحاجة للطلب المكرر.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {socialServices.slice(0, 4).map((srv) => (
              <div key={`sub-${srv.id}`} className="bg-yellow-200 p-4 rounded-2xl border-3 border-black text-right space-y-2 shadow-[4px_4px_0px_#000000]">
                <div className="flex items-center justify-between">
                  <span className="bg-black text-amber-300 px-2.5 py-0.5 rounded text-[10px] font-black">اشتراك شهري</span>
                  <span className="font-mono text-xs font-black">{srv.pricePer1000 * 3} $ / شهر</span>
                </div>
                <h4 className="font-black text-sm text-black">{srv.name}</h4>
                <p className="text-xs text-zinc-700 font-bold">{srv.description}</p>
                <button
                  onClick={() => onSelectService(srv)}
                  className="w-full bg-black text-white py-2 rounded-xl text-xs font-black border-2 border-black shadow-[2px_2px_0px_#000]"
                >
                  اشترك الآن
                </button>
              </div>
            ))}
          </div>
        </div>

      ) : activeTab === 'favorites' ? (

        /* ================= FAVORITES TAB ================= */
        <div className="space-y-4">
          <div className="bg-white rounded-[24px] border-4 border-black p-5 shadow-[6px_6px_0px_#000000] flex items-center justify-between">
            <h3 className="text-lg font-black text-black ibm-700 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
              <span>خدماتك المفضلة المحفوظة ({favorites.length})</span>
            </h3>
          </div>

          {favorites.length === 0 ? (
            <div className="bg-yellow-100 rounded-[28px] border-4 border-black p-8 text-center space-y-3">
              <Star className="w-10 h-10 text-zinc-400 mx-auto" />
              <p className="text-sm font-bold text-zinc-700">لم تقم بإضافة أي خدمة إلى قائمة المفضلة بعد.</p>
              <p className="text-xs text-zinc-500">اختر أي خدمة من السيرفر المباشر لتسهيل الوصول إليها لاحقاً.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {services.filter(s => favorites.includes(s.id)).map((srv) => (
                <ServiceCard
                  key={srv.id}
                  service={srv}
                  lang={lang}
                  currency={currency}
                  onSelectService={onSelectService}
                />
              ))}
            </div>
          )}
        </div>

      ) : null}


      {/* ALWAYS SHOW YELLOW POSTS GRID WHEN IN 'yellow_cards' MODE OR BELOW PANEL */}
      {viewMode === 'yellow_cards' && (
        <div className="space-y-4 pt-2">
          {/* Category Filter Pills for Cards with Touch/Mouse Drag */}
          <div className="space-y-2.5">
            <div
              ref={catScrollRef}
              onMouseDown={handleCatMouseDown}
              onMouseLeave={handleCatMouseUpOrLeave}
              onMouseUp={handleCatMouseUpOrLeave}
              onMouseMove={handleCatMouseMove}
              className={`flex items-center justify-start gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none touch-pan-x select-none scroll-smooth cursor-grab active:cursor-grabbing ${
                isCatDragging ? 'cursor-grabbing' : ''
              }`}
            >
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 border-3 border-black ${
                      isActive
                        ? 'bg-black text-amber-300 shadow-[4px_4px_0px_#000000] scale-105'
                        : 'bg-yellow-300 hover:bg-yellow-400 text-black shadow-[4px_4px_0px_#000000]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Scroll Navigation Arrows & Drag Instruction */}
            <div className="flex items-center justify-between gap-2 px-1">
              <button
                type="button"
                onClick={() => scrollContainer(catScrollRef, 'right')}
                className="p-2.5 rounded-xl bg-yellow-300 text-black border-2 border-black shadow-[3px_3px_0px_#000000] hover:bg-yellow-400 active:translate-y-0.5 transition-all flex items-center justify-center shrink-0"
                title={lang === 'ar' ? 'سحب لليسار' : 'Scroll Right'}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-black bg-white px-3.5 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000000]">
                <span>👈</span>
                <span>{lang === 'ar' ? 'اسحب الشريط باليد يمين ويسار' : 'Swipe bar left and right'}</span>
                <span>👉</span>
              </div>

              <button
                type="button"
                onClick={() => scrollContainer(catScrollRef, 'left')}
                className="p-2.5 rounded-xl bg-yellow-300 text-black border-2 border-black shadow-[3px_3px_0px_#000000] hover:bg-yellow-400 active:translate-y-0.5 transition-all flex items-center justify-center shrink-0"
                title={lang === 'ar' ? 'سحب لليمين' : 'Scroll Left'}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Yellow Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-2">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                lang={lang}
                currency={currency}
                onSelectService={onSelectService}
              />
            ))}
          </div>
        </div>
      )}
      </>
      )}

    </section>
  );
};
