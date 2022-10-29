import { MODE_ADD, MODE_EDIT, weekdays } from '../../lib/constants';
import { CALENDAR_WIDTH, TIME_WIDTH, colors} from '../../lib/constants';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import CalendarColumn from './CalendarColumn';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TimeColumn from './TimeColumn';
import useLessons from '../../lib/db_lessons';
import useRooms from '../../lib/db_rooms';
import { useRegularStaff } from '../../lib/db_schedule_regular';
import useStaff from '../../lib/db_staff';
import { useState } from 'react';

const StaffSchedule = (props) => {

    const { setModalMode, showModal, clearModal, modalMode, ...other } = props;

    const [staffMember, setStaffMember] = useState('');

    const handleChange = (event) => {
        setStaffMember(event.target.value);
    };

    const addButtonHandler = (event) => {
        event.preventDefault();
        if (modalMode == MODE_EDIT) {
            clearModal();
        }
        setModalMode(MODE_ADD);
        showModal();
    }

    const { lessons } = useLessons();
    const { regularStaff } = useRegularStaff(staffMember);
    const { rooms } = useRooms();
    const { staff } = useStaff();

    const columnData = (weekday) => {
        if (regularStaff) {
            return regularStaff
                .filter(item => item.day == weekday)
                .reduce((prev, item) => {
                    // use reduce to guard against looking up an entity that has been deleted
                    if (lessons.filter(obj => obj._id == item.lesson).length == 0) return prev;
                    if (rooms.filter(obj => obj._id == item.room).length == 0) return prev;
                    // protected succesfully so add to the return
                    const newEntry = {
                        _id: item._id,
                        start: item.start,
                        end: item.end,
                        bg: colors[lessons.filter(obj => obj._id == item.lesson)[0].color].bg,
                        fg: colors[lessons.filter(obj => obj._id == item.lesson)[0].color].fg,
                        value1: lessons.filter(obj => obj._id == item.lesson)[0].name,
                        value2: rooms.filter(obj => obj._id == item.room)[0].name,
                        item: item
                    }
                    return prev.concat(newEntry)
                }, []);
        }
        return [];
    }

    const columnCount = 7;

    return (
        <Paper
            elevation={3}
            sx={{ p: 1, width: `${CALENDAR_WIDTH * columnCount + TIME_WIDTH + 24}px` }}
        >
            <Box>
                <Box sx={{ my: 1, pl: 1 }}>
                    <FormControl
                        variant="standard"
                        sx={{ marginLeft: `${TIME_WIDTH}px`, pb: 2, minWidth: 200 }}
                    >
                        <InputLabel id="staff-select-standard-label">Staff Member</InputLabel>
                        <Select
                            labelId="staff-select-standard-label"
                            id="staff-select-standard"
                            value={staffMember}
                            onChange={handleChange}
                            label="Staff Member"
                        >
                            {staff && staff.map(member => (
                                <MenuItem key={member._id} value={member._id}>{member.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Fab color='primary' aria-label='Add' onClick={addButtonHandler} sx={{ ml: 4 }}>
                        <AddIcon />
                    </Fab>
                </Box>
            </Box>
            <Grid container sx={{ width: `${CALENDAR_WIDTH * columnCount + TIME_WIDTH}px` }}>
                <TimeColumn key={`column-time`} />
                {weekdays.map(weekday => (
                    <Grid item key={`column-${weekday}`}>
                        <CalendarColumn
                            key={`column-${weekday}`}
                            label={`${weekday}`}
                            schedule={columnData(weekday)}
                            {...other}
                        />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}

export default StaffSchedule;
