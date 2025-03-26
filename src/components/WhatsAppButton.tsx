
import { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useDatabase } from '@/context/DatabaseContext';

export const WhatsAppButton = () => {
  const { settings } = useDatabase();
  const [whatsappNumber, setWhatsappNumber] = useState("917434902998");

  useEffect(() => {
    if (settings && settings.whatsappNumber) {
      setWhatsappNumber(settings.whatsappNumber);
    }
  }, [settings]);

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all hover:scale-110"
      aria-label="Contact on WhatsApp"
    >
      <MessageSquare className="w-6 h-6" />
    </button>
  );
};
