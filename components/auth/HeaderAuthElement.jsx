import { useSession, signIn, signOut } from "next-auth/react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from "next/router";
import { useState } from "react";

const HeaderAuthElement = () => {

    const { data: session, status } = useSession();

    const router = useRouter();

    const [ anchorEl, setAnchorEl ] = useState(null);
    const menuVisible = Boolean(anchorEl);

    const showMenu = (event) => {
        setAnchorEl(event.target);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const signoutHandler = (event) => {
        signOut({ redirect: false, callbackUrl: '/' });
        router.push('/');
    }

    const initials = (str) => {
        return str.split(" ").map(word => word[0]).join("").toUpperCase();
    }

    return (
        <>
            { session ? (
                <Avatar
                    sx={{
                        backgroundColor: "white",
                        color: blue[700],
                        '&:hover': {
                            color: blue[800],
                            backgroundColor: '#F0F8FF',
                            cursor: 'pointer'
                        }
                    }}
                    onClick={showMenu}
                >
                    {initials(session.user.name)}
                </Avatar>
            ) : (
                <Button
                    sx={{ 
                        backgroundColor: "white",
                        color: blue[700],
                        '&:hover': {
                            color: blue[800],
                            backgroundColor: '#F0F8FF'
                        },
                    }}
                    variant="filled"
                    disabled={status=='loading'}
                    onClick={() => signIn()}
                >
                    Sign in
                </Button>
            )}
            { session && (
                <Menu
                    anchorEl={anchorEl}
                    id="user-avatar-menu"
                    open={menuVisible}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {/* <MenuItem onClick={() => signOut()}> */}
                    <MenuItem>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={session.user.name} secondary={session.user.role} />
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={signoutHandler}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small"/>
                            </ListItemIcon>
                            Log Out
                    </MenuItem>
                </Menu>
            )}
        </>
    )
}

export default HeaderAuthElement;
    