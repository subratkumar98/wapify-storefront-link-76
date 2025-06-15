
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface ProductsSectionProps {
  onAddProduct: () => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ onAddProduct }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📦 Manage Products</h2>
        <Button 
          onClick={onAddProduct}
          className="bg-[#25D366] hover:bg-[#128C7E]"
        >
          Add Product
        </Button>
      </div>
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-semibold mb-2">No Products Yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first product</p>
          <Button onClick={onAddProduct}>Add Your First Product</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsSection;
