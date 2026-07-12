// const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

// export const serverFetch = async (path) => {
//     // Ensure we don't double slash if path already starts with /
//     const url = path.startsWith('/') 
//         ? `${baseUrl}${path}` 
//         : `${baseUrl}/${path}`;
        
//     const res = await fetch(url, { cache: 'no-store' });
    
//     return handleStatusCode(res);
// }

// const handleStatusCode = async (res) => {
//     const text = await res.text();
    
//     if (!text) {
//         return null; 
//     }

//     if (!res.ok) {
//         let errorData;
//         try {
//             errorData = JSON.parse(text);
//         } catch (e) {
//             // Log the URL that failed to help you debug the 404
//             console.error(`Fetch failed for: ${res.url}`);
//             errorData = { message: `Request failed with status ${res.status}` };
//         }
//         throw new Error(errorData.message || `Request failed with status ${res.status}`);
//     }

//     return JSON.parse(text);
// };

// export const serverMutation = async (path, data, method = 'POST') => {
//     // Ensure baseUrl is used correctly
//     const headers = {
//         'Content-Type': 'application/json',
//         ... await authHeader() // Added 'await' here
//     };

//     const res = await fetch(`${baseUrl}${path}`, {
//         method: method,
//         headers: headers,
//         body: JSON.stringify(data),
//     });

//     return handleStatusCode(res);
// }

// src/lib/core/server.js

export async function serverMutation(path, data) {
    const baseUrl = 'http://localhost:5000'; // Ensure this points to your backend

    const headers = {
        'Content-Type': 'application/json',
        // authHeader is removed for now until you implement tokens
    };

    const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST', // or GET, depending on your endpoint
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    return res.json();
}