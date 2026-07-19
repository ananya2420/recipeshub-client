// src/app/dashboard/page.js
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/signin");

  if (session.user.role === "admin") {
    redirect("/dashboard/admin/overview");
  } else {
    redirect("/dashboard/user");
  }
}