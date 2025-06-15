
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { MessageCircle, Phone, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppSectionProps {
  userPlan: 'free' | 'pro';
}

const WhatsAppSection: React.FC<WhatsAppSectionProps> = ({ userPlan }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    whatsappNumber: '',
    welcomeMessage: 'Hi! I\'m interested in your products.',
    autoReply: false,
    autoReplyMessage: 'Thanks for your interest! I\'ll get back to you soon.',
    businessHours: {
      enabled: false,
      start: '09:00',
      end: '18:00'
    }
  });

  const handleSave = () => {
    if (!settings.whatsappNumber) {
      toast({
        title: "WhatsApp Number Required",
        description: "Please enter your WhatsApp number",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "WhatsApp Settings Saved!",
      description: "Your WhatsApp integration has been updated",
    });
  };

  const formatWhatsAppNumber = (number: string) => {
    // Remove any non-digit characters and format
    const cleaned = number.replace(/\D/g, '');
    return cleaned;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          WhatsApp Integration
        </h2>
        <Button onClick={handleSave} className="bg-[#25D366] hover:bg-[#128C7E]">
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                  +91
                </span>
                <Input
                  id="whatsappNumber"
                  placeholder="9876543210"
                  className="rounded-l-none"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    whatsappNumber: formatWhatsAppNumber(e.target.value) 
                  }))}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Customers will contact you on this number
              </p>
            </div>

            <div>
              <Label htmlFor="welcomeMessage">Default Message</Label>
              <Textarea
                id="welcomeMessage"
                placeholder="Hi! I'm interested in your products."
                rows={3}
                value={settings.welcomeMessage}
                onChange={(e) => setSettings(prev => ({ ...prev, welcomeMessage: e.target.value }))}
              />
              <p className="text-xs text-gray-500 mt-1">
                This message will be pre-filled when customers click "Chat on WhatsApp"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Advanced Features
              {userPlan === 'free' && <Crown className="h-4 w-4 text-orange-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Auto-Reply Messages</span>
                <p className="text-sm text-gray-600">Automatically reply to new messages</p>
              </div>
              <Switch
                checked={settings.autoReply}
                disabled={userPlan === 'free'}
                onCheckedChange={(checked) => {
                  if (userPlan === 'free') {
                    toast({
                      title: "Upgrade Required",
                      description: "Auto-reply available in Pro plan",
                      variant: "destructive"
                    });
                    return;
                  }
                  setSettings(prev => ({ ...prev, autoReply: checked }));
                }}
              />
            </div>

            {settings.autoReply && userPlan === 'pro' && (
              <div>
                <Label htmlFor="autoReplyMessage">Auto-Reply Message</Label>
                <Textarea
                  id="autoReplyMessage"
                  placeholder="Thanks for your interest! I'll get back to you soon."
                  rows={2}
                  value={settings.autoReplyMessage}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoReplyMessage: e.target.value }))}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Business Hours</span>
                <p className="text-sm text-gray-600">Set your availability hours</p>
              </div>
              <Switch
                checked={settings.businessHours.enabled}
                disabled={userPlan === 'free'}
                onCheckedChange={(checked) => {
                  if (userPlan === 'free') {
                    toast({
                      title: "Upgrade Required",
                      description: "Business hours available in Pro plan",
                      variant: "destructive"
                    });
                    return;
                  }
                  setSettings(prev => ({ 
                    ...prev, 
                    businessHours: { ...prev.businessHours, enabled: checked }
                  }));
                }}
              />
            </div>

            {settings.businessHours.enabled && userPlan === 'pro' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={settings.businessHours.start}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      businessHours: { ...prev.businessHours, start: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={settings.businessHours.end}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      businessHours: { ...prev.businessHours, end: e.target.value }
                    }))}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-[#25D366] text-white">
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="h-6 w-6" />
              <span className="font-medium">Chat on WhatsApp</span>
            </div>
            <div className="bg-white bg-opacity-20 rounded p-3">
              <p className="text-sm">{settings.welcomeMessage}</p>
            </div>
            {settings.whatsappNumber && (
              <p className="text-xs mt-2 opacity-80">
                Will open chat with +91 {settings.whatsappNumber}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppSection;
