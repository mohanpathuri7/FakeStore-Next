
import type { Metadata } from "next";
import CartPageClient from "./_components/CartPageClient";

export const metadata: Metadata = ({
    title: "Your Cart",
    description: "View and manage items in your shopping cart",
});

export default function CartPage() {
    return <CartPageClient />;
}