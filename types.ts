export enum UserRole {
  LANDLORD = 'LANDLORD',
  TENANT = 'TENANT',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Tenant extends User {
  creditScore: number;
  currentPropertyId: string;
}

export enum PaymentStatus {
  PAID = 'Paid',
  PENDING = 'Pending',
  OVERDUE = 'Overdue',
}

export interface Payment {
  id: string;
  propertyId: string;
  tenantId: string;
  amount: number;
  date: string; // ISO date
  status: PaymentStatus;
  isLate: boolean;
  method?: string;
}

export interface Property {
  id: string;
  address: string;
  city: string;
  rentAmount: number;
  tenantId?: string; // If null, vacant
  image: string;
  dueDate: number; // Day of month
  status: 'Occupied' | 'Vacant' | 'Maintenance';
  landlordName?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Complaint {
  id: string;
  date: string;
  category: 'Maintenance' | 'Noise' | 'Safety' | 'Other';
  subject: string;
  description: string;
  status: 'Open' | 'Resolved';
}
