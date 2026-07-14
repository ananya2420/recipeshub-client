"use client" 

import { useSession } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';
import { FileText, Bookmark, Heart } from '@gravity-ui/icons'; 
import { DashboardStats } from '@/components/dashboard/DashboardStats';

const UserDashboardHomePage = () => {
    const { data: session, isPending } = useSession();
    const [mounted, setMounted] = useState(false);
    const [totalEngagement, setTotalEngagement] = useState(0);
    const [totalFavorites, setTotalFavorites] = useState(0);
    const [totalRecipes, setTotalRecipes] = useState(0); // Added state for recipe count

    // Fetch favorites count from MongoDB
    const calculateTotalFavorites = async () => {
        if (!session?.user?.id) return;
        try {
            const res = await fetch(`http://localhost:5000/api/favorites/${session.user.id}`);
            const data = await res.json();
            setTotalFavorites(data.length);
        } catch (error) {
            console.error("Failed to fetch favorites count:", error);
        }
    };

    // Fetch recipes count from MongoDB
    const calculateTotalRecipes = async () => {
        if (!session?.user?.id) return;
        try {
            const res = await fetch(`http://localhost:5000/api/recipes/${session.user.id}`);
            const data = await res.json();
            setTotalRecipes(data.count || 0);
        } catch (error) {
            console.error("Failed to fetch recipes count:", error);
        }
    };

    const calculateTotalEngagement = () => {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("likes_")) {
                total += parseInt(localStorage.getItem(key) || "0");
            }
        }
        setTotalEngagement(total);
    };

    useEffect(() => {
        setMounted(true);
        calculateTotalEngagement();
        calculateTotalFavorites();
        calculateTotalRecipes(); // Call the function
        
        window.addEventListener("engagementChanged", calculateTotalEngagement);
        window.addEventListener("favoritesChanged", calculateTotalFavorites);
        
        return () => {
            window.removeEventListener("engagementChanged", calculateTotalEngagement);
            window.removeEventListener("favoritesChanged", calculateTotalFavorites);
        };
    }, [session]);

    if (!mounted || isPending) {
        return <div className="text-4xl font-bold">Loading...</div>;
    }
    
    const userStats = [
        { title: "Published Recipes", value: totalRecipes.toString(), icon: FileText },
        { title: "Saved Favorites", value: totalFavorites.toString(), icon: Bookmark },
        { title: "Total Engagement", value: totalEngagement.toString(), icon: Heart },
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
                            <p className="font-semibold">Storage Limit: {totalRecipes}/2 Recipes</p>
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