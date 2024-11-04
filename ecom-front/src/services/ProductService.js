import HttpService from './HttpService';

const axiosInstance = HttpService.getInventoryClient();

const ProductService = {
    getAllProducts: async () => {
        try {
            const response = await axiosInstance.get('/api/products');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await axiosInstance.get(`/api/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            throw error;
        }
    },

    createProduct: async (product) => {
        try {
            const response = await axiosInstance.post('/api/products/create', product);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    updateProduct: async (product) => {
        try {
            const response = await axiosInstance.put(`/api/products/update/${product.id}`, product);
            return response.data;
        } catch (error) {
            console.error(`Error updating product with ID ${product.id}:`, error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            await axiosInstance.delete(`/api/products/delete/${id}`);
        } catch (error) {
            console.error(`Error deleting product with ID ${id}:`, error);
            throw error;
        }
    },
};

export default ProductService;
