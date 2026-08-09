"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface Props {
  slug: string;
}

export default function CheckoutButton({ slug }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    try {
      setLoading(true);

      const email = window.prompt(
        "Enter your email address to continue to secure payment:"
      );

      if (!email) {
        setLoading(false);
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseSlug: slug,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Unable to initialize payment."
        );
      }

      window.location.href = data.authorization_url;
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
      disabled={loading}
      className="w-full"
    >
      {loading ? "Redirecting..." : "Enroll Now"}
    </Button>
  );
}