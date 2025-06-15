
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Megaphone, Crown, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PromotionsSectionProps {
  userPlan: 'free' | 'pro';
}

const PromotionsSection: React.FC<PromotionsSectionProps> = ({ userPlan }) => {
  const { toast } = useToast();
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      title: "Free Shipping",
      description: "Free delivery on orders above ₹500",
      type: "shipping",
      active: true
    }
  ]);

  const [newPromotion, setNewPromotion] = useState({
    title: '',
    description: '',
    type: 'discount'
  });

  const addPromotion = () => {
    if (userPlan === 'free' && promotions.length >= 1) {
      toast({
        title: "Upgrade Required",
        description: "Multiple promotions available in Pro plan",
        variant: "destructive"
      });
      return;
    }

    if (!newPromotion.title) return;

    setPromotions(prev => [...prev, {
      id: Date.now(),
      ...newPromotion,
      active: true
    }]);

    setNewPromotion({ title: '', description: '', type: 'discount' });
    toast({
      title: "Promotion Added!",
      description: "Your promotion has been created",
    });
  };

  const removePromotion = (id: number) => {
    setPromotions(prev => prev.filter(p => p.id !== id));
  };

  const togglePromotion = (id: number) => {
    setPromotions(prev => prev.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Megaphone className="h-6 w-6" />
          Offers & Promotions
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Promotions */}
        <Card>
          <CardHeader>
            <CardTitle>Active Promotions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {promotions.length === 0 ? (
              <div className="text-center py-8">
                <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No promotions yet</p>
              </div>
            ) : (
              promotions.map((promo) => (
                <div key={promo.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{promo.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={promo.active ? 'default' : 'secondary'}>
                        {promo.active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removePromotion(promo.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{promo.description}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePromotion(promo.id)}
                  >
                    {promo.active ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Add New Promotion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Add New Promotion
              {userPlan === 'free' && promotions.length >= 1 && (
                <Crown className="h-4 w-4 text-orange-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="promoTitle">Promotion Title</Label>
              <Input
                id="promoTitle"
                placeholder="e.g., Summer Sale 20% Off"
                value={newPromotion.title}
                onChange={(e) => setNewPromotion(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="promoDesc">Description</Label>
              <Input
                id="promoDesc"
                placeholder="e.g., Get 20% off on all items"
                value={newPromotion.description}
                onChange={(e) => setNewPromotion(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="promoType">Promotion Type</Label>
              <select
                id="promoType"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newPromotion.type}
                onChange={(e) => setNewPromotion(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="discount">Discount Offer</option>
                <option value="shipping">Free Shipping</option>
                <option value="combo">Combo Deal</option>
                <option value="seasonal">Seasonal Sale</option>
              </select>
            </div>

            <Button onClick={addPromotion} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Promotion
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Promotion Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { title: "Buy 2 Get 1 Free", desc: "Perfect for combo deals" },
              { title: "Festival Sale 30% Off", desc: "Great for seasonal promotions" },
              { title: "Free Delivery Weekend", desc: "Boost weekend sales" }
            ].map((template, index) => (
              <div key={index} className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                <h4 className="font-medium">{template.title}</h4>
                <p className="text-sm text-gray-600">{template.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionsSection;
