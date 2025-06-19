/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { DBConnection } from "../../uilts/config/db";
import ProductModel from "../../uilts/models/products";
import ProductClient from "./_component/ProductClient";

export const metadata: Metadata = {
    title: "Products",
    description: "Products page description",
};

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
}

export default async function ProductsPage() {
    await DBConnection();
    const rawProducts = await ProductModel.find().lean();

    const allProducts: Product[] = rawProducts.map((product: any) => ({
        id: product._id.toString(), // ✅ ensures unique string ID
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        rating: product.rating,
        image: product.image,
    }));

    const firstThree = allProducts.slice(0, 4); // ✅ SSR only 3

    return (
        <div className="container mx-auto px-4 py-8">
            <ProductClient initialProducts={firstThree} />
        </div>
    );
}
