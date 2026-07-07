import { Badge } from "@/components/ui";

interface Props {
  title: string;
  subtitle: string;
}

export default function CheckoutHero({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-10">

      <Badge>
        Secure Checkout
      </Badge>

      <h1
        className="
          mt-4
          text-4xl
          font-bold
          text-neutral-900
        "
      >
        {title}
      </h1>

      <p
        className="
          mt-4
          text-lg
          leading-8
          text-neutral-600
        "
      >
        {subtitle}
      </p>

    </div>
  );
}