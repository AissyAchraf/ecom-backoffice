import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Keycloak from "keycloak-js";
import HttpService from "../services/HttpService";

const keycloakConfig = {
    realm: "ecom-realm",
    url: "http://localhost:8080/",
    clientId: "ecom-client",
};

const _kc = new Keycloak(keycloakConfig);

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const initKeycloak = useCallback((onAuthenticatedCallback) => {
        _kc.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            pkceMethod: 'S256',
        })
            .then((authenticated) => {
                setIsAuthenticated(authenticated);
                if (authenticated) {
                    setUsername(_kc.tokenParsed?.preferred_username);
                    setName(_kc.tokenParsed?.name);
                    setRoles(_kc.tokenParsed?.realm_access.roles);
                }
                if (onAuthenticatedCallback) onAuthenticatedCallback();
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    const doLogin = () => _kc.login();
    const doLogout = () => _kc.logout();
    const getToken = () => _kc.token;
    const updateToken = (successCallback) =>
        _kc.updateToken(5).then(successCallback).catch(doLogin);
    const hasRole = (requiredRoles) => requiredRoles.some((role) => roles.includes(role));

    useEffect(() => {
        initKeycloak();
        HttpService.configureHttpClient(getToken, updateToken);
    }, [initKeycloak]);

    return (
        <UserContext.Provider value={{ isAuthenticated, username, name, doLogin, doLogout, getToken, updateToken, hasRole, isLoading }}>
            {!isLoading && children}
        </UserContext.Provider>
    );
};
