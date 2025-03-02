import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Eye, Edit, Trash2, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  customerName: string;
  amount: number;
  paymentReceived: boolean;
  paymentMethod: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned' | 'Refunded' | 'Completed' | 'Saved';
  date: string;
}

const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    amount: 299.99,
    paymentReceived: true,
    paymentMethod: 'Credit Card',
    status: 'Delivered',
    date: '2024-03-15'
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    amount: 149.99,
    paymentReceived: false,
    paymentMethod: 'PayPal',
    status: 'Pending',
    date: '2024-03-14'
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Johnson',
    amount: 599.99,
    paymentReceived: true,
    paymentMethod: 'Bank Transfer',
    status: 'Saved',
    date: '2024-03-13'
  },
  {
    id: 'ORD-004',
    customerName: 'Sarah Williams',
    amount: 899.99,
    paymentReceived: false,
    paymentMethod: 'Credit Card',
    status: 'Cancelled',
    date: '2024-03-12'
  }
];

const getStatusColor = (status: Order['status']) => {
  const colors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-purple-100 text-purple-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
    Returned: 'bg-orange-100 text-orange-800',
    Refunded: 'bg-pink-100 text-pink-800',
    Completed: 'bg-green-100 text-green-800',
    Saved: 'bg-gray-100 text-gray-800'
  };
  return colors[status];
};

const ManageOrders = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleManageOrder = (orderId: string) => {
    // Navigate to a dedicated order management page
    navigate(`/orders/manage-order/${orderId}`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
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
          <h2 className="text-xl font-semibold">Manage Orders</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-shopify-text-secondary" />
              <input
                type="text"
                placeholder="Search orders..."
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
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 border rounded-md ${
                theme === 'dark' 
                  ? 'bg-gray-900 border-gray-800' 
                  : 'bg-white border-shopify-border'
              }`}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
              <option value="Refunded">Refunded</option>
              <option value="Completed">Completed</option>
              <option value="Saved">Saved</option>
            </select>
            <button 
              onClick={() => navigate('/orders/new-order')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Create Order
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
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Payment Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-shopify-text-secondary uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            theme === 'dark' ? 'divide-gray-800' : 'divide-shopify-border'
          }`}>
            {filteredOrders.map((order) => (
              <tr key={order.id} className={
                theme === 'dark' ? 'hover:bg-gray-900' : 'hover:bg-shopify-surface'
              }>
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className={`px-6 py-4 font-medium ${
                  order.paymentReceived ? 'text-green-500' : 'text-red-500'
                }`}>
                  ${order.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4">{order.paymentMethod}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button className={`p-2 border rounded-md ${
                      theme === 'dark' ? 'border-gray-800 hover:bg-gray-800' : 'border-shopify-border hover:bg-shopify-surface'
                    }`}>
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleManageOrder(order.id)}
                      className={`p-2 border rounded-md ${
                        theme === 'dark' ? 'border-gray-800 hover:bg-gray-800' : 'border-shopify-border hover:bg-shopify-surface'
                      }`}
                      title="Manage Order"
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

export default ManageOrders;