

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

   // console.log('difficulty level',res.difficultyLevel);

  

    return handleTitleCode(res);
}

//handle 401,404,403
export const handleTitleCode=res=>{
       if(res.title===401){
     // redirect('/auth/signin')
     redirect('/unauthorized')
   }else if(res.title===403){
    redirect('/forbidden')
   }
   return res.json();
}

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return header;
}

export const protectedFetch=async(path)=>{
    const res=await fetch(`${baseUrl}${path}`);
    //handle 401,404, 403
    {
        //headers:await authHeader()
    }
    return handleTitleCode(res);
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

    return handleTitleCode(res);
}