import React from 'react';
import { Home, Building2, CreditCard, LogOut, User as UserIcon, MessageSquareWarning, PieChart, FileText } from 'lucide-react';
import { User, UserRole } from '../types';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ user, onLogout, children, activePage, onNavigate }) => {
  const isLandlord = user.role === UserRole.LANDLORD;

  const NavItem = ({ page, icon: Icon, label }: { page: string; icon: any; label: string }) => (
    <button
      onClick={() => onNavigate(page)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        activePage === page
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <Building2 className="w-8 h-8" />
            <span>TrustRent</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {isLandlord ? (
            <>
              <NavItem page="dashboard" icon={Home} label="Dashboard" />
              <NavItem page="properties" icon={Building2} label="Properties" />
              <NavItem page="statistics" icon={PieChart} label="Statistics" />
              <NavItem page="payment-history" icon={FileText} label="Payment History" />
              <NavItem page="landlord-complaints" icon={MessageSquareWarning} label="Feedback" />
            </>
          ) : (
            <>
              <NavItem page="dashboard" icon={Home} label="Dashboard" />
              <NavItem page="current-rental" icon={Building2} label="My Rental" />
              <NavItem page="payments" icon={CreditCard} label="Payment History" />
              <NavItem page="complaints" icon={MessageSquareWarning} label="Complaints" />
            </>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};