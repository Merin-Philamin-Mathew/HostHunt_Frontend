import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { format } from 'date-fns'
import { Calendar, IndianRupee, Bell, Edit2, Check } from 'lucide-react'
import { createRentInstance, fetchPaid_OverdueRent, fetchUpcomingRent, ownerPaymentConfirmationAction } from '../../../../features/Booking/BookingActions'
import { useSelector } from 'react-redux'
import UserPaymentButton from '@/components/bookings/UserPaymentButton'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import ConfirmationModal from '@/components/utils/modals/ConfirmationModal'; // Import the new modal component

const NextRent_RentTransactions = () => {
    const key = import.meta.env.VITE_STRIPE_PUBLISH_KEY
    const stripePromise = loadStripe(key);

    const { id } = useParams()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user);
    const [isOwner, setIsOwner] = useState(false)
    const [userPayment, setUserPayment] = useState(false)
    const location = useLocation();
    const { monthly_rent } = location.state || {}
    const [upcomingRent, setUpcomingRent] = useState({
        booking_id: id || '',
        due_date: '',
        amount: monthly_rent || '',
        rent_method: '',
        notification_period: '',
        status: 'pending'
    })
    const [isEditing, setIsEditing] = useState(false)
    const [rentHistory, setRentHistory] = useState([])
    const [error, setError] = useState('')
    
    // State for the confirmation modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalConfig, setModalConfig] = useState({
        title: '',
        message: '',
        onConfirm: () => {},
        confirmButtonText: '',
        confirmButtonColor: ''
    })
    const fetchData = async () => {
        try {
            const paid_overdue_response = await fetchPaid_OverdueRent(id)

            const upcomingRentResponse = await fetchUpcomingRent(id);
            console.log(paid_overdue_response,'paid or overdue response');
            if (paid_overdue_response){
                setRentHistory(paid_overdue_response)
            }
            if (upcomingRentResponse) {
                setUpcomingRent(upcomingRentResponse); // Ensure the response matches the state structure
                setIsOwner(user?.data?.email===upcomingRentResponse.host_email)
                console.log('host email same',user?.data?.email===upcomingRentResponse.host_email);
                
            }
        } catch (error) {
            console.error("Error fetching upcoming rent:", error);
        }
    };
    useEffect(() => {
        setRentHistory([])
        fetchData();
    }, [])

    const handleUpcomingRentChange = (event) => {
        const { name, value } = event.target
        setUpcomingRent(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    useEffect(() => {
        if (!isOwner && upcomingRent.due_date) {
            // Calculate the date with the notification period
            const notificationDate = new Date(new Date(upcomingRent.due_date).setDate(new Date(upcomingRent.due_date).getDate() - upcomingRent.notification_period));
            const today = new Date();
            today.setHours(0, 0, 0, 0); 

            if (notificationDate <= today) {
                setUserPayment(true);
            } else {
                setUserPayment(false);
            }
        } else {
            setUserPayment(false);
        }
    }, [isOwner, upcomingRent.due_date, upcomingRent.notification_period]);
    
    const handleRentUpdation = (event) => {
        event.preventDefault();
        if (upcomingRent.rent_method && upcomingRent.due_date && upcomingRent.amount && upcomingRent.notification_period) {
            const updatedRentDetails = {
                ...upcomingRent,
                booking_id: id, // Add booking ID dynamically
            };
            console.log('Upcoming rent details:', updatedRentDetails);
            // Submit updated rent details here
            createRentInstance(updatedRentDetails);
            setIsEditing(false);
            setError('');
        } else {
            setError('Please fill in all required fields');
        }
    };

    // Handler for owner to confirm payment completed
    const handleOwnerConfirmation =  () => {
        // Configure and open the modal
        setModalConfig({
            title: "Confirm Payment Status",
            message: "Are you sure you want to mark this payment as completed? This action cannot be undone.",
            confirmButtonText: "Yes, Mark as Completed",
            confirmButtonColor: "bg-green-500 hover:bg-green-600",
            onConfirm: confirmPaymentCompleted
        });
        setIsModalOpen(true);
    };

    // Function that actually handles the payment confirmation after modal confirmation
    const confirmPaymentCompleted = async () => {
        try {
            const response = await ownerPaymentConfirmationAction(upcomingRent.id)
            if (response == 'OK'){
                fetchData();
                navigate(`/account/my-stays/${id}/monthly-rent?paymentSuccess=true`)
            }
            // Add the payment to history
            setRentHistory(prev => [
                {
                    id: upcomingRent.id,
                    due_date: upcomingRent.due_date,
                    amount: upcomingRent.amount,
                    status: 'paid'
                },
                ...prev
            ]);
            
            // Close the modal
            setIsModalOpen(false);
            
        } catch (error) {
            console.error("Error updating payment status:", error);
            setError("Failed to update payment status. Please try again.");
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Rent Management</h1>
            <p className="text-lg text-gray-600 mb-4">Booking ID: {id}</p>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={modalConfig.onConfirm}
                title={modalConfig.title}
                message={modalConfig.message}
                confirmButtonText={modalConfig.confirmButtonText}
                confirmButtonColor={modalConfig.confirmButtonColor}
            />

            {/* Upcoming Rent Card */}
            <div className="bg-white rounded-lg shadow-medium p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2   className={`text-2xl font-semibold ${
                        upcomingRent.status === 'overdue' ? 'text-red-600' : 'text-gray-800'
                    }`}
                    >
                    {upcomingRent.status === 'overdue' ? 'Overdue Rent' : 'Upcoming Rent'}
                    </h2>
                    {!isEditing && isOwner && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="text-themeColor hover:text-opacity-80"
                        >
                            <Edit2 className="w-5 h-5" />
                        </button>
                    )}
                </div>
                <form onSubmit={handleRentUpdation}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Due Date</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="date"
                                    name="due_date"
                                    value={upcomingRent.due_date}
                                    onChange={handleUpcomingRentChange}
                                    disabled={!isEditing || !isOwner}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Amount</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <IndianRupee className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="amount"
                                    value={upcomingRent.amount}
                                    onChange={handleUpcomingRentChange}
                                    disabled={!isEditing || !isOwner}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rent Method</label>
                            <select
                                name="rent_method"
                                value={upcomingRent.rent_method}
                                onChange={handleUpcomingRentChange}
                                disabled={!isEditing || !isOwner}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">Select a method</option>
                                <option value="notificationsOnly">Notifications Only</option>
                                <option value="rentThroughHostHunt">Rent Through HostHunt</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Notification Period (days)</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Bell className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="notification_period"
                                    value={upcomingRent.notification_period}
                                    onChange={handleUpcomingRentChange}
                                    disabled={!isEditing || !isOwner}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                    {isOwner && isEditing && (
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
                <div className='flex justify-center pt-8 font-semibold' >
                    {isOwner && upcomingRent.rent_method === 'notificationsOnly' && !isEditing && (
                        <button 
                            className='bg-green-400 px-8 py-2 rounded-md text-themeColor2li8 hover:bg-green-500 transition-colors'
                            onClick={handleOwnerConfirmation}
                        >
                            PAYMENT COMPLETED
                        </button>
                    )}

                    {userPayment && upcomingRent.rent_method == 'rentThroughHostHunt' &&
                        <Elements stripe={stripePromise}>
                            <UserPaymentButton id={upcomingRent.id} amount={upcomingRent.amount} stripePromise={stripePromise}/>
                        </Elements>
                    }
                </div>
            </div>

            {/* Rent History Table */}
            <div className="bg-white rounded-lg shadow-medium overflow-hidden">
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

export default NextRent_RentTransactions