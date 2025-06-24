// ✅ File: src/app/(main)/products/[id]/page.tsx
import { DBConnection } from '@/app/uilts/config/db';
import ProductModel from '@/app/uilts/models/products';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductDetailClient from './_components/ProductDetailClient';
// UI type passed to client
interface Product {
    id: string;
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

// DB model type
interface ProductDoc {
    _id: string;
    title: string;
    price: number;
    image: string | string[];
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
}

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    await DBConnection();

    const productDoc = await ProductModel.findById(params.id).lean<ProductDoc>();
    if (!productDoc) {
        return {
            title: 'Product Not Found',
            description: 'No product found with this ID.',
        };
    }

    const imageUrl = Array.isArray(productDoc.image)
        ? productDoc.image[0]
        : productDoc.image;

    return {
        title: productDoc.title,
        description: productDoc.description,
        openGraph: {
            title: productDoc.title,
            description: productDoc.description,
            images: [imageUrl],
        },
        twitter: {
            card: 'summary_large_image',
            title: productDoc.title,
            description: productDoc.description,
            images: [imageUrl],
        },
    };
}

export default async function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    await DBConnection();

    const productDoc = await ProductModel.findById(params.id).lean<ProductDoc>();

    if (!productDoc) return notFound();

    const product: Product = {
        id: productDoc._id.toString(),
        title: productDoc.title,
        price: productDoc.price,
        image: Array.isArray(productDoc.image) ? productDoc.image[0] : productDoc.image,
        category: productDoc.category,
        description: productDoc.description,
        rating: productDoc.rating,
    };

    return <ProductDetailClient product={product} />;
}
