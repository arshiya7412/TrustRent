import { UserRole, Property, Payment, Tenant, User, PaymentStatus } from './types';

export const MOCK_LANDLORD: User = {
  id: 'user_landlord_01',
  name: 'Alex Sterling',
  email: 'alex@trustrent.com',
  role: UserRole.LANDLORD,
  avatarUrl: 'https://picsum.photos/100/100',
};

export const MOCK_TENANT: Tenant = {
  id: 'user_tenant_01',
  name: 'Jordan Rivera',
  email: 'jordan@gmail.com',
  role: UserRole.TENANT,
  creditScore: 720,
  currentPropertyId: 'prop_001',
  avatarUrl: 'https://picsum.photos/101/101',
};

export const PROPERTIES: Property[] = [
  {
    id: 'prop_001',
    address: '101 Silicon Valley Blvd, Apt 4B',
    city: 'San Francisco, CA',
    rentAmount: 3200,
    tenantId: 'user_tenant_01',
    image: 'https://picsum.photos/400/300?random=1',
    dueDate: 5,
    status: 'Occupied',
  },
  {
    id: 'prop_002',
    address: '88 Tech Park Way, Unit 12',
    city: 'San Jose, CA',
    rentAmount: 2800,
    tenantId: 'user_tenant_02',
    image: 'https://picsum.photos/400/300?random=2',
    dueDate: 1,
    status: 'Occupied',
  },
  {
    id: 'prop_003',
    address: '450 Innovation Dr',
    city: 'Palo Alto, CA',
    rentAmount: 4500,
    tenantId: undefined,
    image: 'https://picsum.photos/400/300?random=3',
    dueDate: 1,
    status: 'Vacant',
  },
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay_001',
    propertyId: 'prop_001',
    tenantId: 'user_tenant_01',
    amount: 3200,
    date: '2024-03-05',
    status: PaymentStatus.PAID,
    isLate: false,
  },
  {
    id: 'pay_002',
    propertyId: 'prop_001',
    tenantId: 'user_tenant_01',
    amount: 3200,
    date: '2024-02-06',
    status: PaymentStatus.PAID,
    isLate: true,
  },
  {
    id: 'pay_003',
    propertyId: 'prop_001',
    tenantId: 'user_tenant_01',
    amount: 3200,
    date: '2024-01-05',
    status: PaymentStatus.PAID,
    isLate: false,
  },
];
