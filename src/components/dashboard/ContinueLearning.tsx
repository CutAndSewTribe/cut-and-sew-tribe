import Link from "next/link";
import { MessageCircle, ExternalLink } from "lucide-react";

interface ContinueLearningProps {
title: string;
telegramInviteLink?: string | null;
completed?: boolean;
}

export default function ContinueLearning({
title,
telegramInviteLink,
completed = false,
}: ContinueLearningProps) {
const hasTelegramLink =
typeof telegramInviteLink === "string" &&
telegramInviteLink.trim() !== "";

if (hasTelegramLink) {
return ( <div className="space-y-2"> <Link
       href={telegramInviteLink}
       target="_blank"
       rel="noreferrer"
       className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white transition hover:opacity-90"
     > <MessageCircle className="h-5 w-5" />
{completed
? "Review in Telegram"
: "Open Telegram Group"} <ExternalLink className="h-4 w-4" /> </Link>


    <p className="text-center text-sm text-neutral-500">
      Continue this course inside the dedicated Telegram group.
    </p>
  </div>
);


}

return ( <div className="space-y-2"> <button
     type="button"
     disabled
     className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-neutral-200 px-5 py-3 font-semibold text-neutral-500"
   > <MessageCircle className="h-5 w-5" />
Telegram Group Unavailable </button>


  <p className="text-center text-sm text-neutral-500">
    The Telegram invite link for <span className="font-medium">{title}</span> has not been configured yet.
  </p>
</div>


);
}
