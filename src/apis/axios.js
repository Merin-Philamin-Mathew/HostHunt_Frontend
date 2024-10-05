import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASEURL
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
const owner_api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user_access_token'); // or wherever you store the token
        if (token) {
            console.log('normal_user_api_haaha');
            config.headers['Authorization'] = `Bearer ${token}`; // Add JWT token to headers if it exists
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

owner_api.interceptors.request.use(
    (config) => {
        console.log('owner_api_haaha');
        
        const token = localStorage.getItem('owner_access_token'); // or wherever you store the token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Add JWT token to headers if it exists
        }
        console.log('Request config:', config);  // Check if Authorization header is being set correctly

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { BASE_URL, api, owner_api };



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


