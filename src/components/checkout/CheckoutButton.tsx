"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";

interface Props {
  slug: string;
}

export default function CheckoutButton({
  slug,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/checkout",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            courseSlug: slug,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to initialize payment."
        );
      }

      window.location.href =
        data.authorization_url;
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      fullWidth
      disabled={loading}
    >
      {loading
        ? "Redirecting..."
        : "Continue to Payment"}
    </Button>
  );
}