'use client';

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";

interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface Props {
    initialProducts: Product[];
}

const ProductClient: React.FC<Props> = ({ initialProducts }) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    useEffect(() => {
        const fetchRemaining = async () => {
            try {
                const res = await fetch("/api/products?skip=3"); // ✅ only remaining
                const data = await res.json();

                if (data.products) {
                    // Only add products that are not already in the list
                    const remaining = data.products.filter((newProd: Product) => {
                        return !products.some((existing) => existing.id === newProd.id);
                    });

                    setProducts((prev) => [...prev, ...remaining]);
                }
            } catch (err) {
                console.error("Client-side fetch failed", err);
            }
        };

        fetchRemaining();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductClient;
