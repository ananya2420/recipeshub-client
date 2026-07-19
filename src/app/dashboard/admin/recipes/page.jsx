import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ManageRecipes from "./ManageRecipes"; // Ensure this matches your component's file name

export default async function ManageRecipesPage() {
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

  // If authorized, render the page
  return <ManageRecipes />;
}