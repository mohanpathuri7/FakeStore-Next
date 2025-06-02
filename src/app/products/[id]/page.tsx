import Button from "@/app/components/UI/Button";
import Rating from "@/app/components/UI/Rating";
import { DBConnection } from "@/app/uilts/config/db";
import ProductModel from "@/app/uilts/models/products";
import { ArrowLeft, RotateCcw, Shield, ShoppingCart, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

// Define type for route parameters
interface PageParams {
    params: {
        id: string;
    };
}




export async function getProductById(id: string): Promise<{ product: Product | null; error?: string }> {
    try {
        await DBConnection();

        // Assert productDoc is a single document or null
        const productDoc = (await ProductModel.findById(id).lean()) as
            | {
                _id: number;
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
            | null;

        if (!productDoc) {
            return { product: null, error: "Product not found" };
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

        return { product };
    } catch (error) {
        console.error("Error fetching product:", error);
        return { product: null, error: "Failed to load product" };
    }
}




// ✅ Generate metadata for SEO
export async function generateMetadata({ params }: PageParams) {
    const { id } = await params;
    const { product, error } = await getProductById(id);
    if (error || !product) {
        return {
            title: "Product Not Found",
            description: "The requested product could not be found.",
        };
    }

    return {
        title: product.title,
        description: product.description,
    };
}

// ✅ Product detail page component
export default async function ProductDetailPage({ params }: PageParams) {
    const { id } = await params;
    const { product, error } = await getProductById(id);

    if (error || !product) {
        return (
            <section className="container mx-auto px-4 py-8">
                <p className="text-red-600 text-center">Failed to load product: {error}</p>
                <div className="text-center mt-4">
                    <Link href="/products" className="text-blue-600 hover:text-blue-800">
                        Back to Products
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/products" className="text-blue-600 hover:text-blue-800 flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Products
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product Image */}
                    <div className="bg-white rounded-lg p-8 flex items-center justify-center">
                        <Image
                            src={product.image[0]}
                            alt={product.title}
                            width={500}
                            height={500}
                            className="max-h-[400px] object-contain"
                            loading="lazy"
                        />
                    </div>

                    {/* Product Info */}
                    <div>
                        <span className="inline-block text-sm font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full mb-4">
                            {product.category}
                        </span>

                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                            {product.title}
                        </h1>

                        <div className="flex items-center mb-6">
                            <Rating
                                value={product.rating.rate}
                                size="lg"
                                showCount={true}
                                count={product.rating.count}
                            />
                        </div>

                        <div className="text-3xl font-bold text-gray-900 mb-6">
                            ${product.price.toFixed(2)}
                        </div>

                        <p className="text-gray-600 mb-8">
                            {product.description}
                        </p>

                        <Button variant="primary" size="lg" className="w-full sm:w-auto mb-6">
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </Button>

                        <div className="border-t border-gray-200 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-start">
                                    <Truck className="w-5 h-5 text-gray-600 mt-0.5 mr-2" />
                                    <div>
                                        <h4 className="font-medium text-gray-800">Free Shipping</h4>
                                        <p className="text-sm text-gray-600">On orders over $100</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Shield className="w-5 h-5 text-gray-600 mt-0.5 mr-2" />
                                    <div>
                                        <h4 className="font-medium text-gray-800">Secure Payment</h4>
                                        <p className="text-sm text-gray-600">Safe & protected checkout</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <RotateCcw className="w-5 h-5 text-gray-600 mt-0.5 mr-2" />
                                    <div>
                                        <h4 className="font-medium text-gray-800">Easy Returns</h4>
                                        <p className="text-sm text-gray-600">30 day return policy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
