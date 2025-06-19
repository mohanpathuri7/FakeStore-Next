'use client';

import React, { useEffect, useState } from 'react';
import convertToSubcurrency from '../../lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from './_components/CheckoutPage';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const Checkout = () => {
    const { items, totalPrice } = useCartStore();
    const [hydrated, setHydrated] = useState(false);

    // Calculate shipping based on total
    const shipping = totalPrice > 100 ? 0 : 10;

    // Calculate tax (assuming 10%)
    const tax = totalPrice * 0.1;

    // Final total (in number format)
    const orderTotal = totalPrice + shipping + tax;

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null; // or <LoadingSpinner /> if you want
    }

    return (
        <>
            {items.length === 0 ? (<div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <ShoppingBag className="w-20 h-20 text-gray-300" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Your Fake Store Cart is empty
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Check your Saved for later items below or{' '}
                        <Link href="/products" className="text-blue-600">
                            continue shopping
                        </Link>
                        .
                    </p>
                </div>
            </div>
            ) : (
                <div className="max-w-6xl mx-auto px-8 py-16">
                    <SignedOut>
                        <Link
                            href="/sign-in"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-6"
                        >
                            Sign in to checkout
                        </Link >
                    </SignedOut >

                    <SignedIn>
                        <Elements
                            stripe={stripePromise}
                            options={{
                                mode: 'payment',
                                amount: convertToSubcurrency(orderTotal), // ✅ Use number, not string
                                currency: 'usd',
                            }}
                        >
                            <CheckoutPage amount={orderTotal} /> {/* Still pass number */}
                        </Elements>
                    </SignedIn>
                </div >
            )}

        </>
    );
};

export default Checkout;
