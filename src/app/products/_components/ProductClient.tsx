'use client';

import { useState, useMemo } from "react";
import ProductCard from '@/app/components/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import CategoryFilter from './CategoryFilter';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
}

interface ProductClientProps {
    products: Product[];
}

const ProductClient: React.FC<ProductClientProps> = ({ products }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const handleCategoryChange = (category: string | null) => {
        setSelectedCategory(category);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => setSearchQuery('');

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });

    }, [products, searchQuery, selectedCategory]);

    console.log(filteredProducts)

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {selectedCategory
                    ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
                    : 'All Products'}
            </h1>
            <div className="flex flex-col md:flex-row gap-8">


                {/* Mobile filter toggle */}
                <div className="md:hidden mb-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
                    >
                        <SlidersHorizontal className="w-5 h-5 mr-2" />
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                </div>

                {/* Sidebar filters */}
                <div className={`md:w-55 flex-shrink-0 ${showFilters ? "block" : "hidden md:block"}`}>
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>

                <div className="flex-grow">
                    {/* Search input */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <div className="mb-4">
                        <p className="text-gray-600">
                            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
};

export default ProductClient;
