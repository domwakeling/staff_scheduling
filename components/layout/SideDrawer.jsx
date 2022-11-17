import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import Link from '../../components/common/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';

export default function SideDrawer(props) {

    const { data: session, status } = useSession();

    const router = useRouter();

    const { drawerWidth, window, mobileOpen, handleDrawerToggle } = props;

    const loggedIn = () => {
        if (session && status=="authenticated") return true;
        return false;
    }

    const isAdmin = () => {
        if (session && session.user.role == 'admin') return true;
        return false;
    }

    const navItems = [
        { text: 'Home', link: '/', icon: <HomeIcon />, disabled: false },
        { text: 'Recurring Schedule', link: '/schedule', icon: <CalendarTodayIcon />, disabled: !loggedIn() },
        { text: 'Admin', link: '/admin', icon: <AdminPanelSettingsIcon />, disabled: !isAdmin() },
        { text: 'About', link: '/about', icon: <HelpIcon />, disabled: false }
    ]

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {navItems.map(item => (
                    <Link key={item.text} href={item.link} color="inherit" underline="none">
                        <ListItem disablePadding>
                            <ListItemButton
                                disabled={item.disabled}
                                selected={item.link == router.pathname}
                            >
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
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                onClick={handleDrawerToggle}
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
