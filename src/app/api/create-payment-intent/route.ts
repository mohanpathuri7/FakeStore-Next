import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // @ts-expect-error – override if the version is incompatible
    apiVersion: "2023-10-16", // Replace with your API version if different
});

export async function POST(request: NextRequest) {
    try {
        const { amount } = await request.json();

        if (!amount || typeof amount !== "number") {
            return NextResponse.json(
                { error: "Invalid or missing amount" },
                { status: 400 }
            );
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Stripe error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}
