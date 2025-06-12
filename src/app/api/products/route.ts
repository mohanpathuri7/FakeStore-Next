import { DBConnection } from "@/app/uilts/config/db";
import ProductModel from "@/app/uilts/models/products";
import { NextResponse } from "next/server";

await DBConnection();

// /api/products/route.ts

export async function GET(req: NextRequest) {
    await DBConnection();
    const skip = parseInt(req.nextUrl.searchParams.get("skip") || "0", 10);
    const products = await ProductModel.find().skip(skip).lean();

    const mapped = products.map((product: any) => ({
        id: product._id.toString(),
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        rating: product.rating,
        image: product.image,
    }));

    return Response.json({ products: mapped });
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
