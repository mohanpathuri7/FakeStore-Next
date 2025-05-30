import { Metadata } from "next";
import ProductClient from "./_components/ProductClient";

export const metadata: Metadata = {
    title: "Products",
    description: "Products page description",
};
async function getProducts() {
    const res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}
const ProductsPage = async () => {
    const [products] = await Promise.all([getProducts()]);
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <ProductClient products={products} />
            </div>
        </>
    )
}

export default ProductsPage