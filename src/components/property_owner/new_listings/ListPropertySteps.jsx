import React, { useEffect, useState } from 'react';
import { FaCheck, FaLock, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import URLS from '../../../apis/urls';
import POHeader from '../partials/POHeader';

const stepsData = [
  { title: 'List and Verify Property', description: 'Submit your property documentation.', status: 'pending' },
  { title: 'Admin Review', description: 'Admin will review your documents.', status: 'locked' },
  { title: 'Onboarding', description: 'Complete your property details.', status: 'locked' },
  { title: 'Start Welcoming Guests', description: 'Your property is now live.', status: 'locked' },
];

const ListPropertySteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const propertyStatus = localStorage.getItem('property_status');

    switch (propertyStatus) {
      case 'in_progress':
        setCurrentStep(0);
        break;
      case 'in_review':
        setCurrentStep(1);
        break;
      case 'verified':
        setCurrentStep(2);
        break;
      case 'completed':
        setCurrentStep(3);
        break;
      default:
        setCurrentStep(0); // Default to first step if no status found
    }
  }, []);

  const handleNextStep = () => {
    
    if (currentStep < stepsData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getStatusIcon = (stepIndex) => {
    if (stepIndex < currentStep) {
      return <FaCheck className="text-green-500" />;
    } else if (stepIndex === currentStep) {
      return <FaSpinner className="text-blue-500 animate-spin" />;
    } else {
      return <FaLock className="text-gray-400" />;
    }
  };

  const getStatusClass = (stepIndex) => {
    if (stepIndex <= currentStep) {
      return 'text-black font-semibold';
    } else {
      return 'text-gray-400';
    }
  };




  return (
    <>
      <POHeader />
      <div className="flex flex-col items-center">
        <div className='flex items-center mt-14 mb-10'>
          <Link to="/host/listings" className="text-5xl font-medium text-gray-700">
            <span className="inline-block mr-2">&#8592;</span> 
          </Link>
          <h1 className="text-2xl font-bold">
            List Your Property - Step by Step
          </h1>
        </div>
        <div className="w-full max-w-3xl">
          {stepsData.map((step, index) => (
            <div
              key={index}
              className={`flex items-center mb-8 ${index > 0 ? 'mt-8' : ''} ${getStatusClass(index)}`}
            >
              {/* Step Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md">
                {getStatusIcon(index)}
              </div>

              <div className={`ml-4 flex-grow ${index > currentStep ? 'text-gray-400' : ''}`}>
                <h3 className="text-lg">{step.title}</h3>
                <p className="text-sm">{step.description}</p>
              </div>

              {index === currentStep && (
                <>
                  
                  {index === 0 ?
                  <Link  to='/host/new-listing/property-details'>
                    <button
                      className="bg-themeColor text-white font-bold py-2 px-4 rounded-lg ml-auto"
                      onClick={handleNextStep}
                      >
                      Verify Property
                    </button>
                    </Link>
                  : index === 1 ? '' 
                  : index === 2 ? 
                  <Link  to='/host/new-listing/onboarding_form'>
                     <button
                      className="bg-themeColor text-white font-bold py-2 px-4 rounded-lg ml-auto"
                      onClick={handleNextStep}
                      >
                     Complete Onboarding
                    </button>
                  </Link>
                :''}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListPropertySteps;
