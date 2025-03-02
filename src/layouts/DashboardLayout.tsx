import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard } from 'lucide-react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64 mt-16">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <LayoutDashboard className="h-8 w-8 mr-2 text-primary" />
              <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;