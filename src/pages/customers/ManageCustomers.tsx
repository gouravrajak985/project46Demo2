import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Eye, Edit, Trash2, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Customer {
  id: string;
  customerName: string;
  userName: string;
  email: string;
  orders: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

const customers: Customer[] = [
  {
    id: 'CUST-001',
    customerName: 'John Doe',
    userName: 'johndoe',
    email: 'john.doe@example.com',
    orders: 12,
    status: 'Active',
    createdAt: '2024-01-15'
  },
  {
    id: 'CUST-002',
    customerName: 'Jane Smith',
    userName: 'janesmith',
    email: 'jane.smith@example.com',
    orders: 5,
    status: 'Inactive',
    createdAt: '2023-11-20'
  },
  {
    id: 'CUST-003',
    customerName: 'Mike Johnson',
    userName: 'mikejohnson',
    email: 'mike.johnson@example.com',
    orders: 20,
    status: 'Active',
    createdAt: '2024-02-01'
  },
  {
    id: 'CUST-004',
    customerName: 'Sarah Williams',
    userName: 'sarahwilliams',
    email: 'sarah.williams@example.com',
    orders: 8,
    status: 'Inactive',
    createdAt: '2023-12-10'
  }
];

const getStatusColor = (status: Customer['status']) => {
  return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
};

const ManageCustomers = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Active' | 'Inactive' | ''>('');

  const handleManageCustomer = (customerId: string) => {
    // Navigate to a dedicated customer management page
    navigate(`/customers/manage-customer/${customerId}`);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`border rounded-lg ${
      theme === 'dark' ? 'bg-black border-gray-800' : 'bg-white border-shopify-border'
    }`}>
      <div className="p-6 border-b border-shopify-border dark:border-gray-800">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate('/home')}
            className={`p-2 mr-4 border rounded-md ${
              theme === 'dark' ? 'border-gray-800 hover:bg-gray-900' : 'border-shopify-border hover:bg-shopify-surface'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold">Manage Customers</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-shopify-text-secondary" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-white border-shopify-border'
                }`}
              />
            </div>
          </div>
          <div className="flex space-x-4 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'Active' | 'Inactive' | '')}
              className={`px-4 py-2 border rounded-md ${
                theme === 'dark' 
                  ? 'bg-gray-900 border-gray-800' 
                  : 'bg-white border-shopify-border'
              }`}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button 
              onClick={() => navigate('/customers/new-customer')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Customer
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${
            theme === 'dark' ? 'bg-gray-900' : 'bg-shopify-surface'
          } border-b ${
            theme === 'dark' ? 'border-gray-800' : 'border-shopify-border'
          }`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            theme === 'dark' ? 'divide-gray-800' : 'divide-shopify-border'
          }`}>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className={
                theme === 'dark' ? 'hover:bg-gray-900' : 'hover:bg-shopify-surface'
              }>
                <td className="px-6 py-4">{customer.customerName}</td>
                <td className="px-6 py-4">{customer.userName}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.orders}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4">{customer.createdAt}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button className={`p-2 border rounded-md ${
                      theme === 'dark' ? 'border-gray-800 hover:bg-gray-800' : 'border-shopify-border hover:bg-shopify-surface'
                    }`}>
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleManageCustomer(customer.id)}
                      className={`p-2 border rounded-md ${
                        theme === 'dark' ? 'border-gray-800 hover:bg-gray-800' : 'border-shopify-border hover:bg-shopify-surface'
                      }`}
                      title="Manage Customer"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className={`p-2 border rounded-md ${
                      theme === 'dark' ? 'border-gray-800 hover:bg-gray-800' : 'border-shopify-border hover:bg-shopify-surface'
                    }`}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCustomers;