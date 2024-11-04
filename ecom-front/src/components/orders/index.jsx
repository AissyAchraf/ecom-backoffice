import React, { useEffect, useState } from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
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
    Box,
} from '@mui/material';

import OrderService from '../../services/OrderService';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        OrderService.getAllOrders()
            .then(data => setOrders(data))
            .catch(error => console.error('Failed to load orders:', error));
    };

    const handleOpenDialog = (order = null) => {
        setSelectedOrder(order);
        setIsEditing(!!order);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedOrder(null);
    };

    const handleSaveOrder = () => {
        if (isEditing) {
            OrderService.updateOrder(selectedOrder)
                .then(() => {
                    loadOrders();
                    handleCloseDialog();
                })
                .catch(error => console.error('Failed to update order:', error));
        } else {
            OrderService.createOrder(selectedOrder)
                .then(() => {
                    loadOrders();
                    handleCloseDialog();
                })
                .catch(error => console.error('Failed to create order:', error));
        }
    };

    const handleDeleteOrder = (id) => {
        OrderService.deleteOrder(id)
            .then(() => loadOrders())
            .catch(error => console.error('Failed to delete order:', error));
    };

    const handleOpenDetailDialog = (id) => {
        OrderService.getOrderById(id)
            .then(order => {
                setSelectedOrder(order);
                setOpenDetailDialog(true);
            })
            .catch(error => console.error('Failed to load order details:', error));
    };

    const handleCloseDetailDialog = () => {
        setOpenDetailDialog(false);
        setSelectedOrder(null);
    };

    const calculateTotalPrice = () => {
        return selectedOrder?.productItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0).toFixed(2);
    };

    return (
        <Card sx={{ maxWidth: "100%", margin: 4 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom align="center">
                    Orders
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} sx={{ marginBottom: 3 }}>
                    Add Order
                </Button>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Date</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Products Count</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>{order.productItems.length}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => handleOpenDialog(order)}>Edit</Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                                        <Button variant="outlined" color="info" onClick={() => handleOpenDetailDialog(order.id)}>Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>

            {/* Dialog for Adding/Editing Order */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{isEditing ? 'Edit Order' : 'Add Order'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Date"
                        type="date"
                        fullWidth
                        value={selectedOrder ? selectedOrder.date : ''}
                        onChange={(e) => setSelectedOrder({ ...selectedOrder, date: e.target.value })}
                    />
                    <FormControl margin="dense" fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            label="Status"
                            value={selectedOrder ? selectedOrder.status : ''}
                            onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                        >
                            <MenuItem value="PENDING">PENDING</MenuItem>
                            <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
                            <MenuItem value="CANCELED">CANCELED</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleSaveOrder} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Viewing Order Details */}
            <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="lg" fullWidth>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    <Typography>ID: {selectedOrder?.id}</Typography>
                    <Typography>Date: {selectedOrder?.date}</Typography>
                    <Typography>Status: {selectedOrder?.status}</Typography>
                    <Typography variant="h6" mt={5} gutterBottom>Product Items:</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Product Name</strong></TableCell>
                                    <TableCell><strong>Quantity</strong></TableCell>
                                    <TableCell><strong>Price (MAD)</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedOrder?.productItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.product.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{(item.price * item.quantity).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell>Total Price</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{calculateTotalPrice()} MAD</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default Orders;
