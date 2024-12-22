import React, { useState } from 'react'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useLocation, useParams } from 'react-router'
import { NotificationsOnlySection, RentThroughHostHuntSection } from '../../../components/property_owner/bookings/rentmanagement/RentMethods'
import RentDetailsSection from '../../../components/property_owner/bookings/rentmanagement/RentDetailsForm';
import { createRentInstance } from '../../../features/Booking/BookingActions';
import NextRent_RentTransactions from '../../../components/property_owner/bookings/rentmanagement/NextRent_RentTransactions';


const HostRentManagementPage = () => {
    const { id } = useParams()
      const location = useLocation();
      const { monthly_rent } = location.state || {}
      const { is_rent } = location.state || {}
    const [rentDetails, setRentDetails] = useState({
        booking_id: id||'',
        due_date: '',
        amount: monthly_rent||'',
        rent_method:'',
        notification_period: 3
    })
    const [error, setError] = useState('')


    const handleRentMethod = (event) => {
        if (rentDetails.rent_method === event.target.value) {
            setRentDetails((prevDetails) => ({
                ...prevDetails,
                rent_method: '', 
            }));        }  
        else {
            // setRentMethod(event.target.value)
            setRentDetails((prevDetails) => ({
                ...prevDetails,
                rent_method: event.target.value,
            }));        }
            if (rentDetails.rent_method && rentDetails.due_date &&  rentDetails.notification_period) {
                setError('')
            }
    }

    const handleRentDetailsChange = (event) => {
        const { name, value } = event.target
        setRentDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
        if (rentDetails.rent_method && rentDetails.due_date &&  rentDetails.notification_period) {
            setError('')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // if (rentDetails.rent_method && rentDetails.due_date && rentDetails.amount && rentDetails.notification_period) {
        if (rentDetails.rent_method && rentDetails.due_date &&  rentDetails.notification_period) {
            setError('')
            console.log('Rent details:', rentDetails)
            createRentInstance(rentDetails)
        } else {
            setError('Please fill in all required fields')
        }
    }

    return (
        <div className="min-h-screen py-4">
            <div className="max-w-5xl mx-auto">
                <Breadcrumbs>
                    <BreadcrumbItem href="/host/bookings">Bookings</BreadcrumbItem>
                    <BreadcrumbItem href={`/host/bookings/${id}`}>Booking Details</BreadcrumbItem>
                    <BreadcrumbItem href="/host/bookings/">Rent Management</BreadcrumbItem>
                </Breadcrumbs>  
                {!is_rent ? (
                    <>
                    <h1 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Manage Rent Receiving Through HostHunt</h1>
    <p className="md:text-lg text-gray-600 mb-8">
      As a host, you can now manage monthly rent payments effortlessly with HostHunt's flexible options. 
      Choose the method that best suits your needs:
    </p>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Notifications Only Section */}
      <NotificationsOnlySection rentMethod={rentDetails.rent_method} onSelect={handleRentMethod} />

      {/* Rent Through HostHunt Section */}
      <RentThroughHostHuntSection rentMethod={rentDetails.rent_method} onSelect={handleRentMethod} />

      {/* Rent Details Section */}
      <RentDetailsSection rentDetails={rentDetails} handleRentDetailsChange={handleRentDetailsChange} />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-12 text-center">
        <p className="text-gray-700 mb-4">
          This feature will give you flexibility in rent management, allowing you to choose the method that fits 
          your preferences while ensuring smooth communication and timely payments.
        </p>
        <p className="text-gray-700 font-semibold mb-6">
          Stay in control with HostHunt, whether you handle rent offline or directly through the platform!
        </p>
        <button 
          type="submit" 
          className="bg-themeColor text-white px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-colors"
        >
          Save Rent Management Settings
        </button>
      </div>
    </form>
  </>
) : <NextRent_RentTransactions/>}

            </div>
        </div>
    )
}

export default HostRentManagementPage