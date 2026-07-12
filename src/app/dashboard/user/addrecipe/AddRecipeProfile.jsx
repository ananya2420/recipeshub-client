'use client';

import React, { useState, useRef } from 'react';
import { Button, toast } from '@heroui/react';
import { createRecipe } from '@/lib/api/recipe';

export default function AddRecipeProfile({ user }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Breakfast",
    difficultyLevel: "Easy",
    cuisineType: "",
    preparationTime: "",
    ingredients: "",
    instructions: "",
    image: ""
  });

  // Updated style: Removed harsh black borders for a clean, modern look
  const inputStyle = "w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-zinc-900 outline-none transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-zinc-400";

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const form = new FormData();
    form.append("image", file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, { method: 'POST', body: form });
      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.data.url }));
        toast.success("Image uploaded!");
      }
    } catch (err) { toast.error("Upload failed"); } finally { setIsUploading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, userId: user?.id };
    console.log("Form Data being sent:", dataToSend);
    await createRecipe(dataToSend);
    toast.success("Recipe Published successfully!");
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-zinc-900">Add New Recipe</h1>
        <p className="text-zinc-500 mt-1">Share your culinary creation with the community</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm">
        <input className={inputStyle} placeholder="Recipe Name*" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        
        {/* Image Upload Row */}
        <div className="relative">
          <input className={inputStyle} value={formData.image} placeholder="Image URL" onChange={(e) => setFormData({...formData, image: e.target.value})} />
          <button type="button" onClick={() => fileInputRef.current.click()} className="absolute right-3 top-3.5 text-green-600 font-semibold text-sm hover:underline">
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
        </div>

        {/* Categorization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select className={inputStyle} value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option>Breakfast</option><option>Lunch</option><option>Dinner</option>
          </select>
          <input className={inputStyle} placeholder="Cuisine Type" value={formData.cuisineType} onChange={(e) => setFormData({...formData, cuisineType: e.target.value})} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select className={inputStyle} value={formData.difficultyLevel} onChange={(e) => setFormData({...formData, difficultyLevel: e.target.value})}>
            <option>Easy</option><option>Moderate</option>
          </select>
          <input className={inputStyle} placeholder="Preparation Time (e.g. 30 mins)" value={formData.preparationTime} onChange={(e) => setFormData({...formData, preparationTime: e.target.value})} />
        </div>

        {/* Text Areas */}
        <textarea className={inputStyle} rows={4} placeholder="Ingredients" value={formData.ingredients} onChange={(e) => setFormData({...formData, ingredients: e.target.value})} />
        <textarea className={inputStyle} rows={6} placeholder="Instructions" value={formData.instructions} onChange={(e) => setFormData({...formData, instructions: e.target.value})} />

        <div className="flex gap-4 pt-2">
            <Button type="button" variant="bordered" className="w-full font-bold">Cancel</Button>
            <Button type="submit" className="w-full bg-green-600 text-white font-bold hover:bg-green-700">Publish Recipe</Button>
        </div>
      </form>
    </div>
  );
}