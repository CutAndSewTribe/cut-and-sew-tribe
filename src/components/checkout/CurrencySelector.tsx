"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const currencies = [
  { code: "NGN", label: "🇳🇬 Nigerian Naira (₦)" },
  { code: "USD", label: "🇺🇸 US Dollar ($)" },
  { code: "EUR", label: "🇪🇺 Euro (€)" },
  { code: "GBP", label: "🇬🇧 British Pound (£)" },
  { code: "GHS", label: "🇬🇭 Ghana Cedi (₵)" },
  { code: "ZAR", label: "🇿🇦 South African Rand (R)" },
  { code: "XAF", label: "🇨🇲 Central African CFA" },
];

export default function CurrencySelector({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">
      <label
        className="
          text-sm
          font-semibold
          text-neutral-700
        "
      >
        Currency
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-neutral-300
          bg-white
          px-4
          py-3
          text-neutral-900
          focus:border-[#661093]
          focus:outline-none
        "
      >
        {currencies.map((currency) => (
          <option
            key={currency.code}
            value={currency.code}
          >
            {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
}