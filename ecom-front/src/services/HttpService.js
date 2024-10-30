import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8082';

const _axios = axios.create({
    baseURL: BASE_URL,
});

const configureHttpClient = (getToken, updateToken) => {
    _axios.interceptors.request.use(async (config) => {
        try {
            await updateToken(() => {});

            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                console.warn('No token available');
            }
        } catch (error) {
            console.error('Failed to attach token:', error);
            return Promise.reject(error);
        }

        return config;
    });
};

const HttpService = {
    configureHttpClient,
    getAxiosClient: () => _axios,
};

export default HttpService;
