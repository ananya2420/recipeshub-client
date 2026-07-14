"use client";
import { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
//import RecipeCard from './RecipeCard'; // Assuming your file path

const PopularRecipesSection = () => {
  const [popular, setPopular] = useState([]);

 useEffect(() => {
    fetch('http://localhost:5000/api/popular-recipes')
      .then(res => res.json())
      .then(data => {
        console.log("Data from API:", data); // Check your Browser Console
        setPopular(data);
      });
}, []);

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Popular Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {popular.map((item) => (
          <div key={item._id} className="flex flex-col">
            {/* Pass recipe details from the joined data */}
            <RecipeCard recipe={{ ...item.recipeDetails, likesCount: item.likesCount }} />
            <p className="text-sm mt-2 font-medium">🔥 {item.likesCount} people liked this!</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRecipesSection;