"use client";
import { Crown, Check } from "lucide-react";

export default function ProfilePage() {
  const currentUserId = "user_123"; 
  const stripePriceId = "price_12345"; 

  const initiatePremiumUpgrade = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ userId: currentUserId, priceId: stripePriceId }),
      headers: { "Content-Type": "application/json" },
    });
    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
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
            <label className="text-sm font-medium">Full Name</label>
            <input type="text" className="w-full mt-1 p-2 border rounded-md" defaultValue="Abc" />
          </div>
          <div>
            <label className="text-sm font-medium">Profile Image URL</label>
            <input type="text" className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium">
            Save Changes
          </button>
        </div>
      </div>

      {/* Premium Membership Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm">
        <Crown className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
        <h3 className="text-lg font-bold">Go Premium</h3>
        <p className="text-sm text-gray-500 mb-6">Unlock unlimited recipe uploads and exclusive features</p>
        
        <ul className="text-left space-y-2 mb-8 text-sm">
          <li className="flex items-center gap-2"><Check size={16} className="text-green-600" /> Unlimited recipe uploads</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-green-600" /> Premium profile badge</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-green-600" /> Priority visibility</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-green-600" /> Exclusive features</li>
        </ul>

        <div className="text-2xl font-bold mb-4">$9.99 <span className="text-sm font-normal text-gray-400">/ lifetime</span></div>
        
        <button 
          onClick={initiatePremiumUpgrade}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium"
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
}