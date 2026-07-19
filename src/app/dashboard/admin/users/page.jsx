import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ManageUsers from "./ManageUsers"; // Assuming your file is named ManageUsers.tsx

export default async function ManageUsersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If not logged in, force sign in
  if (!session) {
    redirect("/auth/signin");
  }

  // If logged in but not admin, redirect to normal user dashboard
  if (session.user.role !== "admin") {
    redirect("/dashboard/user");
  }

  // If everything is fine, show the page
  return <ManageUsers />;
}