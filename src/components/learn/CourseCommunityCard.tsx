import Link from "next/link";

interface Props {
  groupName: string;
  inviteLink: string;
}

export default function CourseCommunityCard({
  groupName,
  inviteLink,
}: Props) {
  return (
    <aside
      className="
        sticky
        top-8
        overflow-hidden
        rounded-3xl
        border
        border-[#661093]/10
        bg-white
        shadow-lg
      "
    >
      <div className="bg-[#661093] px-6 py-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl">
            💬
          </div>

          <div>
            <p className="text-sm font-medium text-purple-100">
              Private Student Community
            </p>

            <h3 className="text-xl font-bold">
              Telegram Group
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Your Community
          </p>

          <h4 className="mt-2 text-lg font-bold text-neutral-900">
            {groupName}
          </h4>

          <p className="mt-3 leading-7 text-neutral-600">
            Connect with fellow students, receive important announcements,
            ask questions, share your projects, and interact directly with
            your instructor throughout this course.
          </p>
        </div>

        <div className="rounded-2xl bg-neutral-50 p-5">
          <h5 className="font-semibold text-neutral-900">
            Inside the community
          </h5>

          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            <li>✅ Instructor announcements</li>
            <li>✅ Assignment discussions</li>
            <li>✅ Student networking</li>
            <li>✅ Feedback & support</li>
            <li>✅ Live class notifications</li>
          </ul>
        </div>

        <Link
          href={inviteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex
            w-full
            items-center
            justify-center
            rounded-2xl
            bg-[#229ED9]
            px-6
            py-4
            text-lg
            font-semibold
            text-white
            transition
            hover:scale-[1.02]
            hover:shadow-lg
          "
        >
          💬 Join Telegram Group
        </Link>

        <p className="text-center text-xs leading-6 text-neutral-500">
          This invite is exclusive to enrolled students.
        </p>
      </div>
    </aside>
  );
}