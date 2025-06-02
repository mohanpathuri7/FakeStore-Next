import Link from 'next/link'
import { ShoppingCart } from 'lucide-react';


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
        </header>
    )
}

export default Navbar