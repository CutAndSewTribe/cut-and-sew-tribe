"use client";

import Image from "next/image";

interface JoinTelegramButtonProps {
  groupName: string;
  inviteLink: string;
}

export default function JoinTelegramButton({
  groupName,
  inviteLink,
}: JoinTelegramButtonProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-[#D4AF37]/30
        bg-gradient-to-br
        from-[#661093]
        to-[#4B0B70]
        p-8
        text-white
        shadow-xl
      "
    >
      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-white p-3">

          <Image
            src="/brand/telegram.svg"
            alt="Telegram"
            width={36}
            height={36}
          />

        </div>

        <div>

          <p className="text-sm uppercase tracking-widest text-yellow-300">
            Private Student Community
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            {groupName}
          </h3>

        </div>

      </div>

      <p className="mt-6 text-purple-100 leading-7">
        Meet fellow students, ask questions, receive announcements,
        submit assignments and get support directly from the instructors.
      </p>

      <a
        href={inviteLink}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-8
          inline-flex
          items-center
          justify-center
          rounded-xl
          bg-[#D4AF37]
          px-6
          py-3
          font-semibold
          text-black
          transition
          hover:scale-105
        "
      >
        Join Telegram Community
      </a>

    </section>
  );
}