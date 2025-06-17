
'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/app/store/cartStore';
import Button from '@/app/components/UI/Button';
import CartItem from '@/app/components/cartltem';
import CartSummary from '@/app/components/cartsummary';


const CartPageClient = () => {
    const { items, totalItems, clearCart } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <ShoppingBag className="w-20 h-20 text-gray-300" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-8">
                        Looks like you haven&lsquo;t added any products to your cart yet.
                    </p>
                    <Link href="/products">
                        <Button size="lg">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/products" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Continue Shopping
                </Link>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Cart Items</h2>
                            <button
                                onClick={clearCart}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                Clear Cart
                            </button>
                        </div>
                        <div>
                            {items.map((item) => (
                                <CartItem key={item.product.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
};

export default CartPageClient;
