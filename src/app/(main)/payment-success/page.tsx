
import React, { Suspense } from 'react';
import PaymentSuccess from './_components/PaymentSuccess';
import { Metadata } from 'next';

export const metadata: Metadata = ({
    title: "Thank you for your payment",
    description: "Thank you for your payment and order confirmation",
});

const Page = () => {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <PaymentSuccess />
        </Suspense>
    );
};

export default Page;
