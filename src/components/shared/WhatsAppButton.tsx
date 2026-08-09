"use client";

import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_URL = "https://wa.me/message/2Y2LBLT47JAFD1";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Cut And Sew Tribe on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#1EBE5D] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 animate-[float_3s_ease-in-out_infinite]"
    >
      <FaWhatsapp size={32} />

      {/* Tooltip */}
      <span className="pointer-events-none absolute right-20 whitespace-nowrap rounded-full bg-neutral-900 px-3 py-2 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}