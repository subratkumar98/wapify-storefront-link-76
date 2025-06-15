
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BarChart, TrendingUp, Users, ShoppingBag, Eye, Crown, Calendar, Download, Filter } from 'lucide-react';

interface AnalyticsSectionProps {
  userPlan: 'free' | 'pro';
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ userPlan }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    productViews: 0,
    uniqueVisitors: 0,
    conversionRate: 0,
    topProducts: [],
    viewsOverTime: [],
    dailyStats: []
  });

  // Simulate analytics data
  useEffect(() => {
    const generateMockData = () => {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const viewsOverTime = Array.from({ length: days }, (_, i) => ({
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        views: Math.floor(Math.random() * 50) + 10,
        visitors: Math.floor(Math.random() * 30) + 5
      }));

      setAnalytics({
        totalViews: viewsOverTime.reduce((sum, day) => sum + day.views, 0),
        productViews: Math.floor(Math.random() * 200) + 50,
        uniqueVisitors: viewsOverTime.reduce((sum, day) => sum + day.visitors, 0),
        conversionRate: parseFloat((Math.random() * 5).toFixed(1)),
        topProducts: [
          { name: 'Premium T-Shirt', views: 45, clicks: 12 },
          { name: 'Wireless Headphones', views: 38, clicks: 8 },
          { name: 'Smart Watch', views: 32, clicks: 6 },
          { name: 'Leather Wallet', views: 28, clicks: 5 }
        ],
        viewsOverTime,
        dailyStats: viewsOverTime.slice(-7)
      });
    };

    generateMockData();
  }, [timeRange]);

  const stats = [
    { 
      label: 'Total Views', 
      value: analytics.totalViews.toLocaleString(), 
      change: '+12%', 
      icon: Eye,
      color: 'blue'
    },
    { 
      label: 'Product Views', 
      value: analytics.productViews.toLocaleString(), 
      change: '+8%', 
      icon: ShoppingBag,
      color: 'green'
    },
    { 
      label: 'Unique Visitors', 
      value: analytics.uniqueVisitors.toLocaleString(), 
      change: '+15%', 
      icon: Users,
      color: 'purple'
    },
    { 
      label: 'Conversion Rate', 
      value: `${analytics.conversionRate}%`, 
      change: '+2.1%', 
      icon: TrendingUp,
      color: 'orange'
    },
  ];

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <BarChart className="h-8 w-8 text-blue-600" />
            Analytics Dashboard
          </h2>
          <p className="text-gray-600 mt-2">Track your store's performance and growth</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          {userPlan === 'pro' && (
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
          {userPlan === 'free' && (
            <div className="flex items-center gap-2 text-orange-600">
              <Crown className="h-4 w-4" />
              <span className="text-sm">Basic Analytics</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            purple: 'from-purple-500 to-purple-600',
            orange: 'from-orange-500 to-orange-600'
          };
          
          return (
            <Card key={index} className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className={`bg-gradient-to-r ${colorClasses[stat.color]} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className="h-8 w-8 opacity-80" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-green-600 font-medium">{stat.change} from last period</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Views Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2 p-4">
              {analytics.dailyStats.map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t w-full transition-all duration-300 hover:from-blue-600 hover:to-blue-400"
                    style={{ height: `${(day.views / Math.max(...analytics.dailyStats.map(d => d.views))) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 transform -rotate-45 origin-center">{day.date.split('/')[0]}/{day.date.split('/')[1]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.views} views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{product.clicks} clicks</p>
                    <p className="text-xs text-gray-500">{((product.clicks/product.views)*100).toFixed(1)}% CTR</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pro Features */}
      {userPlan === 'free' && (
        <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Crown className="h-5 w-5" />
              Unlock Advanced Analytics with Pro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 mb-2">Custom Date Ranges</h4>
                <p className="text-sm text-orange-700">Analyze any time period you want</p>
              </div>
              <div className="text-center p-4">
                <Download className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 mb-2">Export Reports</h4>
                <p className="text-sm text-orange-700">Download detailed CSV reports</p>
              </div>
              <div className="text-center p-4">
                <Filter className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 mb-2">Advanced Filters</h4>
                <p className="text-sm text-orange-700">Filter by source, device, and more</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                Upgrade to Pro
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsSection;
