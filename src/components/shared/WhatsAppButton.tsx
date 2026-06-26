"use client";

import { FaWhatsapp } from "react-icons/fa";


export default function WhatsAppButton() {

  return (

    <a
      href="https://wa.me/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Cut & Sew Tribe on WhatsApp"
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-green-500
        text-white
        shadow-lg
        transition
        hover:scale-110
        hover:bg-green-600
      "
    >

      <FaWhatsapp size={30} />

    </a>

  );
}