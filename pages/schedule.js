import { useState } from 'react';
import { CALENDAR_WIDTH, TIME_WIDTH } from '../lib/constants';
import Box from '@mui/material/Box';
import CalendarColumn from '../components/schedule/ScheduleColumn';
import CustomSnackbar from '../components/layout/CustomSnackbar';
import Grid from '@mui/material/Grid';
import Head from 'next/head';
import Paper from '@mui/material/Paper';
import TimeColumn from '../components/schedule/TimeColumn';

import useRooms from '../lib/db_rooms';

export default function Calendar() {

    const { rooms, isLoading, isError } = useRooms();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const snackbarSendMessage = (options) => {
        setSnackbarSeverity(options.severity || 'info');
        setSnackbarMessage(options.message || '');
        setSnackbarOpen(true);
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Box sx={{ width: '100%' }}> */}
            {/* <Box> */}
            <Paper elevation={3} sx={{ m: 2, py: 1, width: `${CALENDAR_WIDTH * 3 + TIME_WIDTH + 24}px` }}>
                <Grid container sx={{ width: `${CALENDAR_WIDTH * 3 + TIME_WIDTH}px`, m: 1}}>
                <TimeColumn key={`column-time`} label={`Col-time`} />
                {!isLoading && !isError && rooms && rooms.map(room => (
                    <Grid item key={`column-${room._id}`}>
                        <CalendarColumn key={`column-${room._id}`} label={`${room.name}`} />
                    </Grid>
                ))}
                </Grid>
                <CustomSnackbar
                    openState={snackbarOpen}
                    setOpenState={setSnackbarOpen}
                    severity={snackbarSeverity}
                    message={snackbarMessage}
                />
            </Paper>
            {/* </Box> */}
        </div>
    )
}
