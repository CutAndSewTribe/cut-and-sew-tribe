interface Props {
  price: number;
  currency: string;
}

export default function OrderSummary({
  price,
  currency,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-200
        bg-neutral-50
        p-6
      "
    >

      <h3 className="text-xl font-bold">
        Order Summary
      </h3>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            {currency} {price.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>0</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>
            {currency} {price.toLocaleString()}
          </span>
        </div>

      </div>

    </div>
  );
}