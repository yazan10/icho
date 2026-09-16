import React from 'react';
import type { IconType } from 'react-icons';
import {
  FaInstagram,
  FaTiktok,
  FaSnapchat,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaTwitch,
  FaDiscord,
  FaSpotify,
  FaApple,
  FaGoogle,
  FaPlaystation,
  FaXbox,
  FaSteam,
  FaReddit,
  FaPinterest,
  FaLinkedin,
  FaVimeo,
  FaSoundcloud,
  FaSkype,
  FaViber,
  FaLine,
  FaVk,
  FaGithub,
  FaDribbble,
  FaBehance,
  FaTumblr,
} from 'react-icons/fa';
import {
  SiNetflix,
  SiCrunchyroll,
  SiHbomax,
  SiAppletv,
  SiStarz,
  SiParamountplus,
  SiDazn,
  SiDeezer,
  SiTidal,
  SiYoutubemusic,
  SiAudiomack,
  SiShazam,
  SiIcloud,
  SiNordvpn,
  SiEpicgames,
  SiPubg,
  SiFortnite,
  SiRoblox,
  SiValorant,
  SiEa,
  SiUbisoft,
  SiX,
  SiThreads,
  SiKick,
  SiDailymotion,
  SiRumble,
  SiOdysee,
  SiZoom,
  SiWechat,
  SiMessenger,
  SiSignal,
  SiVodafone,
  SiMedium,
  SiQuora,
  SiFlickr,
} from 'react-icons/si';
import {
  Clapperboard,
  Crown,
  Coins,
  Tv,
  Music,
  Gamepad2,
  Palette,
  Scissors,
  Image,
  Briefcase,
  Cloud,
  Smartphone,
  Video,
  Phone,
  PhoneCall,
  Send,
  Zap,
  Play,
  Star,
  KeyRound,
  LockOpen,
  BadgeCheck,
} from 'lucide-react';

export type ServiceIconComponent = IconType | React.ComponentType<{ className?: string }>;

export interface ServiceIconEntry {
  key: string;
  label: string;
  labelEn: string;
  group: 'social' | 'streaming' | 'music' | 'gaming' | 'tools' | 'other';
  Component: ServiceIconComponent;
}

export const SERVICE_ICON_GROUPS: Record<ServiceIconEntry['group'], { ar: string; en: string }> = {
  social: { ar: 'تواصل اجتماعي', en: 'Social' },
  streaming: { ar: 'بث ومشاهدة', en: 'Streaming' },
  music: { ar: 'موسيقى وصوت', en: 'Music' },
  gaming: { ar: 'ألعاب', en: 'Gaming' },
  tools: { ar: 'تطبيقات وأدوات', en: 'Apps & Tools' },
  other: { ar: 'أخرى', en: 'Other' },
};

