import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import URLS from '../../apis/urls';
import { api } from '../../apis/axios';
import { LogForm_Data } from './data';
import { setownerDetails } from '../../redux/ownerSlice';


const POLoginForm = ({user_type='property_owner'}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const go_to_signup = ()=> navigate('/host/signup')


  // Formik hook to handle form state and validation
  const formik = useFormik({
    initialValues: LogForm_Data.INITIAL_VALUES,
    validationSchema: LogForm_Data.VALIDATION_SCHEMA,
    onSubmit: (values) => {
      console.log('submiting login form',values);

        api.post(URLS.AUTHENTICATION['login'],{...values, user_type:user_type}).then(res=>{
          console.log('blass');
          
          console.log('login data',res.data);
          const data = res.data;
          // const {access, refresh,data} = res.data;
          // console.log("lllll",data,access,refresh)
          dispatch(setownerDetails(data))
          navigate('/host/dashboard')
          })
          .catch(error=>{
            console.log(error.response.data, 'error');

            if (error.response && error.response.data && error.response.data.error) {
              setmainError(error.response.data.error); // Display the error message (email or password error)
              toast.error(error.reponse.data)
            } else {
              setmainError('An unknown error occurred. Please try again.');
            }
          })
      
    }
  });

  return (
    <div className="bg-[#4d6681ba] bg-opacity-80 rounded-2xl p-16 shadow-md w-full max-w-md mx-auto">
      <h2 className="text-white text-4xl font-bold mb-4">Welcome  to HostHunt!</h2>
      <p className="text-gray-300 text-sm mb-6">Sign in to manage your property!</p>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
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
            placeholder="Enter Password"
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

        <div className="flex justify-end items-center mb-6">
          <a href="#" className="text-blue-400 text-sm">Forgot Password?</a>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Continue with email
        </button>


      </form>

      <p className="text-gray-300 text-sm mt-4 text-center">
        Don’t Have an Account? <Link onClick={go_to_signup} className="text-blue-400">Create a property Account</Link>
      </p>
    </div>
  );
};

export default POLoginForm;
