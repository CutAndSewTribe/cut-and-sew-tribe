import CheckoutButton from "./CheckoutButton";

interface Props {
  slug: string;
  email: string;
}

export default function CheckoutSidebar({
  slug,
  email,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-neutral-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <div
        className="
          rounded-xl
          bg-neutral-100
          p-4
        "
      >
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-neutral-500
          "
        >
          Paying as
        </p>

        <p
          className="
            mt-2
            font-semibold
            text-neutral-900
          "
        >
          {email}
        </p>
      </div>

      <div className="mt-8">
        <CheckoutButton slug={slug} />
      </div>
    </div>
  );
}