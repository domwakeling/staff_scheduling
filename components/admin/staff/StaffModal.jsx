import { mutate} from 'swr';
import { MODE_ADD } from '../../../lib/constants';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomModal from "../../layout/CustomModal";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CustomTextInput from '../../common/CustomTextInput';
import Typography from '@mui/material/Typography';

const StaffModal = (props) => {

    const { closeHandler, modalOpen, modalMode, snackbarUse, staffName, setName, email, setEmail, tel, setTel, id } = props;

    const isInvalidEmail = (str) => !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str));
    const isEmpty = (str) => str.replace(/\s/g, '').length == 0;
    const isInvalidTel = (str) => {
        str = str.replace(/\s/g, '');
        return !(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(str));
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (isEmpty(staffName)) {
            snackbarUse({severity: 'error', message: 'Name cannot be blank'});
            return null;
        }
        if (isInvalidEmail(email)) {
            snackbarUse({ severity: 'error', message: 'Email is not valid' });
            return null;
        }
        if (isInvalidTel(tel)) {
            snackbarUse({ severity: 'error', message: 'Telephone number is not valid' });
            return null;
        }
        // data in the form is good
        try {
            // try to add new staff member or update existing
            const res = await axios({
                method: modalMode == MODE_ADD ? 'post' : 'put',
                url: modalMode == MODE_ADD ? '/api/staff/new' : `/api/staff/${id}`,
                timeout: 6000,
                data: {
                    name: staffName,
                    email: email,
                    telephone: tel
                }
            });
            // success => mutate the api, message, clear the modal & close the modal;
            mutate(`/api/staff/getAll`);
            snackbarUse({ severity: 'success', message: 'Staff updated' });
            setName('');
            setEmail('');
            setTel('');
            closeHandler({ preventDefault: () => { } });
        } catch (err) {
            // failure => show the message, don't clear or close the modal
            snackbarUse({
                severity: 'error',
                message: (err.response && err.response.data && err.response.data.message) || err.message
            });
        }
    }

    return (
        <CustomModal
            ariaD="staff-modal"
            ariaL="staff-modal"
            modalCloseHandler={closeHandler}
            openState={modalOpen}
        >
            <Box mx={2} px={2} pt={2} pb={3}>
                <Box display="flex">
                    <Typography component="h1" variant="h5">
                        { modalMode == MODE_ADD ? 'Add Staff' : 'Update Staff' }
                    </Typography>
                    <Box flexGrow="1" />
                    <IconButton aria-label="close modal" color="primary" onClick={closeHandler}>
                        <CancelIcon color="primary" />
                    </IconButton>
                </Box>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box mx={2}>
                            <form noValidate autoComplete="off">
                                <CustomTextInput
                                    errorMethod={isEmpty}
                                    label="Name"
                                    name="name"
                                    setValue={setName}
                                    value={staffName}
                                    sx={{ mb: 2}}
                                />
                                <CustomTextInput
                                    errorMethod={isInvalidEmail}
                                    label="Email"
                                    name="email"
                                    setValue={setEmail}
                                    value={email}
                                    sx={{ my: 2}}
                                />
                                <CustomTextInput
                                    errorMethod={isInvalidTel}
                                    label="Contact Number"
                                    name="tel"
                                    setValue={setTel}
                                    value={tel}
                                    sx={{ mt: 2, mb:3 }}
                                />
                                <Button
                                    color="primary"
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={submitHandler}
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
