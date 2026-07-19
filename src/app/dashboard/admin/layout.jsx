

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";




export default function AdminLayout({ children }) {
  // You can fetch the user role from your auth context/server here
  const user = { role: 'admin' }; 

  return (
    <div className="flex">
      <DashboardSidebar user={user} />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}