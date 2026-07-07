import type { PaymentProvider } from "./types";

export function determineProvider(
  currency: string,
): PaymentProvider {
  switch (currency) {
    case "NGN":
      return "paystack";

    case "GHS":
    case "XAF":
    case "ZAR":
      return "flutterwave";

    case "USD":
    case "EUR":
    case "GBP":
      return "stripe";

    default:
      return "bank-transfer";
  }
}