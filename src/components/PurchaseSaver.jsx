// "use client";
// import { useEffect } from "react";

// export default function PurchaseSaver({ session }) {
//   useEffect(() => {
//     // Check if the session exists and is complete
//     if (session && session.status === "complete") {
//       const newPurchase = {
//         id: session.id,
//         date: new Date().toLocaleDateString(),
//         // Accessing the plain object structure
//         title: session.line_items?.data[0]?.description || "Recipe Purchase",
//         amount: (session.amount_total / 100).toFixed(2),
//       };

//       const existing = JSON.parse(localStorage.getItem("purchased_recipes") || "[]");
      
//       // Prevent duplicates
//       if (!existing.find(p => p.id === newPurchase.id)) {
//         localStorage.setItem("purchased_recipes", JSON.stringify([...existing, newPurchase]));
//       }
//     }
//   }, [session]);

//   return null; 
// }


"use client";
import { useEffect } from "react";

export default function PurchaseSaver({ session }) {
  useEffect(() => {
    // 1. Check if the session exists and is complete
    if (session && session.status === "complete") {
      const recipeId = session.metadata?.recipeId;

      // --- SAVE TO PURCHASES ---
      const newPurchase = {
        id: session.id,
        date: new Date().toLocaleDateString(),
        title: session.line_items?.data[0]?.description || "Recipe Purchase",
        amount: (session.amount_total / 100).toFixed(2),
      };

      const existingPurchases = JSON.parse(localStorage.getItem("purchased_recipes") || "[]");
      if (!existingPurchases.find(p => p.id === newPurchase.id)) {
        localStorage.setItem("purchased_recipes", JSON.stringify([...existingPurchases, newPurchase]));
      }

      // --- SAVE TO FAVORITES (For your FavoritesPage) ---
      if (recipeId) {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        
        // Add if not already present
        if (!favorites.includes(recipeId)) {
          const updatedFavorites = [...favorites, recipeId];
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          
          // Trigger the event so the FavoritesPage updates if it's already open
          window.dispatchEvent(new Event("favoritesChanged"));
        }
      }
    }
  }, [session]);

  return null; 
}