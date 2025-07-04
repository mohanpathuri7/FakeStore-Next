'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/app/(main)/store/cartStore';
import { usePathname } from 'next/navigation';


const Navbar: React.FC = () => {
    const { totalItems } = useCartStore();
    const pathname = usePathname();
    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center focus-visible:outline-none">
                    <span className="ml-2">FakeStore</span>
                </Link>
                <nav className="flex items-center space-x-4">
                    <Link href="/products" className={`font-medium ${pathname === '/products'
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-700 hover:text-blue-600'
                        }`}>
                        Products
                    </Link>
                    <SignedIn>
                        <Link href="/order" className={`font-medium ${pathname === '/order'
                            ? 'text-blue-600 font-semibold'
                            : 'text-gray-700 hover:text-blue-600'
                            }`}>
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
                        <UserButton appearance={{
                            elements: {
                                userButtonBox: "hover:text-blue-600",
                            },
                        }} />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <Link href="/order" className={`font-medium ${pathname === '/sign-in'
                                ? 'text-blue-600 font-semibold'
                                : 'text-gray-700 hover:text-blue-600'
                                }`}>Sign in</Link>
                        </SignInButton>
                    </SignedOut>
                </nav>
            </div>
        </header>
    )
}

export default Navbar