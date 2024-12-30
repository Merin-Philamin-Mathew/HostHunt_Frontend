import React, { useState, useEffect } from 'react'
import { Calendar, Bell, IndianRupee, FileDigit, ListOrdered } from 'lucide-react'
import { Popover, Transition } from '@headlessui/react'
import { format, addMonths, startOfMonth } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

const RentDetailsSection = ({ rentDetails, handleRentDetailsChange }) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    // Set default date to the 1st of next month
    const nextMonthFirstDay = startOfMonth(addMonths(new Date(), 1))
    return nextMonthFirstDay
  })

  useEffect(() => {
    handleRentDetailsChange({
      target: {
        name: 'due_date',
        value: format(selectedDate, 'yyyy-MM-dd')
      }
    })
  }, [])

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    handleRentDetailsChange({
      target: {
        name: 'due_date',
        value: format(date, 'yyyy-MM-dd')
      }
    })
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="md:text-2xl font-semibold text-themeColor2li8 mb-6 flex items-center">
        Rent Details
      </h2>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="booking_id" className="block text-sm font-medium text-themeColor2li8">
            Booking ID
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ListOrdered className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="booking_id"
              name="booking_id"
              value={rentDetails.booking_id}
              disabled
              
              step="0.01"
              className="block w-full pl-10 pr-3 py-2 border bg-gray-100 text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={rentDetails.booking_id}
            />
          </div>
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
              value={rentDetails.amount}
              onChange={handleRentDetailsChange}
              step="0.01"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>  
          <div className="space-y-2">
            <label htmlFor="due_date" className="block text-sm font-medium text-themeColor2li8">
             Coming Month Due Date
            </label>
            <Popover className="relative">
              <Popover.Button className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <span className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                  {selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}
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
            <label htmlFor="notification_period" className="block text-sm font-medium text-themeColor2li8">
              Notification Period (days)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Bell className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="notification_period"
                name="notification_period"
                value={rentDetails.notification_period}
                onChange={handleRentDetailsChange}
                min="1"
                max="30"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
  
        </div>
      </div>
    </section>
  )
}

export default RentDetailsSection