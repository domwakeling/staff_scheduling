import { CALENDAR_WIDTH, TIME_WIDTH } from '../../lib/constants';
import CalendarColumn from './ScheduleColumn';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TimeColumn from './TimeColumn';
import useRooms from '../../lib/db_rooms';

const Schedule = (props) => {

    const { rooms, isLoading, isError } = useRooms();

    return (
        <Paper elevation={3} sx={{ m: 2, py: 1, width: `${CALENDAR_WIDTH * 3 + TIME_WIDTH + 24}px` }}>
            <Grid container sx={{ width: `${CALENDAR_WIDTH * 3 + TIME_WIDTH}px`, m: 1 }}>
                <TimeColumn key={`column-time`} label={`Col-time`} />
                {!isLoading && !isError && rooms && rooms.map(room => (
                    <Grid item key={`column-${room._id}`}>
                        <CalendarColumn key={`column-${room._id}`} label={`${room.name}`} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}

export default Schedule;
