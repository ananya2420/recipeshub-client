'use server'
import { serverMutation } from "../core/server";

export const createRecipe = async (newRecipeData) => {
   
    return await serverMutation('/api/recips', {
        method: 'POST',
        body: JSON.stringify(newRecipeData),
    });
};