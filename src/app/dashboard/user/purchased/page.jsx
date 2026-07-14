// app/dashboard/user/purchased/page.js
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function PurchasedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div className="p-8">Please log in to view your purchases.</div>;
  }

  const res = await fetch(`http://localhost:5000/api/purchases/${session.user.id}`, {
    cache: 'no-store'
  });
  
  const myPurchases = await res.json();
  console.log("Purchases received from API:", myPurchases);

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
        <tbody>
          {myPurchases.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-4">{p.recipeName}</td>
              <td className="py-4">{p.authorName}</td>
              <td className="py-4">${p.amount}</td>
              <td className="py-4">{new Date(p.date).toLocaleDateString()}</td>
              <td className="py-4">
                <Link href={`/recipes/${p.recipeId}`}>
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