
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  ArrowLeft, 
  Save, 
  Share2, 
  Copy, 
  QrCode, 
  Download, 
  MessageCircle,
  Instagram,
  Facebook,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareStoreSectionProps {
  onSave: () => void;
  onBack: () => void;
  userPlan: 'free' | 'pro';
}

const ShareStoreSection: React.FC<ShareStoreSectionProps> = ({ onSave, onBack, userPlan }) => {
  const { toast } = useToast();
  const [shareSettings, setShareSettings] = useState({
    customMessage: "🎉 Check out my amazing online store! Great products at unbeatable prices. 🛍️",
    offerText: "🔥 Special Offer: Flat 20% OFF on first order!",
    includeOffer: true
  });

  const storeName = "Your Store"; // This would come from user data
  const storeHandle = "yourstore"; // This would come from user data
  const storeUrl = `getwapify.com/@${storeHandle}`;

  const socialPlatforms = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#128C7E]',
      action: () => shareToWhatsApp()
    },
    {
      id: 'instagram',
      name: 'Instagram Story',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      action: () => shareToInstagram()
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: MessageCircle,
      color: 'bg-[#0088CC] hover:bg-[#0077B5]',
      action: () => shareToTelegram()
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#166FE5]',
      action: () => shareToFacebook()
    }
  ];

  const handleCopyStoreLink = () => {
    navigator.clipboard.writeText(`https://${storeUrl}`);
    toast({
      title: "🔗 Link Copied!",
      description: "Store link has been copied to clipboard",
    });
  };

  const shareToWhatsApp = () => {
    const message = `${shareSettings.customMessage}\n\n${shareSettings.includeOffer ? shareSettings.offerText + '\n\n' : ''}Visit: https://${storeUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToInstagram = () => {
    toast({
      title: "Instagram Sharing",
      description: "Copy the store link and share it in your Instagram story or bio",
    });
    handleCopyStoreLink();
  };

  const shareToTelegram = () => {
    const message = `${shareSettings.customMessage}\n\n${shareSettings.includeOffer ? shareSettings.offerText + '\n\n' : ''}Visit: https://${storeUrl}`;
    const telegramUrl = `https://t.me/share/url?url=https://${storeUrl}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://${storeUrl}`)}`;
    window.open(facebookUrl, '_blank');
  };

  const downloadQRCode = () => {
    // This would generate and download a QR code
    toast({
      title: "📱 QR Code Generated!",
      description: "QR code for your store has been generated",
    });
  };

  const downloadPromoPoster = () => {
    // This would generate and download a promotional poster
    toast({
      title: "🎨 Promo Poster Ready!",
      description: "Promotional poster with QR code has been generated",
    });
  };

  const handleSave = () => {
    toast({
      title: "📢 Share Settings Saved!",
      description: "Your sharing preferences have been updated",
    });
    onSave();
  };

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
                <Share2 className="h-8 w-8 text-purple-600" />
                📢 Share Your Store
              </h2>
              <p className="text-gray-600 mt-1">Start promoting your store and attract customers</p>
            </div>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            💾 Save Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Sharing Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Store Link */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  🔗 Your Store Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex">
                    <Input
                      value={`https://${storeUrl}`}
                      readOnly
                      className="rounded-r-none bg-gray-50"
                    />
                    <Button
                      onClick={handleCopyStoreLink}
                      variant="outline"
                      className="rounded-l-none border-l-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This is your unique store link that customers will use to visit your store
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => window.open(`https://${storeUrl}`, '_blank')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    👁️ Preview Store
                  </Button>
                  <Button 
                    onClick={handleCopyStoreLink}
                    variant="outline"
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>📱 Share on Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialPlatforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <Button
                        key={platform.id}
                        onClick={platform.action}
                        className={`${platform.color} text-white flex items-center gap-2`}
                      >
                        <Icon className="h-4 w-4" />
                        {platform.name}
                      </Button>
                    );
                  })}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">💡 Pro Tips for Social Sharing:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Share in relevant groups and communities</li>
                    <li>• Add attractive product images to your posts</li>
                    <li>• Use popular hashtags to increase visibility</li>
                    <li>• Engage with comments and questions promptly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Promotional Materials */}
            <Card>
              <CardHeader>
                <CardTitle>🎨 Promotional Materials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">📱 QR Code</h4>
                    <p className="text-sm text-gray-600 mb-3">Generate QR code for easy store access</p>
                    <Button onClick={downloadQRCode} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download QR
                    </Button>
                  </div>

                  <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    <Download className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">🎨 Promo Poster</h4>
                    <p className="text-sm text-gray-600 mb-3">Download poster with QR & branding</p>
                    <Button onClick={downloadPromoPoster} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Poster
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Customization */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>✏️ Customize Share Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Share Message</label>
                  <Textarea
                    rows={4}
                    value={shareSettings.customMessage}
                    onChange={(e) => setShareSettings(prev => ({ ...prev, customMessage: e.target.value }))}
                    placeholder="Write a compelling message about your store..."
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={shareSettings.includeOffer}
                      onChange={(e) => setShareSettings(prev => ({ ...prev, includeOffer: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Include Special Offer</span>
                  </label>
                </div>

                {shareSettings.includeOffer && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Offer Text</label>
                    <Input
                      value={shareSettings.offerText}
                      onChange={(e) => setShareSettings(prev => ({ ...prev, offerText: e.target.value }))}
                      placeholder="Special offer text..."
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>👀 Share Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <h4 className="font-semibold text-sm mb-2">WhatsApp Preview:</h4>
                    <div className="text-sm space-y-1">
                      <p>{shareSettings.customMessage}</p>
                      {shareSettings.includeOffer && (
                        <p className="text-orange-600 font-medium">{shareSettings.offerText}</p>
                      )}
                      <p className="text-blue-600 underline">https://{storeUrl}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Tips */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-800 mb-2">🚀 Launch Success Tips:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Start by sharing with friends and family</li>
                  <li>• Post regularly to stay visible</li>
                  <li>• Respond quickly to customer inquiries</li>
                  <li>• Track which platforms bring most customers</li>
                  <li>• Update your products frequently</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Launch Celebration */}
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              Congratulations! Your Store is Ready to Launch! 🚀
            </h2>
            <p className="text-lg text-purple-700 mb-6">
              Start sharing your store link and watch your business grow!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={shareToWhatsApp}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                📱 Share on WhatsApp
              </Button>
              <Button 
                onClick={handleCopyStoreLink}
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Copy className="h-4 w-4 mr-2" />
                🔗 Copy Store Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareStoreSection;
