import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import NextRent_RentTransactions from '@/components/property_owner/bookings/rentmanagement/NextRent_RentTransactions';
import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { CheckCircle } from 'lucide-react';

const RentManagementPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentSuccess = searchParams.get('paymentSuccess');
    
    if (paymentSuccess === 'true') {
      setIsSuccessModalOpen(true);
      
      const timer = setTimeout(() => {
        setIsSuccessModalOpen(false);
        // Clean up URL without refreshing the page
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }, 3000);

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [location.search]);

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <Breadcrumbs>
            <BreadcrumbItem href="/account/">Account</BreadcrumbItem>
            <BreadcrumbItem href="/account/my-stays">My Stays</BreadcrumbItem>
            <BreadcrumbItem href={`/account/my-stays/${id}`}>Stay Details</BreadcrumbItem>
            <BreadcrumbItem href={`/account/my-stays/${id}/monthly-rent`}>
              Rent Management
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <Modal 
          isOpen={isSuccessModalOpen} 
          onClose={() => setIsSuccessModalOpen(false)}
          size="sm"
          className="bg-white rounded-lg"
        >
          <ModalContent>
            <ModalBody className="py-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-gray-600">
                  Your rent payment was successfully processed.
                </p>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>

        <NextRent_RentTransactions />
      </div>
  );
};

export default RentManagementPage;