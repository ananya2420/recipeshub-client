const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetch = async (path) => {
    const url = path.startsWith('/') 
        ? `${baseUrl}${path}` 
        : `${baseUrl}/${path}`;
        
    const res = await fetch(url);
    
    return handleStatusCode(res);
}

const handleStatusCode = async (res) => {
    // 1. Get the response text first
    const text = await res.text();
    
    // 2. Check if the response is empty (prevents Unexpected end of JSON input)
    if (!text) {
        return null; 
    }

    // 3. Handle HTTP error status codes
    if (!res.ok) {
        let errorData;
        try {
            errorData = JSON.parse(text);
        } catch (e) {
            errorData = { message: `Request failed with status ${res.status}` };
        }
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
    }

    // 4. Safely parse the valid JSON
    return JSON.parse(text);
};


export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ... await authHeader()
        },
        body: JSON.stringify(data),
    });


    return handleStatusCode(res);
}
