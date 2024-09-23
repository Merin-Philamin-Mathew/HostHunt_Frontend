import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../redux/userSlice';

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const go_to_signup = ()=> navigate('/signup')

  const login = useGoogleLogin({
    onSuccess: async  tokenResponse => {
      console.log(tokenResponse)
      const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
      const userData = await userInfo.json();
      const data = {
        'name':userData.name,
        'email':userData.email
      }
    
      api.post('/user/google-login/', data).then(res=>{
        console.log('blass');
        
        console.log('login data',res.data);
        const {access, refresh} = res.data;
        localStorage.setItem('access_token',access)
        localStorage.setItem('refresh_token',refresh)
          navigate('/')
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

  // Formik hook to handle form state and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required')
    }),
    onSubmit: (values) => {
      console.log('submiting login form',values);

        api.post('/user/login/',values).then(res=>{
          console.log('blass');
          
          console.log('login data',res.data);
          const {access, refresh,data} = res.data;
          console.log("lllll",data,access,refresh)
          localStorage.setItem('access_token',access)
          localStorage.setItem('refresh_token',refresh)
          localStorage.setItem('user_data',JSON.stringify(data))
          dispatch(setUserDetails(JSON.stringify(data)))
            navigate('/')
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
    <div className="bg-black bg-opacity-80 rounded-2xl p-16 shadow-md w-full max-w-md mx-auto">
      <h2 className="text-white text-4xl font-bold mb-4">Welcome!</h2>
      <p className="text-gray-400 text-sm mb-6">Get a new cot or stay connected—log in to explore your options!</p>

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

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full px-4 py-2 rounded-full bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
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

        <div className="flex items-center justify-center mt-4">
          <div className="h-px bg-gray-600 w-full"></div>
          <span className="mx-2 text-gray-400">or</span>
          <div className="h-px bg-gray-600 w-full"></div>
        </div>

        <button
          type="button"
          onClick={() => login()}
          className="w-full bg-white text-black font-semibold py-2 px-4 rounded-full flex items-center justify-center mt-4"
        >
          <img src="\icons\icons8-google.svg" alt="Google" className="w-6 h-6 mr-2" />
          Continue with Google
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-4 text-center">
        Don’t Have an Account? <Link onClick={go_to_signup} className="text-blue-400">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
