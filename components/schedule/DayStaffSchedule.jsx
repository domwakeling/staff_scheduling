import { MODE_ADD, MODE_EDIT, weekdays } from '../../lib/constants';
import { CALENDAR_WIDTH, TIME_WIDTH, colors } from '../../lib/constants';
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
import SkeletonColumn from './SkeletonColumn';
import TimeColumn from './TimeColumn';
import useLessons from '../../lib/db_lessons';
import useRooms from '../../lib/db_rooms';
import { useRegularDays } from '../../lib/db_schedule_regular';
import useStaff from '../../lib/db_staff';
import { useState } from 'react';

const DayStaffSchedule = (props) => {

    const { setModalMode, showModal, clearModal, modalMode, ...other } = props;

    const [day, setDay] = useState('Monday');

    const handleChange = (event) => {
        setDay(event.target.value);
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
    const { regularDays } = useRegularDays(day);
    const { rooms } = useRooms();
    const { staff, isLoading, isError } = useStaff();

    const columnData = (staffid) => {
        if (regularDays) {
            return regularDays
                .filter(item => item.staff == staffid)
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

    const columnCount = (!isLoading && !isError) ? staff.length : 1;

    return (
        <Paper
            elevation={3}
            sx={{ p: 1, width: `${CALENDAR_WIDTH * columnCount + TIME_WIDTH + 24}px` }}
        >
            <Box>
                <Box sx={{ my: 1, pl: 1 }}>
                    <FormControl
                        variant="standard"
                        sx={{ marginLeft: `${TIME_WIDTH}px`, pb: 2, minWidth: 120 }}
                    >
                        <InputLabel id="day-select-standard-label">Day</InputLabel>
                        <Select
                            labelId="day-select-standard-label"
                            id="day-select-standard"
                            value={day}
                            onChange={handleChange}
                            label="Day"
                        >
                            {weekdays.map(weekday => (
                                <MenuItem key={weekday} value={weekday}>{weekday}</MenuItem>
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
                {!isLoading && !isError && staff && staff.map(member => (
                    <Grid item key={`column-${member._id}`}>
                        <CalendarColumn
                            key={`column-${member._id}`}
                            label={`${member.name}`}
                            schedule={columnData(member._id)}
                            {...other}
                        />
                    </Grid>
                ))}
                {isLoading && (
                    <Grid item key={`column-skeleton`}>
                        <SkeletonColumn />
                    </Grid>
                )}
            </Grid>
        </Paper>
    )
}

export default DayStaffSchedule;
