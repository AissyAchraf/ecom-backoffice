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

import CustomerService from '../../services/CustomerService';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = () => {
        CustomerService.getAllCustomers()
            .then(data => setCustomers(data))
            .catch(error => console.error('Failed to load customers:', error));
    };

    const handleOpenDialog = (customer = null) => {
        setSelectedCustomer(customer);
        setIsEditing(!!customer);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCustomer(null);
    };

    const handleSaveCustomer = () => {
        if (isEditing) {
            // Update existing customer
            CustomerService.updateCustomer(selectedCustomer)
                .then(() => {
                    loadCustomers();
                    handleCloseDialog();
                })
                .catch(error => console.error('Failed to update customer:', error));
        } else {
            // Create new customer
            CustomerService.createCustomer(selectedCustomer)
                .then(() => {
                    loadCustomers();
                    handleCloseDialog();
                })
                .catch(error => console.error('Failed to create customer:', error));
        }
    };

    const handleDeleteCustomer = (id) => {
        console.log("Click Delete");
        console.log(id);
        CustomerService.deleteCustomer(id)
            .then(() => loadCustomers())
            .catch(error => console.error('Failed to delete customer:', error));
    };

    return (
        <Card sx={{ maxWidth: "100%", margin: 4 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom align="center">
                    Customers
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} sx={{ marginBottom: 3 }}>
                    Add Customer
                </Button>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>First Name</strong></TableCell>
                                <TableCell><strong>Last Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.id}</TableCell>
                                    <TableCell>{customer.firstName}</TableCell>
                                    <TableCell>{customer.lastName}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => handleOpenDialog(customer)}>Edit</Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDeleteCustomer(customer.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {/* Dialog for Adding/Editing Customer */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{isEditing ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={selectedCustomer ? selectedCustomer.firstName : ''}
                        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, firstName: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={selectedCustomer ? selectedCustomer.lastName : ''}
                        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, lastName: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="text"
                        fullWidth
                        value={selectedCustomer ? selectedCustomer.email : ''}
                        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleSaveCustomer} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default Customers;
