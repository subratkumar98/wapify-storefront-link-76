
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Plus,
  DollarSign,
  Package,
  Tag,
  Video,
  Sparkles,
  Save,
  X,
  Crown
} from 'lucide-react';
import ImageUpload from './ImageUpload';

interface ProductFormProps {
  userPlan: 'free' | 'pro';
  onSave: (product: any) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ userPlan, onSave, onCancel }) => {
  const [product, setProduct] = useState({
    title: '',
    price: 0,
    mrp: 0,
    currency: '₹',
    description: '',
    tags: [] as string[],
    images: [] as string[],
    video: '',
    inventory: 1,
    eta: '3-5 days',
    codAvailable: false,
    category: ''
  });

  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag && !product.tags.includes(newTag)) {
      setProduct({...product, tags: [...product.tags, newTag]});
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setProduct({...product, tags: product.tags.filter(tag => tag !== tagToRemove)});
  };

  const handleImageUpload = (index: number, imageUrl: string) => {
    const newImages = [...product.images];
    newImages[index] = imageUrl;
    setProduct({...product, images: newImages});
  };

  const currencies = ['₹', '$', '€', 'AED', '£'];
  const categories = ['Fashion', 'Electronics', 'Food & Beverages', 'Beauty & Health', 'Home & Living', 'Sports', 'Books', 'Toys', 'Other'];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Sparkles className="h-6 w-6" />
            Add New Product
          </CardTitle>
          <p className="text-purple-100">Create an amazing product listing that converts</p>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Product Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter an attractive product name"
                        value={product.title}
                        onChange={(e) => setProduct({...product, title: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                        value={product.category}
                        onChange={(e) => setProduct({...product, category: e.target.value})}
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your product in detail... Use emojis to make it attractive! 🔥✨"
                      rows={4}
                      value={product.description}
                      onChange={(e) => setProduct({...product, description: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Currency</Label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                        value={product.currency}
                        onChange={(e) => setProduct({...product, currency: e.target.value})}
                      >
                        {currencies.map(curr => (
                          <option key={curr} value={curr}>{curr}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="price">Sale Price *</Label>
                      <div className="flex mt-1">
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                          {product.currency}
                        </span>
                        <Input
                          id="price"
                          type="number"
                          className="rounded-l-none"
                          value={product.price}
                          onChange={(e) => setProduct({...product, price: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="mrp">MRP (Optional)</Label>
                      <div className="flex mt-1">
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                          {product.currency}
                        </span>
                        <Input
                          id="mrp"
                          type="number"
                          className="rounded-l-none"
                          value={product.mrp}
                          onChange={(e) => setProduct({...product, mrp: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Product Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1 bg-purple-100 text-purple-700">
                        {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag (e.g., trending, bestseller, new arrival)"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Images Section */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Product Images</CardTitle>
                  <p className="text-sm text-gray-600">Upload up to 6 high-quality images</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <ImageUpload
                      key={index}
                      label={`Image ${index + 1}${index === 0 ? ' (Main)' : ''}`}
                      onImageUpload={(url) => handleImageUpload(index, url)}
                      currentImage={product.images[index]}
                      aspectRatio="aspect-square"
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Video Section (Pro Feature) */}
          {userPlan === 'pro' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Product Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                    <Video className="h-4 w-4" />
                  </span>
                  <Input
                    placeholder="YouTube URL or upload MP4 file"
                    className="rounded-l-none"
                    value={product.video}
                    onChange={(e) => setProduct({...product, video: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Inventory & Delivery */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inventory & Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="inventory">Stock Quantity</Label>
                  <Input
                    id="inventory"
                    type="number"
                    value={product.inventory}
                    onChange={(e) => setProduct({...product, inventory: Number(e.target.value)})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="eta">Delivery Time</Label>
                  <Input
                    id="eta"
                    placeholder="e.g., 3-5 days, Same day, 1 week"
                    value={product.eta}
                    onChange={(e) => setProduct({...product, eta: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              {userPlan === 'pro' && (
                <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={product.codAvailable}
                      onChange={(e) => setProduct({...product, codAvailable: e.target.checked})}
                      className="rounded"
                    />
                    <span className="flex items-center gap-2">
                      Cash on Delivery Available
                      <Crown className="h-4 w-4 text-orange-500" />
                    </span>
                  </label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t">
            <Button onClick={() => onSave(product)} className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Product
            </Button>
            <Button variant="outline" onClick={onCancel} className="px-8">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
