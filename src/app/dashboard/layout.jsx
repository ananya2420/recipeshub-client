//import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const DashboardLayout = ({ children }) => {
    return (
        <div className='flex min-h-screen'>
            {/* Toaster placed here ensures it is available globally within this layout */}
            <Toaster position="top-right" /> 
            
            <DashboardSidebar />
            
            <main className='flex-1'>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;