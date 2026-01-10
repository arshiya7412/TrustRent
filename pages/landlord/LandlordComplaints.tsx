import React from 'react';
import { MessageSquareWarning, Check, Clock } from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { Complaint } from '../../types';

interface LandlordComplaintsProps {
  complaints: Complaint[];
  onResolve: (id: string) => void;
}

export const LandlordComplaints: React.FC<LandlordComplaintsProps> = ({ complaints, onResolve }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tenant Feedback & Complaints</h1>
        <p className="text-gray-500">Manage maintenance requests and issues</p>
      </div>

      <div className="space-y-4">
        {complaints.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
             <MessageSquareWarning className="w-12 h-12 text-gray-300 mx-auto mb-3" />
             <p className="text-gray-500">No active complaints available.</p>
          </div>
        ) : (
          complaints.map(complaint => (
            <Card key={complaint.id} className="p-6 transition-all hover:shadow-md border-l-4 border-l-indigo-500">
               <div className="flex flex-col md:flex-row justify-between gap-4">
                 <div className="flex-1">
                   <div className="flex items-center gap-3 mb-2">
                     <Badge variant={complaint.category === 'Maintenance' ? 'warning' : 'neutral'}>{complaint.category}</Badge>
                     <span className="text-sm text-gray-500">{complaint.date}</span>
                     {complaint.status === 'Resolved' ? (
                       <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                         <Check className="w-3 h-3" /> Resolved
                       </span>
                     ) : (
                       <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                         <Clock className="w-3 h-3" /> Open
                       </span>
                     )}
                   </div>
                   <h3 className="text-lg font-bold text-gray-900">{complaint.subject}</h3>
                   <p className="text-gray-600 mt-2">{complaint.description}</p>
                 </div>
                 
                 <div className="flex items-center">
                    {complaint.status === 'Open' && (
                      <Button onClick={() => onResolve(complaint.id)} variant="outline" size="sm">
                        Mark as Resolved
                      </Button>
                    )}
                 </div>
               </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};