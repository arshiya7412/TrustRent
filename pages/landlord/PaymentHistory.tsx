import React, { useState } from 'react';
import { Download, Search, Filter } from 'lucide-react';
import { Card, Badge, Button, Select } from '../../components/ui/UIComponents';
import { Payment, Property, Tenant } from '../../types';
import { generateInvoicePDF } from '../../utils/invoiceGenerator';

interface PaymentHistoryProps {
  properties: Property[];
  payments: Payment[];
  tenants: Tenant[]; // In a real app this would be a map or fetch call
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ properties, payments, tenants }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('all');

  // Filter payments based on selection
  const filteredPayments = selectedPropertyId === 'all' 
    ? payments 
    : payments.filter(p => p.propertyId === selectedPropertyId);

  // Helper to get tenant name (simplified for prototype)
  const getTenantName = (id: string) => {
    const t = tenants.find(tenant => tenant.id === id);
    return t ? t.name : 'Unknown Tenant';
  };

  // Helper to get property address
  const getPropertyAddress = (id: string) => {
    const p = properties.find(prop => prop.id === id);
    return p ? p.address : 'Unknown Property';
  };

  const handleDownload = (payment: Payment) => {
    const property = properties.find(p => p.id === payment.propertyId);
    const tenant = tenants.find(t => t.id === payment.tenantId);
    
    if (property && tenant) {
      generateInvoicePDF(payment, property, tenant);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Archive</h1>
          <p className="text-gray-500">View and download past invoices</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Select 
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
            >
              <option value="all">All Properties</option>
              {properties.map(p => (
                <option key={p.id} value={p.id}>{p.address}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">Date</th>
                <th className="px-6 py-4 font-medium text-gray-500">Property</th>
                <th className="px-6 py-4 font-medium text-gray-500">Tenant</th>
                <th className="px-6 py-4 font-medium text-gray-500">Amount</th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPayments.length === 0 ? (
                <tr>
                   <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                     No payment records found for this selection.
                   </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{payment.date}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{getPropertyAddress(payment.propertyId)}</td>
                    <td className="px-6 py-4 text-gray-500">{getTenantName(payment.tenantId)}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">${payment.amount}</td>
                    <td className="px-6 py-4">
                      <Badge variant={payment.isLate ? 'warning' : 'success'}>
                        {payment.isLate ? 'Late' : 'Paid'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDownload(payment)}
                        className="inline-flex items-center gap-2"
                      >
                        <Download className="w-3 h-3" /> View Invoice
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};