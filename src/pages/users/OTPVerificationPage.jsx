import React from 'react';
import OTPVerificationForm from '../../components/forms/users/OTPVerificationForm';

const OTPVerificationPage = () => {
  const handleOTPSubmit = (otpCode) => {
    console.log(`Submitted OTP: ${otpCode}`);
    // Logic to validate OTP, such as making an API call
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url('/users/login_bg.jpg')" }} // Replace with your image
    >
      <div className="bg-black bg-opacity-65 w-full h-full absolute top-0 left-0 z-0"></div>
      <div className='z-10'>
      <OTPVerificationForm  onSubmit={handleOTPSubmit} />
      </div>
      
    </div>
  );
};

export default OTPVerificationPage;
