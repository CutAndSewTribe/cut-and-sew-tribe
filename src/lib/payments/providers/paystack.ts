import axios from "axios";

const paystack = axios.create({
  baseURL: "https://api.paystack.co",

  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

export async function initializeTransaction({
  email,
  amount,
  callback_url,
}: {
  email: string;
  amount: number;
  callback_url: string;
}) {
  const response = await paystack.post(
    "/transaction/initialize",
    {
      email,
      amount,
      callback_url,
    },
  );

  return response.data;
}