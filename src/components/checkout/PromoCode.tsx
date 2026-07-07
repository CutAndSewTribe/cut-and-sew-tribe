"use client";

export default function PromoCode() {
  return (
    <div className="space-y-2">

      <label className="font-semibold">
        Promo Code
      </label>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Enter code"
          className="
            flex-1
            rounded-xl
            border
            border-neutral-300
            px-4
            py-3
          "
        />

        <button
          className="
            rounded-xl
            bg-[#661093]
            px-5
            text-white
          "
        >
          Apply
        </button>

      </div>

    </div>
  );
}