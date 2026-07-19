
"use client";
import React from 'react';
import Link from 'next/link'; // 1. Import Link
import { usePathname } from 'next/navigation'; // 2. Import usePathname to highlight active links
import { 
  LayoutDashboard, 
  Users, 
  Utensils, 
  FileText, 
  CreditCard 
} from "lucide-react";
import { LayoutSideContentLeft, PersonFill, StarFill } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { ChartColumn, Plus, SquareStack } from "lucide-react";
import { BiBasket } from "react-icons/bi";
import { useRecipes } from "@/app/context/RecipeContext";

export function DashboardSidebar({ user }) {
  const { setView } = useRecipes(); 
  const pathname = usePathname(); // 3. Get current path

  const userNavItems = [
    { icon: ChartColumn, href: "/dashboard/user", label: "Overview" },
    { icon: Plus, href: "/dashboard/user/addrecipe", label: "Add Recipes", action: () => setView('form') },
    { icon: SquareStack, href: "/dashboard/user/myrecipes", label: "My Recipes", action: () => setView() },
    { icon: StarFill, href: "/dashboard/user/favourites", label: "Favourites" },
    { icon: BiBasket, href: "/dashboard/user/purchased", label: "Purchased" },
    { icon: PersonFill, href: "/profile", label: "Profile" },
  ];
 
  // const adminNavLinks = [
  //   { icon: LayoutDashboard, href: "/admin/overview", label: "Overview" },
  //   { icon: Users, href: "/admin/users", label: "Manage Users" },
  //   { icon: Utensils, href: "/admin/recipes", label: "Manage Recipes" },
  //   { icon: FileText, href: "/admin/reports", label: "Reports" },
  //   { icon: CreditCard, href: "/admin/transactions", label: "Transactions" },
  // ];

 // Inside your DashboardSidebar component
const adminNavLinks = [
  { icon: LayoutDashboard, href: "/dashboard/admin/overview", label: "Overview" },
  { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
  { icon: Utensils, href: "/dashboard/admin/recipes", label: "Manage Recipes" },
  { icon: FileText, href: "/dashboard/admin/report", label: "Reports" },
  { icon: CreditCard, href: "/dashboard/admin/transactions", label: "Transactions" },
];

  const navLinkMap = {
    user: userNavItems,
    admin: adminNavLinks
  };
 
 // const navItems = navLinkMap[user?.role || 'user'] || [];
 const isUserPage = pathname.startsWith('/dashboard/user');
  const isAdminPage = pathname.startsWith('/dashboard/admin');

  const navItems = isAdminPage ? adminNavLinks : userNavItems;

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href; // Check if current route is active
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => { if (item.action) item.action(); }}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              isActive 
                ? "bg-default font-semibold text-foreground" 
                : "text-muted-foreground hover:bg-default"
            }`}
          >
            {item.icon && <item.icon className="size-5" />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}