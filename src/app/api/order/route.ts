import { DBConnection } from "@/app/uilts/config/db";
import OrderModel from "@/app/uilts/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await DBConnection();
        const body = await request.json();

        const {
            stripePaymentIntentId,
            email,
            amount,
            items,
        } = body;

        // Validate input
        if (!stripePaymentIntentId || !email || !amount || !items) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // 🔄 Check if order already exists (idempotency)
        const existing = await OrderModel.findOne({ stripePaymentIntentId });
        if (existing) {
            return NextResponse.json(
                { message: "Order already exists", order: existing },
                { status: 200 }
            );
        }

        // ✅ Create new order
        const newOrder = await OrderModel.create({
            stripePaymentIntentId,
            email,
            amount,
            items,
        });

        return NextResponse.json({ success: "Order saved", order: newOrder }, { status: 201 });

    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Server error";
        console.error("MongoDB Error:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await DBConnection();
        const orders = await OrderModel.find();
        return NextResponse.json({ orders }, { status: 200 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Server error";
        console.error("MongoDB Error:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
