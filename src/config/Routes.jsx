import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/users/Home'));

const AuthOutlet = lazy(() => import('../components/Layouts/AuthOutlet'));
const LoginPage = lazy(() => import('../pages/users/LoginPage'));
const POLoginForm = lazy(() => import('../components/forms/POLoginForm'));
const RegisterPage = lazy(() => import('../pages/users/RegisterPage'));
const RegistrationForm = lazy(() => import('../components/forms/RegistrationForm'));
const OTPVerificationPage = lazy(() => import('../pages/users/OTPVerificationPage'));
const OTPVerificationForm = lazy(() => import('../components/forms/OTPVerificationForm'));

const OwnerDashboardLayout = lazy(() => import('../components/Layouts/Owner/OwnerDashboardLayout'));
const POManageListings = lazy(() => import('../pages/property_owner/POMangeListings'));
const POReviews = lazy(() => import('../pages/property_owner/POReviews'));
const POBookings = lazy(() => import('../pages/property_owner/booking/POBookings'));

const ListPropertySteps = lazy(() => import('../components/property_owner/new_listings/ListPropertySteps'));
const PropertyDetailsForm = lazy(() => import('../components/property_owner/new_listings/PropertyDetailsForm'));
const DocumentsForm = lazy(() => import('../components/property_owner/new_listings/DocumentsForm'));
const Policy_ServicesPage = lazy(() => import('../pages/property_owner/newListing/Policy_ServicesPage'));
const PropertyAmenitiesPage = lazy(() => import('../pages/property_owner/newListing/PropertyAmenitiesPage'));
const ReviewAndSubmit = lazy(() => import('../components/property_owner/new_listings/ReviewAndSubmit'));

const OnboardingPage = lazy(() => import('../pages/property_owner/onboarding.jsx/OnboardingPage'));
const RentalAppartmentForm = lazy(() => import('../components/property_owner/onboardinag/RentalAppartmentForm'));

const AdminLogin = lazy(() => import('../pages/admin/Login/AdminLogin'));
const PropertyList = lazy(() => import('../pages/admin/Properties/PropertyListPage'));
const ReviewPropertyDetailedPageAdminSide = lazy(() => import('../pages/admin/Properties/ReviewPropertyDetailPageAdmin'));
const UserListingPage = lazy(() => import('../pages/admin/Users/UsersListingPage'));
const OwnerListPage = lazy(() => import('../pages/admin/owners/OwnerListPage'));
const PropertyConfigurations = lazy(() => import('../pages/admin/Property_configurations/PropertyConfigurations'));
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboarf.jsx/AdminDashboardPage'));

const PropertyResultsPage = lazy(() => import('../pages/users/PropertyResultsPage'));
const AddingRoomPage = lazy(() => import('../pages/property_owner/onboarding.jsx/AddingRoomPage'));
const PropertyDisplayPage = lazy(() => import('../pages/users/PropertyDisplayPage'));
const PropertyImages = lazy(() => import('../components/property_owner/onboardinag/PropertyImages'));
const PreviewProperty = lazy(() => import('../pages/property_owner/onboarding.jsx/PreviewProperty'));

const MyStays = lazy(() => import('../components/user/ManageAccounts/MyStays/MyStays'));
const BookingDetailsPage = lazy(() => import('../pages/property_owner/booking/BookingDetailPage'));
const Trial = lazy(() => import('../pages/Trial'));
const ProfilePage = lazy(() => import('@/pages/users/ManageAccount/ProfilePage'));
const AccountPage = lazy(() => import('@/pages/users/ManageAccount/AccountPage'));
const ManageAccountLayout = lazy(() => import('@/components/Layouts/User/ManageAccountLayout'));
const UserBookingDetailsPage = lazy(() => import('@/pages/users/ManageAccount/MyStays/UserBookingDetailsPage'));
const RentManagementPage = lazy(() => import('@/pages/users/ManageAccount/MyStays/RentManagementPage'));
const HostRentManagementPage = lazy(() => import('../pages/property_owner/booking/HostRentManagementPage'));
const ManageListingsPage = lazy(() => import('@/pages/property_owner/manageListings.jsx/ManageListings'));
const PODashboardPage = lazy(() => import('@/pages/property_owner/PODashboardPage'));
const NewListingPage2 = lazy(() => import('@/pages/property_owner/newListing/NewListingPage2'));
const AdminOutlet = lazy(() => import('@/components/Layouts/admin/AdminOutlet'));


const routes = createBrowserRouter([

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
            path: "/account",
            element:<ProtectedRoute roleRequired={'user'}>
                <ManageAccountLayout><Outlet/></ManageAccountLayout>
                </ProtectedRoute> ,
            children: [
                {path:"/account", element: <AccountPage/>},
                {path: "/account/profile",element:<ProfilePage/>},
                {path: "/account/my-stays",element:<MyStays/>},
                {path: "/account/my-stays/:id",element: <UserBookingDetailsPage/> },
                {path: "/account/my-stays/:id/monthly-rent",element: <RentManagementPage/> },
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
                {path: "/host/dashboard",element: <PODashboardPage/>},
                {path: "/host/listings",element: <POManageListings/> },
                {path: "/host/reviews",element: <POReviews/> },
                {path: "/host/bookings",element: <POBookings/> },
                {path: "/host/bookings/:id",element: <BookingDetailsPage/> },
                {path: "/host/bookings/:id/monthly-rent",element: <HostRentManagementPage/> },
            ]
        },
        {
            path: 'host/manage-listings',
            element: <ProtectedRoute roleRequired={'user'}>
                <ListPropertySteps/>
                </ProtectedRoute>
        },
  
        {
            path: "host/new-listing",
            element:<ProtectedRoute roleRequired={'user'}>
                <NewListingPage2><Outlet/></NewListingPage2>
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
            path: "host/manage-listing",
            element:<ProtectedRoute roleRequired={'user'}>
                <ManageListingsPage><Outlet/></ManageListingsPage>
                    </ProtectedRoute> ,
            children: [
                { path: "property-details", element: <PropertyDetailsForm/>},
                { path: "policies&services", element: <Policy_ServicesPage/>},
                { path: "facilities", element: <PropertyAmenitiesPage/>},
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
        
    
]);

export default routes;
