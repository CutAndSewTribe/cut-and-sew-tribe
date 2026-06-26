"use client";

import { useState } from "react";


interface ShareButtonsProps {
  title: string;
}


export default function ShareButtons({
  title,
}: ShareButtonsProps) {

  const [copied, setCopied] = useState(false);


  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";


  async function copyLink() {

    await navigator.clipboard.writeText(
      shareUrl
    );

    setCopied(true);


    setTimeout(() => {
      setCopied(false);
    }, 2000);

  }



  const whatsappUrl =
    `https://wa.me/?text=${encodeURIComponent(
      `${title} ${shareUrl}`
    )}`;



  const facebookUrl =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;



  return (
    <div className="mt-8 flex flex-wrap gap-3">


      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#25D366] px-4 py-2 text-sm text-white"
      >
        WhatsApp
      </a>



      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#1877F2] px-4 py-2 text-sm text-white"
      >
        Facebook
      </a>



      <button
        type="button"
        onClick={copyLink}
        className="rounded-full border px-4 py-2 text-sm"
      >
        {copied ? "Copied" : "Copy Link"}
      </button>


    </div>
  );
}
