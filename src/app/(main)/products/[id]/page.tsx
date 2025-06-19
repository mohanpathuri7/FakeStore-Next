import { DBConnection } from "@/app/uilts/config/db";
import ProductModel from "@/app/uilts/models/products";
import ProductDetailClient from "./_components/ProductDetailClient";
import { Metadata } from "next";
import { Document } from "mongoose";

// Define the Product interface used in the UI
interface Product {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any;
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

// Define the Product document interface returned by Mongoose
interface ProductDoc extends Document {
    _id: string;
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

// ✅ SEO metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    await DBConnection();
    const productDoc = await ProductModel.findById(params.id).lean<ProductDoc>();

    if (!productDoc) {
        return {
            title: "Product Not Found",
            description: "The requested product does not exist.",
        };
    }

    const imageUrl = Array.isArray(productDoc.image) ? productDoc.image[0] : productDoc.image;

    return {
        title: productDoc.title,
        description: productDoc.description,
        openGraph: {
            title: productDoc.title,
            description: productDoc.description,
            images: [imageUrl],
        },
        twitter: {
            card: "summary_large_image",
            title: productDoc.title,
            description: productDoc.description,
            images: [imageUrl],
        },
        keywords: [productDoc.category, productDoc.title, "Buy online", "Ecommerce", "Product"],
    };
}

// ✅ Product detail page
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    await DBConnection();
    const productDoc = await ProductModel.findById(params.id).lean<ProductDoc>();

    if (!productDoc) {
        return <p className="text-center text-red-600">Product not found</p>;
    }

    const product: Product = {
        id: productDoc._id.toString(),
        title: productDoc.title,
        price: productDoc.price,
        image: productDoc.image,
        category: productDoc.category,
        description: productDoc.description,
        rating: productDoc.rating,
    };

    return <ProductDetailClient product={product} />;
}
