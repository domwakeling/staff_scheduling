import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '../Link';

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
            <Link
                color="inherit"
                display="inline"
                href="/"
                underline="none"
            >
                <Typography variant="h6" noWrap component="div">
                    header
                </Typography>
            </Link>
            <Typography variant="h6">
                &nbsp;
            </Typography>
            <Link
                color="inherit"
                display="inline"
                href="/about"
                underline="none"
            >
                <Typography variant="h6">
                    about
                </Typography>
            </Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
