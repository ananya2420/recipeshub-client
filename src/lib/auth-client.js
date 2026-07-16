import { inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
    plugins: [
        adminClient()  
    ],
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    plugins:[inferAdditionalFields()]
})

export const { signIn, signUp, signOut, useSession } = createAuthClient()