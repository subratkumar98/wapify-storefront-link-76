
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, TrendingUp, Users, ShoppingBag, Eye, Crown } from 'lucide-react';

interface AnalyticsSectionProps {
  userPlan: 'free' | 'pro';
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ userPlan }) => {
  const stats = [
    { label: 'Total Views', value: '0', change: '+0%', icon: Eye },
    { label: 'Products Views', value: '0', change: '+0%', icon: ShoppingBag },
    { label: 'Unique Visitors', value: '0', change: '+0%', icon: Users },
    { label: 'Conversion Rate', value: '0%', change: '+0%', icon: TrendingUp },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BarChart className="h-6 w-6" />
          Analytics Dashboard
        </h2>
        {userPlan === 'free' && (
          <div className="flex items-center gap-2 text-orange-600">
            <Crown className="h-4 w-4" />
            <span className="text-sm">Limited Analytics</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No data yet</p>
                <p className="text-sm text-gray-500">Start sharing your store to see analytics</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No product data</p>
                <p className="text-sm text-gray-500">Add products to see performance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pro Features */}
      {userPlan === 'free' && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Crown className="h-5 w-5" />
              Unlock Advanced Analytics with Pro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-orange-800 mb-2">Enhanced Tracking</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Real-time visitor tracking</li>
                  <li>• Detailed product analytics</li>
                  <li>• Customer journey mapping</li>
                  <li>• Geographic insights</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 mb-2">Advanced Reports</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Custom date ranges</li>
                  <li>• Export data to CSV</li>
                  <li>• Weekly/monthly reports</li>
                  <li>• Performance benchmarks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsSection;
