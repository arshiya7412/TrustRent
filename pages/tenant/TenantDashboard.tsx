import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { Tenant, Property, Payment } from '../../types';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AIStatusMonitor } from '../../components/AIStatusMonitor';
import { generateInvoicePDF } from '../../utils/invoiceGenerator';
import { generateCreditReport } from '../../utils/reportGenerator';

interface TenantDashboardProps {
  tenant: Tenant;
  property: Property;
  payments: Payment[];
  onNavigate: (page: string) => void;
}

export const TenantDashboard: React.FC<TenantDashboardProps> = ({ tenant, property, payments, onNavigate }) => {
  const creditHistoryData = [
    { month: 'Jan', score: 705 },
    { month: 'Feb', score: 710 },
    { month: 'Mar', score: tenant.creditScore },
  ];

  const handleDownloadReport = () => {
    generateCreditReport(tenant, property, payments);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {tenant.name.split(' ')[0]}</h1>
          <p className="text-gray-500">Your rental health is looking good.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleDownloadReport}
          className="flex items-center gap-2 bg-white hover:bg-indigo-50 border-indigo-200 text-indigo-700"
        >
          <FileText className="w-4 h-4" />
          Download Credit Report
        </Button>
      </div>

      {/* AI MONITOR AGENT */}
      <AIStatusMonitor tenant={tenant} payments={payments} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CREDIT SCORE CARD - HERO */}
        <Card className="p-6 md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50 pointer-events-none" />
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Rental Credit Score</h3>
              <p className="text-sm text-gray-500">Powered by TrustRent AI</p>
            </div>
            <Badge variant="success">Excellent</Badge>
          </div>

          <div className="flex items-end gap-4 mt-6 relative z-10">
            <span className="text-6xl font-black text-indigo-600 tracking-tighter">
              {tenant.creditScore}
            </span>
            <span className="text-sm text-gray-500 mb-2">/ 900</span>
          </div>
          
          <div className="h-32 mt-4 -ml-2">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={creditHistoryData}>
                 <XAxis dataKey="month" axisLine={false} tickLine={false} />
                 <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                 <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, fill: '#4f46e5'}} />
               </LineChart>
             </ResponsiveContainer>
          </div>
        </Card>

        {/* QUICK ACTIONS / RENT PREVIEW */}
        <Card 
          className="p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:border-indigo-300 transition-all group"
          onClick={() => onNavigate('current-rental')}
        >
           <div className="p-4 bg-indigo-50 rounded-full text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
             <DollarSignIcon className="w-8 h-8" />
           </div>
           <h3 className="font-bold text-gray-900">Pay Rent</h3>
           <p className="text-sm text-gray-500 mt-1">Due: 5th of Month</p>
           <span className="mt-4 text-indigo-600 text-sm font-medium group-hover:underline">Go to Payment Portal &rarr;</span>
        </Card>
      </div>

      {/* PAYMENT HISTORY */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
           <button onClick={() => onNavigate('payments')} className="text-sm text-indigo-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-gray-500">
              <tr>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Method</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.slice(0, 3).map((payment) => (
                <tr key={payment.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-gray-900">{payment.date}</td>
                  <td className="py-4 font-medium">${payment.amount}</td>
                  <td className="py-4 text-gray-500">{payment.method || 'Bank Transfer'}</td>
                  <td className="py-4">
                    <Badge variant={payment.isLate ? 'warning' : 'success'}>
                      {payment.isLate ? 'Late' : 'On Time'}
                    </Badge>
                  </td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => generateInvoicePDF(payment, property, tenant)}
                      className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 text-xs font-medium border border-indigo-100 px-2 py-1 rounded bg-white"
                    >
                      <Download className="w-3 h-3" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const DollarSignIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
