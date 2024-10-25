import { Outlet } from 'react-router';
import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/users/Home';

import AuthOutlet from '../components/Layouts/AuthOutlet';
import LoginPage from '../pages/users/LoginPage';
import POLoginForm from '../components/forms/POLoginForm';
import RegisterPage from '../pages/users/RegisterPage';
import RegistrationForm from '../components/forms/RegistrationForm';
import OTPVerificationPage from '../pages/users/OTPVerificationPage';
import OTPVerificationForm from '../components/forms/OTPVerificationForm';


import OwnerDashboardLayout from '../components/Layouts/Owner/OwnerDashboardLayout';
import PODashboard from '../components/property_owner/PODashboard';
import POManageListings from '../components/property_owner/POMangeListings';
import POReviews from '../components/property_owner/POReviews';
import POMessages from '../components/property_owner/POMessages';
import POBookings from '../components/property_owner/POBookings';
import PONotifications from '../components/property_owner/PONotifications';


import NewListingLayout from '../components/Layouts/Owner/property/NewListingLayout';
import ListPropertySteps from '../components/property_owner/new_listings/ListPropertySteps';
import PropertyDetailsForm from '../components/property_owner/new_listings/PropertyDetailsForm';
import DocumentsForm from '../components/property_owner/new_listings/DocumentsForm';
import PoliciesServicesForm from '../components/property_owner/new_listings/PoliciesServicesForm';
import ReviewAndSubmit from '../components/property_owner/new_listings/ReviewAndSubmit';

import PropertyOnboardingLayout from '../components/Layouts/Owner/property/PropertyOnboardingLayout';
import RentalAppartmentForm from '../components/property_owner/onboardinag/RentalAppartmentForm';
import AddingRoomPage from '../pages/property_owner/onboarding.jsx/AddingRoomPage';

import AdminOutlet from '../components/Layouts/admin/AdminLayout';
import AdminLogin from '../pages/admin/Login/AdminLogin';
import PropertyList from '../pages/admin/Properties/PropertyListPage';
import ReviewPropertyDetailedPageAdminSide from '../pages/admin/Properties/ReviewPropertyDetailPageAdmin';
import UserListingPage from '../pages/admin/Users/UsersListingPage';
import OwnerListPage from '../pages/admin/owners/OwnerListPage';


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
                <OwnerDashboardLayout><Outlet/></OwnerDashboardLayout>
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
                <NewListingLayout><Outlet/></NewListingLayout>
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
            path: "host/onboarding",
            element:<ProtectedRoute roleRequired={'user'}>
                <PropertyOnboardingLayout><Outlet/></PropertyOnboardingLayout>
                    </ProtectedRoute> ,
            children: [
                { path: "property-images", element: <></>},
                { path: "rental-appartment", element: <RentalAppartmentForm/>},
                { path: "room", element: <AddingRoomPage/>},
                { path: "room-facilities", element: <></>},
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
                <AdminOutlet><Outlet/></AdminOutlet>
                    </ProtectedRoute>,
            children: [
                {path: "/admin/dashboard",element: <></>},
                {path: "/admin/bookings",element: <></>},
                {path: "/admin/properties",element: <PropertyList/>},
                {path: "/admin/users",element: <UserListingPage/>},
                {path: "/admin/hosts",element: <OwnerListPage/>},

                { path: "/admin/in-review/property-details/:property_id", element: <ReviewPropertyDetailedPageAdminSide /> },
            ]
        },
    ],
}

export default const_data 