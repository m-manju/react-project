import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
},
(error) => {
    console.log(error);
}
);
export default axios;