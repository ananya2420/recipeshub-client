import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminUI from "./AdminUI";

export default async function AdminOverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard/user");
  }

  return <AdminUI />;
}