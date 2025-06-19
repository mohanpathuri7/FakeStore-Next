// app/products/[id]/ProductDetailClient.tsx
'use client';
import { useState } from "react";
import { useCartStore } from "@/app/(main)/store/cartStore";
import { ArrowLeft, Minus, Plus, RotateCcw, Shield, ShoppingCart, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Rating from "@/app/(main)/components/UI/Rating";
import Button from "@/app/(main)/components/UI/Button";


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

export default function ProductDetailClient({ product }: { product: Product }) {
    const { addToCart, items } = useCartStore();
    const [quantity, setQuantity] = useState(1);

    const cartItem = items.find((item) => item.product.id === product.id);

    return (
        <>
            <section>
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-6">
                        <Link href="/products" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Products
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
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

                        <div>
                            <span className="inline-block text-sm font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full mb-4">
                                {product.category}
                            </span>
                            {cartItem?.quantity && <span className="inline-block text-sm font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full mb-4 ml-1">{cartItem?.quantity}</span>}

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
                            <div className="mb-8">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity
                                </label>
                                <div className="flex items-center">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100">
                                        <Minus className="w-6 h-6" />
                                    </button>
                                    <input
                                        id="quantity"
                                        type="text"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                        className="w-16 px-3 py-2 border-t border-b border-gray-300  bg-gray-50 text-center focus:outline-none"
                                    />

                                    <button onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full sm:w-auto mb-6"
                                onClick={() => addToCart(product, quantity)}
                            >
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

        </>
    );
}
