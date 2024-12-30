import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaRupeeSign } from 'react-icons/fa';


ChartJS.register(ArcElement, Tooltip, Legend);
const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      const text = chart.config.options.centerText?.title || '';
      const value = chart.config.options.centerText?.value || '';
      
      ctx.save();
      
      // Draw title
      const titleFontSize = (height / 180).toFixed(2);
      ctx.font = `${titleFontSize}em sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(54, 69, 79, 0.9)';
      ctx.fillText(text, width / 2, height / 2 - height / 12);
      
      // Draw value
      const valueFontSize = (height / 140).toFixed(2);
      ctx.font = `bold ${valueFontSize}em sans-serif`;
      ctx.fillText(value, width / 2, height / 2 + height / 12);
      
      ctx.restore();
    },
  };
  
const DashboardTopSection = ({ data }) => {
  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display : false,
        position: 'bottom', // Place labels at the bottom
      },
    },
  };

  const revenueData = {
    labels: ['Booking Revenue', 'Rent-Traditional', 'Rent Through HostHunt'],
    datasets: [
      {
        label: 'Revenue Breakdown',
        data: [
          parseFloat(data?.total_booking_revenue),
          parseFloat(data?.rent_revenue_notificationsOnly),
          parseFloat(data?.rent_revenue_rentThroughHostHunt),
        ],
        backgroundColor: [
          'rgba(54, 69, 79, 0.7)',
          'rgba(205, 92, 29, 0.7)',
          'rgba(184, 115, 51, 0.7)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const bookingDetailsData = {
    labels: ['Subscribed Bookings', 'Non-Subscribed Bookings'],
    datasets: [
      {
        label: 'Booking Details',
        data: [
          parseInt(data?.subscribed_bookings),
          parseInt(data?.non_subscribed_bookings),
        ],
        backgroundColor: [
            'rgba(211, 175, 55, 0.8)',  // Gold
            'rgba(112, 128, 144, 0.8)', // Steel (Slate Gray)
          ],
          
        hoverOffset: 4,
      },
    ],
  };

  const bookingStatusData = {
    labels: ['Checked In', 'Confirmed', 'Checked Out'],
    datasets: [
      {
        label: 'Booking Status',
        data: [
          parseInt(data?.checked_in_bookings),
          parseInt(data?.confirmed_bookings),
          parseInt(data?.checked_out_bookings),
        ],
        backgroundColor: [
     

          'rgba(0, 128, 128, 0.7)',
          'rgba(0, 128, 105, 0.7)',
          'rgba(64, 174, 174, 0.7)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const bookingPropertiesData = {
    labels: ['Apartments', 'Hostels', 'PG', 'Rental Homes'],
    datasets: [
      {
        label: 'Property Details',
        data: [
          parseInt(data?.apartments_count),
          parseInt(data?.rentals_count),
          parseInt(data?.pgs_count),
          parseInt(data?.hostels_count),
        ],
        backgroundColor: [
          'rgba(153, 101, 21, 0.7)',  // Antique Bronze
            'rgba(236, 112, 99, 0.7)',  // Rose Gold
            'rgba(169, 169, 169, 0.7)', // Dark Gray (Metallic feel)
            'rgba(183, 65, 14, 0.7)',   // Copper
          ],
          
          
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 text-themeColor2li8">
      <div className="flex flex-col items-center justify-center p-4">
        <h3 className="md:text-xl font-semibold mb-1 flex items-center"> Revenue</h3>
        <Doughnut data={revenueData} 
                  options={{
                    ...chartOptions,
                    centerText: {
                        title: 'Total Revenue',
                      value: `₹${parseFloat(data?.total_revenue).toLocaleString()}`
                    },
                    plugins: {
                      ...chartOptions.plugins,
                      centerTextPlugin
                    }
                  }}
                  plugins={[centerTextPlugin]}
            />        
      </div>

      <div className="flex flex-col items-center justify-center p-4">
        <h3 className="md:text-xl font-semibold mb-1">
          Subscriptions
        </h3>
        <Doughnut data={bookingDetailsData} 
         options={{
            ...chartOptions,
            centerText: {
              title: 'Total Bookings',
              value: parseInt(data?.checked_in_bookings + data?.confirmed_bookings + data?.checked_out_bookings)
            }
          }}
          plugins={[centerTextPlugin]}
        />
      </div>

      <div className="flex flex-col items-center justify-center p-4">
        <h3 className="md:text-xl font-semibold mb-1">Booking Status</h3>
        <Doughnut data={bookingStatusData} 
 options={{
    ...chartOptions,
    centerText: {
      title: 'Total Bookings',
      value: parseInt(data?.checked_in_bookings + data?.confirmed_bookings + data?.checked_out_bookings)
    }
  }}
  plugins={[centerTextPlugin]}        />
      </div>

      <div className="flex flex-col items-center justify-center p-4">
        <h3 className="md:text-xl font-semibold mb-1">Property Details</h3>
        <Doughnut 
          data={bookingPropertiesData} 
          options={{
            ...chartOptions,
            centerText: {
              title: 'Total Properties',
              value: parseInt(data?.apartments_count + data?.rentals_count + data?.pgs_count + data?.hostels_count)
            }
          }}
          plugins={[centerTextPlugin]}
        />      </div>
    </div>
  );
};

export default DashboardTopSection;
