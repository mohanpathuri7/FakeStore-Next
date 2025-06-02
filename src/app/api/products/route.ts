import { DBConnection } from "@/app/uilts/config/db";
import ProductModel from "@/app/uilts/models/products";
import { NextResponse } from "next/server";

const ConnectDB = async () => {
    await DBConnection();
}

ConnectDB(); export async function GET() {
    const products = await ProductModel.find();
    const categories = [...new Set(products.map(product => product.category))];
    return NextResponse.json({ categories });
}


export async function POST(required) {
    const { title, price, category, description, rating, image } = await required.json();
    await ProductModel.create({ title, price, category, description, rating, image });
    return NextResponse.json({ success: "Car added successfully" });
}
