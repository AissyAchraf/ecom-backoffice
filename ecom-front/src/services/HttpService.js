import axios from 'axios';

const INVENTORY_MICROSERVICE = process.env.INVENTORY_MICROSERVICE_API_BASE_URL || 'http://localhost:8082';
const ORDERS_MICROSERVICE = process.env.ORDERS_MICROSERVICE_API_BASE_URL || 'http://localhost:8083';
const CUSTOMER_MICROSERVICE = process.env.CUSTOMERS_MICROSERVICE_API_BASE_URL || 'http://localhost:8084';

const _axiosClients = {
    _axiosInventoryClient : axios.create({
        baseURL: INVENTORY_MICROSERVICE,
    }),
    _axiosOrderClient : axios.create({
        baseURL: ORDERS_MICROSERVICE,
    }),
    _axiosCustomerClient : axios.create({
        baseURL: CUSTOMER_MICROSERVICE,
    })
}

const configureHttpClient = (getToken, updateToken) => {
    Object.values(_axiosClients).forEach(client => {
        client.interceptors.request.use(async (config) => {
            try {
                await updateToken();  // Update token if needed
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
    });
};

const HttpService = {
    configureHttpClient,
    getInventoryClient: () => _axiosClients._axiosInventoryClient,
    getOrderClient: () => _axiosClients._axiosOrderClient,
    getCustomerClient: () => _axiosClients._axiosCustomerClient ,
};

export default HttpService;
