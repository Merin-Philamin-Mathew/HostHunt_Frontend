import React from 'react';
import Sidebar from '../../utils/Sidebar';
import POHeader from '../../property_owner/partials/POHeader';
import POFooter from '../../property_owner/partials/POFooter';
import { FaBell, FaBuilding, FaClipboardList, FaCommentDots, FaSignOutAlt } from 'react-icons/fa';

function OwnerDashboardLayout({ children }) {
  const sidebarItems = [
    { title: 'Dashboard', link: '/host/dashboard', icon: <FaClipboardList /> },
    { title: 'Hostels Listed', link: '/host/listings', icon: <FaBuilding /> },
    { title: 'Reviews', link: '/host/reviews', icon: <FaCommentDots /> },
    { title: 'Messages', link: '/host/messages', icon: <FaCommentDots /> },
    { title: 'Bookings', link: '/host/bookings', icon: <FaClipboardList /> },
    { title: 'Notifications', link: '/host/notifications', icon: <FaBell /> },
    { title: 'Sign out', link: '/', icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100">
      <div className="sticky top-0 z-50">
        <POHeader />
      </div>

      <div className="flex flex-grow py-8 bg-muted_bg">
        <aside className="relative  p-6  ">
          <div className="sticky top-[100px] py-3 px-1 rounded-3xl bg-white shadow-xl shadow-[#48484899] ">
            <Sidebar items={sidebarItems} />
          </div>
        </aside>
{}
        <main className="flex-grow p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      <POFooter />
    </div>
  );
}

export default OwnerDashboardLayout;
