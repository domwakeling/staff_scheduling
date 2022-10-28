import { mutate } from 'swr';
import { MODE_ADD, DAY_START, DAY_END } from '../../lib/constants';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomModal from "../layout/CustomModal";
import CustomTextInput from '../common/CustomTextInput';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import useLessons from '../../lib/db_lessons';
import useRooms from '../../lib/db_rooms';
import useStaff from '../../lib/db_staff';

const ScheduleModal = (props) => {

    const { lessons } = useLessons();
    const { rooms } = useRooms();
    const { staff } = useStaff();

    const {
        closeHandler,
        modalOpen,
        modalMode,
        snackbarUse,
        modalDay,
        setModalDay,
        modalStart,
        setModalStart,
        modalEnd,
        setModalEnd,
        modalStaff,
        setModalStaff,
        modalLesson,
        setModalLesson,
        modalRoom,
        setModalRoom,
        modalScheduleId,
        setModalScheduleId
    } = props;

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const times = [];
    for(let n = DAY_START; n <= DAY_END; n += 0.25) {
        times.push(n);
    }

    const twoDigits = (num) => num.toLocaleString(undefined, { minimumIntegerDigits: 2 })

    const timeString = (num) => {
        const hours = twoDigits(Math.floor(num));
        const minutes = twoDigits(Math.ceil(60 * (num - Math.floor(num))));
        return `${hours}:${minutes}`
    }

    const isEmpty = (str) => str.replace(/\s/g, '').length == 0;

    const submitHandler = async (event) => {
        event.preventDefault();
        // if (isEmpty(lessonName)) {
        //     snackbarUse({ severity: 'error', message: 'Name cannot be blank' });
        //     return null;
        // }
        // if (isEmpty(color)) {
        //     snackbarUse({ severity: 'error', message: 'Color cannot be blank' });
        //     return null;
        // }
        // // data in the form is good
        // try {
        //     // try to add new lesson or update existing
        //     const res = await axios({
        //         method: modalMode == MODE_ADD ? 'post' : 'put',
        //         url: modalMode == MODE_ADD ? '/api/lesson/new' : `/api/lesson/${id}`,
        //         timeout: 6000,
        //         data: {
        //             name: lessonName,
        //         }
        //     });
        //     // success => mutate the api, message, clear the modal & close the modal;
        //     mutate(`/api/lesson/getAll`);
        //     snackbarUse({ severity: 'success', message: 'Lesson updated' });
        //     setName('');
        //     closeHandler({ preventDefault: () => { } });
        // } catch (err) {
        //     // failure => show the message, don't clear or close the modal
        //     snackbarUse({
        //         severity: 'error',
        //         message: (err.response && err.response.data && err.response.data.message) || err.message
        //     });
        // }
    }

    const handleDayChange = (event) => {
        setModalDay(event.target.value);
    };

    const handleStaffChange = (event) => {
        setModalStaff(event.target.value);
    };

    const handleRoomChange = (event) => {
        setModalRoom(event.target.value);
    };

    const handleLessonChange = (event) => {
        setModalLesson(event.target.value);
    };

    const handleStartChange = (event) => {
        setModalStart(event.target.value);
    };

    const handleEndChange = (event) => {
        setModalEnd(event.target.value);
    };

    return (
        <CustomModal
            ariaD="schedule-modal"
            ariaL="schedule-modal"
            modalCloseHandler={closeHandler}
            openState={modalOpen}
        >
            <Box mx={2} px={2} pt={2} pb={3}>
                <Box display="flex">
                    <Typography component="h1" variant="h5">
                        {modalMode == MODE_ADD ? 'Add Schedule Item' : 'Update Schedule Item'}
                    </Typography>
                    <Box flexGrow="1" />
                    <IconButton aria-label="close modal" color="primary" onClick={closeHandler}>
                        <CancelIcon color="primary" />
                    </IconButton>
                </Box>
                <br />
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl
                            variant="standard"
                            sx={{ pb: 2, minWidth: 180 }}
                        >
                            <InputLabel id="day-select-standard-label">Day</InputLabel>
                            <Select
                                labelId="day-select-standard-label"
                                id="day-select-standard"
                                value={modalDay}
                                onChange={handleDayChange}
                                label="Day"
                            >
                                {weekdays.map(weekday => (
                                    <MenuItem key={weekday} value={weekday}>{weekday}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl
                            variant="standard"
                            sx={{ pb: 2, minWidth: 180 }}
                        >
                            <InputLabel id="staff-select-standard-label">Staff Member</InputLabel>
                            <Select
                                labelId="staff-select-standard-label"
                                id="staff-select-standard"
                                value={modalStaff}
                                onChange={handleStaffChange}
                                label="Staff Member"
                            >
                                {staff ? staff.map(member => (
                                    <MenuItem key={member._id} value={member._id}>{member.name}</MenuItem>
                                )) : ''}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl
                            variant="standard"
                            sx={{ pb: 2, minWidth: 180 }}
                        >
                            <InputLabel id="room-select-standard-label">Room</InputLabel>
                            <Select
                                labelId="room-select-standard-label"
                                id="room-select-standard"
                                value={modalRoom}
                                onChange={handleRoomChange}
                                label="Room"
                            >
                                {rooms ? rooms.map(room => (
                                    <MenuItem key={room._id} value={room._id}>{room.name}</MenuItem>
                                )) : ''}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl
                            variant="standard"
                            sx={{ pb: 2, minWidth: 180 }}
                        >
                            <InputLabel id="lesson-select-standard-label">Lesson</InputLabel>
                            <Select
                                labelId="lesson-select-standard-label"
                                id="lesson-select-standard"
                                value={modalLesson}
                                onChange={handleLessonChange}
                                label="Room"
                            >
                                {lessons ? lessons.map(lesson => (
                                    <MenuItem key={lesson._id} value={lesson._id}>{lesson.name}</MenuItem>
                                )) : ''}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl
                            variant="standard"
                            sx={{ pb: 2, minWidth: 180 }}
                        >
                            <InputLabel id="time-start-select-standard-label">Start</InputLabel>
                            <Select
                                labelId="time-start-select-standard-label"
                                id="time-start-select-standard"
                                value={modalStart}
                                onChange={handleStartChange}
                                label="Start"
                            >
                                {times.map(time => (
                                    <MenuItem key={time} value={time}>{timeString(time)}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl
                            variant="standard"
                            sx={{ pb: 2, minWidth: 180 }}
                        >
                            <InputLabel id="time-end-select-standard-label">End</InputLabel>
                            <Select
                                labelId="time-end-select-standard-label"
                                id="time-end-select-standard"
                                value={modalEnd}
                                onChange={handleEndChange}
                                label="End"
                            >
                                {times.map(time => (
                                    <MenuItem key={time} value={time}>{timeString(time)}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </CustomModal>
    )
}

export default ScheduleModal
