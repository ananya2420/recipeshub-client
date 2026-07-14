"use client";

import { useEffect, useState } from "react";
import { getFeaturedRecipes } from "@/lib/api/recipe";
// Import your existing RecipeCard component to maintain design consistency
import RecipeCard from "@/components/RecipeCard"; 

export default function FeaturedSection() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getFeaturedRecipes().then(data => setFeatured(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Featured Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((recipe) => (
          <div key={recipe._id} className="relative">
            {/* The Badge */}
            <span className="absolute top-2 right-2 z-10 bg-black text-white text-xs px-2 py-1 rounded">
              Featured
            </span>
            
            {/* Reuse your existing Card Component */}
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}