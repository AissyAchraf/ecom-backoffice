import HttpService from './HttpService';

const axiosInstance = HttpService.getCustomerClient();

const CustomerService = {
    getAllCustomers: async () => {
        try {
            const response = await axiosInstance.get('/api/customers');
            return response.data;
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw error;
        }
    },

    getCustomerById: async (id) => {
        try {
            const response = await axiosInstance.get(`/api/customers/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching customer with ID ${id}:`, error);
            throw error;
        }
    },

    createCustomer: async (customer) => {
        try {
            const response = await axiosInstance.post('/api/customers/create', customer);
            return response.data;
        } catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    },

    updateCustomer: async (product) => {
        try {
            const response = await axiosInstance.put(`/api/customers/update/${product.id}`, product);
            return response.data;
        } catch (error) {
            console.error(`Error updating customer with ID ${product.id}:`, error);
            throw error;
        }
    },

    deleteCustomer: async (id) => {
        try {
            await axiosInstance.delete(`/api/customers/delete/${id}`);
        } catch (error) {
            console.error(`Error deleting customer with ID ${id}:`, error);
            throw error;
        }
    },
};

export default CustomerService;
