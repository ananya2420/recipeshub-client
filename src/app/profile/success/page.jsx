"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional: You could trigger a re-fetch of user data here 
    // to update their status in the UI immediately
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-md w-full">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. You are now a Premium member! 
          You can now enjoy unlimited recipe uploads and exclusive features.
        </p>
        
        <button 
          onClick={() => router.push("/profile")}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition"
        >
          Return to Profile
        </button>
      </div>
    </div>
  );
}