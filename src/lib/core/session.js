
import { redirect } from "next/navigation";
import { auth } from "../auth";

export const getUserSession = async (req = null) => {
  try {
   
    
    let headersInstance;
    
    
    try {
      const { headers } = await import("next/headers");
      headersInstance = await headers();
    } catch (e) {
    
      headersInstance = null;
    }

    const session = await auth.api.getSession({
      headers: headersInstance || req?.headers, 
    });

    return session?.user || null;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
};

export const requireRole=async(role)=>{
      const user=await getUserSession();
  console.log(user,role);

      if (!user) {
        return redirect('/auth/signin');
    }

     if (user?.role !== role) {
        return redirect('/unauthorized');
    }
    return user;
}