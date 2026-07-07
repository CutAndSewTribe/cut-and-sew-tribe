"use client";

import { useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";


export default function LoginPage(){

const supabase=createClient();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [message,setMessage]=useState("");


async function login(){

setMessage("Logging in...");


const {error}=await supabase.auth.signInWithPassword({
email,
password,
});


if(error){
setMessage(error.message);
return;
}


window.location.href="/dashboard";

}



return (

<div className="mx-auto max-w-md px-6 py-20">

<h1 className="text-4xl font-bold">
Student Login
</h1>


<div className="mt-8 space-y-4">


<input
className="w-full rounded-xl border p-3"
placeholder="Email"
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
onClick={login}
className="
w-full
rounded-xl
bg-[#661093]
py-3
font-semibold
text-white
"
>
Login
</button>


<p>
New student?

<Link
href="/signup"
className="ml-2 text-[#661093]"
>
Create account
</Link>

</p>


<p>
{message}
</p>


</div>

</div>

);

}