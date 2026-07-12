"use client" 

import { useSession, signOut } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';

import { 
  FileText,   // For "Published Recipes"
  Bookmark,   // For "Saved Favorites"
  Heart,      // For "Total Engagement"
} from '@gravity-ui/icons'; 
import { DashboardStats } from '@/components/dashboard/DashboardStats';

const UserDashboardHomePage = () => {
    const { data: session, isPending } = useSession();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || isPending) {
        return <div className="text-4xl font-bold">Loading...</div>;
    }
    
    // Ensure you verify the exact icon names in your F12 Console
    const userStats = [
        { title: "Published Recipes", value: "1", icon: FileText },
        { title: "Saved Favorites", value: "2", icon: Bookmark },
        { title: "Total Engagement", value: "1", icon: Heart },
    ];

    const user = session?.user;
    
    return (
        <>
            <div>
                <h2 className='text-4xl font-bold'>Welcome back, {user?.name}</h2>
                <DashboardStats statsData={userStats} />
            </div>

            <div className="mt-8 space-y-8">
                {/* Storage Limit Section */}
                <div className="flex items-center justify-between rounded-xl border border-default bg-green-50 p-6 text-green-900">
                    <div className="flex items-center gap-3">
                        <div className="size-2 rounded-full bg-green-700" />
                        <div>
                            <p className="font-semibold">Storage Limit: 1/2 Recipes</p>
                            <p className="text-sm text-green-700">Basic accounts are limited to 2 recipes. Upgrade to unlock unlimited storage.</p>
                        </div>
                    </div>
                    <button className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                        Upgrade Account
                    </button>
                </div>

                {/* Quick Actions Section */}
                <div>
                    <h3 className="mb-4 text-xl font-bold">Quick Actions</h3>
                    <div className="flex gap-4">
                        <button className="rounded-lg bg-green-700 px-6 py-2.5 text-sm font-medium text-white">Create new recipe</button>
                        <button className="rounded-lg border border-default px-6 py-2.5 text-sm font-medium hover:bg-default">Browse gallery</button>
                        <button className="rounded-lg border border-default px-6 py-2.5 text-sm font-medium hover:bg-default">View saved items</button>
                        <button className="rounded-lg border border-default px-6 py-2.5 text-sm font-medium hover:bg-default">Account settings</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDashboardHomePage;