import { DBConnection } from "@/app/uilts/config/db";
import ProductModel from "@/app/uilts/models/products";
import { NextResponse } from "next/server";

await DBConnection();

export async function GET() {
    const products = await ProductModel.find();
    const categories = [...new Set(products.map(product => product.category))];
    return NextResponse.json({ categories });
}

interface ProductInput {
    title: string;
    price: number;
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
    image: string[];
}

export async function POST(request: Request): Promise<NextResponse<{ success: string }>> {
    const body: ProductInput = await request.json();
    const { title, price, category, description, rating, image } = body;

    await ProductModel.create({ title, price, category, description, rating, image });
    return NextResponse.json({ success: "Car added successfully" });
}
