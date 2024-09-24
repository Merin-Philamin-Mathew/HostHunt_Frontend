import React, { useState } from 'react';
import { toast } from 'react-toastify'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate} from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 
import { api } from '../../../apis/axios';
import { RegForm_Data } from '../data';


const RegistrationForm = () => {    

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    // navigate
    const go_to_PO_login = ()=> navigate('/property-owner/login')

  const formik = useFormik({
    initialValues: RegForm_Data.INITIAL_VALUES,
    validationSchema: RegForm_Data.VALIDATION_SCHEMA,
    onSubmit: async (values) => {
      try {
        const response = await api.post(`/user/signup`, { values });
        console.log("Response data:", response.data);

        if (response.data['email']) {
            toast.error(response.data['email']);
        } else {
            console.log(response.data['data']);
            
            toast.success('OTP sent to your email');
            navigate('/otp-verification',{state:response.data['data']});
        }
    } catch (error) {
          console.log("Error:", error);
        toast.error('An error occurred. Please try again.');
    }
    },
  });
1
  return (
    <div className="bg-[#4d6681ba] bg-opacity-80 rounded-2xl p-16 shadow-md w-full max-w-md mx-auto">
      <h2 className="text-white text-3xl font-bold mb-4">Sign Up to HostHunt!</h2>
      <p className="text-gray-400 mb-6 text-sm">Sign up to agree to the use of your information.</p>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-full bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Name}
          />
          {formik.touched.Name && formik.errors.Name ? (
            <div className="text-red-500 text-sm">{formik.errors.Name}</div>
          ) : null}
        </div>
        {/* <div className="mb-4">
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            className="w-full px-4 py-2 rounded-full bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dob}
          />
          {formik.touched.dob && formik.errors.dob ? (
            <div className="text-red-500 text-sm">{formik.errors.dob}</div>
          ) : null}
        </div>  */}

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-full bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4 relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-full bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
      />
      <span onClick={togglePasswordVisibility} className="absolute right-3 top-3 cursor-pointer">
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </span>
      {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
      ) : null}
  </div>

  <div className="mb-4 relative">
      <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 rounded-full bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
      />
      <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-3 cursor-pointer">
          {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </span>
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
      ) : null}
  </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Register
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already Have An Account? <Link onClick={go_to_PO_login} className="text-blue-400">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
