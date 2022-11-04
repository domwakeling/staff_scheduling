import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const TransferConfirmDialog = (props) => {

    const { dialogCloseHandler, messageSnackbar, dialogOpen, data } = props;

    const dialogConfirmHandler = async (event) => {
        event.preventDefault();
        try {
            const res = await axios({
                method: 'post',
                url: '/api/schedule/regular/replace',
                timeout: 10000,
                data: {
                    jsonData: data
                }
            });
            messageSnackbar({ severity: 'success', message: 'New schedule uploaded' });
            dialogCloseHandler();
        } catch (err) {
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
                Confirm upload schedule
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The existing schedule will be deleted and replaced. This cannot be undone.
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

export default TransferConfirmDialog;
