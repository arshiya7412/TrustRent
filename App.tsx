import React, { useState, useEffect } from 'react';
import { Login } from './pages/Login';
import { Layout } from './components/Layout';
import { LandlordDashboard } from './pages/landlord/LandlordDashboard';
import { Properties } from './pages/landlord/Properties';
import { PropertyDetails } from './pages/landlord/PropertyDetails';
import { AddProperty } from './pages/landlord/AddProperty';
import { Statistics } from './pages/landlord/Statistics';
import { LandlordComplaints } from './pages/landlord/LandlordComplaints';
import { PaymentHistory } from './pages/landlord/PaymentHistory';
import { TenantDashboard } from './pages/tenant/TenantDashboard';
import { CurrentRental } from './pages/tenant/CurrentRental';
import { Complaints } from './pages/tenant/Complaints';
import { Chatbot } from './components/Chatbot';
import { User, UserRole, Tenant, Property, Payment, PaymentStatus, Complaint } from './types';
import { MOCK_LANDLORD, MOCK_TENANT, PROPERTIES, MOCK_PAYMENTS } from './constants';
import { generateInvoicePDF } from './utils/invoiceGenerator';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // App State (Hoisted for interactivity)
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [currentTenant, setCurrentTenant] = useState<Tenant>(MOCK_TENANT);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Tenant Logic: Pay Rent
  const handlePayRent = (amount: number, method: string) => {
    // 1. Create new payment
    const newPayment: Payment = {
      id: `pay_${Date.now()}`,
      propertyId: currentTenant.currentPropertyId,
      tenantId: currentTenant.id,
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      status: PaymentStatus.PAID,
      isLate: false,
      method: method
    };

    setPayments([newPayment, ...payments]);

    // 2. Update Credit Score (+15 points for demo effect)
    setCurrentTenant(prev => ({
      ...prev,
      creditScore: Math.min(900, prev.creditScore + 15)
    }));
  };

  const handleAddComplaint = (c: Omit<Complaint, 'id' | 'date' | 'status'>) => {
    const newComplaint: Complaint = {
      id: `comp_${Date.now()}`,
      date: new Date().toLocaleDateString(),
      status: 'Open',
      ...c
    };
    setComplaints([newComplaint, ...complaints]);
  };

  const handleResolveComplaint = (id: string) => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, status: 'Resolved' } : c
    ));
  };

  // Landlord Logic: View Property Details
  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentPage('property-details');
  };

  // Landlord Logic: Add Property
  const handleSaveProperty = (newPropertyData: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      id: `prop_${Date.now()}`,
      ...newPropertyData
    };
    setProperties([...properties, newProperty]);
    setCurrentPage('properties');
  };

  const handleLogin = (role: UserRole) => {
    if (role === UserRole.LANDLORD) {
      setUser(MOCK_LANDLORD);
    } else {
      setUser(currentTenant);
    }
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
    setSelectedPropertyId(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Get current tenant's property
  const tenantProperty = properties.find(p => p.id === currentTenant.currentPropertyId)!;
  
  // Prepare Context for AI
  const aiContext = user.role === UserRole.LANDLORD 
    ? { properties, recentRevenue: 9500, tenantIssues: complaints.length }
    : { tenantProfile: currentTenant, property: tenantProperty, paymentHistory: payments, activeComplaints: complaints };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      activePage={currentPage}
      onNavigate={setCurrentPage}
    >
      {/* Dynamic Page Rendering */}
      {user.role === UserRole.LANDLORD && (
        <>
          {currentPage === 'dashboard' && (
            <LandlordDashboard 
              properties={properties} 
              onNavigate={setCurrentPage} 
            />
          )}
          {currentPage === 'properties' && (
            <Properties 
              properties={properties} 
              onSelectProperty={handleSelectProperty} 
              onNavigate={setCurrentPage}
            />
          )}
          {currentPage === 'add-property' && (
            <AddProperty 
              onSave={handleSaveProperty}
              onCancel={() => setCurrentPage('properties')}
            />
          )}
          {currentPage === 'property-details' && selectedPropertyId && (
            <PropertyDetails 
              property={properties.find(p => p.id === selectedPropertyId)!}
              tenant={currentTenant.currentPropertyId === selectedPropertyId ? currentTenant : undefined}
              payments={payments}
              onBack={() => setCurrentPage('properties')}
            />
          )}
          {currentPage === 'statistics' && (
            <Statistics tenants={[currentTenant]} />
          )}
          {currentPage === 'landlord-complaints' && (
            <LandlordComplaints 
              complaints={complaints} 
              onResolve={handleResolveComplaint}
            />
          )}
          {currentPage === 'payment-history' && (
            <PaymentHistory 
              properties={properties} 
              payments={payments} 
              tenants={[currentTenant]} 
            />
          )}
        </>
      )}

      {user.role === UserRole.TENANT && (
        <>
          {currentPage === 'dashboard' && (
            <TenantDashboard 
              tenant={currentTenant}
              property={tenantProperty}
              payments={payments}
              onNavigate={setCurrentPage}
            />
          )}
          {currentPage === 'current-rental' && (
            <CurrentRental 
              tenant={currentTenant}
              property={tenantProperty}
              landlordName={MOCK_LANDLORD.name}
              onPayRent={handlePayRent}
            />
          )}
          {currentPage === 'complaints' && (
            <Complaints 
              complaints={complaints}
              onAddComplaint={handleAddComplaint}
            />
          )}
          {currentPage === 'payments' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Full Payment History</h1>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-medium text-gray-500">Date</th>
                      <th className="px-6 py-4 font-medium text-gray-500">Amount</th>
                      <th className="px-6 py-4 font-medium text-gray-500">Method</th>
                      <th className="px-6 py-4 font-medium text-gray-500 text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900">{payment.date}</td>
                        <td className="px-6 py-4 font-medium">${payment.amount}</td>
                        <td className="px-6 py-4 text-gray-500">{payment.method || 'Bank Transfer'}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => generateInvoicePDF(payment, tenantProperty, currentTenant)}
                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
           )}
        </>
      )}

      {/* AI Assistant */}
      <Chatbot userRole={user.role} contextData={aiContext} />
    </Layout>
  );
}

export default App;