import Link from "next/link";
import React from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import { Button } from "@heroui/react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 transition-transform hover:opacity-90">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg" />
          <span className="text-xl font-bold text-black dark:text-white tracking-tight">RecipeHub</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-600 dark:text-gray-300 font-medium">
          <li><Link href="/" className="hover:text-green-600 transition-colors">Home</Link></li>
          <li><Link href="/recips" className="hover:text-green-600 transition-colors">Browse Recipes</Link></li>
          <li><Link href="/dashboard" className="hover:text-green-600 transition-colors">Dashboard</Link></li>
          <li><Link href="/admin" className="hover:text-green-600 transition-colors">Admin Panel</Link></li>
        </ul>

        {/* User Account / Profile Section */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle Placeholder */}
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all">
            <LuSun size={20} />
          </button>

          {/* Auth Links */}
          <div className="flex items-center gap-4">
            {/* Example: Authenticated State */}
            <span className="text-sm">Hi, User!</span>
            <Button variant="ghost" className="text-red-600 hover:text-red-700">
              Sign Out
            </Button>

            {/* Example: Unauthenticated State (Commented out) */}
            {/* <Link href="/auth/signin" className="text-sm font-medium text-green-600 transition hover:text-green-700">
              Sign In
            </Link> 
            */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;