import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">FakeStore</h3>
                        <p className="text-gray-300 mb-4">
                            Your one-stop destination for all your fashion, electronics, and jewelry needs.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Shop</h3>
                        <ul className="space-y-2">
                            <li><Link href="/products" className="text-gray-300 hover:text-white">All Products</Link></li>
                            <li><Link href="/products?category=men" className="text-gray-300 hover:text-white">Men Clothing</Link></li>
                            <li><Link href="/products?category=women" className="text-gray-300 hover:text-white">Wome Clothing</Link></li>
                            <li><Link href="/products?category=electronics" className="text-gray-300 hover:text-white">Electronics</Link></li>
                            <li><Link href="/products?category=jewelery" className="text-gray-300 hover:text-white">Jewelry</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Returns & Exchanges</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Shipping Information</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Track Your Order</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">About Us</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white">Our Story</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-10 pt-6">
                    <p className="text-center text-gray-400">
                        &copy; {new Date().getFullYear()} FakeStore. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;