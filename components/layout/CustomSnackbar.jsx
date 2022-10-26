import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
// import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';

const CustomSnackbar = ({ duration, message, severity, openState, setOpenState }) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenState(false);
    };

    return (
        <div>
            <Snackbar
                autoHideDuration={duration || 6000}
                onClose={handleClose}
                open={openState}
            >
                <Alert
                    variant="filled"
                    onClose={handleClose}
                    severity={severity || 'info'}
                    sx={{minWidth: '300px'}}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CustomSnackbar;
