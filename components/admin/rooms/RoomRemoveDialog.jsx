import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const RoomRemoveDialog = (props) => {

    const { dialogCloseHandler, messageSnackbar, dialogOpen, id } = props;

    const dialogConfirmHandler = async (event) => {
        event.preventDefault();
        try {
            // try to delete staff member
            const res = await axios({
                method: 'delete',
                url: `/api/room/${id}`,
                timeout: 6000
            });
            // success => message, clear the modal & close the modal (Alby deals with mutation)
            messageSnackbar({ severity: 'success', message: 'Room updated' });
            dialogCloseHandler();
        } catch (err) {
            // failure => show the message, don't clear or close the modal
            messageSnackbar({
                severity: 'error',
                message: (err.response && err.response.data && err.response.data.message) || err.message
            });
            dialogCloseHandler();
        }
    }

    return (
        <Dialog
            aria-describedby="alert-dialog-description"
            aria-labelledby="alert-dialog-title"
            data-testid="delete-dialog"
            onClose={dialogCloseHandler}
            open={dialogOpen}
        >
            <DialogTitle color="primary">
                Confirm remove room
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The room will be removed from the database, and all classes scheduled to be held
                    here will be deleted. This cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={dialogCloseHandler}
                >
                    Cancel
                </Button>
                <Button
                    autoFocus
                    color="error"
                    onClick={dialogConfirmHandler}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RoomRemoveDialog;
