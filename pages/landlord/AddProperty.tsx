import React, { useState } from 'react';
import { ArrowLeft, MapPin, Loader2, Building2, DollarSign } from 'lucide-react';
import { Card, Button, Input, Select } from '../../components/ui/UIComponents';
import { Property } from '../../types';

interface AddPropertyProps {
  onSave: (property: Omit<Property, 'id'>) => void;
  onCancel: () => void;
}

export const AddProperty: React.FC<AddPropertyProps> = ({ onSave, onCancel }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [rent, setRent] = useState('');
  const [status, setStatus] = useState<'Occupied' | 'Vacant'>('Vacant');
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, use Google Maps Geocoding API here.
        // For prototype, we simulate a detected address.
        setTimeout(() => {
          const mockAddresses = [
            "404 Innovation Way",
            "123 Startup Avenue",
            "88 Tech Park Plaza"
          ];
          const mockCities = ["San Francisco, CA", "Austin, TX", "New York, NY"];
          const randomIdx = Math.floor(Math.random() * mockAddresses.length);
          
          setAddress(mockAddresses[randomIdx]);
          setCity(mockCities[randomIdx]);
          setLoadingLocation(false);
        }, 1000);
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve location. Please enter manually.");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new property object
    const newProperty: Omit<Property, 'id'> = {
      address,
      city,
      rentAmount: Number(rent),
      dueDate: 5, // Default
      status: status,
      // Assign a random image for the prototype
      image: `https://picsum.photos/400/300?random=${Date.now()}`,
      tenantId: status === 'Occupied' ? 'user_tenant_01' : undefined // Mock assignment if occupied
    };

    onSave(newProperty);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onCancel} size="sm">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Properties
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Address Field with Location Icon */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Property Address</label>
            <div className="relative flex items-center">
              <input 
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St"
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <button 
                type="button"
                onClick={handleGetLocation}
                disabled={loadingLocation}
                className="absolute right-3 p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title="Use Current Location"
              >
                {loadingLocation ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="City / State"
              placeholder="e.g. San Francisco, CA"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Monthly Rent</label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <span className="text-gray-500">$</span>
                 </div>
                 <input 
                    type="number"
                    required
                    min="0"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                    placeholder="2500"
                    className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                 />
              </div>
            </div>
          </div>

          <Select 
            label="Tenant Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="Vacant">Inactive (Vacant)</option>
            <option value="Occupied">Active (Occupied)</option>
          </Select>

          <div className="pt-4 flex gap-4">
            <Button type="button" variant="outline" fullWidth onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              Save Property
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
};