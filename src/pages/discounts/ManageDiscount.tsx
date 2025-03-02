import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Discount {
  id: string;
  code: string;
  type: 'discount_code' | 'coupon_codes';
  value: number;
  valueType: 'percentage' | 'fixed';
  usageCount: number;
  maxUses: number | null;
  status: 'Active' | 'Expired' | 'Scheduled';
  startDate: string;
  endDate: string;
  description?: string;
  minPurchaseAmount?: number;
}

const discounts: Discount[] = [
  {
    id: 'DISC-001',
    code: 'SUMMER2024',
    type: 'discount_code',
    value: 20,
    valueType: 'percentage',
    usageCount: 150,
    maxUses: null,
    status: 'Active',
    startDate: '2024-03-01',
    endDate: '2024-08-31',
    description: 'Summer sale discount for all products',
    minPurchaseAmount: 50
  },
  {
    id: 'DISC-002',
    code: 'WELCOME10',
    type: 'discount_code',
    value: 10,
    valueType: 'fixed',
    usageCount: 45,
    maxUses: null,
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    description: 'Welcome discount for new customers',
    minPurchaseAmount: 0
  },
  {
    id: 'DISC-003',
    code: 'FLASH50',
    type: 'coupon_codes',
    value: 50,
    valueType: 'percentage',
    usageCount: 98,
    maxUses: 100,
    status: 'Expired',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    description: 'Flash sale with limited uses',
    minPurchaseAmount: 100
  }
];

const ManageDiscount = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [discount, setDiscount] = useState<Discount | null>(null);

  useEffect(() => {
    // Find the discount with the matching ID
    const foundDiscount = discounts.find(d => d.id === id);
    if (foundDiscount) {
      setDiscount(foundDiscount);
    } else {
      // Handle case where discount is not found
      navigate('/discounts/manage');
    }
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (discount) {
      setDiscount({
        ...discount,
        [name]: name === 'value' || name === 'minPurchaseAmount' || name === 'maxUses' 
          ? parseFloat(value) 
          : value
      });
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the discount
    console.log('Saving discount:', discount);
    navigate('/discounts/manage');
  };
}

export default ManageDiscount;