// app/dashboard/user/purchased/page.js
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function PurchasedPage() {
  // 1. Get the current user session to know who is logged in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Please log in to view your purchases.</div>;
  }

  // 2. Fetch the data from your Express server (port 5000)
  // Ensure your server has the GET /api/purchases/:userId endpoint
  const res = await fetch(`http://localhost:5000/api/purchases/${session.user.id}`, {
    cache: 'no-store' // This ensures you always get the latest data
  });
  
  const myPurchases = await res.json();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Purchased Recipes</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-4">RECIPE</th>
            <th className="py-4">AUTHOR</th>
            <th className="py-4">AMOUNT PAID</th>
            <th className="py-4">DATE</th>
            <th className="py-4">ACTIONS</th>
          </tr>
        </thead>
        {/* <tbody>
          {myPurchases.map((p) => (
            <tr key={p._id} className="border-b hover:bg-gray-50">
              <td className="py-4">{p.title}</td>
              <td className="py-4">{p.authorName || "N/A"}</td>
              <td className="py-4">${p.amountPaid}</td>
              <td className="py-4">{p.date}</td>
              <td className="py-4">
                <button className="border px-4 py-1 bg-green-500 text-white rounded">View Recipe</button>
              </td>
            </tr>
          ))}
        </tbody> */}

        <tbody>
          {myPurchases.map((p) => (
            <tr key={p._id} className="border-b hover:bg-gray-50">
              <td className="py-4">{p.title}</td>
              <td className="py-4">{p.authorName || "N/A"}</td>
              <td className="py-4">${p.amountPaid}</td>
              <td className="py-4">{p.date}</td>
              <td className="py-4">
                {/* 2. Wrap button in Link and point to your recipe details route */}
                <Link href={`/recips/${p.recipeId}`}>
                  <button className="border px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    View Recipe
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}