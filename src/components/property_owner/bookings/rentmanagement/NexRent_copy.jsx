

import React, { useState, useEffect } from 'react'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useLocation, useParams } from 'react-router'
import { format } from 'date-fns'
import { Calendar, IndianRupee, Bell, Edit2, Check, Logs } from 'lucide-react'
import { createRentInstance, fetchUpcomingRent } from '../../../../features/Booking/BookingActions'
import { Popover, Transition } from '@headlessui/react'
import { addMonths, startOfMonth } from 'date-fns'
import { DayPicker } from 'react-day-picker'



const NextRent_copy = () => {
    const { id } = useParams()
    const user = useSelector((state) => state.user.user);
    const [isOwner, setIsOwner] = useState(false)
      const [selectedDate, setSelectedDate] = useState(() => {
        // Set default date to the 1st of next month
        const nextMonthFirstDay = startOfMonth(addMonths(new Date(), 1))
        return nextMonthFirstDay
      })
        const handleDateSelect = (date) => {
          setSelectedDate(date)
          handleUpcomingRentChange({
            target: {
              name: 'due_date',
              value: format(date, 'yyyy-MM-dd')
            }
          })
        }
    
    const location = useLocation();
    const { monthly_rent } = location.state || {}
    const [upcomingRent, setUpcomingRent] = useState({
        booking_id: id || '',
        due_date: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM-dd'),
        amount: monthly_rent || '',
        rent_method: '',
        notification_period: 4,
        status: 'pending'
    })
    const [isEditing, setIsEditing] = useState(false)
    const [rentHistory, setRentHistory] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        setRentHistory([
            { id: 1, due_date: '2023-11-01', amount: 1000, status: 'paid' },
            { id: 2, due_date: '2023-12-01', amount: 1000, status: 'paid' },
            { id: 3, due_date: '2024-01-01', amount: 1000, status: 'overdue' },
        ])
        const fetchData = async () => {
            try {
                const upcomingRentResponse = await fetchUpcomingRent(id);
                if (upcomingRentResponse) {
                    setUpcomingRent(upcomingRentResponse); // Ensure the response matches the state structure
                    console.log( upcomingRentResponse.due_date,'upcoming rent details:', upcomingRentResponse);
                    setIsOwner(user===upcomingRent.host)
                }
            } catch (error) {
                console.error("Error fetching upcoming rent:", error);
            }
        };
        fetchData();

    }, [])



    const handleUpcomingRentChange = (event) => {
        const { name, value } = event.target
        setUpcomingRent(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (upcomingRent.rent_method && upcomingRent.due_date && upcomingRent.amount && upcomingRent.notification_period) {
            const updatedRentDetails = {
                ...upcomingRent,
                booking_id: id, // Add booking ID dynamically
            };
            console.log( updatedRentDetails.due_date,'Updated rent details:', updatedRentDetails);
            // Submit updated rent details here
            createRentInstance(updatedRentDetails);
            setIsEditing(false);
            setError('');
        } else {
            setError('Please fill in all required fields');
        }
    };
    

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Rent Management</h1>
            <p className="text-lg text-gray-600 mb-4">Booking ID: {id}</p>

            {/* Upcoming Rent Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Upcoming Rent</h2>
                    {!isEditing && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="text-themeColor hover:text-opacity-80"
                        >
                            <Edit2 className="w-5 h-5" />
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                                   <label htmlFor="due_date" className="block text-sm font-medium text-themeColor2li8">
                                    Coming Month Due Date
                                   </label>
                                   <Popover className="relative" >
                                     <Popover.Button className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                       <span className="flex items-center">
                                         <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                                         {upcomingRent?.due_date ? format(selectedDate, 'PPP') : 'Select a date'}
                                       </span>
                                     </Popover.Button>
                                     <Transition
                                       enter="transition duration-100 ease-out"
                                       enterFrom="transform scale-95 opacity-0"
                                       enterTo="transform scale-100 opacity-100"
                                       leave="transition duration-75 ease-out"
                                       leaveFrom="transform scale-100 opacity-100"
                                       leaveTo="transform scale-95 opacity-0"
                                     >
                                       <Popover.Panel className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5">
                                         <DayPicker
                                           mode="single"
                                           
                                           selected={selectedDate}
                                           onSelect={handleDateSelect}
                                           footer={false}
                                         />
                                       </Popover.Panel>
                                     </Transition>
                                   </Popover>
                                 </div>
                         <div className="space-y-2">
                                  <label htmlFor="amount" className="block text-sm font-medium text-themeColor2li8">
                                    Amount
                                  </label>
                                  <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <IndianRupee className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                      type="number"
                                      id="amount"
                                      name="amount"
                                      disabled={!isEditing}
                                      value={upcomingRent.amount}
                                      onChange={handleUpcomingRentChange}
                                      step="0.01"
                                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="0.00"
                                    />
                                  </div>
                                </div>  
                        
                         {/* Rent Method Field */}
  <div className="space-y-2">
    <label htmlFor="rent_method" className="block text-sm font-medium text-themeColor2li8">
      Rent Method
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Logs className="h-5 w-5 text-gray-400" />
      </div>
      <select
        id="rent_method"
        name="rent_method"
        value={upcomingRent.rent_method}
        onChange={handleUpcomingRentChange}
        disabled={!isEditing}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select a method</option>
        <option value="notificationsOnly">Notifications Only</option>
        <option value="rentThroughHostHunt">Rent Through HostHunt</option>
      </select>
    </div>
  </div>

                        <div className="space-y-2">
                                  <label htmlFor="notification_period" className="block text-sm font-medium text-themeColor2li8">
                                  Notification Period (days)                                  </label>
                                  <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <Bell className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                      type="number"
                                      id="notification_period"
                                      name="notification_period"
                                      value={upcomingRent.notification_period}
                                      onChange={handleUpcomingRentChange}
                                      disabled={!isEditing}
                                      step="0.01"
                                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="0.00"
                                    />
                                  </div>
                                </div>  
                       
                    </div>
                    {isEditing && (
<div className="mt-4 flex justify-end space-x-3">
    <button
        type="button"
        onClick={() => {
            setIsEditing(false);
            setError('');
            // Reset to the original state if required
            
        }}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
        Cancel
    </button>
    <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-themeColor hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
        Save Changes
    </button>
</div>
                        )}


                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className='flex justify-center pt-8 ' >
                    {upcomingRent.rent_method === 'notificationsOnly' && !isEditing && (
                        <button className='bg-green-400 px-8 py-2  rounded-md text-themeColor2li8'
                            
                        >
                            PAYMENT COMPLETED
                        </button>
                        )}

                </div>
            </div>

            {/* Rent History Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <h2 className="text-2xl font-semibold text-gray-800 p-6">Rent History</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rentHistory.map((rent) => (
                            <tr key={rent.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.due_date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{rent.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        rent.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {rent.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         </>
    )
}

export default NextRent_copy