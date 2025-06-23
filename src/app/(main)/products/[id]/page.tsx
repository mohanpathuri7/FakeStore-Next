import { DBConnection } from '@/app/uilts/config/db';
import ProductDetailClient from './_components/ProductDetailClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductModel from '@/app/uilts/models/products';

// UI type
interface Product {
    id: number; // ✅ changed from number to string
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

interface ProductDoc {
    _id: number;
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

    if (!params?.id) return { title: 'Product Not Found' };

    const productDoc = await ProductModel.findById(params.id).lean<ProductDoc>();

    if (!productDoc) {
        return {
            title: 'Product Not Found',
            description: 'The requested product does not exist.',
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
        keywords: [
            productDoc.category,
            productDoc.title,
            'Buy online',
            'Ecommerce',
            'Product',
        ],
    };
}

export default async function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    await DBConnection();

    if (!params?.id) return notFound();

    const productDoc = await ProductModel.findById(params.id).lean<ProductDoc>();

    if (!productDoc) return notFound();

    const product: Product = {
        id: productDoc._id, // ✅ now matches id: string
        title: productDoc.title,
        price: productDoc.price,
        image: Array.isArray(productDoc.image) ? productDoc.image[0] : productDoc.image,
        category: productDoc.category,
        description: productDoc.description,
        rating: productDoc.rating,
    };

    return <ProductDetailClient product={product} />;
}
