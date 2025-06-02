import ProductCard from "@/app/components/ProductCard";
import Button from "@/app/components/UI/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DBConnection } from "./uilts/config/db";
import ProductModel from "./uilts/models/products";

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

async function getCategories(): Promise<{ categories: string[]; error?: string }> {
  try {
    await DBConnection();
    const products = await ProductModel.find();
    const categories = [...new Set(products.map(product => product.category))];
    return { categories };
  } catch (err) {
    console.error('Error fetching categories:', err);
    return { categories: [], error: 'Failed to load categories' };
  }
}

export default async function HomePage() {
  const { products, error: productsError } = await getProducts();
  const { categories, error: categoriesError } = await getCategories();

  return (
    <>
      <section className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Quality Products</h1>
            <p className="text-xl mb-8">Shop trends in fashion, electronics, & jewelry.</p>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 flex items-center">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsError && <p className="text-red-500">{productsError}</p>}
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categoriesError && <p className="text-red-500">{categoriesError}</p>}
            {categories.map((category: string) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <p className="text-gray-600 mb-4">Explore our collection</p>
                  <span className="text-blue-600 inline-flex items-center">
                    Shop Now <ArrowRight className="ml-1 w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex space-x-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">{"I'm amazed by the quality of the products I received. The customer service was excellent too!"}</p>
              <div className="font-medium">Sarah J.</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex space-x-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">{"Fast shipping and the products look exactly like the pictures. I'll definitely be shopping here again."}</p>
              <div className="font-medium">Michael R.</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex space-x-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">{"Great prices and excellent selection. The jewelry I bought exceeded my expectations in quality."}</p>
              <div className="font-medium">Emily T.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
