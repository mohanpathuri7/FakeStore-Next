'use client';

import React, { useEffect, useState } from 'react';
import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import convertToSubcurrency from '../../../lib/convertToSubcurrency';
import Spinner from '../../components/UI/Spinner';
import { useUser } from '@clerk/nextjs';
import { useCartStore } from '../../store/cartStore';

const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useUser();
    const cartItems = useCartStore((state) => state.items);

    useEffect(() => {
        if (!amount || !user?.primaryEmailAddress?.emailAddress) return;

        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: convertToSubcurrency(amount),
                email: user.primaryEmailAddress.emailAddress,
                cartItems: cartItems.map((item) => ({
                    id: item.product.id,
                    name: item.product.title,
                    qty: item.quantity,
                })),
            }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch((err) => {
                console.error('PaymentIntent fetch error:', err);
                setErrorMessage('Failed to initialize payment. Try again.');
            });
    }, [amount, user, cartItems]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) return;

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success?amount=${amount}&gmail=${user?.primaryEmailAddress?.emailAddress}&cart=${encodeURIComponent(JSON.stringify(cartItems.map((item) => ({ name: item.product.title, qty: item.quantity, image: item.product.image }))))}`,
            },
        });
        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
        } else {
            // ✅ Save order to DB only after successful confirmation

        }
    };

    if (!clientSecret) return <p>Preparing checkout...</p>;
    if (!stripe || !elements) return <Spinner />;

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-5"
                disabled={!stripe || loading}
            >
                {loading ? 'Processing...' : `Pay $${amount}`}
            </button>
        </form>
    );
};

export default CheckoutPage;
