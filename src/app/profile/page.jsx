

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Crown, Check, Lock } from "lucide-react"; 

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Updated to detect payment success from the URL
    // Ensure your redirect URL matches this: /profile?payment=success
    if (searchParams.get("payment") === "success") {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const initiatePremiumUpgrade = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error: " + (data.error || "Something went wrong"));
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {showSuccess && (
        <div className="bg-green-600 text-white p-4 rounded-lg mb-6 text-center font-bold shadow-md">
          Payment Successful! Your account has been upgraded.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Editing Area */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <img src="/avatar.jpg" className="w-16 h-16 rounded-full" alt="Profile" />
            <div>
              <p className="font-medium">Abc</p>
              <p className="text-sm text-gray-500">abc@gmail.com</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="Abc" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Profile Image URL</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="https://plus.unsplash.com/..." />
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2">
              <Lock size={16} /> Save Changes
            </button>
          </div>
        </div>

        {/* Premium Membership Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm">
          <Crown className="w-10 h-10 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-lg font-bold mb-2">Go Premium</h3>
          <p className="text-sm text-gray-500 mb-6">Unlock unlimited recipe uploads and exclusive features</p>
          
          <ul className="text-left space-y-2 mb-6 text-sm text-gray-700">
            <li className="flex items-center gap-2"><Check size={16} className="text-teal-600" /> Unlimited recipe uploads</li>
            <li className="flex items-center gap-2"><Check size={16} className="text-teal-600" /> Premium profile badge</li>
            <li className="flex items-center gap-2"><Check size={16} className="text-teal-600" /> Priority visibility</li>
            <li className="flex items-center gap-2"><Check size={16} className="text-teal-600" /> Exclusive features</li>
          </ul>

          <div className="text-2xl font-bold text-orange-600 mb-4">$9.99 <span className="text-sm font-normal text-gray-400">/ lifetime</span></div>
          
          <button 
            onClick={initiatePremiumUpgrade}
            className="w-full bg-green-500 hover:bg-green-800 text-white py-3 rounded-md font-medium flex items-center justify-center gap-2"
          >
            <Crown size={16} /> Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
}