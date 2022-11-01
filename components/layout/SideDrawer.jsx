import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import Link from '../../components/common/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useSession } from 'next-auth/react';

export default function SideDrawer(props) {

    const { data: session, status } = useSession();

    const { drawerWidth, window, mobileOpen, handleDrawerToggle } = props;

    const loggedIn = () => {
        if (session && status=="authenticated") return false;
        return true;
    }

    const isAdmin = () => {
        if (session && session.user.name == 'Admin') return true;
        return false;
    }

    const navItems = [
        { text: 'Home', link: '/', icon: <HomeIcon />, protected: false },
        { text: 'Recurring Schedule', link: '/schedule', icon: <CalendarTodayIcon />, protected: loggedIn() },
        { text: 'Admin', link: '/admin', icon: <AdminPanelSettingsIcon />, protected: !isAdmin() },
        { text: 'About', link: '/about', icon: null, protected: false }
    ]

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                { navItems.filter(item => !item.protected ).map(item => (
                    <Link key={item.text} href={item.link} color="inherit" underline="none">
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    { item.icon }
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );
    
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Box onClick={handleDrawerToggle}>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            </Box>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
