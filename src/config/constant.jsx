// import { Outlet } from 'react-router-dom';
import OTPVerificationForm from '../components/forms/OTPVerificationForm';
import Home from '../pages/users/Home';
import LoginPage from '../pages/users/LoginPage';
import OTPVerificationPage from '../pages/users/OTPVerificationPage';
import RegisterPage from '../pages/users/RegisterPage';


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
            element: <OTPVerificationPage/>
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
            path: "/signup",
            element: <></>
        },
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
    PATH: [
       
    ]
}


export default const_data 