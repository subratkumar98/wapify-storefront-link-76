
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ArrowLeft, Save, Plus, Package, Star, Heart, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '../ImageUpload';

interface ProductsSetupSectionProps {
  onSave: () => void;
  onBack: () => void;
  userPlan: 'free' | 'pro';
}

interface Product {
  id: string;
  title: string;
  category: string;
  mrp: number;
  price: number;
  currency: string;
  description: string;
  images: string[];
  video: string;
  tags: string[];
  rating: number;
  inventory: number;
  deliveryTime: string;
  isFavorite: boolean;
}

const ProductsSetupSection: React.FC<ProductsSetupSectionProps> = ({ onSave, onBack, userPlan }) => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newTag, setNewTag] = useState('');

  const currencies = ['₹', '$', '€', 'AED', '£'];
  const categories = ['Fashion', 'Electronics', 'Food & Beverages', 'Beauty & Health', 'Home & Living', 'Sports', 'Books', 'Toys', 'Other'];

  const initialProduct: Product = {
    id: '',
    title: '',
    category: '',
    mrp: 0,
    price: 0,
    currency: '₹',
    description: '',
    images: ['', '', '', '', ''],
    video: '',
    tags: [],
    rating: 0,
    inventory: 1,
    deliveryTime: '3-5 days',
    isFavorite: false
  };

  const [currentProduct, setCurrentProduct] = useState<Product>(initialProduct);

  const handleAddProduct = () => {
    setCurrentProduct({ ...initialProduct, id: Date.now().toString() });
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleSaveProduct = () => {
    if (!currentProduct.title || !currentProduct.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in product title and price",
        variant: "destructive"
      });
      return;
    }

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? currentProduct : p));
      toast({
        title: "Product Updated!",
        description: "Your product has been updated successfully",
      });
    } else {
      setProducts(prev => [...prev, currentProduct]);
      toast({
        title: "Product Added!",
        description: "Your product has been added to the store",
      });
    }
    
    setShowProductForm(false);
    setCurrentProduct(initialProduct);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Product Removed",
      description: "Product has been deleted from your store",
    });
  };

  const addTag = () => {
    if (newTag && !currentProduct.tags.includes(newTag)) {
      setCurrentProduct(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCurrentProduct(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove) 
    }));
  };

  const handleSave = () => {
    if (products.length === 0) {
      toast({
        title: "No Products Added",
        description: "Please add at least one product to continue",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "📦 Products Saved!",
      description: `${products.length} product(s) have been added to your store`,
    });
    onSave();
  };

  if (showProductForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Package className="h-6 w-6" />
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Product Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter product name"
                    value={currentProduct.title}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Currency</Label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={currentProduct.currency}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, currency: e.target.value }))}
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="price">Sale Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="mrp">MRP (Optional)</Label>
                  <Input
                    id="mrp"
                    type="number"
                    value={currentProduct.mrp}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, mrp: Number(e.target.value) }))}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Describe your product... Use emojis to make it attractive! 🔥✨"
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              {/* Images */}
              <div>
                <Label className="text-base font-medium">Product Images (Up to 5)</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3">
                  {currentProduct.images.map((image, index) => (
                    <ImageUpload
                      key={index}
                      label={`Image ${index + 1}${index === 0 ? ' (Main)' : ''}`}
                      onImageUpload={(url) => {
                        const newImages = [...currentProduct.images];
                        newImages[index] = url;
                        setCurrentProduct(prev => ({ ...prev, images: newImages }));
                      }}
                      currentImage={image}
                      aspectRatio="aspect-square"
                    />
                  ))}
                </div>
              </div>

              {/* Video */}
              <div>
                <Label htmlFor="video">Product Video (YouTube URL or MP4)</Label>
                <Input
                  id="video"
                  placeholder="https://youtube.com/watch?v=... or upload MP4"
                  value={currentProduct.video}
                  onChange={(e) => setCurrentProduct(prev => ({ ...prev, video: e.target.value }))}
                />
              </div>

              {/* Tags */}
              <div>
                <Label>Tags (SEO/Search Keywords)</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {currentProduct.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="text-blue-600 hover:text-blue-800">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag (e.g., trending, bestseller)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rating">Star Rating</Label>
                  <select
                    id="rating"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={currentProduct.rating}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  >
                    {[0,1,2,3,4,5].map(rating => (
                      <option key={rating} value={rating}>
                        {'★'.repeat(rating)}{'☆'.repeat(5-rating)} ({rating}/5)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="inventory">Inventory Count</Label>
                  <Input
                    id="inventory"
                    type="number"
                    value={currentProduct.inventory}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, inventory: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryTime">Estimated Delivery</Label>
                  <Input
                    id="deliveryTime"
                    placeholder="e.g., 3-5 days, Same day"
                    value={currentProduct.deliveryTime}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, deliveryTime: e.target.value }))}
                  />
                </div>
              </div>

              {/* Favorite Toggle */}
              <div>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={currentProduct.isFavorite}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, isFavorite: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    Mark as Favorite Product
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t">
                <Button onClick={handleSaveProduct} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  💾 Save Product
                </Button>
                <Button variant="outline" onClick={() => setShowProductForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              🔙 Back
            </Button>
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Package className="h-8 w-8 text-blue-600" />
                📦 Add Your Products
              </h2>
              <p className="text-gray-600 mt-1">Create amazing product listings that convert</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAddProduct} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              💾 Save All
            </Button>
          </div>
        </div>

        {/* Products List */}
        {products.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-semibold mb-2">No Products Yet</h3>
              <p className="text-gray-600 mb-6">Start by adding your first product to your store</p>
              <Button onClick={handleAddProduct} className="bg-blue-600 hover:bg-blue-700">
                Add Your First Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 relative">
                  {product.images[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Package className="h-16 w-16" />
                    </div>
                  )}
                  {product.isFavorite && (
                    <Heart className="absolute top-2 right-2 h-6 w-6 text-red-500 fill-current" />
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-green-600">
                      {product.currency}{product.price}
                    </span>
                    {product.mrp > 0 && product.mrp > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.currency}{product.mrp}
                      </span>
                    )}
                  </div>

                  {product.rating > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {Array.from({length: 5}, (_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.rating}/5)</span>
                    </div>
                  )}

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Stock: {product.inventory}</span>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsSetupSection;
