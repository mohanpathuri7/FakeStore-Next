'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/app/(main)/store/cartStore';


const Navbar: React.FC = () => {
    const { totalItems } = useCartStore();
    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center">
                    <span className="ml-2">FakeStore</span>
                </Link>
                <nav className="flex items-center space-x-6">
                    <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
                        Products
                    </Link>
                    <SignedIn>
                        <Link href="/order" className="text-gray-700 hover:text-blue-600 font-medium">
                            Orders
                        </Link>
                    </SignedIn>


                    <Link
                        href="/cart"
                        className="text-gray-700 hover:text-blue-600 relative"
                        aria-label="Cart"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                </nav>
            </div>
        </header>
    )
}

export default Navbar