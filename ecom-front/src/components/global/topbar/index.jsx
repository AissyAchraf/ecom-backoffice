import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import {AccountCircle} from "@mui/icons-material";
import {Tooltip} from "@mui/material";

const pages = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Customers', path: '/customers' },
    { name: 'Pricing', path: '/pricing' },
];

const Topbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { isAuthenticated, doLogin, doLogout, username, name } = useUser();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Mobile Menu Icon */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <NavLink
                                        to={page.path}
                                        style={({ isActive }) => ({
                                            textDecoration: 'none',
                                            color: isActive ? 'blue' : 'inherit',
                                            fontWeight: isActive ? 'bold' : 'normal',
                                        })}
                                    >
                                        <Typography>{page.name}</Typography>
                                    </NavLink>
                                </MenuItem>
                            ))}
                        </Menu>

                    </Box>

                    {/* Desktop Menu */}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                component={NavLink}
                                to={page.path}
                                style={({isActive}) => ({
                                    color: 'white',
                                    fontWeight: isActive ? 'bold' : 'normal',
                                })}
                                sx={{my: 2, display: 'block'}}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    {isAuthenticated ? (
                        <div>
                            {name}
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                            >
                                <MenuItem onClick={() => doLogout()}>Logout</MenuItem>
                            </Menu>
                        </div>
                        ) : (
                        <Button onClick={doLogin} sx={{color: 'white'}}>
                            Login
                        </Button>
                    )}
            </Toolbar>
        </Container>
</AppBar>
)
    ;
};

export default Topbar;
