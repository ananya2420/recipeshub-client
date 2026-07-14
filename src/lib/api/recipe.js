

import { serverFetch, serverMutation } from "../core/server";

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


// export const createRecipe = async (newRecipeData) => {
   
//     return serverMutation('/api/recips', newRecipeData);
// };

export const createRecipe = async (newRecipeData) => {
    // CHANGE THIS: Point directly to localhost:5000 
    // instead of using the generic serverMutation which likely defaults to localhost:3000
    const res = await fetch(`http://localhost:5000/api/recips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipeData),
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Create recipe failed:", errorText);
        throw new Error('Failed to create recipe');
    }

    return await res.json();
};