import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from "@mui/material/CircularProgress";
import CustomModal from "../../layout/CustomModal";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const StaffModal = (props) => {

    const { handleModalClose, modalOpen } = props;
    const [ staffName, setStaffName ] = useState("");
    const [ staffEmail, setStaffEmail ] = useState("");
    const [ staffTel, setStaffTel ] = useState("");

    return (
        <CustomModal
            ariaD="staff-modal"
            ariaL="staff-modal"
            modalCloseHandler={handleModalClose}
            openState={modalOpen}
        // snackbarHandler={showSnackbar}
        >
            <Box mx={2} px={2} pt={2} pb={3}>
                <Box display="flex">
                    <Typography component="h1" variant="h4">
                        Add Staff
                    </Typography>
                    <Box flexGrow="1" />
                    <IconButton
                        aria-label="close modal"
                        color="primary"
                        onClick={handleModalClose}
                    >
                        <CancelIcon color="primary" />
                    </IconButton>
                </Box>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box mx={2}>
                            <form autoComplete="off">
                                <Box mb={2}>
                                    <TextField
                                        color="primary"
                                        required
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        onChange={(ev) => setStaffName(ev.target.value)}
                                        type="search"
                                        variant="outlined"
                                        />
                                </Box>
                                <Box my={2}>
                                    <TextField
                                        color="primary"
                                        required
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        onChange={(ev) => setStaffEmail(ev.target.value)}
                                        value={staffEmail}
                                        variant="outlined"
                                    />
                                </Box>
                                <Box mt={2} mb={3}>
                                    <TextField
                                        color="primary"
                                        required
                                        fullWidth
                                        label="Contact Number"
                                        name="tel"
                                        onChange={(ev) => setStaffTel(ev.target.value)}
                                        value={staffTel}
                                        variant="outlined"
                                    />
                                </Box>
                                <Button
                                    color="primary"
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </CustomModal>
    )
}

export default StaffModal
