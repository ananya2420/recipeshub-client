import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <div>Please log in.</div>;

  // Fetch all concurrently
  const [pRes, fRes, lRes] = await Promise.all([
    fetch(`http://localhost:5000/api/purchases/${session.user.id}`, { cache: 'no-store' }),
    fetch(`http://localhost:5000/api/favorites/${session.user.id}`, { cache: 'no-store' }),
    fetch(`http://localhost:5000/api/likes/${session.user.id}`, { cache: 'no-store' })
  ]);

  if (!pRes.ok || !fRes.ok || !lRes.ok) throw new Error("API route not found");

  const myPurchases = await pRes.json();
  const myFavorites = await fRes.json();
  const myLikes = await lRes.json();

  // Combine all activity into one array for the single table
  const allActivity = [...myPurchases, ...myFavorites, ...myLikes];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Purchased Recipes</h1>
      
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-4">RECIPE</th>
            <th className="py-4">AUTHOR</th>
            <th className="py-4">AMOUNT</th>
            <th className="py-4">DATE</th>
            <th className="py-4">ACTIONS</th>
          </tr>
        </thead>
        
        <tbody>
          {allActivity.map((item, index) => (
            <tr key={item._id || index} className="border-b">
              <td className="py-4">{item.recipeName}</td>
              <td className="py-4">{item.authorName}</td>
              <td className="py-4">${item.amount || item.amountPaid || "0.00"}</td>
              <td className="py-4">{item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</td>
              <td className="py-4">
                <Link href={`/recipes/${item.recipeId}`}>
                  <button className="border px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">
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