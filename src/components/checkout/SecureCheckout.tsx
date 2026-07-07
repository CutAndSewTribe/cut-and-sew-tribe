export default function SecureCheckout() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-green-200
        bg-green-50
        p-5
      "
    >

      <p className="font-semibold text-green-700">
        🔒 Secure SSL Checkout
      </p>

      <ul className="mt-4 space-y-2 text-sm text-neutral-700">

        <li>✔ Lifetime Access</li>

        <li>✔ Certificate of Completion</li>

        <li>✔ Private Student Community</li>

        <li>✔ Mobile Friendly Learning</li>

      </ul>

    </div>
  );
}