import { useState } from 'react';
import Box from '@mui/material/Box';
import Header from './Header';
import SideDrawer from './SideDrawer';
import Toolbar from '@mui/material/Toolbar';

const Layout = ({ children }) => {
    
    const [mobileOpen, setMobileOpen] = useState(false);

    const drawerWidth = 240;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    return (
        <Box sx={{ display: 'flex', width: '100%'}}>
            <Header
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
            />
            <SideDrawer
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
            />
            <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <main>{children}</main>
        
            </Box>
        </Box>
    )
};

export default Layout;
