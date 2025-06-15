
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
  Crown
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
    `Check out my store! Amazing products at great prices. ${storeUrl}`
  );

  const copyLink = () => {
    navigator.clipboard.writeText(storeUrl);
    toast({
      title: "Link Copied!",
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
          title: "Instagram Sharing",
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
        title: "Upgrade Required",
        description: "QR code generation available in Pro plan",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "QR Code Generated",
      description: "QR code is ready for download",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Share2 className="h-6 w-6" />
          Share Your Store
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Link */}
        <Card>
          <CardHeader>
            <CardTitle>Store Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm flex-1">{storeUrl}</span>
                <Button size="sm" onClick={copyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Custom Share Message
              </label>
              <textarea
                className="w-full p-3 border rounded-lg resize-none"
                rows={3}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Add your custom message here..."
              />
            </div>
          </CardContent>
        </Card>

        {/* QR Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              QR Code
              {userPlan === 'free' && <Crown className="h-4 w-4 text-orange-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 mx-auto rounded-lg flex items-center justify-center mb-4">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Generate QR code for easy sharing
              </p>
              <Button onClick={generateQR} variant="outline" className="w-full">
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Media Sharing */}
      <Card>
        <CardHeader>
          <CardTitle>Share on Social Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => shareOnPlatform('whatsapp')}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            
            <Button
              onClick={() => shareOnPlatform('facebook')}
              className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            
            <Button
              onClick={() => shareOnPlatform('instagram')}
              className="bg-gradient-to-r from-[#833AB4] to-[#E1306C] hover:opacity-90 text-white"
            >
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
            </Button>
            
            <Button
              onClick={() => shareOnPlatform('twitter')}
              className="bg-[#1DA1F2] hover:bg-[#0C90E1] text-white"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sharing Tips */}
      <Card>
        <CardHeader>
          <CardTitle>📈 Sharing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Best Times to Share</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Instagram: 11 AM - 1 PM, 7 PM - 9 PM</li>
                <li>• Facebook: 1 PM - 3 PM, 7 PM - 9 PM</li>
                <li>• WhatsApp: Throughout the day</li>
                <li>• Twitter: 9 AM - 10 AM, 7 PM - 9 PM</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Engagement Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use relevant hashtags</li>
                <li>• Include product photos</li>
                <li>• Share customer testimonials</li>
                <li>• Post regularly and consistently</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareSection;
