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
import PODashboard from '../pages/property_owner/PODashboard';
import POManageListings from '../pages/property_owner/POMangeListings';
import POReviews from '../pages/property_owner/POReviews';
import POBookings from '../pages/property_owner/booking/POBookings';

import ListPropertySteps from '../components/property_owner/new_listings/ListPropertySteps';
    import NewListingPage from '../pages/property_owner/newListing.jsx/NewLIstingPage';
    import PropertyDetailsForm from '../components/property_owner/new_listings/PropertyDetailsForm';
    import DocumentsForm from '../components/property_owner/new_listings/DocumentsForm';
    import Policy_ServicesPage from '../pages/property_owner/newListing.jsx/Policy_ServicesPage';
    import PropertyAmenitiesPage from '../pages/property_owner/newListing.jsx/PropertyAmenitiesPage';
    import ReviewAndSubmit from '../components/property_owner/new_listings/ReviewAndSubmit';

    import OnboardingPage from '../pages/property_owner/onboarding.jsx/OnboardingPage';
    import RentalAppartmentForm from '../components/property_owner/onboardinag/RentalAppartmentForm';

import AdminOutlet from '../components/Layouts/admin/AdminLayout';
import AdminLogin from '../pages/admin/Login/AdminLogin';
import PropertyList from '../pages/admin/Properties/PropertyListPage';
import ReviewPropertyDetailedPageAdminSide from '../pages/admin/Properties/ReviewPropertyDetailPageAdmin';
import UserListingPage from '../pages/admin/Users/UsersListingPage';
import OwnerListPage from '../pages/admin/owners/OwnerListPage';
import PropertyConfigurations from '../pages/admin/Property_configurations/PropertyConfigurations';
import AdminDashboardPage from '../pages/admin/dashboarf.jsx/AdminDashboardPage';
import PropertyResultsPage from '../pages/users/PropertyResultsPage';
import AddingRoomPage from '../pages/property_owner/onboarding.jsx/AddingRoomPage';
import PropertyDisplayPage from '../pages/users/PropertyDisplayPage';
import PropertyImages from '../components/property_owner/onboardinag/PropertyImages';
import PreviewProperty from '../pages/property_owner/onboarding.jsx/PreviewProperty';
import ManageAccountPage from '../pages/users/ManageAccount/ManageAccountPage';
import MyStays from '../components/user/ManageAccounts/MyStays';
import ManageAccount from '../components/user/ManageAccounts/ManageAccount';
import BookingSuccessModal from '../components/utils/Modals/BookingSuccessModal';
import WebSocketTest from '../pages/Trial';
import BookingDetailsPage from '../pages/property_owner/booking/BookingDetailPage';
import RentManagement from '../pages/property_owner/booking/RentManagement';
import Trial from '../pages/Trial';

let const_data = {
    REACT_ROUTER_PATH: [
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // USER SIDE AND AUTHENTICATION PATHS
        {
            path: "/trial-page",
            element: <Trial/>
        },
       
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
            path: "/property-results",
            element: <PropertyResultsPage/>
        },
        {
            path: "/hosteldetails",
            element: <PropertyDisplayPage/>
        },

        {
            path: "/manage-account",
            element:<ProtectedRoute roleRequired={'user'}>
                <ManageAccountPage><Outlet/></ManageAccountPage>
                    </ProtectedRoute> ,
            children: [
                { path: "/manage-account/manage-account", element: <ManageAccount/>},
                { path: "/manage-account/my-stays", element: <MyStays/>},

            ]
        },
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
            path: `host`,
            element: <ProtectedRoute>
                <OwnerDashboardLayout><Outlet/></OwnerDashboardLayout>
                    </ProtectedRoute>,
            children: [
                {path: "/host/dashboard",element: <PODashboard/>},
                {path: "/host/listings",element: <POManageListings/> },
                {path: "/host/reviews",element: <POReviews/> },
                {path: "/host/bookings",element: <POBookings/> },
                {path: "/host/bookings/:id",element: <BookingDetailsPage/> },
                {path: "/host/bookings/:id/monthly-rent",element: <RentManagement/> },
            ]
        },
        {
            path: 'host/new-listing',
            element: <ProtectedRoute roleRequired={'user'}>
                <ListPropertySteps/>
                </ProtectedRoute>
        },
  
        {
            path: "host/new-listing",
            element:<ProtectedRoute roleRequired={'user'}>
                <NewListingPage><Outlet/></NewListingPage>
                    </ProtectedRoute> ,
            children: [
                { path: "property-details", element: <PropertyDetailsForm/>},
                { path: "documents", element: <DocumentsForm/>},
                { path: "policies&services", element: <Policy_ServicesPage/>},
                { path: "facilities", element: <PropertyAmenitiesPage/>},
                { path: "finish", element: <ReviewAndSubmit/> }
            ]
        },
        {
            path: "host/onboarding",
            element:<ProtectedRoute roleRequired={'user'}>
                <OnboardingPage><Outlet/></OnboardingPage>
                    </ProtectedRoute> ,
            children: [
                { path: "property-images", element: <PropertyImages/>},
                { path: "rental-appartment", element: <RentalAppartmentForm/>},
                { path: "room", element: <AddingRoomPage/>},
                { path: "finish", element: <PreviewProperty/> }

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
                {path: "/admin/dashboard",element: <AdminDashboardPage></AdminDashboardPage>},
                {path: "/admin/users",element: <UserListingPage/>},
                {path: "/admin/hosts",element: <OwnerListPage/>},
                {path: "/admin/properties",element: <PropertyList/>},
                {path: "/admin/property_configurations",element: <PropertyConfigurations/>},
                {path: "/admin/bookings",element: <></>},
                {path: "/admin/communication",element: <></>},

                { path: "/admin/in-review/property-details/:property_id", element: <ReviewPropertyDetailedPageAdminSide /> },
            ]
        },
        
        
    ],

    
}


export const  navigatetoUserHome = '/'

export default const_data
