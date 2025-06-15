
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Upload, 
  X, 
  Star, 
  Plus,
  DollarSign,
  Package,
  Tag,
  Video,
  Heart
} from 'lucide-react';

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
    codAvailable: false
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

  const currencies = ['₹', '$', '€', 'AED'];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add New Product
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                placeholder="Enter product name"
                value={product.title}
                onChange={(e) => setProduct({...product, title: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value=""
                onChange={(e) => {}}
              >
                <option value="">Select Category</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="food">Food</option>
                <option value="beauty">Beauty</option>
                <option value="home">Home</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Currency</Label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
              <div className="flex">
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
              <div className="flex">
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

          {/* Description */}
          <div>
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your product... (emojis welcome! 🎉)"
              rows={4}
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
            />
          </div>

          {/* Tags */}
          <div>
            <Label>Product Tags (for search)</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
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

          {/* Images */}
          <div>
            <Label>Product Images (up to 6)</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">Upload Image {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video (Pro Feature) */}
          {userPlan === 'pro' && (
            <div>
              <Label htmlFor="video">Product Video (YouTube URL or MP4)</Label>
              <div className="flex">
                <Video className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md" />
                <Input
                  id="video"
                  placeholder="https://youtube.com/watch?v=... or upload MP4"
                  className="rounded-l-none"
                  value={product.video}
                  onChange={(e) => setProduct({...product, video: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* Inventory & Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="inventory">Stock Quantity</Label>
              <Input
                id="inventory"
                type="number"
                value={product.inventory}
                onChange={(e) => setProduct({...product, inventory: Number(e.target.value)})}
              />
            </div>
            
            <div>
              <Label htmlFor="eta">Delivery Time</Label>
              <Input
                id="eta"
                placeholder="e.g., 3-5 days, Same day"
                value={product.eta}
                onChange={(e) => setProduct({...product, eta: e.target.value})}
              />
            </div>
          </div>

          {/* Pro Features */}
          {userPlan === 'pro' && (
            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4">Pro Features</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={product.codAvailable}
                    onChange={(e) => setProduct({...product, codAvailable: e.target.checked})}
                  />
                  <span>Cash on Delivery Available</span>
                </label>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t">
            <Button onClick={() => onSave(product)} className="flex-1">
              Save Product
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
