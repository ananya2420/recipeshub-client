'use server'

import { headers } from "next/headers";
import * as authModule from "../auth";
const auth = authModule.auth;

import { protectedFetch, serverFetch, serverMutation } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// Helper to get headers with Authorization
const getHeaders = (token) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const getAllRecips = async (search = "", category = "", queryString = "") => {
    const buildQuery = (value) => (value.startsWith('?') ? value : `?${value}`);
    const buildUrl = (value) => {
        if (value) return buildQuery(value);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        return params.toString() ? `?${params.toString()}` : '';
    };

    const fetchRecipes = async (url) => {
        try {
            // FIXED: Forcing the fetch to your Express server on localhost:5000
            // We append the path from the 'url' parameter to the local backend base
            const path = url.split('/api')[1] || url.replace(baseUrl, '');
            const res = await fetch(`http://localhost:5000${path}`, { cache: 'no-store' });
            
            if (!res.ok) {
                const errorData = await res.text();
                console.warn(`Recipe fetch failed for ${url}: ${res.status} - ${errorData || res.statusText}`);
                return null;
            }
            return await res.json();
        } catch (error) {
            console.warn(`Recipe fetch error for ${url}:`, error);
            return null;
        }
    };

    const query = buildUrl(queryString);
    const localUrl = `/recips${query}`;
    const localData = await fetchRecipes(localUrl);

    if (localData) {
        return Array.isArray(localData) ? localData : [];
    }

    if (!baseUrl) {
        return [];
    }

    const fallbackUrl = `${baseUrl}/recipes${query}`;
    const fallbackData = await fetchRecipes(fallbackUrl);
    return Array.isArray(fallbackData) ? fallbackData : [];
};

// Add the token parameter here
export const getRecipeById = async (id, token = null) => {
    // BACKEND EXPECTS: /recipe/:id (singular)
    const localUrl = `http://localhost:5000/recipe/${id}`; 

    try {
        const localRes = await fetch(localUrl, { cache: 'no-store' });
        if (localRes.ok) {
            return await localRes.json();
        }
    } catch (error) {
        console.warn(`Local recipe fetch failed for ${localUrl}:`, error);
    }
    return null;
};

export const updateRecipe = async (id, data) => {
    if (!baseUrl) throw new Error("NEXT_PUBLIC_SERVER_URL is not defined");

    // BACKEND EXPECTS: /recipe/:id (singular)
    const res = await fetch(`http://localhost:5000/recipe/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to update recipe');
    }

    return await res.json();
};

export const getUserRecipe = async (userId) => {
    if (!userId) {
        console.warn("getUserRecipe called with undefined userId");
        return [];
    }
    
    // Remove "/api" to match your app.get("/recips", ...) route
    return await serverFetch(`/recips?userId=${userId}`);
};

export const getRecips=async()=>{
    return protectedFetch(`/api/recips`);
}

export const createRecipe = async (newRecipeData) => {
    // FIX: Access the session through the auth object's API, not as a function call
    const session = await authModule.auth.api.getSession({
        headers: await headers(),
    });
    
    // Adjust 'token' based on where your session object stores it
    const token = session?.session?.token; 

    const res = await fetch(`http://localhost:5000/api/recips`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }) 
        },
        body: JSON.stringify(newRecipeData),
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Create recipe failed:", errorText);
        throw new Error(`Failed to create recipe: ${errorText}`);
    }

    return await res.json();
};

// Add to lib-api-recips.js



// Delete a recipe
// --- Admin API Routes ---

// Fetch ALL recipes (no userId filter)
export const getAllRecipesForAdmin = async () => {
    try {
        // This fetches from your Express server on port 5000
        const res = await fetch(`http://localhost:5000/recips`, { cache: 'no-store' });
        if (!res.ok) throw new Error("Failed to fetch all recipes");
        return await res.json();
    } catch (error) {
        console.error("Error in getAllRecipesForAdmin:", error);
        return [];
    }
};

export const deleteRecipe = async (id, token) => { // Accept token as a parameter
  try {
    const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Add the token here
      },
    });
    
    if (!res.ok) {
      // This will now log the specific message from the server (e.g., "forbidden access")
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete recipe");
    }
    return await res.json();
  } catch (error) {
    console.error("Delete Error:", error);
    throw error; // Rethrow to let the UI handle the error
  }
};




// Feature a recipe (uses your existing updateRecipe function)
export const featureRecipe = async (id) => {
    // Calling your existing updateRecipe function with the featured flag
    return await updateRecipe(id, { isFeatured: true });
};

export const getFeaturedRecipes = async () => {
    try {
        const res = await fetch(`http://localhost:5000/recips?featured=true`, { cache: 'no-store' });
        return await res.json();
    } catch (error) {
        console.error("Error fetching featured recipes:", error);
        return [];
    }
};

export const getRecipesList = async () => {
    const recips = await auth.api.listRecips({
        query: {
            sortBy: "createdAt",
            sortDirection: "desc"
        },
        // This endpoint requires session cookies.
        headers: await headers(),
    });
    return recips;
}