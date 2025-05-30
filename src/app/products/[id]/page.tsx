import Button from "@/components/UI/Button";
import Rating from "@/components/UI/Rating";
import { ArrowLeft, RotateCcw, Shield, ShoppingCart, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
// Define type for route parameters
interface PageParams {
    params: {
        id: string;
    };
}

// ✅ Generate metadata for SEO
export async function generateMetadata({ params }: PageParams) {
    const res = await fetch(`${process.env.FAKE_STORE_API}${params.id}`, {
        cache: "no-store"
    });
    const data = await res.json();

    return {
        title: data.title,
        description: data.description,
    };
}

// ✅ Product detail page component
export default async function ProductDetailPage({ params }: PageParams) {
    const { id } = params;
    const res = await fetch(`${process.env.FAKE_STORE_API}${id}`, {
        cache: "no-store"
    });
    const product: Product = await res.json();

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
                            src={product.image}
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
