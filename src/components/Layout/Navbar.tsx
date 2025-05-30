import Link from 'next/link'
import { ShoppingCart, Search } from 'lucide-react';


const Navbar: React.FC = () => {
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
                    <Link
                        href="#"
                        className="text-gray-700 hover:text-blue-600 relative"
                        aria-label="Cart"
                    >
                        <ShoppingCart className="w-6 h-6" />
                    </Link>
                </nav>
            </div>

            <div className="md:hidden px-4 pb-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
            </div>
        </header>
    )
}

export default Navbar