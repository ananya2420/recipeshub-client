"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client"; // Import this

export default function FavouritesPage() {
  const [favorites, setFavorites] = useState([]);
  const { data: session } = useSession(); // Get the session

  // useEffect(() => {
  //   // Only fetch if we have a user ID
  //   if (session?.user?.id) {
  //     fetch(`http://localhost:5000/api/favorites/${session.user.id}`)
  //       .then(res => res.json())
  //       .then(data => setFavorites(data));
  //   }
  // }, [session]); 

  useEffect(() => {
  console.log("useEffect triggered. Session status:", session);
  
  if (session?.user?.id) {
    console.log("Condition met: Fetching data for ID:", session.user.id);
    fetch(`http://localhost:5000/api/favorites/${session.user.id}`)
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(err => console.error("Fetch error:", err));
  } else {
    console.log("Condition failed: session.user.id is missing or undefined.");
  }
}, [session]);

  const handleRemove = async (recipeId) => {
    // Ensure we use both IDs in the URL to match your server route
    await fetch(`http://localhost:5000/api/favorites/${session.user.id}/${recipeId}`, { 
        method: "DELETE" 
    });
    setFavorites(favorites.filter(f => f.recipeId !== recipeId));
  };
;
console.log("favourite item",favorites[0]);
  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {favorites.map((recipe) => (
        
        // Use recipe._id instead of recipe.recipeId for the React key
        <div key={recipe._id} className="border rounded-xl p-4 shadow-sm">
          
          <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded-lg" />
          <h2 className="font-bold text-lg mt-2">{recipe.title}</h2>
          <div className="flex gap-2 mt-4">
            <Link href={`/recips/${recipe.recipeId}`} className="bg-green-500 text-white px-4 py-2 rounded">
              View Details
            </Link>
            <button 
                onClick={() => handleRemove(recipe.recipeId)} 
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}