/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-05-28.basil", // ✅ updated to match current Stripe type
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { amount, email, cartItems } = body;

        if (!amount || typeof amount !== "number") {
            return NextResponse.json({ error: "Invalid or missing amount" }, { status: 400 });
        }

        if (!email) {
            return NextResponse.json({ error: "Missing email" }, { status: 400 });
        }

        // Reuse or create customer
        const existingCustomers = await stripe.customers.list({ email, limit: 1 });
        const customer = existingCustomers.data[0] || await stripe.customers.create({ email });

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            customer: customer.id,
            automatic_payment_methods: { enabled: true },
            metadata: {
                cart: JSON.stringify(cartItems ?? []),
            },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });

    } catch (error: any) {
        console.error("Stripe Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
