import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const ProtectedRoute = ({ children, requiredRoles }) => {
    const { isAuthenticated, doLogin, isLoading, hasRole } = useUser();

    const hasAccess = hasRole(requiredRoles);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            doLogin();
        }
    }, [isAuthenticated, doLogin, isLoading]);

    if (isLoading) {
        return null;
    }

    if (!hasAccess && isAuthenticated) {
        return <Navigate to="/unauthorized" />;
    }

    if (isAuthenticated) {
        return children;
    }

    return null;
};

export default ProtectedRoute;
