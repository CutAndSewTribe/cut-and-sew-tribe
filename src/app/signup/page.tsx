"use client";

import { useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";


export default function SignupPage() {

  const supabase = createClient();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");

  const [message,setMessage] = useState("");


  async function signup() {

    setMessage("Creating account...");


    const { error } =
  await supabase.auth.signUp({
    email,
    password,
    options:{
      data:{
        full_name:name,
      },
    },
  });


    if(error){
      setMessage(error.message);
      return;
    }


    setMessage(
      "Account created. Check your email."
    );

  }



  return (

    <div className="mx-auto max-w-md px-6 py-20">

      <h1 className="text-4xl font-bold">
        Create Student Account
      </h1>


      <div className="mt-8 space-y-4">


        <input
          className="w-full rounded-xl border p-3"
          placeholder="Full name"
          onChange={
            e=>setName(e.target.value)
          }
        />


        <input
          className="w-full rounded-xl border p-3"
          placeholder="Email"
          type="email"
          onChange={
            e=>setEmail(e.target.value)
          }
        />


        <input
          className="w-full rounded-xl border p-3"
          placeholder="Password"
          type="password"
          onChange={
            e=>setPassword(e.target.value)
          }
        />


        <button
          onClick={signup}
          className="
            w-full
            rounded-xl
            bg-[#661093]
            py-3
            font-semibold
            text-white
          "
        >
          Create Account
        </button>


        <p className="text-sm">
          Already have an account?

          <Link
            href="/login"
            className="ml-2 text-[#661093]"
          >
            Login
          </Link>

        </p>


        <p>
          {message}
        </p>


      </div>

    </div>

  );

}