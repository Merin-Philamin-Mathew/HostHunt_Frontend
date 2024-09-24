// LoginPage.js
import React from 'react';
import LoginForm from '../../components/forms/users/LoginForm';

const LoginPage = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/users/login_bg.jpg')"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-65  z-0"></div>
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
