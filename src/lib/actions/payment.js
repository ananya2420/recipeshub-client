// lib/actions/payment.js
'use server';

import { serverMutation } from "../core/server";
import { auth } from "@/lib/auth"; // Import your auth
import { headers } from "next/headers";

export const createPayment = async (subInfo) => {
    // 1. Get the current user session
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // 2. Combine recipe info (subInfo) with the user ID
    const paymentData = {
        ...subInfo,
        userId: session?.user?.id 
    };

    // 3. Send to your backend
    return serverMutation('/api/payments', paymentData);
}