import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ManageReports from "./ManageReports"; // Your UI component

export default async function ManageReportsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 1. If not logged in, force sign in
  if (!session) {
    redirect("/auth/signin");
  }

  // 2. If logged in but not admin, redirect to user dashboard
  if (session.user.role !== "admin") {
    redirect("/dashboard/user");
  }

  // 3. Authorized: show the reports component
  return <ManageReports />;
}