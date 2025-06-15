
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Share2, 
  Copy, 
  QrCode, 
  Facebook, 
  Instagram, 
  Twitter,
  MessageCircle,
  Crown,
  Sparkles,
  TrendingUp,
  Users,
  Eye,
  Link,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareSectionProps {
  userPlan: 'free' | 'pro';
  storeHandle: string;
}

const ShareSection: React.FC<ShareSectionProps> = ({ userPlan, storeHandle }) => {
  const { toast } = useToast();
  const storeUrl = `https://getwapify.com/@${storeHandle}`;
  const [customMessage, setCustomMessage] = useState(
    `🛍️ Check out my amazing store! Quality products at unbeatable prices ✨\n\n${storeUrl}`
  );

  const copyLink = () => {
    navigator.clipboard.writeText(storeUrl);
    toast({
      title: "🎉 Link Copied!",
      description: "Store link copied to clipboard",
    });
  };

  const shareOnPlatform = (platform: string) => {
    const encodedMessage = encodeURIComponent(customMessage);
    const encodedUrl = encodeURIComponent(storeUrl);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedMessage}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
        break;
      case 'instagram':
        toast({
          title: "📸 Instagram Sharing",
          description: "Copy the link and share it in your Instagram story or bio",
        });
        copyLink();
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const generateQR = () => {
    if (userPlan === 'free') {
      toast({
        title: "🔒 Upgrade Required",
        description: "QR code generation available in Pro plan",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "🎯 QR Code Generated",
      description: "QR code is ready for download",
    });
  };

  const sharingTips = [
    { icon: "📱", tip: "Share on your WhatsApp status" },
    { icon: "📸", tip: "Add link to Instagram bio" },
    { icon: "💬", tip: "Send to family & friends" },
    { icon: "📧", tip: "Include in email signature" },
    { icon: "🌐", tip: "Post on Facebook page" },
    { icon: "💼", tip: "Share in business groups" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold flex items-center justify-center gap-3 mb-4">
          <Share2 className="h-10 w-10 text-blue-600" />
          Share Your Store
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get your store in front of customers! Share across platforms and watch your sales grow 🚀
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Store Link & Message */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Your Store Link
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border">
                <span className="font-mono text-sm flex-1 text-gray-800">{storeUrl}</span>
                <Button size="sm" onClick={copyLink} className="shrink-0">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">
                  🎯 Customize Your Share Message
                </label>
                <textarea
                  className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-blue-500 transition-colors"
                  rows={4}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Add your custom message here..."
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: Use emojis and exciting words to make your message more attractive!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Sharing */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Share on Social Media
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => shareOnPlatform('whatsapp')}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white h-14 text-base"
                >
                  <MessageCircle className="h-5 w-5 mr-3" />
                  WhatsApp
                </Button>
                
                <Button
                  onClick={() => shareOnPlatform('facebook')}
                  className="bg-[#1877F2] hover:bg-[#166FE5] text-white h-14 text-base"
                >
                  <Facebook className="h-5 w-5 mr-3" />
                  Facebook
                </Button>
                
                <Button
                  onClick={() => shareOnPlatform('instagram')}
                  className="bg-gradient-to-r from-[#833AB4] to-[#E1306C] hover:opacity-90 text-white h-14 text-base"
                >
                  <Instagram className="h-5 w-5 mr-3" />
                  Instagram
                </Button>
                
                <Button
                  onClick={() => shareOnPlatform('twitter')}
                  className="bg-[#1DA1F2] hover:bg-[#0C90E1] text-white h-14 text-base"
                >
                  <Twitter className="h-5 w-5 mr-3" />
                  Twitter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Sharing Tips */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Quick Sharing Ideas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sharingTips.map((tip, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-2xl">{tip.icon}</span>
                    <span className="text-sm font-medium">{tip.tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Code & Stats */}
        <div className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code
                {userPlan === 'free' && <Crown className="h-4 w-4 text-orange-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 mx-auto rounded-2xl flex items-center justify-center shadow-inner">
                <QrCode className="h-20 w-20 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">
                Generate QR code for easy offline sharing
              </p>
              <Button onClick={generateQR} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                {userPlan === 'free' ? 'Upgrade for QR' : 'Download QR'}
              </Button>
            </CardContent>
          </Card>

          {/* Share Statistics */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Share Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-600">Total Shares</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-green-600">0</div>
                  <div className="text-xs text-gray-600">This Week</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-600">0</div>
                  <div className="text-xs text-gray-600">Clicks</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Times */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">📅 Best Times to Share</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>📱 WhatsApp</span>
                  <span className="text-gray-600">All day</span>
                </div>
                <div className="flex justify-between">
                  <span>📘 Facebook</span>
                  <span className="text-gray-600">1-3 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>📸 Instagram</span>
                  <span className="text-gray-600">11 AM-1 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>🐦 Twitter</span>
                  <span className="text-gray-600">9-10 AM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShareSection;
