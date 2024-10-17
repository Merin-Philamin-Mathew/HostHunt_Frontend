import React from 'react';
import AdminLoginForm from '../../../components/forms/AdminLoginForm';

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center" style={{ backgroundColor: '#00172c' }}>
      <div className="flex flex-col items-center">
        <img src="/logo/white_inner_shadowed.png" alt="Logo" className="mb-14 w-14"  /> {/* Add logo here */}
        <h2 className="text-3xl font-bold mb-6 text-gray-100">Admin Login</h2>
      </div>
      <div className="bg-[#0d2137] p-8 rounded-3xl shadow-md w-full max-w-md">
        <AdminLoginForm /> {/* Use the Formik LoginForm component */}
      </div>
    </div>
  );
};

export default AdminLogin;
