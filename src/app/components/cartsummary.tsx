import { useCartStore } from "../store/cartStore";
import Button from "./UI/Button";

const CartSummary: React.FC = () => {
    const { totalItems, totalPrice } = useCartStore();

    // Calculate shipping based on total
    const shipping = totalPrice > 100 ? 0 : 10;

    // Calculate tax (assuming 10%)
    const tax = totalPrice * 0.1;

    // Calculate final total
    const orderTotal = totalPrice + shipping + tax;

    return (
        <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

            <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    {shipping === 0 ? (
                        <span className="font-medium text-green-600">Free</span>
                    ) : (
                        <span className="font-medium">${shipping.toFixed(2)}</span>
                    )}
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex justify-between py-4 border-b border-gray-200">
                <span className="text-lg font-bold text-gray-800">Order Total</span>
                <span className="text-lg font-bold text-gray-800">
                    ${orderTotal.toFixed(2)}
                </span>
            </div>

            {shipping > 0 && (
                <p className="text-sm text-green-600 mt-3">
                    Add ${(100 - totalPrice).toFixed(2)} more to get free shipping!
                </p>
            )}

            <Button
                variant="primary"
                size="lg"
                fullWidth
                className="mt-6"
                onClick={() => alert('Checkout functionality would go here!')}
            >
                Proceed to Checkout
            </Button>

            <p className="text-xs text-gray-500 mt-4 text-center">
                Free shipping for orders over $100. Returns accepted within 30 days.
            </p>
        </div>
    );
};

export default CartSummary;