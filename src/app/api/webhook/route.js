


// app/api/webhook/route.js
import { stripe } from "@/lib/stripe";
import { MongoClient } from "mongodb";

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const client = new MongoClient(process.env.MONGO_DB_URL);
    
    try {
      await client.connect();
      const db = client.db("recipeshub_db");

      // Transactionally record payment and upgrade user
      await db.collection("payments").insertOne({
        userId: session.metadata.userId,
        paymentId: session.id,
        amount: session.amount_total / 100,
        date: new Date(),
      });

      await db.collection("users").updateOne(
        { _id: session.metadata.userId },
        { $set: { isPremium: true } }
      );
    } finally {
      await client.close();
    }
  }
  return new Response(JSON.stringify({ received: true }), { status: 200 });
}