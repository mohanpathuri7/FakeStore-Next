'use client'
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./UI/Button";
import Rating from "./UI/Rating";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "../store/cartStore";


interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
    const { addToCart } = useCartStore();
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <Link href={`/products/${product.id}`} className="block">

                <div className="relative pt-[100%]">
                    <Image
                        src={product.image[0]}
                        alt={product.title}
                        loading="lazy"
                        width={150}
                        height={150}
                        className="absolute top-0 left-0 w-full h-full object-contain p-4"
                    />
                </div>

                <div className="p-4">
                    <div className="mb-1">
                        <span className="inline-block text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {product.category}
                        </span>
                    </div>

                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-11 mb-2">
                        {product.title}
                    </h3>

                    <div className="flex items-center mb-3">
                        <Rating
                            value={product.rating.rate}
                            showCount={true}
                            count={product.rating.count}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                        </span>

                        <Button
                            size="sm"
                            onClick={handleAddToCart}
                            className="group"
                        >
                            <ShoppingCart className="w-4 h-4 mr-1 group-hover:animate-bounce" />
                            Add
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;