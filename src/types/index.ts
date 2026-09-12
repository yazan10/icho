export interface Service {
  id: string;
  category: 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'telegram' | 'twitter' | 'subscriptions';
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  pricePer1000: number;
  currency?: 'ILS' | 'USD';
  minQuantity: number;
  maxQuantity: number;
  speed: string;
  guarantee: string;
  badge?: string;
  iconName?: string;
  pricingType?: 'per_1000' | 'fixed';
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
  actionType: 'visit' | 'ad_view' | 'ad_click' | 'service_view' | 'service_order' | 'support_ticket';
  details: string;
  targetId?: string;
  country?: string;
}

export interface AdCampaign {
  id: string;
  title: string;
  description: string;
  url?: string;
  discountPercentage?: number;
  badgeText?: string;
  buttonText: string;
  active: boolean;
  type: 'popup' | 'top_banner' | 'card_box' | 'ticker';
  imageUrl?: string;
  createdAt: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  text: string;
  type: 'info' | 'warning' | 'discount' | 'urgent';
  active: boolean;
  date: string;
  read?: boolean;
}

export interface BlockedIP {
  id: string;
  ip: string;
  reason: string;
  blockedAt: string;
}

export interface SupportTicket {
  id: string;
  userName: string;
  userIp: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
}

export interface Order {
  id: string;
  userName: string;
  userIp: string;
  serviceName: string;
  quantity: number;
  targetAccount: string;
  totalPrice: number;
  status: 'pending_whatsapp' | 'completed' | 'canceled';
  createdAt: string;
}

export interface UserProfile {
  name: string;
  ip: string;
  deviceFingerprint: string;
  firstSeen: string;
}
