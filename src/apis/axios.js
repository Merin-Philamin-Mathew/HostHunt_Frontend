import axios from 'axios';
import store from '../redux/store';

const BASE_URL = import.meta.env.VITE_BASEURL

// USER API
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use(
    (config) => {
        const token = store.getState()?.user?.user?.access;
        if (token) {
            console.log('normal_user_api_haaha');
            config.headers['Authorization'] = `Bearer ${token}`; // Add JWT token to headers if it exists
        }
        console.log('normaluser Request config:', config);  // Check if Authorization header is being set correctly
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//  OWNER API
const owner_api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
owner_api.interceptors.request.use(
    (config) => {
        console.log('owner_api_haaha');
        
        const token = store.getState()?.owner?.owner?.access;
        console.log('seetha',token);
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Add JWT token to headers if it exists
        }
        console.log('owner Request config:', config);  // Check if Authorization header is being set correctly

        return config;
    },
    (error) => {
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
        console.log('ddddd');
        
        const token = store.getState()?.admin?.adminAToken;
        console.log(token,'tokennn');
        
        if (token) {
            console.log('admin_api_haaha');
            config.headers['Authorization'] = `Bearer ${token}`; // Add JWT token to headers if it exists
        }
        console.log('admin Request config:', config);  // Check if Authorization header is being set correctly

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export { BASE_URL, api, owner_api,admin_api };



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


