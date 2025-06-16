
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Share2, 
  Copy, 
  Download, 
  QrCode, 
  Crown, 
  Instagram, 
  Facebook,
  ArrowLeft,
  Save,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareSectionProps {
  userPlan: 'free' | 'pro';
  storeHandle: string;
  onSave?: () => void;
  onBack?: () => void;
}

const ShareSection: React.FC<ShareSectionProps> = ({ userPlan, storeHandle, onSave, onBack }) => {
  const { toast } = useToast();
  const [customDomain, setCustomDomain] = useState('');
  const [socialSettings, setSocialSettings] = useState({
    autoPost: false,
    instagramIntegration: false,
    facebookIntegration: false
  });

  const storeUrl = `https://${storeHandle}.lovable.app`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storeUrl);
    toast({
      title: "Link Copied!",
      description: "Store link has been copied to clipboard",
    });
  };

  const handleSave = () => {
    toast({
      title: "Share Settings Saved!",
      description: "Your sharing preferences have been updated",
    });
    if (onSave) {
      onSave();
    }
  };

  const handleShareSocial = (platform: string) => {
    const text = encodeURIComponent(`Check out my amazing store! ${storeUrl}`);
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(storeUrl)}&text=${text}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button 
                variant="outline" 
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Share2 className="h-8 w-8 text-blue-600" />
                Share Your Store
              </h1>
              <p className="text-gray-600 mt-2">Get your store online and start reaching customers</p>
            </div>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Store Link */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardTitle>Your Store Link</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium">Public Store URL</label>
                <div className="flex mt-2">
                  <Input
                    value={storeUrl}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="rounded-l-none border-l-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => window.open(storeUrl, '_blank')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview Store
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  disabled={userPlan === 'free'}
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code
                  {userPlan === 'free' && <Crown className="h-3 w-3 ml-1 text-orange-500" />}
                </Button>
              </div>

              {userPlan === 'pro' && (
                <div>
                  <label className="text-sm font-medium">Custom Domain (Pro)</label>
                  <Input
                    placeholder="yourstore.com"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Connect your own domain for a professional look
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Media Sharing */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle>Social Media Sharing</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleShareSocial('whatsapp')}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white"
                >
                  <span className="mr-2">📱</span>
                  WhatsApp
                </Button>
                <Button
                  onClick={() => handleShareSocial('facebook')}
                  className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  onClick={() => handleShareSocial('twitter')}
                  className="bg-[#1DA1F2] hover:bg-[#0C90E0] text-white"
                >
                  <span className="mr-2">🐦</span>
                  Twitter
                </Button>
                <Button
                  onClick={() => handleShareSocial('telegram')}
                  className="bg-[#0088CC] hover:bg-[#0077B5] text-white"
                >
                  <span className="mr-2">✈️</span>
                  Telegram
                </Button>
              </div>

              {userPlan === 'pro' && (
                <div className="space-y-3 mt-6 pt-4 border-t">
                  <h4 className="font-medium">Auto-posting (Pro)</h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Instagram Integration</span>
                      <input 
                        type="checkbox" 
                        checked={socialSettings.instagramIntegration}
                        onChange={(e) => setSocialSettings(prev => ({ 
                          ...prev, 
                          instagramIntegration: e.target.checked 
                        }))}
                        className="rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Facebook Page Integration</span>
                      <input 
                        type="checkbox" 
                        checked={socialSettings.facebookIntegration}
                        onChange={(e) => setSocialSettings(prev => ({ 
                          ...prev, 
                          facebookIntegration: e.target.checked 
                        }))}
                        className="rounded"
                      />
                    </label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Marketing Tools */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Marketing Tools</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <Download className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Promotional Materials</h4>
                <p className="text-sm text-gray-600 mb-3">Download banners and social media posts</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={userPlan === 'free'}
                >
                  Download Kit
                  {userPlan === 'free' && <Crown className="h-3 w-3 ml-1 text-orange-500" />}
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <QrCode className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">QR Code Generator</h4>
                <p className="text-sm text-gray-600 mb-3">Generate QR codes for offline marketing</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={userPlan === 'free'}
                >
                  Generate QR
                  {userPlan === 'free' && <Crown className="h-3 w-3 ml-1 text-orange-500" />}
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <Share2 className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Analytics Tracking</h4>
                <p className="text-sm text-gray-600 mb-3">Track clicks and engagement</p>
                <Button variant="outline" size="sm">
                  View Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              🎉 Your Store is Ready to Share!
            </h3>
            <p className="text-green-700 mb-4">
              Start sharing your store link with friends, family, and customers to begin selling.
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={handleCopyLink}
                className="bg-green-600 hover:bg-green-700"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Store Link
              </Button>
              <Button 
                onClick={() => handleShareSocial('whatsapp')}
                className="bg-[#25D366] hover:bg-[#128C7E]"
              >
                <span className="mr-2">📱</span>
                Share on WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareSection;
