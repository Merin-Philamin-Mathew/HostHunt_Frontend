import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import DashboardTopSection from "@/components/property_owner/dashboard/charts/DashboardOverview";
import MixedBookingsChart from "@/components/property_owner/dashboard/charts/BookingsBarChart";
import PaymentDownloadDashboard from "@/components/property_owner/dashboard/PaymentDownload/PaymentDownloadDashboard";
import { getDashboardSummary_admin_service } from "@/features/Booking/BookingService";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AdminDashboardPage() {
    const [dashboardData, setDashboardData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {      
        const response = await getDashboardSummary_admin_service()
        console.log('dashboard data',response.data.data)
        setDashboardData(response.data.data);
          }
          catch(error){
              console.error(error)
          }
        }       
      fetchData();
    }, []);

  return (
    <>
    <div className="min-h-screen">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
      
      {/* Top Section */}
      <div className= " bg-white rounded-lg">

      <DashboardTopSection data={dashboardData} />
    </div>
      {/* Charts Section */}
        {/* Booking Trends Chart */}
        <div className= " bg-white rounded-lg py-4 my-8">
          <MixedBookingsChart admin={true}/>
        </div>

        <div>
          <PaymentDownloadDashboard admin={true}/>
        </div>

  
    </div>  </>
  )
}

export default AdminDashboardPage
