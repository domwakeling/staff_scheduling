import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';

const TransferConfirmDialog = (props) => {

    const { dialogCloseHandler, messageSnackbar, dialogOpen, data } = props;

    const [ uploading, setUploading ] = useState(false);
    
    const dialogConfirmHandler = async (event) => {
        event.preventDefault();
        setUploading(true);
        try {
            const res = await axios({
                method: 'post',
                url: '/api/schedule/regular/replace',
                timeout: 20000,
                data: {
                    jsonData: data
                }
            });
            messageSnackbar({ severity: 'success', message: 'New schedule uploaded' });
            setUploading(false);
            dialogCloseHandler();
        } catch (err) {
            messageSnackbar({
                severity: 'error',
                message: (err.response && err.response.data && err.response.data.message) || err.message
            });
            setUploading(false);
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
                {uploading ? (
                    <Box sx={{width: '100%', mt: 2}}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <Box sx={{width: '100%', mt: 2, height: '4px'}} />
                ) }
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
