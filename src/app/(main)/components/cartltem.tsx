import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { Product } from "@/types";
import Image from "next/image";


export interface CartItemType {
    product: Product;
    quantity: number;
}
interface CartItemProps {
    item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { product, quantity } = item;
    const { updateQuantity, removeFromCart } = useCartStore();

    const handleIncrement = () => {
        updateQuantity(product.id, quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            updateQuantity(product.id, quantity - 1);
        } else {
            removeFromCart(product.id);
        }
    };

    const handleRemove = () => {
        removeFromCart(product.id);
    };

    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-start py-6 border-b">
            <div className="relative w-full sm:w-24 h-40 sm:h-28 mb-4 sm:mb-0 flex-shrink-0">
                <Link href={`/products/${product.id}`}>
                    <Image
                        src={Array.isArray(product.image) ? product.image[0] : product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, 96px" // responsive hint
                    />
                </Link>
            </div>


            <div className="flex-grow sm:ml-6 max-w-115 mr-5">
                <Link href={`/products/${product.id}`} className="text-lg font-medium text-gray-800 hover:text-blue-600">
                    {product.title}

                </Link>

                <div className="mt-2 text-sm text-gray-500">
                    Category: {product.category}
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 sm:mt-0">
                <div className="flex items-center border rounded-md">
                    <button
                        onClick={handleDecrement}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                    >
                        <Minus className="w-4 h-4" />
                    </button>

                    <span className="px-3 py-1 text-gray-800">{quantity}</span>

                    <button
                        onClick={handleIncrement}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Increase quantity"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <div className="ml-6 flex flex-col items-end">
                    <span className="text-lg font-medium text-gray-900">
                        ${(product.price * quantity).toFixed(2)}
                    </span>

                    <button
                        onClick={handleRemove}
                        className="mt-1 text-sm text-red-600 hover:text-red-800 flex items-center"
                    >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;