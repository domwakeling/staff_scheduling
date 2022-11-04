import { DRAWER_WIDTH } from '../../lib/constants';
import Box from '@mui/material/Box';
import Header from './Header';
import SideDrawer from './SideDrawer';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';

const Layout = ({ children }) => {
    
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    return (
        <Box sx={{ display: 'flex', width: '100%'}}>
            <Header
                drawerWidth={DRAWER_WIDTH}
                handleDrawerToggle={handleDrawerToggle}
            />
            <SideDrawer
                drawerWidth={DRAWER_WIDTH}
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
            />
            <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
                <Toolbar />
                <main>{children}</main>
        
            </Box>
        </Box>
    )
};

export default Layout;
