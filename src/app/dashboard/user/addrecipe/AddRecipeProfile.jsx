'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@heroui/react';
import { toast } from 'react-hot-toast';
import { createRecipe } from '@/lib/api/recipe';

export default function AddRecipeProfile({ user }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  
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
      } else {
        toast.error("Upload failed: " + (data.error?.message || "Invalid response"));
      }
    } catch (err) { toast.error("Upload failed"); } finally { setIsUploading(false); }
  };

  const handleDelete = (index) => {
    setRecipes(recipes.filter((_, i) => i !== index));
    toast.error("Recipe deleted");
  };

  const handleEdit = (index) => {
    setFormData(recipes[index]);
    setEditingRecipe(index);
    setShowTable(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, userId: user?.id };
    const payload = await createRecipe(dataToSend);

    if (payload && payload.insertedId) {
      if (editingRecipe !== null) {
        const updated = [...recipes];
        updated[editingRecipe] = dataToSend;
        setRecipes(updated);
        setEditingRecipe(null);
      } else {
        setRecipes([...recipes, dataToSend]);
      }
      toast.success("Recipe saved successfully!");
      setShowTable(true);
      setFormData({ name: "", category: "Breakfast", difficultyLevel: "Easy", cuisineType: "", preparationTime: "", ingredients: "", instructions: "", image: "" });
    } else {
      toast.error("Failed to create recipe");
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      {showTable ? (
        <div className="bg-white p-6 rounded-xl border border-zinc-200">
          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">My Recipes 🗒️</h1>
            <Button onClick={() => setShowTable(false)}>+ Add Recipe</Button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-zinc-500 text-sm">
                <th className="pb-3">Recipe</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Difficulty</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 flex items-center gap-3">
                    {recipe.image && (
                      <img src={recipe.image} className="w-10 h-10 rounded object-cover" alt={recipe.name} />
                    )}
                    {recipe.name}
                  </td>
                  <td className="py-4"><span className="bg-orange-100 text-orange-600 px-2 py-1 rounded">{recipe.category}</span></td>
                  <td className="py-4"><span className="bg-green-100 text-green-600 px-2 py-1 rounded">{recipe.difficultyLevel}</span></td>
                  <td className="py-4 flex gap-2">
                    <Button size="sm" variant="bordered" onClick={() => alert("Viewing " + recipe.name)}>View</Button>
                    <Button size="sm" color="warning" onClick={() => handleEdit(index)}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => handleDelete(index)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-zinc-900">Add New Recipe</h1>
            <p className="text-zinc-500 mt-1">Share your culinary creation with the community</p>
          </header>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm">
            <input className={inputStyle} placeholder="Recipe Name*" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <div className="relative">
              <input className={inputStyle} value={formData.image} placeholder="Image URL" onChange={(e) => setFormData({...formData, image: e.target.value})} />
              <button type="button" onClick={() => fileInputRef.current.click()} className="absolute right-3 top-3.5 text-green-600 font-semibold text-sm hover:underline">
                {isUploading ? "Uploading..." : "Upload Image"}
              </button>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
            </div>
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
            <textarea className={inputStyle} rows={4} placeholder="Ingredients" value={formData.ingredients} onChange={(e) => setFormData({...formData, ingredients: e.target.value})} />
            <textarea className={inputStyle} rows={6} placeholder="Instructions" value={formData.instructions} onChange={(e) => setFormData({...formData, instructions: e.target.value})} />
            <div className="flex gap-4 pt-2">
                <Button type="button" variant="bordered" className="w-full font-bold" onClick={() => setShowTable(true)}>Cancel</Button>
                <Button type="submit" className="w-full bg-green-600 text-white font-bold hover:bg-green-700">Publish Recipe</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}