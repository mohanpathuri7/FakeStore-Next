'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCartStore } from '../../store/cartStore';

const PaymentSuccess = () => {
    const { clearCart } = useCartStore();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [orderSaved, setOrderSaved] = useState(false);

    const amount = parseFloat(searchParams.get('amount') || '0');
    const paymentIntentId = searchParams.get('payment_intent');
    const rawCart = searchParams.get('cart'); // ✅ Extract cart string

    const cartItems = useMemo(() => {
        try {
            return rawCart ? JSON.parse(rawCart) : [];
        } catch (err) {
            console.error('Invalid cart data:', err);
            return [];
        }
    }, [rawCart]); // ✅ Only depends on rawCart

    // Save order to DB once
    useEffect(() => {
        const saveOrder = async () => {
            if (!paymentIntentId || !amount || isNaN(amount) || cartItems.length === 0 || orderSaved) return;

            const email = searchParams.get('email') || searchParams.get('gmail') || '';

            try {
                const res = await fetch('/api/order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        stripePaymentIntentId: paymentIntentId,
                        email,
                        amount,
                        items: cartItems,
                    }),
                });

                const data = await res.json();
                if (!res.ok) {
                    console.error("Order Save Failed:", data.error);
                } else {
                    console.log("Order saved successfully:", data);
                    setOrderSaved(true);
                }
            } catch (err) {
                console.error("Order save error:", err);
            }
        };

        saveOrder();
    }, [amount, paymentIntentId, cartItems, orderSaved, searchParams]);

    // Clear cart & redirect
    useEffect(() => {
        if (!amount || isNaN(amount) || amount <= 0) {
            router.push('/');
            return;
        }

        const timer = setTimeout(() => {
            clearCart();
            router.push('/');
        }, 10000);

        return () => clearTimeout(timer); // ✅ Cleanup
    }, [amount, clearCart, router]);

    if (!amount || isNaN(amount) || amount <= 0) {
        return null;
    }

    return (
        <main className="max-w-4xl mx-auto p-8 text-white text-center border rounded-md bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg mt-10">
            <h1 className="text-4xl font-bold mb-4">🎉 Thank you for your payment</h1>
            <p className="text-xl mb-2">Your payment was successful!</p>
            <div className="bg-white text-purple-600 font-bold text-3xl rounded p-3 inline-block mb-6">
                ${amount.toFixed(2)}
            </div>
            <p className="text-sm text-white/80 mb-6">
                PaymentIntent ID: <code>{paymentIntentId}</code>
            </p>
            <p className="text-sm text-white/70 mt-8">
                Redirecting you to homepage in 10 seconds...
            </p>
        </main>
    );
};

export default PaymentSuccess;
