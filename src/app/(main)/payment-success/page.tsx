// app/(main)/payment-success/page.tsx
'use client';

import React, { Suspense } from 'react';
import PaymentSuccess from './_components/PaymentSuccess';


const Page = () => {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <PaymentSuccess />
        </Suspense>
    );
};

export default Page;
