// import { Outlet } from 'react-router-dom';
import { Outlet } from 'react-router';
import OTPVerificationForm from '../components/forms/property-owner/OTPVerificationForm';
import Home from '../pages/users/Home';
import LoginPage from '../pages/users/LoginPage';
import RegisterPage from '../pages/users/RegisterPage';
import AuthOutlet from '../components/property_owner/partials/AuthOutlet';
import LoginForm from '../components/forms/property-owner/LoginForm';
import RegistrationForm from '../components/forms/property-owner/RegistrationForm';


let const_data = {

    REACT_ROUTER_PATH: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "/signup",
            element: <RegisterPage/>
        },
        {
            path: "/otp-verification",
            element: <OTPVerificationForm/>
        },
        {
            path: "/admin",
            element: <></>
        },
        {
            path: "/admin/login",
            element: <></>
        },
        {
            path: "/property-owner",
            element: <AuthOutlet><Outlet/></AuthOutlet>,
            children: [
                {
                    path: "/property-owner/login",
                    element: <LoginForm/>
                },
                {
                    path: "/property-owner/signup",
                    element: <RegistrationForm/>
                },
                {
                    path: "/property-owner/otp-verification",
                    element: <OTPVerificationForm/>
                },
            ]
        }
        // {
        //     path: "/admin/student",
        //     element: <><Container><Outlet /></Container></>,
        //     children: [
        //         {
        //             path: "/admin/student/add",
        //             element: <></>
        //         }
        //     ]
        // }
  
    ],
}


export default const_data 