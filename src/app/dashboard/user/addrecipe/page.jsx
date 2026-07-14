import React from 'react';
import AddRecipeProfile from './AddRecipeProfile';
//import { getUserSession } from '@/lib/core/session';
import { getUserRecipe } from '@/lib/api/recipe';
import { getUserSession } from '@/lib/core/session';


const RecipePage = async () => {
    const user = await getUserSession();
    
    // Fetch the recipe associated with this user
    const recipe = await getUserRecipe(user?.id);
    
    console.log("Fetched Recipe:", recipe);

    return (
        <div>
            {/* Pass the fetched recipe and user session to the component */}
            <AddRecipeProfile 
                initialRecipe={recipe} 
                user={user} 
            /> 
        </div>
    );
};

export default RecipePage;