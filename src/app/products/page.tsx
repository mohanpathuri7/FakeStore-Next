import { Metadata } from "next";
import ProductClient from "./_components/ProductClient";
import { DBConnection } from "../uilts/config/db";
import ProductModel from "../uilts/models/products";

export const metadata: Metadata = {
    title: "Products",
    description: "Products page description",
};

interface Product {
    id: number;
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

async function getProducts(): Promise<{ products: Product[]; error?: string }> {
    try {
        await DBConnection();
        const rawProducts = await ProductModel.find().lean();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const products = rawProducts.map((product: any) => ({
            id: product._id.toString(),
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            rating: product.rating,
            image: product.image,
        }));

        return { products };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { products: [], error: 'Failed to load products' };
    }
}


const ProductsPage = async () => {

    const { products, error: productsError } = await getProducts();

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                {productsError && <p className="text-red-500">{productsError}</p>}
                <ProductClient products={products} />
            </div>
        </>
    )
}

export default ProductsPage