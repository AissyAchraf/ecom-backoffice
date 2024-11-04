import HttpService from './HttpService';

const axiosInstance = HttpService.getOrderClient();

const OrderService = {
    getAllOrders: async () => {
        try {
            const response = await axiosInstance.get('/api/orders');
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    getOrderById: async (id) => {
        try {
            const response = await axiosInstance.get(`/api/orders/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching order with ID ${id}:`, error);
            throw error;
        }
    },

    createOrder: async (product) => {
        try {
            const response = await axiosInstance.post('/api/orders/create', product);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    updateOrder: async (order) => {
        try {
            const response = await axiosInstance.put(`/api/orders/update/${order.id}`, order);
            return response.data;
        } catch (error) {
            console.error(`Error updating order with ID ${order.id}:`, error);
            throw error;
        }
    },

    deleteOrder: async (id) => {
        try {
            await axiosInstance.delete(`/api/orders/delete/${id}`);
        } catch (error) {
            console.error(`Error deleting order with ID ${id}:`, error);
            throw error;
        }
    },
};

export default OrderService;
