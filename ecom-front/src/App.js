import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Topbar from './components/global/topbar';
import Products from './components/products';
import ProtectedRoute from "./context/ProtectedRoute";
import Unauthorized from "./components/unauthorized";
import Orders from "./components/orders";
import Customers from "./components/customers";

function App() {

    return (

            <div className="app">
                <div className="content">
                    <Topbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/products"
                            element={
                                <ProtectedRoute requiredRoles={['ADMIN']}>
                                    <Products />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <ProtectedRoute requiredRoles={['USER']}>
                                    <Orders />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/customers"
                            element={
                                <ProtectedRoute requiredRoles={['USER']}>
                                    <Customers />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                    </Routes>
                </div>
            </div>
    );
}

export default App;