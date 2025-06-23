/* eslint-disable @typescript-eslint/no-explicit-any */
import { DBConnection } from '@/app/uilts/config/db';
import OrderModel from '@/app/uilts/models/Order';
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from 'next/image';

interface OrderItem {
    name: string;
    qty: number;
    image?: string[];
}

interface OrderDoc {
    _id: string;
    createdAt: string;
    amount: number;
    items: OrderItem[];
    email: string;
}

export default async function OrdersPage() {
    const { userId } = await auth();

    // ✅ Fix 1: Correct the logic here
    if (!userId) {
        return <p className="text-center text-gray-500 mt-20">You must be signed in to view your orders.</p>;
    }

    const user = await currentUser();

    if (!user || !user.emailAddresses?.[0]) {
        return <p className="text-center text-gray-500 mt-20">User info not available.</p>;
    }

    const email = user.emailAddresses[0].emailAddress;

    await DBConnection();

    const orders: OrderDoc[] = await OrderModel.find({ email })
        .sort({ createdAt: -1 })
        .lean()
        .then((docs) =>
            docs.map((doc) => ({
                ...(doc as any),
                _id: (doc._id as { toString: () => string }).toString(),
                createdAt: new Date(doc.createdAt as string | Date).toISOString(),
            }))
        );

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {orders.length === 0 ? (
                <p className="text-gray-500 text-center mt-30">No orders found...</p>
            ) : (
                <>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Your Orders</h1>
                    <ul className="space-y-6">
                        {orders.map((order) => (
                            <li
                                key={order._id}
                                className="bg-white shadow-md rounded-xl border border-gray-200 p-6 transition hover:shadow-lg"
                            >
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500">Order ID:</p>
                                    <span className="font-medium text-gray-900">{order._id}</span>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-gray-700 font-semibold">
                                        Amount: <span className="text-green-600">${order.amount.toFixed(2)}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                                    <table className="w-full text-sm text-left text-gray-600 border-t mt-2">
                                        <thead>
                                            <tr>
                                                <th className="py-2 pr-4 font-medium text-gray-700">Item</th>
                                                <th className="py-2 px-4 font-medium text-gray-700">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.items.map((item, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="py-2 pr-4 flex items-center gap-2">
                                                        {item.image?.[0] && (
                                                            <Image
                                                                src={item.image[0]}
                                                                alt={item.name}
                                                                width={40}
                                                                height={40}
                                                                className="object-contain rounded"
                                                                unoptimized
                                                            />
                                                        )}
                                                        {item.name}
                                                    </td>
                                                    <td className="py-2 px-4">{item.qty}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
