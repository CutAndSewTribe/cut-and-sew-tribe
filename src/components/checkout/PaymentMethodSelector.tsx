"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const methods = [
  "Card",
  "Bank Transfer",
  "Flutterwave",
  "Stripe",
];

export default function PaymentMethodSelector({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">

      <h3 className="font-semibold text-neutral-900">
        Payment Method
      </h3>

      {methods.map((method) => (
        <label
          key={method}
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-neutral-200
            p-4
            cursor-pointer
            hover:border-[#661093]
          "
        >
          <input
            type="radio"
            checked={value === method}
            onChange={() => onChange(method)}
          />

          <span>{method}</span>

        </label>
      ))}

    </div>
  );
}