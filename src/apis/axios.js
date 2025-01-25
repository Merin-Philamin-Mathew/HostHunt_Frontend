// Import axios and store
import axios from 'axios';
import store from '../redux/store';
import { logoutUser, updateAccessToken } from '../redux/userSlice';
import { logoutAdmin, updateAdminAccessToken } from '../redux/admin/adminSlice';
import { toast } from 'sonner';
import Cookies from "js-cookie"; // Ensure you have installed js-cookie


const BASE_URL = import.meta.env.VITE_BASEURL;

// USER API
const csrfToken = Cookies.get('csrftoken'); // Django's default CSRF cookie name is 'csrftoken'

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken, // Include the CSRF token
    },
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState()?.user?.user?.access;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (originalRequest.url.includes('/auth/token/refresh/')) {
            store.dispatch(logoutUser())
            toast.warning('Your session has been exprired')
            return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                console.log('calling refresh token=================')

                const { data } = await api.post('/auth/token/refresh/');

                store.dispatch(updateAccessToken(data.access));
                originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            } 
        }
        return Promise.reject(error);
    }
);


// ADMIN API
const admin_api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
admin_api.interceptors.request.use(
    (config) => {
        const token = store.getState()?.admin?.adminAToken;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Add JWT token to headers if it exists
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

admin_api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (originalRequest.url.includes('/auth/token/refresh/')) {
            console.log('goining to logout');
            store.dispatch(logoutAdmin())
            toast.warning('Your session has been exprired')
            console.log('logged out');
            return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                console.log('calling refresh token=================')
                const { data } = await admin_api.post('/auth/token/refresh/');
                
                store.dispatch(updateAdminAccessToken(data.access));
                originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                return admin_api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            } 
        }
        return Promise.reject(error);
    }
);



export { BASE_URL, api,admin_api };



// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             const refreshToken = localStorage.getItem('refresh_token');
//             const { data } = await api.post('/auth/token/refresh/', { refresh: refreshToken });
//             localStorage.setItem('access_token', data.access);
//             axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
//             return api(originalRequest);
//         }

//         return Promise.reject(error);
//     }
// );


