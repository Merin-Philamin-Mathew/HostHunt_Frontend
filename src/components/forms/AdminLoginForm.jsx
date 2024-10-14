import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { api, owner_api } from '../../apis/axios';
import URLS from '../../apis/urls';
import { toast } from 'react-toastify';

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const AdminLoginForm = () => {
  // Submit handler
  const handleSubmit = async (values) => {
    console.log('Form Values:', values);
    try {
        const admindata = await api.post(URLS.AUTHENTICATION['login'], { ...values, user_type: 'admin' });
        console.log(admindata.data);
        toast.success('Admin logged in successfully!');
        
    } catch (e) {
        if (e.response) {
            const { status } = e.response;
            if (status === 403) {
                toast.error('Access Denied: User is not an admin.');
            } else if (status === 404) {
                toast.error('User not found.');
            } else if (status === 401) {
                toast.error('Incorrect password.');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } else {
            toast.error('An unexpected error occurred. Please try again later.');
        }
    }}
    

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
