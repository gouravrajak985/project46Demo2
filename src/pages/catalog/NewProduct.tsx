import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Upload, X, Plus, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MenuItemProps { 
  icon: React.ElementType;
  label: string;
  subItems?: string[];
  isActive?: boolean;
  path?: string;
  subItemPaths?: string[];
  isOpen?: boolean;
  onToggle?: (id: string) => void;
  id: string;
}

interface Tax {
  id: string;
  name: string;
  percentage: number;
}

const NewProduct = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [profitPercentage, setProfitPercentage] = useState('20');
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [newTaxName, setNewTaxName] = useState('');
  const [newTaxPercentage, setNewTaxPercentage] = useState('');
  const [stock, setStock] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [priceWithProfit, setPriceWithProfit] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const basePriceValue = parseFloat(basePrice) || 0;
    const profitValue = basePriceValue * (parseFloat(profitPercentage) / 100);
    const priceWithProfitValue = basePriceValue + profitValue;
    setPriceWithProfit(priceWithProfitValue);
    
    const taxAmount = taxes.reduce((acc, tax) => {
      return acc + (priceWithProfitValue * (tax.percentage / 100));
    }, 0);
    
    setFinalPrice(priceWithProfitValue + taxAmount);
  }, [basePrice, profitPercentage, taxes]);

  const handleAddTax = () => {
    if (newTaxName && newTaxPercentage) {
      setTaxes([
        ...taxes,
        {
          id: Date.now().toString(),
          name: newTaxName,
          percentage: parseFloat(newTaxPercentage)
        }
      ]);
      setNewTaxName('');
      setNewTaxPercentage('');
    }
  };

  const handleRemoveTax = (id: string) => {
    setTaxes(taxes.filter(tax => tax.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (status: 'draft' | 'published') => {
    // Handle save logic here
    console.log({
      title,
      description,
      basePrice: parseFloat(basePrice),
      profitPercentage: parseFloat(profitPercentage),
      priceWithProfit,
      taxes,
      finalPrice,
      stock: parseInt(stock),
      status
    });
  };

  const inputClassName = `w-full p-3 border rounded-md ${
    theme === 'dark'
      ? 'bg-gray-900 border-gray-800'
      : 'bg-white border-shopify-border'
  } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-gray-600' : 'focus:ring-shopify-focus'} focus:border-shopify-focus`;

  return (
    <div className={`border rounded-lg ${
      theme === 'dark' ? 'bg-black border-gray-800' : 'bg-white border-shopify-border'
    }`}>
      <div className="p-6 border-b border-shopify-border dark:border-gray-800">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/catalog/manage-products')}
            className={`p-2 mr-4 border rounded-md ${
              theme === 'dark' ? 'border-gray-800 hover:bg-gray-900' : 'border-shopify-border hover:bg-shopify-surface'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold">New Product</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Product Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Product Image</label>
          <div className="flex items-center space-x-4">
            <div className={`w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'border-gray-800' : 'border-shopify-border'
            }`}>
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Upload className="w-8 h-8 text-shopify-text-secondary" />
                </label>
              )}
            </div>
            <div className="text-sm text-shopify-text-secondary">
              <p>Upload a product image</p>
              <p>Recommended size: 800x800px</p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClassName}
              placeholder="Enter product title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClassName} h-32 resize-none`}
              placeholder="Enter product description"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Base Price (cost price)</label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className={inputClassName}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profit Percentage</label>
            <div className="flex">
              <input
                type="number"
                value={profitPercentage}
                onChange={(e) => setProfitPercentage(e.target.value)}
                className={`${inputClassName} rounded-r-none`}
                placeholder="20"
                min="0"
                step="0.1"
              />
              <div className={`flex items-center justify-center px-4 border border-l-0 rounded-r-md ${
                theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-shopify-border'
              }`}>
                %
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price with Profit</label>
            <input
              type="number"
              value={priceWithProfit.toFixed(2)}
              className={`${inputClassName} bg-shopify-surface`}
              disabled
            />
            <p className="mt-1 text-xs text-shopify-text-secondary">
              Base price + {profitPercentage}% profit
            </p>
          </div>

          {/* Taxes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Taxes (applied on price with profit)</label>
            <div className="grid grid-cols-12 gap-2">
              <input
                type="text"
                value={newTaxName}
                onChange={(e) => setNewTaxName(e.target.value)}
                className={`${inputClassName} col-span-7`}
                placeholder="Tax name"
              />
              <input
                type="number"
                value={newTaxPercentage}
                onChange={(e) => setNewTaxPercentage(e.target.value)}
                className={`${inputClassName} col-span-4`}
                placeholder="Percentage"
                min="0"
                step="0.01"
              />
              <button
                onClick={handleAddTax}
                className={`p-2 border rounded-md col-span-1 ${
                  theme === 'dark'
                    ? 'border-gray-800 hover:bg-gray-900'
                    : 'border-shopify-border hover:bg-shopify-surface'
                }`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            {/* Tax List */}
            <div className="space-y-2">
              {taxes.map((tax) => (
                <div
                  key={tax.id}
                  className={`flex items-center justify-between p-2 border rounded-md ${
                    theme === 'dark' ? 'border-gray-800' : 'border-shopify-border'
                  }`}
                >
                  <span>{tax.name} ({tax.percentage}%)</span>
                  <button
                    onClick={() => handleRemoveTax(tax.id)}
                    className="text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Final Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Final Price (with profit and taxes)</label>
            <input
              type="number"
              value={finalPrice.toFixed(2)}
              className={`${inputClassName} bg-shopify-surface font-bold`}
              disabled
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-1">Initial Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className={inputClassName}
            placeholder="0"
            min="0"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            onClick={() => handleSave('draft')}
            className={`px-4 py-2 border rounded-md ${
              theme === 'dark'
                ? 'border-gray-800 hover:bg-gray-900'
                : 'border-shopify-border hover:bg-shopify-surface'
            }`}
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;