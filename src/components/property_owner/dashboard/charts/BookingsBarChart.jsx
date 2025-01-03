import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import { admin_api, api } from "@/apis/axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const MixedBookingsChart = ({ frequency = "monthly", admin=false }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('chart details')
      setLoading(true);
      let response;

      try {
        response = admin ? await admin_api.get(`/booking/booking-data?frequency=${frequency}`)
         : await api.get(`/booking/booking-data?frequency=${frequency}`) 

        if (response.data.status === "success" && response.data.data) {
          const bookingsSummary = response.data.data.bookings_summary;
          const monthlyRents = response.data.data.monthly_rents_details
;

          const labels = Object.keys(bookingsSummary);
          const bookingCounts = labels.map((key) => bookingsSummary[key]?.booking_count || 0);
          const totalRevenues = labels.map((key) => parseFloat(bookingsSummary[key]?.total_revenue) || 0);

          setChartData({
            labels,
            datasets: [
              {
                type: "bar",
                label: "Booking Amount",
                data: totalRevenues,
                backgroundColor: "rgba(54, 69, 79, 0.8)", // Dark Gunmetal Gray
                borderColor: "rgba(32, 41, 49, 1)", // Charcoal Gray
                borderWidth: 1,
                yAxisID: "y",
              },
              {
                type: "bar",
                label: "Monthly Rent Amount",
                data: labels.map((key) => parseFloat(monthlyRents[key]) || 0),
                backgroundColor: "rgba(169, 77, 42, 0.8)", // Dark Bronze
                borderColor: "rgba(105, 105, 105, 1)", // Davy's Grey
                borderWidth: 1,
                yAxisID: "y",
              },
              {
                type: "line",
                label: "Booking Count",
                data: bookingCounts,
                fill: false,
                borderColor: "rgba(105, 105, 105, 1)", // Davy's Grey
                tension: 0.1,
                yAxisID: "y1",
              },
            ],
            
            
          });
          
        }
      } catch (err) {
        setError("Failed to fetch booking data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [frequency]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {

      y: {
        title: {
          display: true,
          text: "Amount (₹)",
        },
        beginAtZero: true,
      },
      y1: {
        position: "right",
        title: {
          display: true,
          text: "Booking Count",
        },
        beginAtZero: true,
      },
    },
  };
  

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2 className="text-xl font-semibold mb-4  text-slate-600">Monthly Bookings and Revenue Overview</h2> 
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {chartData ?
      <>
       <Chart type="bar" data={chartData} options={options} />
       {/* <button className="bg-slate-500 p-5 text-slate-100">testing</button> */}
      </>
        : !loading && <p>No data available</p>}
    </div>
  );
};

export default MixedBookingsChart;
