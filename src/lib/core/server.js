export async function serverMutation(path, data) {
    const baseUrl = 'http://localhost:5000';
    const fullUrl = `${baseUrl}${path}`;

    // Debugging: This will show in your browser console when you submit the form
    console.log("MUTATION DEBUG - Full URL:", fullUrl);

    const res = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        // This will now clearly tell you which URL failed
        const errorText = await res.text();
        throw new Error(`Failed to fetch: ${res.statusText} at ${fullUrl}. Details: ${errorText}`);
    }

    return res.json();
}

export async function serverFetch(path) {
    const baseUrl = 'http://localhost:5000';
    const fullUrl = `${baseUrl}${path}`;

    console.log("FETCH DEBUG - Full URL:", fullUrl);

    const res = await fetch(fullUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText} at ${fullUrl}`);
    }

    return res.json();
}

