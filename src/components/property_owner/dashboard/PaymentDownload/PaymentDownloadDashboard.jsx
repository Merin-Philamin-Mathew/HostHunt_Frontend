import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Filter, Calendar, Search } from 'lucide-react';
import { getPaymentRecord_service } from '@/features/Booking/BookingService';

const PaymentDownloadDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [paymentType, setPaymentType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = {
        start_date: dateRange.start || undefined,
        end_date: dateRange.end || undefined,
        payment_type: paymentType !== 'all' ? paymentType : undefined,
        search: searchTerm || undefined
      };
      
      const response = await getPaymentRecord_service(params);
      setPayments(response.data.results);
      console.log(response.data,'payment-record')
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [dateRange.start, dateRange.end, paymentType, searchTerm]);

  const downloadCSV = () => {
    const headers = [
      'Rent ID',
      'Booking ID',
      'Amount',
      'Due Date',
      'Status',
      'Payment Method',
      'Payment Date'
    ];

    const csvData = [
      headers.join(','),
      ...payments.map(payment => [
        payment.id,
        payment.booking,
        payment.amount,
        payment.due_date,
        payment.status,
        payment.rent_method,
        payment.payment_timestamp || ''
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
    <div className="space-y-6">
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
                <option value="rentThroughHostHunt">Through HostHunt</option>
                <option value="notificationsOnly">Notifications Only</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                placeholder="Search rent or booking ID"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Rent ID</th>
                  <th className="p-3 text-left">Booking ID</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-left">Payment Method</th>
                  <th className="p-3 text-left">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="p-3">{payment.id}</td>
                    <td className="p-3">{payment.booking}</td>
                    <td className="p-3 text-right">₹{parseFloat(payment.amount).toLocaleString()}</td>
                    <td className="p-3">{payment.due_date}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full text-center w-20 ${
                        payment.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-3">{payment.rent_method}</td>
                    <td className="p-3">{payment.payment_timestamp ? new Date(payment.payment_timestamp).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {payments.length} entries
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDownloadDashboard;