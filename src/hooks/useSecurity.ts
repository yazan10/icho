import { useEffect, useState } from 'react';

interface UseSecurityProps {
  onOpenAdminPrompt: () => void;
}

export function useSecurity({ onOpenAdminPrompt }: UseSecurityProps) {
  const [securityToast, setSecurityToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: ''
  });

  const showSecurityAlert = (msg: string) => {
    setSecurityToast({ show: true, message: msg });
    setTimeout(() => {
      setSecurityToast({ show: false, message: '' });
    }, 3000);
  };

  useEffect(() => {
    // Disable Context Menu (Right-Click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showSecurityAlert('عفواً، تم تعطيل النقر الأيمن لحماية المنصة والأمان 🔒');
    };

    // Disable Inspection Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret Admin Key Combo: Ctrl + Shift + A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        onOpenAdminPrompt();
        return;
      }

      // Block F12, F11, F10
      if (e.key === 'F12' || e.key === 'F11' || e.key === 'F10') {
        e.preventDefault();
        showSecurityAlert(`عفواً، الاختصار (${e.key}) معطل لحماية الكود المصدري للمنصة 🛡️`);
        return;
      }

      // Block Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S
      if (e.ctrlKey || e.metaKey) {
        if (
          (e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
          e.key === 'u' || e.key === 'U' ||
          e.key === 's' || e.key === 'S'
        ) {
          e.preventDefault();
          showSecurityAlert('عفواً، أدوات المطور والتفتيش محظورة لحماية الخصوصية والأمان 🔒');
          return;
        }
      }
    };

    // Obfuscate Console
    const consoleWarning = () => {
      console.log('%cتنبيه أمني مشدد 🔒', 'color: #ef4444; font-size: 24px; font-weight: bold;');
      console.log('%cهذه المنصة محمية بالكامل. أي محاولة للتعديل أو هندسة الكود المصدري محظورة ومسجلة تلقائياً عبر IP الجهاز.', 'color: #cbd5e1; font-size: 14px;');
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    consoleWarning();

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpenAdminPrompt]);

  return { securityToast, showSecurityAlert };
}
