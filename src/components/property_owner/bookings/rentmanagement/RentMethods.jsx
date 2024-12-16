import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bell, Calendar, AlertCircle, ChevronDown } from 'lucide-react'
import { Checkbox } from '@nextui-org/react'
import { CreditCard, DollarSign, CheckCircle } from 'lucide-react';

export const  NotificationsOnlySection = ({ rentMethod, onSelect }) => {
  return (
    <Disclosure as="div" className="bg-white rounded-lg shadow-md">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center justify-between w-full px-6 py-4 text-left focus:outline-none">
            <div className="flex items-center">
              <Checkbox
                id="notificationsOnly"

                isSelected={rentMethod === 'notificationsOnly'}
                value={'notificationsOnly'}
                onChange={onSelect}
                className="mr-4 h-5 w-5"
              />
              <h2 className="md:text-2xl font-semibold text-themeColor2li8 flex items-center">
                <Bell className="mr-2" />
                1. Notifications Only
              </h2>
            </div>
            <ChevronDown
              className={`${
                open ? 'transform rotate-180' : ''
              } w-5 h-5 text-themeColor2li8`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-6 pb-4">
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
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}



export const RentThroughHostHuntSection = ({ rentMethod, onSelect }) => {
  return (
    <Disclosure as="div" className="bg-white rounded-lg shadow-md">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center justify-between w-full px-6 py-4 text-left focus:outline-none">
            <div className="flex items-center">
            <Checkbox
                id="notificationsOnly"
                isSelected={rentMethod === 'rentThroughHostHunt'}
                value={'rentThroughHostHunt'}
                onChange={onSelect}
                className="mr-4 h-5 w-5"
              />
              <h2 className="md:text-2xl font-semibold text-themeColor2li8 flex items-center">
                <CreditCard className="mr-2" />
                2. Rent Through HostHunt
              </h2>
            </div>
            <ChevronDown
              className={`${
                open ? 'transform rotate-180' : ''
              } w-5 h-5 text-themeColor2li8`}
            />
          </Disclosure.Button>

          <Disclosure.Panel className="px-6 pb-4">
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
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
