

"use client";
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

// Accept 'user' as a prop
export function DashboardSidebar({ user }) {

  const { setView } = useRecipes(); 

  const userNavItems = [
    { icon: ChartColumn, href: "/dashboard/user", label: "Overview", action: () => {} },
    { icon: Plus, href: "/dashboard/user/addrecipe", label: "Add Recipes", action: () => setView('form') },
    { icon: SquareStack, href: "/dashboard/user/myrecipes", label: "My Recipes", action: () => setView() },
    { icon: StarFill, href: "/dashboard/user/favourites", label: "Favourites", action: () => {} },
    { icon: BiBasket, href: "/dashboard/user/purchased", label: "Purchased", action: () => {} },
    { icon: PersonFill, href: "/profile", label: "Profile", action: () => {} },
  ];
 
  const userNavLinks = userNavItems;

  const adminNavLinks=[
    { icon: LayoutDashboard, href: "/admin/overview", label: "Overview", action: () => {} },
  { icon: Users, href: "/admin/users", label: "Manage Users", action: () => {} },
  { icon: Utensils, href: "/admin/recipes", label: "Manage Recipes", action: () => {} },
  { icon: FileText, href: "/admin/reports", label: "Reports", action: () => {} },
  { icon: CreditCard, href: "/admin/transactions", label: "Transactions", action: () => {} },
  ];

  const navLinkMap = {
    user: userNavLinks,
    admin:adminNavLinks
  };
 
  // Now 'user' is available from props
  const navItems = navLinkMap[user?.role || 'user'] || [];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={(e) => {
            if (item.action) item.action();
          }}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        >
          {item.icon && <item.icon className="size-5 text-muted" />}
          {item.label}
        </a>
      ))}
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