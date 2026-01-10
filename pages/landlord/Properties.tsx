import React from 'react';
import { MapPin, User as UserIcon, DollarSign, ArrowRight } from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { Property } from '../../types';

interface PropertiesProps {
  properties: Property[];
  onSelectProperty: (id: string) => void;
  onNavigate: (page: string) => void;
}

export const Properties: React.FC<PropertiesProps> = ({ properties, onSelectProperty, onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
           <p className="text-gray-500">Manage your listings and tenants</p>
        </div>
        <Button onClick={() => onNavigate('add-property')}>+ Add Property</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <Card key={prop.id} className="overflow-hidden hover:shadow-md transition-shadow group">
            <div className="h-48 w-full bg-gray-200 relative">
              <img 
                src={prop.image} 
                alt={prop.address} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                 <Badge variant={prop.status === 'Occupied' ? 'success' : 'neutral'}>
                   {prop.status}
                 </Badge>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{prop.address}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                {prop.city}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-500 flex items-center gap-2">
                     <DollarSign className="w-4 h-4" /> Rent
                   </span>
                   <span className="font-semibold text-gray-900">${prop.rentAmount}/mo</span>
                </div>
                {prop.tenantId && (
                   <div className="flex justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <UserIcon className="w-4 h-4" /> Tenant
                    </span>
                    <span className="font-medium text-indigo-600">Active</span>
                  </div>
                )}
              </div>

              <Button 
                variant="outline" 
                fullWidth 
                className="group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200"
                onClick={() => onSelectProperty(prop.id)}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};