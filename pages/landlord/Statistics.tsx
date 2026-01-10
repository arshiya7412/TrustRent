import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../../components/ui/UIComponents';
import { Tenant } from '../../types';

interface StatisticsProps {
  tenants: Tenant[];
}

export const Statistics: React.FC<StatisticsProps> = ({ tenants }) => {
  // Mock data for the chart since we might only have 1 active tenant in the prototype
  const trustData = [
    { name: 'Jordan R.', score: 720, reliability: 95 },
    { name: 'Sarah M.', score: 680, reliability: 88 },
    { name: 'David K.', score: 750, reliability: 98 },
    { name: 'Lisa P.', score: 620, reliability: 75 },
    { name: 'Mike T.', score: 710, reliability: 92 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
        <p className="text-gray-500">AI-driven predictive analysis for your portfolio</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Trustworthy Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Tenant Trustworthiness Index</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trustData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${value}%`, 'Reliability Score']}
                />
                <Bar dataKey="reliability" radius={[0, 4, 4, 0]} barSize={20}>
                  {trustData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.reliability > 90 ? '#4f46e5' : entry.reliability > 80 ? '#818cf8' : '#fbbf24'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">Based on payment history, credit score impact, and communication response time.</p>
        </Card>

        {/* Predictive Analysis */}
        <div className="space-y-6">
          
          {/* Renewal Prediction */}
          <Card className="p-6 border-l-4 border-l-green-500">
             <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
                   <TrendingUp className="w-5 h-5 text-green-600" />
                   Renewal Probability: High
                 </h3>
                 <p className="text-sm text-gray-500">Tenant: Jordan Rivera (Unit 4B)</p>
               </div>
               <span className="text-2xl font-bold text-green-600">85%</span>
             </div>
             
             <div className="space-y-3">
               <div className="flex items-start gap-2 text-sm text-gray-700">
                 <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                 <span><strong>Perfect Payment History:</strong> 12/12 on-time payments.</span>
               </div>
               <div className="flex items-start gap-2 text-sm text-gray-700">
                 <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                 <span><strong>High Engagement:</strong> Uses app features 4x/week.</span>
               </div>
               <div className="flex items-start gap-2 text-sm text-gray-700">
                 <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                 <span><strong>Market Comps:</strong> Similar tenants in this area stay avg 24 months.</span>
               </div>
             </div>
          </Card>

          {/* Churn Prediction */}
          <Card className="p-6 border-l-4 border-l-red-500">
             <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
                   <TrendingDown className="w-5 h-5 text-red-600" />
                   Churn Risk: Elevated
                 </h3>
                 <p className="text-sm text-gray-500">Tenant: Lisa P. (Unit 12)</p>
               </div>
               <span className="text-2xl font-bold text-red-600">62%</span>
             </div>
             
             <div className="space-y-3">
               <div className="flex items-start gap-2 text-sm text-gray-700">
                 <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                 <span><strong>Late Payments:</strong> 3 late payments in last 6 months.</span>
               </div>
               <div className="flex items-start gap-2 text-sm text-gray-700">
                 <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                 <span><strong>Low Engagement:</strong> Rarely logs in to check dashboard.</span>
               </div>
               <div className="flex items-start gap-2 text-sm text-gray-700">
                 <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                 <span><strong>Pattern Match:</strong> Similar behavior often leads to non-renewal.</span>
               </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};