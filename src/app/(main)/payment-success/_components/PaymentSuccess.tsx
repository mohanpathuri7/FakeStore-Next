// app/(main)/payment-success/PaymentSuccess.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCartStore } from '../../store/cartStore';


const PaymentSuccess = () => {
    const { clearCart } = useCartStore();
    const router = useRouter();
    const searchParams = useSearchParams();

    const amount = searchParams.get('amount');
    const amountValue = parseFloat(amount || '0');

    useEffect(() => {
        if (!amount || isNaN(amountValue) || amountValue <= 0) {
            router.push('/');
            return;
        }

        const timeout = setTimeout(() => {
            clearCart();
            router.push('/');
        }, 3000);

        return () => clearTimeout(timeout);
    }, [amount, amountValue, router, clearCart]);

    if (!amount || isNaN(amountValue) || amountValue <= 0) {
        return null;
    }

    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
            <div className="mb-10">
                <h1 className="text-4xl font-bold mb-2">Thank you for your payment</h1>
                <h2 className="text-2xl">Your payment was successful!</h2>
                <div className="bg-white rounded-md text-purple-500 mt-5 text-4xl font-bold">
                    ${amountValue.toFixed(2)}
                </div>
            </div>
        </main>
    );
};

export default PaymentSuccess;
