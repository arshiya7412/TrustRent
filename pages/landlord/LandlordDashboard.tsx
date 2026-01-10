import React from 'react';
import { ArrowUpRight, DollarSign, Users, AlertTriangle } from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { Property, Payment } from '../../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface LandlordDashboardProps {
  properties: Property[];
  onNavigate: (page: string) => void;
}

export const LandlordDashboard: React.FC<LandlordDashboardProps> = ({ properties, onNavigate }) => {
  const totalProperties = properties.length;
  const occupied = properties.filter(p => p.status === 'Occupied').length;
  const vacant = totalProperties - occupied;
  const totalRevenue = properties
    .filter(p => p.status === 'Occupied')
    .reduce((acc, curr) => acc + curr.rentAmount, 0);

  const data = [
    { name: 'Jan', collected: 9500 },
    { name: 'Feb', collected: 9200 },
    { name: 'Mar', collected: totalRevenue }, // Current
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Button onClick={() => onNavigate('properties')}>Manage Properties</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
            <div className="p-2 bg-green-100 rounded-full text-green-600"><DollarSign className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
            <ArrowUpRight className="w-3 h-3" />
            <span>+4.5% vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Occupancy Rate</h3>
            <div className="p-2 bg-indigo-100 rounded-full text-indigo-600"><Users className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{Math.round((occupied / totalProperties) * 100)}%</div>
          <div className="text-xs text-gray-500 mt-1">{occupied} Occupied / {vacant} Vacant</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Pending Rent</h3>
            <div className="p-2 bg-orange-100 rounded-full text-orange-600"><AlertTriangle className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">$0</div>
          <div className="text-xs text-gray-500 mt-1">All tenants are paid up</div>
        </Card>

        <Card className="p-6">
           <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Avg Tenant Score</h3>
             <div className="p-2 bg-blue-100 rounded-full text-blue-600"><Users className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">745</div>
           <div className="text-xs text-gray-500 mt-1">Excellent standing</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Overview</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="collected" radius={[4, 4, 0, 0]}>
                   {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#4f46e5' : '#e0e7ff'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Action Required */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Required</h3>
          <div className="space-y-4">
            {vacant > 0 && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex gap-3">
                 <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                 <div>
                   <p className="text-sm font-medium text-red-900">{vacant} Vacant Properties</p>
                   <p className="text-xs text-red-700 mt-1">Review applications or adjust listing price.</p>
                   <Button size="sm" variant="outline" className="mt-2 text-xs h-7 bg-white">View Listings</Button>
                 </div>
              </div>
            )}
            <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg flex gap-3">
                 <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                 <div>
                   <p className="text-sm font-medium text-yellow-900">Maintenance Request</p>
                   <p className="text-xs text-yellow-700 mt-1">Unit 12 reported a leaky faucet.</p>
                   <Button size="sm" variant="outline" className="mt-2 text-xs h-7 bg-white">Resolve</Button>
                 </div>
              </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