export const SERVICE_ICONS: ServiceIconEntry[] = [
  // ---- Social ----
  { key: 'instagram', label: 'انستغرام', labelEn: 'Instagram', group: 'social', Component: FaInstagram },
  { key: 'tiktok', label: 'تيك توك', labelEn: 'TikTok', group: 'social', Component: FaTiktok },
  { key: 'snapchat', label: 'سناب شات', labelEn: 'Snapchat', group: 'social', Component: FaSnapchat },
  { key: 'whatsapp', label: 'واتساب', labelEn: 'WhatsApp', group: 'social', Component: FaWhatsapp },
  { key: 'telegram', label: 'تلغرام', labelEn: 'Telegram', group: 'social', Component: FaTelegram },
  { key: 'telegram-premium', label: 'تلغرام بريميوم', labelEn: 'Telegram Premium', group: 'social', Component: Send },
  { key: 'facebook', label: 'فيسبوك', labelEn: 'Facebook', group: 'social', Component: FaFacebook },
  { key: 'youtube', label: 'يوتيوب', labelEn: 'YouTube', group: 'social', Component: FaYoutube },
  { key: 'twitter', label: 'منصة X (تويتر)', labelEn: 'X (Twitter)', group: 'social', Component: FaTwitter },
  { key: 'x', label: 'إكس X', labelEn: 'X', group: 'social', Component: SiX },
  { key: 'threads', label: 'ثريدز', labelEn: 'Threads', group: 'social', Component: SiThreads },
  { key: 'twitch', label: 'تويتش', labelEn: 'Twitch', group: 'social', Component: FaTwitch },
  { key: 'kick', label: 'كيك', labelEn: 'Kick', group: 'social', Component: SiKick },
  { key: 'discord', label: 'ديسكورد', labelEn: 'Discord', group: 'social', Component: FaDiscord },
  { key: 'reddit', label: 'ريديت', labelEn: 'Reddit', group: 'social', Component: FaReddit },
  { key: 'pinterest', label: 'بنترست', labelEn: 'Pinterest', group: 'social', Component: FaPinterest },
  { key: 'linkedin', label: 'لينكدإن', labelEn: 'LinkedIn', group: 'social', Component: FaLinkedin },
  { key: 'tumblr', label: 'تمبلر', labelEn: 'Tumblr', group: 'social', Component: FaTumblr },
  { key: 'flickr', label: 'فليكر', labelEn: 'Flickr', group: 'social', Component: SiFlickr },
  { key: 'medium', label: 'ميديوم', labelEn: 'Medium', group: 'social', Component: SiMedium },
  { key: 'quora', label: 'كورا', labelEn: 'Quora', group: 'social', Component: SiQuora },
  { key: 'vk', label: 'في كي VK', labelEn: 'VK', group: 'social', Component: FaVk },
  { key: 'line', label: 'لاين', labelEn: 'LINE', group: 'social', Component: FaLine },
  { key: 'viber', label: 'فايبر', labelEn: 'Viber', group: 'social', Component: FaViber },
  { key: 'skype', label: 'سكايب', labelEn: 'Skype', group: 'social', Component: FaSkype },
  { key: 'wechat', label: 'وي تشات', labelEn: 'WeChat', group: 'social', Component: SiWechat },
  { key: 'messenger', label: 'ماسنجر', labelEn: 'Messenger', group: 'social', Component: SiMessenger },
  { key: 'signal', label: 'سيغنال', labelEn: 'Signal', group: 'social', Component: SiSignal },
  { key: 'imo', label: 'إيمو', labelEn: 'IMO', group: 'social', Component: PhoneCall },
  { key: 'botim', label: 'بوتيم', labelEn: 'BOTIM', group: 'social', Component: Phone },
  { key: 'likee', label: 'لايكي', labelEn: 'Likee', group: 'social', Component: Video },
  { key: 'kwai', label: 'كواي', labelEn: 'Kwai', group: 'social', Component: Video },
  { key: 'bigo', label: 'بيغو لايف', labelEn: 'Bigo Live', group: 'social', Component: Video },
  { key: 'trovo', label: 'تروفو', labelEn: 'Trovo', group: 'social', Component: Gamepad2 },
  { key: 'dribbble', label: 'دريبل', labelEn: 'Dribbble', group: 'social', Component: FaDribbble },
  { key: 'behance', label: 'بيهانس', labelEn: 'Behance', group: 'social', Component: FaBehance },
  { key: 'github', label: 'غيت هاب', labelEn: 'GitHub', group: 'social', Component: FaGithub },

  // ---- Streaming ----
  { key: 'netflix', label: 'نتفلكس', labelEn: 'Netflix', group: 'streaming', Component: SiNetflix },
  { key: 'shahid', label: 'شاهد', labelEn: 'Shahid', group: 'streaming', Component: Clapperboard },
  { key: 'disney', label: 'ديزني+', labelEn: 'Disney+', group: 'streaming', Component: Star },
  { key: 'osn', label: '+OSN', labelEn: 'OSN+', group: 'streaming', Component: Tv },
  { key: 'starzplay', label: 'ستارزبلاي', labelEn: 'STARZPLAY', group: 'streaming', Component: SiStarz },
  { key: 'hbo', label: 'إتش بي أو / ماكس', labelEn: 'HBO / Max', group: 'streaming', Component: SiHbomax },
  { key: 'prime', label: 'برايم فيديو', labelEn: 'Prime Video', group: 'streaming', Component: Play },
  { key: 'appletv', label: 'آبل تي في', labelEn: 'Apple TV', group: 'streaming', Component: SiAppletv },
  { key: 'paramount', label: 'باراماونت+', labelEn: 'Paramount+', group: 'streaming', Component: SiParamountplus },
  { key: 'crunchyroll', label: 'كرانشي رول', labelEn: 'Crunchyroll', group: 'streaming', Component: SiCrunchyroll },
  { key: 'dazn', label: 'دازون', labelEn: 'DAZN', group: 'streaming', Component: SiDazn },
  { key: 'dailymotion', label: 'ديلي موشن', labelEn: 'Dailymotion', group: 'streaming', Component: SiDailymotion },
  { key: 'rumble', label: 'رمبل', labelEn: 'Rumble', group: 'streaming', Component: SiRumble },
  { key: 'odysee', label: 'أوديسي', labelEn: 'Odysee', group: 'streaming', Component: SiOdysee },
  { key: 'vimeo', label: 'فيميو', labelEn: 'Vimeo', group: 'streaming', Component: FaVimeo },
  { key: 'youtube-premium', label: 'يوتيوب بريميوم', labelEn: 'YouTube Premium', group: 'streaming', Component: Crown },

  // ---- Music ----
  { key: 'spotify', label: 'سبوتيفاي', labelEn: 'Spotify', group: 'music', Component: FaSpotify },
  { key: 'anghami', label: 'أنغامي', labelEn: 'Anghami', group: 'music', Component: Music },
  { key: 'apple-music', label: 'آبل ميوزك', labelEn: 'Apple Music', group: 'music', Component: FaApple },
  { key: 'youtube-music', label: 'يوتيوب ميوزك', labelEn: 'YouTube Music', group: 'music', Component: SiYoutubemusic },
  { key: 'deezer', label: 'ديزر', labelEn: 'Deezer', group: 'music', Component: SiDeezer },
  { key: 'tidal', label: 'تايدل', labelEn: 'Tidal', group: 'music', Component: SiTidal },
  { key: 'audiomack', label: 'أوديوماك', labelEn: 'Audiomack', group: 'music', Component: SiAudiomack },
  { key: 'soundcloud', label: 'ساوندكلاود', labelEn: 'SoundCloud', group: 'music', Component: FaSoundcloud },
  { key: 'shazam', label: 'شازام', labelEn: 'Shazam', group: 'music', Component: SiShazam },

  // ---- Gaming ----
  { key: 'pubg', label: 'ببجي / شدات', labelEn: 'PUBG', group: 'gaming', Component: SiPubg },
  { key: 'fortnite', label: 'فورتنايت', labelEn: 'Fortnite', group: 'gaming', Component: SiFortnite },
  { key: 'freefire', label: 'فري فاير / جواهر', labelEn: 'Free Fire', group: 'gaming', Component: Gamepad2 },
  { key: 'roblox', label: 'روبلوكس', labelEn: 'Roblox', group: 'gaming', Component: SiRoblox },
  { key: 'valorant', label: 'فالورانت', labelEn: 'Valorant', group: 'gaming', Component: SiValorant },
  { key: 'tiktok-coins', label: 'كوينز تيك توك', labelEn: 'TikTok Coins', group: 'gaming', Component: Coins },
  { key: 'steam', label: 'ستيم', labelEn: 'Steam', group: 'gaming', Component: FaSteam },
  { key: 'playstation', label: 'بلايستيشن', labelEn: 'PlayStation', group: 'gaming', Component: FaPlaystation },
  { key: 'xbox', label: 'إكس بوكس', labelEn: 'Xbox', group: 'gaming', Component: FaXbox },
  { key: 'epic', label: 'إيبك غيمز', labelEn: 'Epic Games', group: 'gaming', Component: SiEpicgames },
  { key: 'ea', label: 'إي أي', labelEn: 'EA', group: 'gaming', Component: SiEa },
  { key: 'ubisoft', label: 'يوبيسوفت', labelEn: 'Ubisoft', group: 'gaming', Component: SiUbisoft },

  // ---- Tools ----
  { key: 'canva', label: 'كانفا برو', labelEn: 'Canva Pro', group: 'tools', Component: Palette },
  { key: 'capcut', label: 'كاب كات برو', labelEn: 'CapCut Pro', group: 'tools', Component: Scissors },
  { key: 'photoshop', label: 'فوتوشوب', labelEn: 'Photoshop', group: 'tools', Component: Image },
  { key: 'microsoft', label: 'مايكروسوفت 365', labelEn: 'Microsoft 365', group: 'tools', Component: Briefcase },
  { key: 'google', label: 'غوغل', labelEn: 'Google', group: 'tools', Component: FaGoogle },
  { key: 'google-one', label: 'غوغل ون', labelEn: 'Google One', group: 'tools', Component: Cloud },
  { key: 'icloud', label: 'آيكلاود', labelEn: 'iCloud', group: 'tools', Component: SiIcloud },
  { key: 'apple', label: 'آبل', labelEn: 'Apple', group: 'tools', Component: FaApple },
  { key: 'vpn', label: 'في بي إن', labelEn: 'VPN', group: 'tools', Component: SiNordvpn },
  { key: 'zoom', label: 'زوم', labelEn: 'Zoom', group: 'tools', Component: SiZoom },
  { key: 'vodafone', label: 'فودافون', labelEn: 'Vodafone', group: 'tools', Component: SiVodafone },
  { key: 'jawwal', label: 'جوال / اتصالات', labelEn: 'Carrier', group: 'tools', Component: Smartphone },

  // ---- Other ----
  { key: 'unlock', label: 'فك قفل حساب', labelEn: 'Account Unlock', group: 'other', Component: LockOpen },
  { key: 'verify', label: 'توثيق حساب', labelEn: 'Verification', group: 'other', Component: BadgeCheck },
  { key: 'vip', label: 'خدمة VIP', labelEn: 'VIP Service', group: 'other', Component: Crown },
  { key: 'key', label: 'مفتاح / كود', labelEn: 'Key / Code', group: 'other', Component: KeyRound },
  { key: 'generic', label: 'عام', labelEn: 'Generic', group: 'other', Component: Zap },
];

const iconMap: Record<string, ServiceIconComponent> = Object.fromEntries(
  SERVICE_ICONS.map((e) => [e.key, e.Component])
);

export function getServiceIconComponent(key?: string): ServiceIconComponent {
  if (key && iconMap[key]) return iconMap[key];
  return Zap;
}

export function getServiceIconLabel(key?: string, lang: 'ar' | 'en' = 'ar'): string {
  const entry = SERVICE_ICONS.find((e) => e.key === key);
  if (!entry) return lang === 'ar' ? 'عام' : 'Generic';
  return lang === 'ar' ? entry.label : entry.labelEn;
}
