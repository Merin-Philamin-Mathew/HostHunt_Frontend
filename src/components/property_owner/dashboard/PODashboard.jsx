import React, { useEffect, useState } from "react";
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import MixedBookingsChart from "./charts/BookingsBarChart";
import DashboardTopSection from "./charts/DashboardOverview";
import { fetchDashboardSummary } from "@/features/Booking/BookingActions";
import PaymentDownloadDashboard from "./PaymentDownload/PaymentDownloadDashboard";

// ChartJS.register( CategoryScale, LinearScale, Tooltip, Legend);

const PODashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDashboardSummary();
        console.log("dashboard data:", response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
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
          <MixedBookingsChart />
        </div>

        <div>
          <PaymentDownloadDashboard/>
        </div>

  
    </div>
  );
};

export default PODashboard;
