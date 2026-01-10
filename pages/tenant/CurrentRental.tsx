import React, { useState } from 'react';
import { MapPin, User, Calendar, DollarSign, CreditCard, Landmark, Wallet, CheckCircle } from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { Property, Tenant } from '../../types';
import { generateInvoicePDF } from '../../utils/invoiceGenerator';

interface CurrentRentalProps {
  property: Property;
  tenant: Tenant;
  onPayRent: (amount: number, method: string) => void;
  landlordName: string;
}

export const CurrentRental: React.FC<CurrentRentalProps> = ({ property, tenant, onPayRent, landlordName }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleProcessPayment = () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      setShowSuccess(true);
      onPayRent(property.rentAmount, selectedMethod);
    }, 2000);
  };

  const handleDownloadInvoice = () => {
    // Generate a temporary mock payment object for the invoice
    const mockPayment = {
      id: `pay_${Date.now()}`,
      propertyId: property.id,
      tenantId: tenant.id,
      amount: property.rentAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid' as any,
      isLate: false,
      method: selectedMethod || 'Card'
    };
    generateInvoicePDF(mockPayment, property, tenant);
    setShowSuccess(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Rental Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Property Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <img src={property.image} alt="Property" className="w-full h-64 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{property.address}</h2>
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    {property.city}
                  </div>
                </div>
                <Badge variant="success">Occupied by You</Badge>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div>
                   <label className="text-xs text-gray-500 uppercase font-semibold">Landlord</label>
                   <div className="flex items-center gap-2 mt-1">
                     <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                        <User className="w-4 h-4" />
                     </div>
                     <span className="font-medium text-gray-900">{landlordName}</span>
                   </div>
                </div>
                <div>
                   <label className="text-xs text-gray-500 uppercase font-semibold">Lease Status</label>
                   <p className="mt-1 font-medium text-gray-900">Active (Ends Dec 2024)</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Payment Action */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border-indigo-100 shadow-lg">
             <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Center</h3>
             
             <div className="space-y-4 mb-6">
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                 <span className="text-gray-500 text-sm">Next Due Date</span>
                 <span className="font-semibold text-gray-900 flex items-center gap-2">
                   <Calendar className="w-4 h-4 text-indigo-600" />
                   5th {new Date().toLocaleString('default', { month: 'short' })}
                 </span>
               </div>
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                 <span className="text-gray-500 text-sm">Amount Due</span>
                 <span className="font-bold text-2xl text-gray-900">${property.rentAmount}</span>
               </div>
             </div>

             <Button 
               fullWidth 
               size="lg" 
               className="shadow-md shadow-indigo-200"
               onClick={() => setShowPaymentModal(true)}
             >
               Pay Rent Now
             </Button>
             <p className="text-xs text-center text-gray-400 mt-3">Secure Escrow Transaction</p>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 animate-in zoom-in-95">
             <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
             <p className="text-sm text-gray-500 mb-6">Total Payable: <span className="font-bold text-gray-900">${property.rentAmount}</span></p>

             <div className="space-y-3 mb-8">
               <button 
                 onClick={() => setSelectedMethod('UPI')}
                 className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${selectedMethod === 'UPI' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-gray-200'}`}
               >
                 <div className="p-2 bg-white rounded-lg border border-gray-100">
                    <Wallet className="w-6 h-6 text-orange-500" />
                 </div>
                 <div className="text-left">
                   <p className="font-semibold text-gray-900">UPI</p>
                   <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                 </div>
               </button>

               <button 
                 onClick={() => setSelectedMethod('NetBanking')}
                 className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${selectedMethod === 'NetBanking' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-gray-200'}`}
               >
                 <div className="p-2 bg-white rounded-lg border border-gray-100">
                    <Landmark className="w-6 h-6 text-blue-600" />
                 </div>
                 <div className="text-left">
                   <p className="font-semibold text-gray-900">Internet Banking</p>
                   <p className="text-xs text-gray-500">HDFC, SBI, ICICI, Axis</p>
                 </div>
               </button>

               <button 
                 onClick={() => setSelectedMethod('Card')}
                 className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${selectedMethod === 'Card' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-gray-200'}`}
               >
                 <div className="p-2 bg-white rounded-lg border border-gray-100">
                    <CreditCard className="w-6 h-6 text-indigo-600" />
                 </div>
                 <div className="text-left">
                   <p className="font-semibold text-gray-900">Credit / Debit Card</p>
                   <p className="text-xs text-gray-500">Visa, Mastercard</p>
                 </div>
               </button>
             </div>

             <div className="flex gap-3">
               <Button variant="outline" fullWidth onClick={() => setShowPaymentModal(false)}>Cancel</Button>
               <Button 
                 fullWidth 
                 disabled={!selectedMethod || isProcessing}
                 onClick={handleProcessPayment}
               >
                 {isProcessing ? 'Processing...' : 'Confirm Payment'}
               </Button>
             </div>
          </Card>
        </div>
      )}

      {/* Success & Invoice Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
           <Card className="w-full max-w-sm p-8 text-center animate-in zoom-in-95">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
              <p className="text-gray-500 mb-6">You have successfully paid rent via {selectedMethod}.</p>
              
              <Button fullWidth onClick={handleDownloadInvoice} className="flex items-center justify-center gap-2">
                <DollarSign className="w-4 h-4" /> Download Invoice
              </Button>
              <Button variant="ghost" fullWidth onClick={() => setShowSuccess(false)} className="mt-2">
                Close
              </Button>
           </Card>
        </div>
      )}
    </div>
  );
};
