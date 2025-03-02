import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  stock: number;
  status: string;
  sku: string;
  description?: string;
  category?: string;
  brand?: string;
  dimensions?: string;
  weight?: string;
}

const products: Product[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
    title: 'Premium Headphones',
    price: 199.99,
    stock: 45,
    status: 'Live',
    sku: 'HDX-100',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    brand: 'AudioTech',
    dimensions: '7.5 x 6.3 x 3.2 inches',
    weight: '0.55 lbs'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&q=80',
    title: 'Wireless Mouse',
    price: 49.99,
    stock: 32,
    status: 'Saved',
    sku: 'WM-200',
    description: 'Ergonomic wireless mouse with precision tracking',
    category: 'Electronics',
    brand: 'TechGear',
    dimensions: '4.5 x 2.8 x 1.5 inches',
    weight: '0.25 lbs'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&q=80',
    title: 'Mechanical Keyboard',
    price: 159.99,
    stock: 15,
    status: 'Live',
    sku: 'KB-300',
    description: 'Mechanical gaming keyboard with RGB backlight',
    category: 'Electronics',
    brand: 'GameTech',
    dimensions: '17.3 x 5.1 x 1.4 inches',
    weight: '2.1 lbs'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&q=80',
    title: 'Gaming Monitor',
    price: 299.99,
    stock: 8,
    status: 'Saved',
    sku: 'GM-400',
    description: '27-inch gaming monitor with 144Hz refresh rate',
    category: 'Electronics',
    brand: 'ViewTech',
    dimensions: '24.1 x 21.2 x 7.9 inches',
    weight: '12.3 lbs'
  }
];

const ManageProduct = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Find the product with the matching ID
    const foundProduct = products.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setImagePreview(foundProduct.image);
    } else {
      // Handle case where product is not found
      navigate('/catalog/manage-products');
    }
  }, [id, navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        if (product) {
          setProduct({ ...product, image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (product) {
      setProduct({
        ...product,
        [name]: name === 'price' || name === 'stock' ? Number(value) : value
      });
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the product
    console.log('Saving product:', product);
    navigate('/catalog/manage-products');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

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
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/catalog/manage-products')}
              className={`p-2 mr-4 border rounded-md ${
                theme === 'dark' ? 'border-gray-800 hover:bg-gray-900' : 'border-shopify-border hover:bg-shopify-surface'
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold">Manage Product</h2>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Image</label>
            <div className="border rounded-lg overflow-hidden relative" style={{ height: '300px' }}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <label className={`p-2 rounded-full cursor-pointer ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } shadow-md`}>
                  <Upload className="h-5 w-5" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                {imagePreview && (
                  <button
                    onClick={() => setImagePreview(null)}
                    className="p-2 bg-red-500 text-white rounded-full shadow-md"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Title</label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleInputChange}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SKU</label>
              <input
                type="text"
                name="sku"
                value={product.sku}
                onChange={handleInputChange}
                className={inputClassName}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  className={inputClassName}
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleInputChange}
                  className={inputClassName}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                name="status"
                value={product.status}
                onChange={handleInputChange}
                className={inputClassName}
              >
                <option value="Live">Live</option>
                <option value="Saved">Saved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={product.description || ''}
            onChange={handleInputChange}
            className={`${inputClassName} h-32`}
          />
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={product.category || ''}
              onChange={handleInputChange}
              className={inputClassName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand || ''}
              onChange={handleInputChange}
              className={inputClassName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Dimensions</label>
            <input
              type="text"
              name="dimensions"
              value={product.dimensions || ''}
              onChange={handleInputChange}
              className={inputClassName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Weight</label>
            <input
              type="text"
              name="weight"
              value={product.weight || ''}
              onChange={handleInputChange}
              className={inputClassName}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            onClick={() => navigate('/catalog/manage-products')}
            className={`px-4 py-2 border rounded-md ${
              theme === 'dark'
                ? 'border-gray-800 hover:bg-gray-900'
                : 'border-shopify-border hover:bg-shopify-surface'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;