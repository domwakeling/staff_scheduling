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
import TimeColumn from './TimeColumn';
import useRooms from '../../lib/db_rooms';

const RoomSchedule = (props) => {

    const { setModalMode, showModal, snackBarSendMessage } = props;

    const [room, setRoom] = useState('');

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleChange = (event) => {
        setRoom(event.target.value);
    };

    const addButtonHandler = (event) => {
        event.preventDefault();
        setModalMode(MODE_ADD);
        showModal();
    }

    const { rooms } = useRooms();

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
                        <InputLabel id="room-select-standard-label">Room</InputLabel>
                        <Select
                            labelId="room-select-standard-label"
                            id="room-select-standard"
                            value={room}
                            onChange={handleChange}
                            label="Room"
                        >
                            {rooms && rooms.map(activeRoom => (
                                <MenuItem key={activeRoom._id} value={activeRoom._id}>{activeRoom.name}</MenuItem>
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
                {weekdays.map(weekday => (
                    <Grid item key={`column-${weekday}`}>
                        <CalendarColumn key={`column-${weekday}`} label={`${weekday}`} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}

export default RoomSchedule;