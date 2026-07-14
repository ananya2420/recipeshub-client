"use client";

import { deleteRecipe, featureRecipe, getAllRecipesForAdmin } from "@/lib/api/recipe";
import { useEffect, useState } from "react";

export default function ManageRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    setLoading(true);
    const data = await getAllRecipesForAdmin();
    setRecipes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      await deleteRecipe(id);
      fetchRecipes();
    }
  };

  const handleFeature = async (id) => {
    await featureRecipe(id);
    alert("Recipe featured!");
    fetchRecipes();
  };

  if (loading) return <div className="p-6">Loading recipes...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage All Recipes</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">Recipe Name</th>
              <th className="py-3 px-4 border-b text-left">Author</th>
              <th className="py-3 px-4 border-b text-left">Category</th>
              <th className="py-3 px-4 border-b text-center">Linked</th>
              <th className="py-3 px-4 border-b text-center">Featured</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{recipe.name}</td>
                <td className="py-3 px-4 border-b">{recipe.authorName || "N/A"}</td>
                <td className="py-3 px-4 border-b">{Array.isArray(recipe.category) ? recipe.category.join(", ") : recipe.category}</td>
                <td className="py-3 px-4 border-b text-center">{recipe.userId || "N/A"}</td>
                <td className="py-3 px-4 border-b text-center">
                  {recipe.isFeatured ? "✅" : "❌"}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <button 
                    onClick={() => handleFeature(recipe._id)}
                    className="mr-3 text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Feature
                  </button>
                  <button 
                    onClick={() => handleDelete(recipe._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}