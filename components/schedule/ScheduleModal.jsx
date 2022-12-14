import { MODE_ADD, DAY_START, DAY_END } from '../../lib/constants';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomModal from "../layout/CustomModal";
import CustomSelect from '../common/CustomSelect';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import useLessons from '../../hooks/lessons';
import useRooms from '../../hooks/rooms';
import useStaff from '../../hooks/staff';

const ScheduleModal = (props) => {

    const { lessons } = useLessons();
    const { rooms } = useRooms();
    const { staff } = useStaff();

    const {
        closeHandler,
        modalOpen,
        modalMode,
        messageSnackbar,
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
        modalDayOld,
        modalRoomOld,
        modalStaffOld,
        scheduleWeek
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
        if (isEmpty(modalDay) || isEmpty(modalStaff) || isEmpty(modalLesson) || isEmpty(modalRoom) ) {
            messageSnackbar({ severity: 'error', message: 'Entries cannot be blank' });
            return null;
        }
        if (modalStart == '' || modalStart < DAY_START || modalStart >= DAY_END || modalStart == 0) {
            messageSnackbar({ severity: 'error', message: 'Start time is invalid' });
            return null;
        }
        if (modalEnd == '' || modalEnd <= DAY_START || modalEnd > DAY_END || modalEnd == 0 || modalEnd <= modalStart) {
            messageSnackbar({ severity: 'error', message: 'End time is invalid' });
            return null;
        }
        // // data in the form is good
        try {
            // try to add new schedule or update existing
            const res = await axios({
                method: modalMode == MODE_ADD ? 'post' : 'put',
                url: modalMode == MODE_ADD ? '/api/schedule/regular/new' : `/api/schedule/regular/${modalScheduleId}`,
                timeout: 6000,
                data: {
                    day: modalDay,
                    start: modalStart,
                    end: modalEnd,
                    staffid: modalStaff,
                    roomid: modalRoom,
                    lessonid: modalLesson,
                    week: scheduleWeek,
                    oldDay: modalDay !== modalDayOld ? modalDayOld : null,
                    oldRoom: modalRoom !== modalRoomOld ? modalRoomOld : null,
                    oldStaff: modalStaff !== modalStaffOld ? modalStaffOld : null,
                }
            });
            // success => message, clear the modal & close the modal (mutation dealt with by Ably)
            messageSnackbar({ severity: 'success', message: 'Schedule updated' });
            setModalDay('');
            setModalStart('');
            setModalEnd('');
            setModalLesson('');
            setModalRoom('');
            setModalStaff('');
            closeHandler({ preventDefault: () => { } });
        } catch (err) {
            // failure => show the message, don't clear or close the modal
            messageSnackbar({
                severity: 'error',
                message: (err.response && err.response.data && err.response.data.message) || err.message
            });
        }
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
                    <CustomSelect
                        value={modalDay}
                        changeHandler={handleDayChange}
                        idText="day-select-standard"
                        labelText="Day"
                    >
                        {weekdays.map(weekday => (
                            <MenuItem key={weekday} value={weekday}>{weekday}</MenuItem>
                        ))}
                    </CustomSelect>
                    <CustomSelect
                        value={modalStart}
                        changeHandler={handleStartChange}
                        idText="time-start-select-standard"
                        labelText="Start"
                    >
                        {times.map(time => (
                            <MenuItem key={time} value={time}>{timeString(time)}</MenuItem>
                        ))}
                    </CustomSelect>
                    <CustomSelect
                        value={modalEnd}
                        changeHandler={handleEndChange}
                        idText="time-end-select-standard"
                        labelText="End"
                    >
                        {times.map(time => (
                            <MenuItem key={time} value={time}>{timeString(time)}</MenuItem>
                        ))}
                    </CustomSelect>
                    <CustomSelect
                        value={modalStaff}
                        changeHandler={handleStaffChange}
                        idText="staff-select-standard"
                        labelText="Staff"
                    >
                        {staff ? staff.map(member => (
                            <MenuItem key={member._id} value={member._id}>{member.name}</MenuItem>
                        )) : <MenuItem key={'blank'} value={''}>Loading ...</MenuItem>}
                    </CustomSelect>
                    <CustomSelect
                        value={modalLesson}
                        changeHandler={handleLessonChange}
                        idText="lesson-select-standard"
                        labelText="Lesson"
                    >
                        {lessons ? lessons.map(lesson => (
                            <MenuItem key={lesson._id} value={lesson._id}>{lesson.name}</MenuItem>
                        )) : <MenuItem key={'blank'} value={''}>Loading ...</MenuItem>}
                    </CustomSelect>
                    <CustomSelect
                        value={modalRoom}
                        changeHandler={handleRoomChange}
                        idText="room-select-standard"
                        labelText="Room"
                    >
                        {rooms ? rooms.map(room => (
                            <MenuItem key={room._id} value={room._id}>{room.name}</MenuItem>
                        )) : <MenuItem key={'blank'} value={''}>Loading ...</MenuItem>}
                    </CustomSelect>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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
            </Box>
        </CustomModal>
    )
}

export default ScheduleModal
