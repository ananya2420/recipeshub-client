
"use client";
import { useRecipes } from "@/app/context/RecipeContext";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Keep this here

export default function MyRecipesPage() {
  const { recipes } = useRecipes();
  const router = useRouter(); // This is correctly placed inside the component function

  return (
    <div className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Recipes 🗒️</h1>
        <Button as={Link} href="/add-recipe" className="bg-green-500">
          + Add Recipe
        </Button>
      </div>

      <table className="w-full text-left border-collapse">
        {/* ... table head remains the same ... */}
        <tbody>
          {recipes.map((recipe, index) => (
            <tr key={index} className="border-b border-zinc-100">
              <td className="py-4">{recipe.name}</td>
              <td className="py-4">
                <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm">
                  {recipe.category}
                </span>
              </td>
              <td className="py-4">
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-sm">
                  {recipe.difficulty}
                </span>
              </td>
              <td className="py-4 flex gap-2">
                <button 
                  onClick={() => router.push(`/recipe/${recipe._id}`)} 
                  className="text-zinc-600 hover:text-black"
                >
                  View
                </button>
                <button 
                  onClick={() => router.push(`/dashboard/user/edit-recipe/${recipe._id}`)} 
                  className="text-green-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => {/* Add delete logic */}} 
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}