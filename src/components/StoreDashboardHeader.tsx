
import React from 'react';
import { Button } from './ui/button';
import { Copy, Share2, QrCode, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StoreDashboardHeaderProps {
  storeName: string;
  storeHandle: string;
  userPlan: 'free' | 'pro';
}

const StoreDashboardHeader: React.FC<StoreDashboardHeaderProps> = ({ 
  storeName, 
  storeHandle, 
  userPlan 
}) => {
  const { toast } = useToast();

  const storeUrl = `getwapify.com/@${storeHandle}`;

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${storeUrl}`);
    toast({
      title: "Link Copied!",
      description: "Store link copied to clipboard",
    });
  };

  const shareQR = () => {
    if (userPlan === 'free') {
      toast({
        title: "Upgrade Required",
        description: "QR code sharing available in Pro plan",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "QR Code Generated",
      description: "QR code is ready for sharing",
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              👋 Welcome, {storeName} – Let's Build Your Dream Store!
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Unique Storefront Link:</span>
                <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                  {storeUrl}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={copyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" size="sm" onClick={shareQR}>
              <QrCode className="h-4 w-4 mr-2" />
              Share QR
            </Button>
            <Button variant="outline" size="sm">
              <BarChart className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboardHeader;
