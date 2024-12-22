import Header from '@/components/user/partials/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
 
function ManageAccountLayout() {
  return (
    <>
      <Header />
    <div className="min-h-screen relative overflow-hidden">
     
      {/* Scrollable Background Section */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-repeat" 
        style={{ 
          backgroundImage: "url('/backgrounds/doodle3.jpg')", 
          backgroundSize: '800px', // Adjust this value to control the size of the repeating pattern
        }}
      ></div>
 
      {/* Sticky Content Wrapper */}
         
      <div className="relative z-10 flex flex-col">
          <div className="min-h-screen bg-white bg-opacity-85 space-y-8 rounded-lg p-6">
            <div className="container mx-auto p-4 max-w-5xl">
              <Outlet />
            </div>
          </div>
      </div>
    </div>
    </>
  );
}
 
export default ManageAccountLayout;