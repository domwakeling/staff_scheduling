import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from "next/router";
import { useState } from "react";

const HeaderAuthElement = () => {

    const { data: session } = useSession();

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
                <Tooltip
                    arrow
                    title={`${session.user.name}\n(${session.user.role})`}
                >
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
                    
                </Tooltip>
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
                    onClick={() => signIn()}
                >
                    Sign in
                </Button>
            )
        }
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
            <MenuItem onClick={signoutHandler}>
                Sign Out
            </MenuItem>
        </Menu>
    </>
    )
}

export default HeaderAuthElement;
    