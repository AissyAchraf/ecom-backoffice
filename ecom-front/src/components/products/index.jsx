import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';

import ProductService from '../../services/ProductService';

function Products() {
    const [products, setProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        ProductService.getAllProducts()
            .then(data => setProducts(data))
            .catch(error => console.error('Failed to load products:', error));
    };

    const handleOpenDialog = (product = null) => {
        setSelectedProduct(product);
        setIsEditing(!!product);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProduct(null);
    };

    const handleSaveProduct = () => {
        if (isEditing) {
            // Update existing product
            ProductService.updateProduct(selectedProduct)
                .then(() => {
                    loadProducts();
                    handleCloseDialog();
                })
                .catch(error => console.error('Failed to update product:', error));
        } else {
            // Create new product
            ProductService.createProduct(selectedProduct)
                .then(() => {
                    loadProducts();
                    handleCloseDialog();
                })
                .catch(error => console.error('Failed to create product:', error));
        }
    };

    const handleDeleteProduct = (id) => {
        ProductService.deleteProduct(id)
            .then(() => loadProducts())
            .catch(error => console.error('Failed to delete product:', error));
    };

    return (
        <Card sx={{ maxWidth: "100%", margin: 4 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom align="center">
                    Product List
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} sx={{ marginBottom: 3 }}>
                    Add Product
                </Button>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Stock</strong></TableCell>
                                <TableCell><strong>Price (MAD)</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => handleOpenDialog(product)}>Edit</Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {/* Dialog for Adding/Editing Product */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Product Name"
                        type="text"
                        fullWidth
                        value={selectedProduct ? selectedProduct.name : ''}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Stock"
                        type="number"
                        fullWidth
                        value={selectedProduct ? selectedProduct.quantity : ''}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, quantity: parseInt(e.target.value) })}
                    />
                    <TextField
                        margin="dense"
                        label="Price (MAD)"
                        type="number"
                        fullWidth
                        value={selectedProduct ? selectedProduct.price : ''}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleSaveProduct} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default Products;
