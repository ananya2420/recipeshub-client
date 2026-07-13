// components/PurchaseSaver.js
"use client";
import { useEffect } from "react";

export default function PurchaseSaver({ session }) {
  useEffect(() => {
    if (session && session.status === "complete") {
      const saveToDatabase = async () => {
        try {
          // CHANGE THIS PATH TO MATCH YOUR SERVER ROUTE
          const response = await fetch("http://localhost:5000/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              recipeId: session.metadata?.recipeId,
              title: session.line_items?.data[0]?.description || "Recipe Purchase",
              price: (session.amount_total / 100).toFixed(2), // Match the field name 'price' used in server.js
              userId: session.metadata?.userId 
            }),
          });
          
          if (!response.ok) {
            console.error("Failed to save. Server responded with:", response.status);
          } else {
            console.log("Purchase saved successfully");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      saveToDatabase();
    }
  }, [session]);

  return null;
}