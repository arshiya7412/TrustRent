import React, { useState } from 'react';
import { MessageSquareWarning, Plus, Check, Clock } from 'lucide-react';
import { Card, Button, Input, TextArea, Select, Badge } from '../../components/ui/UIComponents';
import { Complaint } from '../../types';

interface ComplaintsProps {
  complaints: Complaint[];
  onAddComplaint: (c: Omit<Complaint, 'id' | 'date' | 'status'>) => void;
}

export const Complaints: React.FC<ComplaintsProps> = ({ complaints, onAddComplaint }) => {
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'Maintenance' | 'Noise' | 'Safety' | 'Other'>('Maintenance');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddComplaint({ subject, category, description });
    setShowForm(false);
    setSubject('');
    setDescription('');
    setCategory('Maintenance');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Complaints & Feedback</h1>
          <p className="text-gray-500">Report issues directly to your landlord</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" /> New Complaint
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 border-indigo-100 bg-indigo-50/30 animate-in slide-in-from-top-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-semibold text-gray-900">Submit New Issue</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                 <option>Maintenance</option>
                 <option>Noise</option>
                 <option>Safety</option>
                 <option>Other</option>
              </Select>
              <Input 
                label="Subject" 
                placeholder="e.g., Leaky Faucet" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            
            <TextArea
              label="Description"
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="h-32"
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit">Submit Complaint</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {complaints.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
             <MessageSquareWarning className="w-12 h-12 text-gray-300 mx-auto mb-3" />
             <p className="text-gray-500">No active complaints. Enjoy your stay!</p>
          </div>
        ) : (
          complaints.map(complaint => (
            <Card key={complaint.id} className="p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
               <div className="flex-1">
                 <div className="flex items-center gap-3 mb-1">
                   <Badge variant={complaint.category === 'Maintenance' ? 'warning' : 'neutral'}>{complaint.category}</Badge>
                   <span className="text-xs text-gray-500">{complaint.date}</span>
                 </div>
                 <h3 className="font-semibold text-gray-900">{complaint.subject}</h3>
                 <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
               </div>
               <div className="flex items-center gap-2 min-w-[120px] justify-end">
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
            </Card>
          ))
        )}
      </div>
    </div>
  );
};