import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

const ScheduleItemEditMenu = (props) => {

    const { anchorEl, open, handleClose, handleEditClick, handleDeleteClick } = props;

    return (
        <Menu
            anchorEl={anchorEl}
            id="schedule-edit-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
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
            <MenuItem onClick={handleEditClick}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                Edit
            </MenuItem>
            <MenuItem onClick={handleDeleteClick}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                Delete
            </MenuItem>
        </Menu>
    );
}

export default ScheduleItemEditMenu;
