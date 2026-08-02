import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import InstructorLayout from "@/components/instructor/layout/InstructorLayout";
import { createClient } from "@/lib/supabase/server";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/instructor/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/");
  }

  if (profile.role !== "instructor" && profile.role !== "admin") {
    redirect("/");
  }

  return <InstructorLayout>{children}</InstructorLayout>;
}