
import { getUserSession } from "@/lib/core/session";
import { DashboardSidebar } from "./dashboard/DashboardSidebar";


export default async function DashboardSidebarWrapper() {
  const user = await getUserSession();
  return <DashboardSidebar user={user} />;
}