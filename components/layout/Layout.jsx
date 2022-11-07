import { DRAWER_WIDTH } from '../../lib/constants';
import Box from '@mui/material/Box';
import Header from './Header';
import SideDrawer from './SideDrawer';
import Toolbar from '@mui/material/Toolbar';
import { useChannel } from "@ably-labs/react-hooks";
import { useState } from 'react';

const Layout = ({ children }) => {
    
    // Ably channel - set here because it is always present
    const [channel] = useChannel("update-published", async (message) => {
        console.log("Received Ably message with data:", message.data);
    });

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
