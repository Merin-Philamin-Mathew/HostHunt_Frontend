    import React, { useState } from 'react'
    import { Bell, CreditCard, Calendar, AlertCircle, CheckCircle, DollarSign } from 'lucide-react'

    const RentManagement = () => {
    const [selectedOption, setSelectedOption] = useState('')
    const [notificationPeriod, setNotificationPeriod] = useState(3)
    const [error, setError] = useState('')

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const handleNotificationPeriodChange = (event) => {
        const value = event.target.value
        if (value === '' || (Number(value) >= 1 && Number(value) <= 30)) {
        setNotificationPeriod(value)
        setError('')
        } else {
        setError('Please enter a number between 1 and 30')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (selectedOption && notificationPeriod) {
        // Here you would typically send this data to your backend
        console.log('Selected option:', selectedOption)
        console.log('Notification period:', notificationPeriod)
        alert('Settings saved successfully!')
        } else {
        setError('Please select an option and set a valid notification period')
        }
    }

    return (
        <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Rent Receiving Through HostHunt</h1>
            <p className="text-lg text-gray-600 mb-8">
            As a host, you can now manage monthly rent payments effortlessly with HostHunt's flexible options. 
            Choose the method that best suits your needs:
            </p>

            <form onSubmit={handleSubmit} className="space-y-12">
            {/* Notifications Only Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                <input
                    type="radio"
                    id="notificationsOnly"
                    name="rentManagement"
                    value="notificationsOnly"
                    checked={selectedOption === 'notificationsOnly'}
                    onChange={handleOptionChange}
                    className="mr-2"
                />
                
                <h2 className="text-2xl font-semibold text-themeColor2li8 flex items-center">
                    <Bell className="mr-2" />
                    1) Notifications Only
                </h2>
                </div>
                <p className="text-gray-700 mb-4">
                Stay organized with automated rent reminders. Select this option to receive timely email notifications 
                about upcoming rent payments, without using online payment systems.
                </p>
                <div className="space-y-4">
                <div className="flex items-start">
                    <Calendar className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <div>
                    <h3 className="font-semibold text-gray-800">How it works:</h3>
                    <p className="text-gray-600">
                        HostHunt will send automatic reminders to both you and your tenants before the rent is due. 
                        These reminders will ensure that everyone is aware of the payment schedule.
                    </p>
                    </div>
                </div>
                <div className="flex items-start">
                    <AlertCircle className="text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                    <div>
                    <h3 className="font-semibold text-gray-800">No online transactions:</h3>
                    <p className="text-gray-600">
                        Rent payments can continue via traditional methods (cash, direct bank transfers, etc.). 
                        HostHunt will help you stay on top of payments, ensuring timely reminders for both parties.
                    </p>
                    </div>
                </div>
                </div>
            </section>

            {/* Rent Through HostHunt Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                <input
                    type="radio"
                    id="rentThroughHostHunt"
                    name="rentManagement"
                    value="rentThroughHostHunt"
                    checked={selectedOption === 'rentThroughHostHunt'}
                    onChange={handleOptionChange}
                    className="mr-2"
                />
                <h2 className="text-2xl font-semibold text-themeColor2li8 flex items-center">
                    <CreditCard className="mr-2" />
                    2) Rent Through HostHunt
                </h2>
                </div>
                <p className="text-gray-700 mb-4">
                Simplify rent collection with HostHunt's built-in payment system. This option allows you to manage 
                rent payments directly through the platform.
                </p>
                <div className="space-y-4">
                <div className="flex items-start">
                    <DollarSign className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <div>
                    <h3 className="font-semibold text-gray-800">How it works:</h3>
                    <p className="text-gray-600">
                        HostHunt will automatically send a payment link to your tenant before the rent is due. 
                        The tenant can pay directly through HostHunt's secure platform.
                    </p>
                    </div>
                </div>
                <div className="flex items-start">
                    <Bell className="text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                    <div>
                    <h3 className="font-semibold text-gray-800">Automated follow-up:</h3>
                    <p className="text-gray-600">
                        If the tenant doesn't make the payment by the due date, both you and the tenant will receive 
                        notifications reminding you about the pending payment. HostHunt will keep you informed so that 
                        no payments are missed, reducing the risk of late payments.
                    </p>
                    </div>
                </div>
                <div className="flex items-start">
                    <CheckCircle className="text-blue-500 mr-2 flex-shrink-0 mt-1" />
                    <div>
                    <h3 className="font-semibold text-gray-800">Track your payments:</h3>
                    <p className="text-gray-600">
                        HostHunt will help you track rent payments in real-time, providing status updates on all payments 
                        through the dashboard. If a payment is overdue, HostHunt will send additional alerts to ensure 
                        timely follow-up.
                    </p>
                    </div>
                </div>
                </div>
            </section>

            {/* Notification Period Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                <Bell className="mr-2" />
                Set Notification Period
                </h2>
                <p className="text-gray-700 mb-4">
                Choose how many days before the rent due date you want to receive notifications:
                </p>
                <div className="flex items-center">
                <input
                    type="number"
                    id="notificationPeriod"
                    value={notificationPeriod}
                    onChange={handleNotificationPeriodChange}
                    min="1"
                    max="30"
                    className="border rounded-md px-3 py-2 w-20 mr-2"
                />
                <label htmlFor="notificationPeriod" className="text-gray-600">days before rent is due</label>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </section>

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
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                Save Rent Management Settings
                </button>
            </div>
            </form>
        </div>
        </div>
    )
    }

    export default RentManagement