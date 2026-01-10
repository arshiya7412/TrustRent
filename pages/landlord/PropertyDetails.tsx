import React, { useState } from 'react';
import { ArrowLeft, Download, Bell, Link, Copy, CheckCircle, User, AlertTriangle } from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { Property, Tenant, Payment, PaymentStatus } from '../../types';
import { generateInvoicePDF } from '../../utils/invoiceGenerator';

interface PropertyDetailsProps {
  property: Property;
  tenant?: Tenant;
  payments: Payment[];
  onBack: () => void;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, tenant, payments, onBack }) => {
  const [linkCopied, setLinkCopied] = useState(false);

  // Get status of current month payment
  const isPaidThisMonth = tenant && payments.some(p => {
    const d = new Date(p.date);
    const n = new Date();
    return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear() && p.tenantId === tenant.id;
  });

  const handleSendReminder = () => {
    alert(`Reminder sent to ${tenant?.name} via Email and SMS.`);
  };

  const handleCopyLink = () => {
    const dummyLink = `https://trustrent.com/apply/${property.id}`;
    navigator.clipboard.writeText(dummyLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleViewReceipt = () => {
    if (!tenant) return;
    const lastPayment = payments.find(p => p.tenantId === tenant.id);
    if (lastPayment) {
      generateInvoicePDF(lastPayment, property, tenant);
    } else {
      alert("No payment history found for this tenant.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} size="sm">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">{property.address} Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Property Overview */}
        <Card className="p-6 md:col-span-1">
          <img src={property.image} alt="Property" className="w-full h-48 object-cover rounded-lg mb-4" />
          <h2 className="text-lg font-bold text-gray-900">{property.address}</h2>
          <p className="text-gray-500 mb-4">{property.city}</p>
          
          <div className="flex justify-between items-center py-2 border-t border-gray-100">
            <span className="text-gray-600">Monthly Rent</span>
            <span className="font-semibold">${property.rentAmount}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-gray-100">
            <span className="text-gray-600">Due Date</span>
            <span className="font-semibold">{property.dueDate}th of month</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-gray-100">
             <span className="text-gray-600">Status</span>
             <Badge variant={property.status === 'Occupied' ? 'success' : 'neutral'}>{property.status}</Badge>
          </div>
        </Card>

        {/* Tenant Table / Management */}
        <Card className="p-6 md:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Tenant Information</h3>
          
          {property.status === 'Occupied' && tenant ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-500">Tenant Name</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Rent</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 font-medium text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                           <User className="w-4 h-4" />
                         </div>
                         <div>
                           <p className="font-medium text-gray-900">{tenant.name}</p>
                           <p className="text-xs text-gray-500">{tenant.email}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium">${property.rentAmount}</td>
                    <td className="px-4 py-4">
                      {isPaidThisMonth ? (
                        <Badge variant="success">Paid</Badge>
                      ) : (
                        <Badge variant="warning">Pending</Badge>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <button 
                            onClick={handleViewReceipt}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="View Receipt"
                          >
                           <Download className="w-4 h-4" />
                         </button>
                         <button 
                            onClick={handleSendReminder}
                            className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Send Reminder"
                          >
                           <Bell className="w-4 h-4" />
                         </button>
                       </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-8 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 mb-2">Tenant Reliability Insights (AI)</h4>
                <div className="flex items-start gap-3">
                   <div className="mt-1"><CheckCircle className="w-5 h-5 text-green-600" /></div>
                   <div>
                     <p className="text-sm text-gray-700"><strong>High Retention Probability:</strong> This tenant has a 92% chance of renewing based on on-time payments and app engagement.</p>
                   </div>
                </div>
              </div>
            </div>
          ) : (
             <div className="text-center py-10">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <User className="w-8 h-8 text-gray-400" />
               </div>
               <h3 className="text-lg font-medium text-gray-900">Property is Vacant</h3>
               <p className="text-gray-500 mb-6">No tenant is currently assigned to this unit.</p>
               
               <div className="max-w-md mx-auto bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <Link className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-xs text-gray-500 font-medium">Listing URL</p>
                    <p className="text-sm text-gray-900 truncate">trustrent.com/apply/{property.id}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={handleCopyLink}>
                    {linkCopied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </Button>
               </div>
             </div>
          )}
        </Card>
      </div>
    </div>
  );
};