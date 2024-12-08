import React from 'react';
import Sidebar from '../../utils/Sidebar';
import POFooter from '../../property_owner/partials/POFooter';
  import { Outlet, useLocation } from 'react-router-dom';
import POHeader from '../../property_owner/partials/POHeader';
import Header from '../../user/partials/header';
import Footer from '../../user/partials/Footer';

function UserGeneralFormsLayout({sidebarItems}) {

  const location = useLocation();

  return (
    
    <div className="relative min-h-screen flex flex-col bg-gray-100">
      <div className="sticky top-0 z-50">
<Header/>
      </div>

      <div className="flex flex-grow py-8 bg-gray-100  px-10">
        <aside className="relative p-6">
          <div className="sticky top-[100px] py-3 px-1 w-full rounded-3xl bg-white shadow-xl">
            
            <Sidebar items={sidebarItems} activePath={location.pathname} />
          </div>
        </aside>

        <main className="flex-grow pl-10  overflow-y-auto md:pr-16 lg:pr-24 ">
          <Outlet />
        </main>
      </div>

<Footer/>
    </div>
  );
}

export default UserGeneralFormsLayout;
