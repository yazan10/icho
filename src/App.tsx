import { useState, useEffect } from 'react';
import type { Service, AdCampaign, SystemNotification, BlockedIP, SupportTicket, Order, UserProfile, ActivityLog } from './types';
import { refreshExchangeRateILS, type Language, type Currency } from './i18n/translations';
import { INITIAL_SERVICES, INITIAL_ADS, INITIAL_NOTIFICATIONS } from './data/initialData';
import { useSecurity } from './hooks/useSecurity';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesList } from './components/ServicesList';
import { WhyUs } from './components/WhyUs';
import { AboutPlatform } from './components/AboutPlatform';
import { FaqSection } from './components/FaqSection';
import { AdsBanner } from './components/AdsBanner';
import { AdCardGrid } from './components/AdCardGrid';
import { NotificationTicker } from './components/NotificationTicker';
import { ServiceOrderFlow } from './components/ServiceOrderFlow';
import { SupportModal } from './components/SupportModal';
import { NameModal } from './components/NameModal';
import { SecurityLockScreen } from './components/SecurityLockScreen';
import { SecurityToast } from './components/SecurityToast';
import { AdminModal } from './components/AdminModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';

export function App() {
  // Language & Currency State
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('agency_lang');
    return (saved as Language) || 'ar';
  });

  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('agency_currency');
    return (saved as Currency) || 'ILS';
  });

  // User Identity State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('social_agency_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [userIp, setUserIp] = useState<string>(userProfile?.ip || '');

  // Persistent Activity Logs State
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('agency_activity_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [
      {
        id: 'log-init-1',
        timestamp: new Date().toISOString(),
        ip: '185.220.101.42',
        userAgent: navigator.userAgent,
        deviceType: /Mobile|Android|iP(hone|od|ad)/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        actionType: 'visit',
        details: 'دخول تلقائي لمنصة الخدمات'
      }
    ];
  });

  // Function to log actions
  const logActivity = (actionType: ActivityLog['actionType'], details: string, targetId?: string) => {
    const newLog: ActivityLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      ip: userIp || '185.220.101.42',
      userAgent: navigator.userAgent,
      deviceType: /Mobile|Android|iP(hone|od|ad)/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      actionType,
      details,
      targetId
    };
    setActivityLogs(prev => [newLog, ...prev].slice(0, 300));
  };

  // Persistent App State
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('agency_services');
    if (!saved) return INITIAL_SERVICES;
    try {
      const parsed: Service[] = JSON.parse(saved);
      return parsed.map(s => {
        const isFixed = (s as Service).pricingType === 'fixed' || s.category === 'subscriptions';
        return {
          ...s,
          minQuantity: isFixed ? (s.minQuantity || 1) : 1000,
          currency: s.currency || 'ILS',
          pricingType: (s as Service).pricingType || (s.category === 'subscriptions' ? 'fixed' : 'per_1000')
        };
      });
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [ads, setAds] = useState<AdCampaign[]>(() => {
    const saved = localStorage.getItem('agency_ads');
    return saved ? JSON.parse(saved) : INITIAL_ADS;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem('agency_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>(() => {
    const saved = localStorage.getItem('agency_blocked_ips');
    return saved ? JSON.parse(saved) : [];
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('agency_tickets');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('agency_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal Controls
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Security hook initialization
  const { securityToast } = useSecurity({
    onOpenAdminPrompt: () => setShowAdminPrompt(true)
  });

  // Fetch Public IP on mount
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        if (data.ip) {
          setUserIp(data.ip);
        }
      } catch {
        const fakeIp = `185.220.${Math.floor(100 + Math.random() * 50)}.${Math.floor(10 + Math.random() * 80)}`;
        setUserIp((prev) => prev || fakeIp);
      }
    };
    fetchIp();
  }, []);

  // Sync Language & Currency
  useEffect(() => {
    localStorage.setItem('agency_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('agency_currency', currency);
  }, [currency]);

  useEffect(() => {
    void refreshExchangeRateILS();
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('agency_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('agency_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('agency_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('agency_blocked_ips', JSON.stringify(blockedIPs));
  }, [blockedIPs]);

  useEffect(() => {
    localStorage.setItem('agency_tickets', JSON.stringify(supportTickets));
  }, [supportTickets]);

  useEffect(() => {
    localStorage.setItem('agency_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('agency_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Check URL Hash for secret #admin
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#dashboard') {
        setShowAdminPrompt(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Save First-time User Name
  const handleSaveName = (name: string) => {
    const profile: UserProfile = {
      name,
      ip: userIp || '185.220.101.42',
      deviceFingerprint: 'DEV-' + Math.floor(100000 + Math.random() * 900000),
      firstSeen: new Date().toISOString()
    };
    setUserProfile(profile);
    localStorage.setItem('social_agency_user', JSON.stringify(profile));
  };

  // Admin Authenticate
  const handleAuthenticateAdmin = (pass: string) => {
    if (pass === 'jana@#5Y') {
      setIsAdminLoggedIn(true);
      setShowAdminPrompt(false);
      return true;
    }
    return false;
  };

  // Check if current user is IP blocked
  const isCurrentIpBlocked = blockedIPs.some((b) => b.ip === userIp);

  if (isCurrentIpBlocked) {
    return <SecurityLockScreen ip={userIp} />;
  }

  // Render Admin View if logged in
  if (isAdminLoggedIn) {
    return (
      <AdminDashboard
        ads={ads}
        notifications={notifications}
        blockedIPs={blockedIPs}
        supportTickets={supportTickets}
        orders={orders}
        services={services}
        activityLogs={activityLogs}
        onUpdateAds={setAds}
        onUpdateNotifications={setNotifications}
        onUpdateBlockedIPs={setBlockedIPs}
        onUpdateSupportTickets={setSupportTickets}
        onUpdateServices={setServices}
        onClearActivityLogs={() => setActivityLogs([])}
        onLogout={() => setIsAdminLoggedIn(false)}
      />
    );
  }

  if (selectedService) {
    return (
      <ServiceOrderFlow
        service={selectedService}
        userName={userProfile?.name || ''}
        userIp={userIp}
        lang={lang}
        currency={currency}
        onBack={() => setSelectedService(null)}
        onOrderCreated={(newOrder) => {
          logActivity('service_order', `طلب خدمة ${newOrder.serviceName} - الكمية: ${newOrder.quantity}`, newOrder.id);
          setOrders((prev) => [newOrder, ...prev]);
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen overflow-x-hidden bg-zinc-100 text-zinc-950 font-sans relative pb-[calc(7rem+env(safe-area-inset-bottom))] md:pb-0 ${lang === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
      
      {/* System Ticker Bar */}
      <NotificationTicker notifications={notifications} ads={ads} />

      {/* Navigation Bar */}
      <Navbar
        userName={userProfile?.name || ''}
        userIp={userIp}
        lang={lang}
        currency={currency}
        onToggleLang={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        onToggleCurrency={() => setCurrency(currency === 'USD' ? 'ILS' : 'USD')}
        onOpenSupport={() => setShowSupportModal(true)}
        onOpenAdminPrompt={() => setShowAdminPrompt(true)}
      />

      {/* Active Ads Popup & Banner */}
      <AdsBanner ads={ads} />

      {/* Hero Header */}
      <Hero userName={userProfile?.name || ''} lang={lang} />

      <AdCardGrid ads={ads} />

      {/* Services Catalogue */}
      <ServicesList
        services={services}
        lang={lang}
        currency={currency}
        onSelectService={(service) => {
          logActivity('service_view', `معاينة خدمة: ${service.name}`, service.id);
          setSelectedService(service);
        }}
      />

      <AdCardGrid ads={ads} />

      {/* Why Us / Features */}
      <WhyUs lang={lang} />

      {/* About Platform - SEO explanation with stars */}
      <AboutPlatform lang={lang} />

      <AdCardGrid ads={ads} />

      {/* FAQ Section */}
      <FaqSection lang={lang} />

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenSupport={() => setShowSupportModal(true)}
      />

      {/* First-time Device Name Prompt Modal */}
      {!userProfile && (
        <NameModal
          userIp={userIp}
          lang={lang}
          onSaveName={handleSaveName}
        />
      )}

      {/* Support Ticket Modal */}
      {showSupportModal && (
        <SupportModal
          userName={userProfile?.name || ''}
          userIp={userIp}
          lang={lang}
          onClose={() => setShowSupportModal(false)}
          onTicketCreated={(ticket) => setSupportTickets([ticket, ...supportTickets])}
        />
      )}

      {/* Admin Password Modal */}
      {showAdminPrompt && (
        <AdminModal
          lang={lang}
          onClose={() => setShowAdminPrompt(false)}
          onAuthenticate={handleAuthenticateAdmin}
        />
      )}

      {/* Security Toast Notification */}
      <SecurityToast
        show={securityToast.show}
        message={securityToast.message}
      />

      <MobileBottomBar
        lang={lang}
        onOpenSupport={() => setShowSupportModal(true)}
      />

    </div>
  );
}

export default App;
