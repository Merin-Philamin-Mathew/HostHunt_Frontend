import React from 'react';
import OTPVerificationForm from '../../components/forms/OTPVerificationForm';
const OTPVerificationPage = () => {
  const props = {
    user_type : 'user'
  }
  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url('/users/login_bg.jpg')" }} // Replace with your image
    >
      <div className="bg-black bg-opacity-65 w-full h-full absolute top-0 left-0 z-0"></div>
      <div className='z-10'>
      <OTPVerificationForm {...props}/>
      </div>
      
    </div>
  );
};

export default OTPVerificationPage;
