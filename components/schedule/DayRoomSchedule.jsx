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

const DayRoomSchedule = (props) => {

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
    const { rooms, isLoading, isError } = useRooms();
    const { staff } = useStaff();

    const columnData = (roomid) => {
        if (regularDays) {
            return regularDays
                .filter(item => item.room == roomid)
                .reduce((prev, item) => {
                    // use reduce to guard against looking up an entity that has been deleted
                    if (lessons.filter(obj => obj._id == item.lesson).length == 0) return prev;
                    if (staff.filter(obj => obj._id == item.staff).length == 0) return prev;
                    // protected succesfully so add to the return
                    const newEntry ={
                        id: item._id,
                        start: item.start,
                        end: item.end,
                        bg: colors[lessons.filter(obj => obj._id == item.lesson)[0].color].bg,
                        fg: colors[lessons.filter(obj => obj._id == item.lesson)[0].color].fg,
                        value1: lessons.filter(obj => obj._id == item.lesson)[0].name,
                        value2: staff.filter(obj => obj._id == item.staff)[0].name,
                        item: item
                    }
                    return prev.concat(newEntry)
                }, []);
        }
        return [];
    }

    const columnCount = (!isLoading && !isError) ? rooms.length : 1;

    return (
        <Paper
            elevation={3}
            sx={{ p: 1, width: `${CALENDAR_WIDTH * columnCount + TIME_WIDTH + 24}px`}}
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
                    <Fab color='primary' aria-label='Add' onClick={addButtonHandler} sx={{ml: 4}}>
                        <AddIcon />
                    </Fab>
                </Box>
            </Box>
            <Grid container sx={{ width: `${CALENDAR_WIDTH * columnCount + TIME_WIDTH}px` }}>
                <TimeColumn key={`column-time`} />
                {!isLoading && !isError && rooms && rooms.map(room => (
                    <Grid item key={`column-${room._id}`}>
                        <CalendarColumn
                            key={`column-${room._id}`}
                            label={`${room.name}`}
                            schedule={columnData(room._id)}
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

export default DayRoomSchedule;
