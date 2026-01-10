import React, { useState } from 'react';
import { Building2, User, KeyRound } from 'lucide-react';
import { Button, Input, Card } from '../components/ui/UIComponents';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<UserRole>(UserRole.TENANT);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onLogin(activeTab);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-200">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome to TrustRent</h1>
          <p className="text-gray-500 mt-2">The AI-powered rental escrow platform</p>
        </div>

        <Card className="overflow-hidden shadow-xl border-0">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === UserRole.TENANT
                  ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
                  : 'bg-gray-50 text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(UserRole.TENANT)}
            >
              <User className="w-4 h-4" />
              Tenant Login
            </button>
            <button
              className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === UserRole.LANDLORD
                  ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
                  : 'bg-gray-50 text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(UserRole.LANDLORD)}
            >
              <Building2 className="w-4 h-4" />
              Landlord Login
            </button>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder={activeTab === UserRole.LANDLORD ? "alex@trustrent.com" : "jordan@gmail.com"}
                defaultValue={activeTab === UserRole.LANDLORD ? "alex@trustrent.com" : "jordan@gmail.com"}
                required
              />
              <Input
                label="Password (Mock)"
                type="password"
                placeholder="••••••••"
                defaultValue="password"
                required
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-3">
              <KeyRound className="w-5 h-5 text-blue-600 mt-0.5" />
              <p className="text-xs text-blue-700">
                This is a prototype. Click "Sign In" to proceed with mock credentials for the selected role.
              </p>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={isLoading}
              className="flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>Sign In as {activeTab === UserRole.LANDLORD ? 'Landlord' : 'Tenant'}</>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
