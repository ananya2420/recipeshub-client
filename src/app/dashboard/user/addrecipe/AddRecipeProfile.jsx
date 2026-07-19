
"use client";
import { useState, useRef } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useRecipes } from "@/app/context/RecipeContext";
import { createRecipe } from "@/lib/api/recipe";

export default function AddRecipeForm() {
  const router = useRouter();
  const { addRecipe } = useRecipes();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Breakfast",
    difficulty: "Easy",
    cuisine: "",
    prepTime: "",
    ingredients: "",
    instructions: "",
    image: ""
  });

  // Updated Styles
  const inputContainerStyle = "flex flex-col gap-1.5";
  const labelStyle = "text-sm font-semibold text-zinc-800";
  const inputStyle = "w-full rounded-xl border border-zinc-300 bg-white p-3 text-black outline-none transition-all focus:border-green-600 focus:ring-1 focus:ring-green-600";

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setIsUploading(true);

  const uploadData = new FormData();
  uploadData.append("image", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    const result = await response.json();

    if (result.success) {
      setFormData((prev) => ({ ...prev, image: result.data.url }));
    } else {
      alert("Upload failed: " + (result.error?.message || "Unknown error"));
    }
  } catch (err) {
    alert("Upload failed. Please try again.");
  } finally {
    setIsUploading(false);
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("ananya");
  
  try {
    // Call the API function
    await createRecipe(formData);

   // addRecipe(formData);
    
    alert("Recipe added successfully!");
    router.push("/dashboard/user/myrecipes");
  } catch (error) {
    console.error(error);
    alert("Failed to publish recipe. Please try again.");
  }
};

  return (
    <div className="mx-auto max-w-4xl p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-black">Add New Recipe +</h1>
        <p className="text-zinc-600">Share your culinary creation with the community</p>
      </header>
      
      <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm">
        
        {/* Name */}
        <div className={inputContainerStyle}>
          <label className={labelStyle}>Recipe Name *</label>
          <input className={inputStyle} placeholder="Enter recipe name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        
        {/* Image */}
        <div className={inputContainerStyle}>
          <label className={labelStyle}>Image URL</label>
          <div className="relative">
            <input className={inputStyle} value={formData.image} placeholder="Paste link or click upload" onChange={(e) => setFormData({...formData, image: e.target.value})} />
            <button type="button" onClick={() => fileInputRef.current.click()} className="absolute right-3 top-3 text-green-600 font-bold hover:text-green-800">
              {isUploading ? "Uploading..." : "Upload"}
            </button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
          </div>
        </div>

        {/* Category & Cuisine */}
        <div className="grid grid-cols-2 gap-6">
          <div className={inputContainerStyle}>
            <label className={labelStyle}>Category</label>
            <select className={inputStyle} value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option>Breakfast</option><option>Lunch</option><option>Dinner</option>
            </select>
          </div>
          <div className={inputContainerStyle}>
            <label className={labelStyle}>Cuisine</label>
            <input className={inputStyle} placeholder="e.g. Italian" value={formData.cuisine} onChange={(e) => setFormData({...formData, cuisine: e.target.value})} />
          </div>
        </div>

        {/* Difficulty & Prep Time */}
        <div className="grid grid-cols-2 gap-6">
          <div className={inputContainerStyle}>
            <label className={labelStyle}>Difficulty</label>
            <select className={inputStyle} value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}>
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
          </div>
          <div className={inputContainerStyle}>
            <label className={labelStyle}>Prep Time</label>
            <input className={inputStyle} placeholder="e.g. 30 mins" value={formData.prepTime} onChange={(e) => setFormData({...formData, prepTime: e.target.value})} />
          </div>
        </div>
        
        {/* Ingredients & Instructions */}
        <div className={inputContainerStyle}>
          <label className={labelStyle}>Ingredients</label>
          <textarea className={inputStyle} rows={4} placeholder="Enter ingredients list" value={formData.ingredients} onChange={(e) => setFormData({...formData, ingredients: e.target.value})} />
        </div>
        <div className={inputContainerStyle}>
          <label className={labelStyle}>Instructions</label>
          <textarea className={inputStyle} rows={4} placeholder="Enter step-by-step instructions" value={formData.instructions} onChange={(e) => setFormData({...formData, instructions: e.target.value})} />
        </div>

        <Button  type="submit" className="w-full h-12 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700">
            Publish Recipe
        </Button>
      </form>
    </div>
  );
}