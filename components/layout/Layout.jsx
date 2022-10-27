import { useState } from 'react';
import Box from '@mui/material/Box';
import Header from './Header';
import SideDrawer from './SideDrawer';
import Toolbar from '@mui/material/Toolbar';

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
            <Box sx={{ flexGrow: 1 }}>
                <Toolbar />
                <main>{children}</main>
        
            </Box>
        </>
    )
};

export default Layout;
