import { Outlet } from 'react-router';
import Home from '../pages/users/Home';

import AuthOutlet from '../components/Layouts/AuthOutlet';
import LoginPage from '../pages/users/LoginPage';
import POLoginForm from '../components/forms/POLoginForm';
import RegisterPage from '../pages/users/RegisterPage';
import RegistrationForm from '../components/forms/RegistrationForm';
import OTPVerificationPage from '../pages/users/OTPVerificationPage';
import OTPVerificationForm from '../components/forms/OTPVerificationForm';


import DashboardLayout from '../components/Layouts/DashboardLayout';
import PODashboard from '../components/property_owner/PODashboard';
import POManageListings from '../components/property_owner/POMangeListings';
import POReviews from '../components/property_owner/POReviews';
import POMessages from '../components/property_owner/POMessages';
import POBookings from '../components/property_owner/POBookings';
import PONotifications from '../components/property_owner/PONotifications';


import ListPropertySteps from '../components/property_owner/new_listings/ListPropertySteps';
import PropertyLayout from '../components/Layouts/PropertyLayout';
import PropertyDetailsForm from '../components/property_owner/new_listings/PropertyDetailsForm';
import DocumentsForm from '../components/property_owner/new_listings/DocumentsForm';
import PoliciesServicesForm from '../components/property_owner/new_listings/PoliciesServicesForm';
import ReviewAndSubmit from '../components/property_owner/new_listings/ReviewAndSubmit';


import AdminLogin from '../pages/admin/AdminLogin';
import AdminLayout from '../components/Layouts/AdminLayout';
import PropertyList from '../pages/admin/PropertyList';
import ProtectedRoute from './ProtectedRoute';

let const_data = {
    REACT_ROUTER_PATH: [
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // USER SIDE AND AUTHENTICATION PATHS
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
            element: <OTPVerificationPage/>},
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // OWNER SIDE PATHS
        {
            path: "/host",
            element: <AuthOutlet><Outlet/></AuthOutlet>,
            children: [
                {path: "/host/login",element: <POLoginForm/>},
                {path: "/host/signup",element: <RegistrationForm />},
                {path: "/host/otp-verification",element: <OTPVerificationForm/>},
            ]
        },
        {
            path: 'host/new-listing',
            element: <ProtectedRoute roleRequired={'user'}>
                <ListPropertySteps/>
                </ProtectedRoute>
        },
        {
            path: `host`,
            element: <ProtectedRoute>
                <DashboardLayout><Outlet/></DashboardLayout>
                    </ProtectedRoute>,
            children: [
                {path: "/host/dashboard",element: <PODashboard/>},
                {path: "/host/listings",element: <POManageListings/> },
                {path: "/host/reviews",element: <POReviews/> },
                {path: "/host/messages",element: <POMessages/> },
                {path: "/host/notifications",element: <PONotifications/> },
                {path: "/host/bookings",element: <POBookings/> },
            ]
        },
        {
            path: "host/new-listing",
            element:<ProtectedRoute roleRequired={'user'}>
                <PropertyLayout><Outlet/></PropertyLayout>
                    </ProtectedRoute> ,
            children: [
                { path: "property-details", element: <PropertyDetailsForm/>},
                { path: "documents", element: <DocumentsForm/>},
                { path: "policies&services", element: <PoliciesServicesForm/>},
                { path: "facilities", element: <></>},
                { path: "finish", element: <ReviewAndSubmit/> }
            ]
        },
        {
            path: "host/",
            element: <AuthOutlet><POLoginForm/></AuthOutlet>
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // ADMIN SIDE PATHS
        {
            path: "/admin/login",
            element: <AdminLogin/>
        },
        {
            path: "/admin/",
            element: <AdminLogin/>
        },
        {
            path: "/admin",
            element: <ProtectedRoute roleRequired={'admin'}>
                <AdminLayout><Outlet/></AdminLayout>
                    </ProtectedRoute>,
            children: [
                {path: "/admin/dashboard",element: <PropertyList></PropertyList>},
                {path: "/admin/bookings",element: <></>},
                {path: "/admin/properties",element: <PropertyList/>},
                {path: "/admin/users",element: <></>}
            ]
        },
    ],
}

export default const_data 