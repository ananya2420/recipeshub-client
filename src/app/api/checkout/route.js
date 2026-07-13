// src/app/api/checkout/route.js
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      line_items: [{
        price_data: {
          currency: "usd",
          unit_amount: 999,
          product_data: {
            name: "Premium Membership",
            description: "Unlimited recipe uploads",
          },
        },
        quantity: 1,
      }],
      metadata: {
        userId: session.user.id,
        type: "premium",
      },
      mode: "payment",
      // This matches the folder structure we just created
    //   success_url: `${origin}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${origin}/profile`,

    //success_url: `${origin}/recips/payment-success?payment=success`,
    success_url: `${origin}/recips/payment-success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${origin}/profile`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err) {
    console.error("Checkout Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}