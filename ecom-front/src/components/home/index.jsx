import React from 'react';
import {useUser} from "../../context/UserContext";
import { Box } from "@mui/material";

const Home = () => {
    const { username, name, isAuthenticated } = useUser();

    return (
        <Box
            display="flex"
            justifyContent="center"
            maxWidth="100%"
            mt={5}
        >
            Welcome,
            {isAuthenticated ?
                <> {name}</>
                :
                <> Please Login</>
            }
        </Box>
    );
};

export default Home;
