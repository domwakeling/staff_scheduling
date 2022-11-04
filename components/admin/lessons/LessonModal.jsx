import { mutate} from 'swr';
import { MODE_ADD } from '../../../lib/constants';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomModal from "../../layout/CustomModal";
import CustomTextInput from '../../common/CustomTextInput';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LessonColorPicker from './LessonColorPicker';
import Typography from '@mui/material/Typography';

const LessonModal = (props) => {

    const { closeHandler, modalOpen, modalMode, messageSnackbar, lessonName, setName, color, setColor, id } = props;

    const isEmpty = (str) => str.replace(/\s/g, '').length == 0;

    const submitHandler = async (event) => {
        event.preventDefault();
        if (isEmpty(lessonName)) {
            messageSnackbar({severity: 'error', message: 'Name cannot be blank'});
            return null;
        }
        if (isEmpty(color)) {
            messageSnackbar({ severity: 'error', message: 'Color cannot be blank' });
            return null;
        }
        // data in the form is good
        try {
            // try to add new lesson or update existing
            const res = await axios({
                method: modalMode == MODE_ADD ? 'post' : 'put',
                url: modalMode == MODE_ADD ? '/api/lesson/new' : `/api/lesson/${id}`,
                timeout: 6000,
                data: {
                    name: lessonName,
                    color: color
                }
            });
            // success => mutate the api, message, clear the modal & close the modal;
            mutate(`/api/lesson/getAll`);
            messageSnackbar({ severity: 'success', message: 'Lesson updated' });
            setName('');
            closeHandler({ preventDefault: () => { } });
        } catch (err) {
            // failure => show the message, don't clear or close the modal
            messageSnackbar({
                severity: 'error',
                message: (err.response && err.response.data && err.response.data.message) || err.message
            });
        }
    }

    return (
        <CustomModal
            ariaD="lesson-modal"
            ariaL="lesson-modal"
            modalCloseHandler={closeHandler}
            openState={modalOpen}
        >
            <Box mx={2} px={2} pt={2} pb={3}>
                <Box display="flex">
                    <Typography component="h1" variant="h5">
                        { modalMode == MODE_ADD ? 'Add Lesson' : 'Update Lesson' }
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
                                    value={lessonName}
                                    sx={{ mb: 2, mb:3}}
                                />
                                <LessonColorPicker
                                    activeColor={color}
                                    setColor={setColor}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        color="primary"
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        onClick={submitHandler}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </CustomModal>
    )
}

export default LessonModal
