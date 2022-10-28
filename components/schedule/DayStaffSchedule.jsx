import { MODE_ADD } from '../../lib/constants';
import { useState } from 'react';
import { CALENDAR_WIDTH, TIME_WIDTH } from '../../lib/constants';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import CalendarColumn from './ScheduleColumn';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import SkeletonColumn from './SkeletonColumn';
import TimeColumn from './TimeColumn';
import useStaff from '../../lib/db_staff';

const DayStaffSchedule = (props) => {

    const { setModalMode, showModal, snackBarSendMessage } = props;

    const [day, setDay] = useState('Monday');

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleChange = (event) => {
        setDay(event.target.value);
    };

    const addButtonHandler = (event) => {
        event.preventDefault();
        setModalMode(MODE_ADD);
        showModal();
    }

    const { staff, isLoading, isError } = useStaff();

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
                <TimeColumn key={`column-time`} label={`Col-time`} />
                {!isLoading && !isError && staff && staff.map(member => (
                    <Grid item key={`column-${member._id}`}>
                        <CalendarColumn key={`column-${member._id}`} label={`${member.name}`} />
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
