import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { adminLogin } from '../../redux/admin/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAdminActions } from '../../redux/admin/adminSlice';
import { toast } from 'react-toastify';

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});


const AdminLoginForm = () => {

  
const dispatch = useDispatch()
const {adminAToken,error,message,loading} = useSelector(state=>state.admin)
const navigate = useNavigate()

useEffect(()=>{
  console.log('adminLOGFORM useEffect');
  if(adminAToken){
    console.log('adminatoken',adminAToken);
    navigate('/admin/dashboard',{replace:true})
    return
  }
  if(message){
    console.log('message',message);
    toast.success(message)
    dispatch(resetAdminActions())
    return
  }
  if(error){
    console.log('error',error);
  }
},[adminAToken,error,message])


  // Submit handler
  const handleSubmit =  (values) => {
    console.log('Form Values...:', values);
    const user_type = 'admin'
    dispatch(adminLogin({...values,user_type}))
    }
    

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}

    >
      {({ isSubmitting }) => (
        <Form className="space-y-6 m-3 p-5 ">
          <div>
            <label className="block text-sm font-medium text-gray-400">Enter your email address</label>
            <Field
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              placeholder="email address"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Enter your Password</label>
            <Field
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AdminLoginForm;
