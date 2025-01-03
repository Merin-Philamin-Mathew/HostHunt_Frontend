import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Download, Filter, Calendar, Search } from 'lucide-react';

const PaymentDownloadDashboard = () => {
  // Dummy data for demonstration
  const dummyPayments = [
    {
      id: 1,
      bookingId: "BK001",
      guestName: "John Doe",
      roomNumber: "101",
      checkInDate: "2024-01-01",
      amount: 15000,
      paymentStatus: "paid",
      paymentDate: "2024-01-01",
      paymentType: "booking",
      propertyName: "Sunshine Hostel"
    },
    {
      id: 2,
      bookingId: "BK002",
      guestName: "Jane Smith",
      roomNumber: "102",
      checkInDate: "2024-01-05",
      amount: 12000,
      paymentStatus: "paid",
      paymentDate: "2024-01-05",
      paymentType: "rent",
      propertyName: "Sunshine Hostel"
    },
    {
      id: 3,
      bookingId: "BK003",
      guestName: "Mike Johnson",
      roomNumber: "201",
      checkInDate: "2024-01-10",
      amount: 18000,
      paymentStatus: "pending",
      paymentDate: null,
      paymentType: "booking",
      propertyName: "Sunshine Hostel"
    }
  ];

  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [paymentType, setPaymentType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const downloadCSV = () => {
    const headers = [
      'Booking ID',
      'Guest Name',
      'Room Number',
      'Check-in Date',
      'Amount',
      'Payment Date',
      'Payment Type',
      'Property Name'
    ];

    const csvData = [
      headers.join(','),
      ...dummyPayments.map(payment => [
        payment.bookingId,
        payment.guestName,
        payment.roomNumber,
        payment.checkInDate,
        payment.amount,
        payment.paymentStatus,
        payment.paymentDate || '',
        payment.paymentType,
        payment.propertyName
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `payments_${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
  };

  return (
    <div className=" space-y-6 ">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Payment Records</CardTitle>
          <Button onClick={downloadCSV} className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Download Report
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full"
                placeholder="Start Date"
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full"
                placeholder="End Date"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                className="w-full p-2 border rounded-md"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option value="all">All Payments</option>
                <option value="booking">Booking Only</option>
                <option value="rent">Rent Only</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                placeholder="Search guest or booking ID"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Booking ID</th>
                  <th className="p-3 text-left">Guest Name</th>
                  <th className="p-3 text-left">Room</th>
                  <th className="p-3 text-left">Check-in Date</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-left">Payment Date</th>
                  <th className="p-3 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {dummyPayments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="p-3">{payment.bookingId}</td>
                    <td className="p-3">{payment.guestName}</td>
                    <td className="p-3">{payment.roomNumber}</td>
                    <td className="p-3">{payment.checkInDate}</td>
                    <td className="p-3 text-right">₹{payment.amount.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full text-center w-20 ${
                        payment.paymentStatus === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">{payment.paymentDate || '-'}</td>
                    <td className="p-3">{payment.paymentType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {dummyPayments.length} entries
            </div>
            <div className="flex gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDownloadDashboard;