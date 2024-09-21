import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../../axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';

const OTPVerificationForm = ({ onSubmit }) => {

  const location = useLocation();
  const registered_data = location.state

  const navigate = useNavigate()

  const [timer, setTimer] = useState(300); // 5-minute timer
  const [isResendAvailable, setResendAvailable] = useState(false);
  
  // Create an array of refs for each OTP input
  const inputRefs = Array(6).fill().map(() => useRef(null));

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendAvailable(true);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const formik = useFormik({
    initialValues: {
      otp: ['', '', '', '', '', ''], // 6-digit OTP fields
    },
    validationSchema: Yup.object({
      otp: Yup.array().of(
        Yup.string()
          .matches(/^[0-9]$/, 'Must be a number')
          .required('OTP is required')
      ),
    }),
    onSubmit:async (values) => {
      const otpCode = values.otp.join('');
      try{
        const response = await api.post(`/user/otp-verification`, { 'otp':otpCode , 'registered_data':registered_data});
        console.log('22222222222222222222');
        
        console.log("Response data:", response.data);
        navigate('/login')
        toast.success('Registration successful! Please log in to continue.')
      }
      catch(error){
        console.log("Error:", error);
        toast.error('Invalid OTP. Please try again.')
      }
    },
  });

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    
    if (/^\d$/.test(value) || value === '') {
      formik.setFieldValue(`otp[${index}]`, value);

      // If input is not empty, move to the next input
      if (value && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace to move back to the previous input
    if (e.key === 'Backspace' && formik.values.otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const resendOTP = () => {
    // Logic for resending OTP
    setTimer(300);
    setResendAvailable(false);
    // Call API to resend OTP
  };

  return (
    <div className="bg-black bg-opacity-75 rounded-2xl p-8 shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-white text-3xl font-bold mb-4">Check your email!</h2>
      <p className="text-gray-300  mb-8 ">We have sent an OTP to your email. Enter the OTP below to verify your account.</p>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-center space-x-2 mb-6">
          {formik.values.otp.map((_, index) => (
            <input
              key={index}
              ref={inputRefs[index]} // Add ref to each input
              type="text"
              maxLength="1"
              name={`otp[${index}]`}
              className="w-12 h-12 text-center text-xl rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onBlur={formik.handleBlur}
              value={formik.values.otp[index]}
            />
          ))}
        </div>
        {formik.errors.otp && formik.touched.otp && (
          <div className="text-red-500 text-sm mb-4">Invalid OTP</div>
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          disabled={timer <= 0}
        >
          Verify and Signup
        </button>

        <p className="text-gray-300 text-sm mt-4 text-center">
          Didn't receive the OTP?{' '}
          <button
            type="button"
            onClick={resendOTP}
            className={`text-blue-400 ${!isResendAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isResendAvailable}
          >
            Resend OTP
          </button>
        </p>

        <div className="text-center text-gray-300 mt-4">
          <span>Time remaining: {formatTime(timer)}</span>
        </div>
      </form>
    </div>
  );
};

export default OTPVerificationForm;
