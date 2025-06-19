'use client';

import React, { useEffect, useState } from 'react';
import {
    useStripe,
    useElements,
    PaymentElement
} from '@stripe/react-stripe-js';
import convertToSubcurrency from "../../../lib/convertToSubcurrency";
import Spinner from '../../components/UI/Spinner';
import { useRouter } from 'next/navigation';


const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) })
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (!stripe || !elements) {
            return
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return
        }
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success?amount=${amount}`,
            },
        });
        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return
        } else {
            router.push('/payment-sccess');
        }
        setLoading(false);
    }
    if (!clientSecret || !stripe || !elements) return <Spinner />
    return (
        <form onSubmit={handleSubmit}>
            {clientSecret && <PaymentElement />}
            {errorMessage && <p>{errorMessage}</p>}
            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-5' disabled={!stripe || loading}>
                {!loading ? `Pay $${amount}` : "Processing..."}
            </button>
        </form>
    )
}

export default CheckoutPage