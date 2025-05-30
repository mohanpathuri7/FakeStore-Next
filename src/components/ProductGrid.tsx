import React from 'react';
import ProductCard from './ProductCard';
import Spinner from './UI/Spinner';
import { Product } from '@/types';


interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-medium text-red-600 mb-2">Error loading products</h3>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600">Try changing your filters or search query</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;