import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Header from './Header';
import SideDrawer from './SideDrawer';

const drawerWidth = 240;

const Layout = ({ children }) => {
    
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    return (
        <>
            <Header
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
            />
            <SideDrawer
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
            />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <main>{children}</main>
        
            </Box>
        </>
    )
};

export default Layout;
