import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '../common/Link';
import HeaderAuthElement from '../auth/HeaderAuthElement';

const Header = (props) => {

    const { drawerWidth, handleDrawerToggle } = props;

    return (
        <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ mr: 2 }}>
                    <Image src="/logo_white_small.png" alt="logo" height="35px" width="50px"/>
                </Box>
                <Link color="inherit" display="inline" href="/" underline="none">
                    <Typography variant="h6" noWrap component="div">
                        Staff Schedule App
                    </Typography>
                </Link>
                <Box sx={{flex: 1}} />
                <HeaderAuthElement />
            </Toolbar>
        </AppBar>
    )
}

export default Header;
