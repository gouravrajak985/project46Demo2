import React, { useState } from 'react';
import { ChevronDown, Home, ShoppingBag, Package, Users, LogOut, Tag, BarChart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutDialog from './LogoutDialog';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

const MenuItem = ({ 
  icon: Icon, 
  label, 
  subItems = [], 
  isActive = false,
  path,
  subItemPaths = [],
  isOpen,
  onToggle,
  id
}: MenuItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (subItems.length > 0) {
      onToggle?.(id);
    } else if (path) {
      navigate(path);
    }
  };

  const isSubItemActive = (path: string) => location.pathname === path;

  return (
    <div>
      <Button
        onClick={handleClick}
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start text-left",
          isActive && "border-l-2 border-primary rounded-none"
        )}
      >
        <Icon className="h-5 w-5 mr-3" />
        <span className="flex-1 text-left">{label}</span>
        {subItems.length > 0 && (
          <ChevronDown className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </Button>
      {isOpen && subItems.length > 0 && (
        <div className="ml-8 border-l border-border">
          {subItems.map((item, index) => (
            <Button
              key={item}
              onClick={() => navigate(subItemPaths[index])}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left pl-4 py-2 text-sm",
                isSubItemActive(subItemPaths[index]) && "bg-secondary"
              )}
            >
              {item}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  
  // Automatically open the Reports menu if we're on a reports page
  React.useEffect(() => {
    if (location.pathname.startsWith('/reports')) {
      setOpenMenuId('reports');
    }
  }, [location.pathname]);

  const handleMenuToggle = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
    setIsLogoutDialogOpen(false);
  };

  return (
    <>
      <aside className="fixed left-0 top-0 w-64 h-screen border-r border-border bg-background">
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <h1 className="text-xl font-bold">Avirrav Ecommerce</h1>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <nav className="flex-1 py-4 space-y-1">
            <MenuItem 
              icon={Home} 
              label="Home" 
              isActive={location.pathname === '/home'}
              path="/home"
              id="home"
              onToggle={handleMenuToggle}
              isOpen={openMenuId === 'home'}
            />
            <MenuItem 
              icon={Package} 
              label="Catalog" 
              subItems={['Manage Products', 'New Product']}
              subItemPaths={['/catalog/manage-products', '/catalog/new-product']}
              isActive={location.pathname.startsWith('/catalog')}
              id="catalog"
              onToggle={handleMenuToggle}
              isOpen={openMenuId === 'catalog'}
            />
            <MenuItem 
              icon={ShoppingBag} 
              label="Orders" 
              subItems={['Manage Orders', 'Add Order']}
              subItemPaths={['/orders/manage-orders', '/orders/new-order']}
              isActive={location.pathname.startsWith('/orders')}
              id="orders"
              onToggle={handleMenuToggle}
              isOpen={openMenuId === 'orders'}
            />
            <MenuItem 
              icon={Users} 
              label="Customers" 
              subItems={['Manage Customers', 'Add Customer']}
              subItemPaths={['/customers/manage-customers', '/customers/new-customer']}
              isActive={location.pathname.startsWith('/customers')}
              id="customers"
              onToggle={handleMenuToggle}
              isOpen={openMenuId === 'customers'}
            />
            <MenuItem 
              icon={Tag} 
              label="Discounts" 
              subItems={['Manage Discounts', 'Create Discount']}
              subItemPaths={['/discounts/manage', '/discounts/create']}
              isActive={location.pathname.startsWith('/discounts')}
              id="discounts"
              onToggle={handleMenuToggle}
              isOpen={openMenuId === 'discounts'}
            />
            <MenuItem 
              icon={BarChart} 
              label="Reports & Analytics" 
              subItems={['Sales Reports', 'Customer Growth', 'Best-Selling Products', 'Payment Reports']}
              subItemPaths={[
                '/reports/sales', 
                '/reports/customer-growth', 
                '/reports/best-selling', 
                '/reports/payments'
              ]}
              isActive={location.pathname.startsWith('/reports')}
              id="reports"
              onToggle={handleMenuToggle}
              isOpen={openMenuId === 'reports'}
            />
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-border">
            <Button
              onClick={() => setIsLogoutDialogOpen(true)}
              variant="outline"
              className="w-full flex items-center"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;