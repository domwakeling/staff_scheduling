import Box from '@mui/material/Box';
import CustomSnackbar from '../components/layout/CustomSnackbar';
import Head from 'next/head';
import LessonTab from '../components/admin/lessons/LessonTab';
import { mutate } from 'swr';
import RoomTab from '../components/admin/rooms/RoomTab';
import SignInPanel from '../components/auth/SignInPanel';
import StaffTab from '../components/admin/staff/StaffTab';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../components/layout/TabPanel';
import TransferTab from '../components/admin/transfer/TransferTab';
import Typography from '@mui/material/Typography';
import { useChannel } from '../hooks/ably';
import useMediaQuery from '@mui/material/useMediaQuery';
import useRooms from '../hooks/rooms';
import { useSession } from 'next-auth/react';
import useStaff from '../hooks/staff';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { weekdaysArray } from '../lib/weekdays';

export default function Admin() {

    const { staff: allStaff, isLoading: staffLoading } = useStaff();
    const { rooms: allRooms, isLoading: roomsLoading } = useRooms();

    // Ably channel - set here because it is always present
    const [channel] = useChannel("update-published", async (message) => {
        // extract the data from the message
        const { data } = message;
        // check everything and mutate as appropriate
        if (data.staff && data.staff == true) mutate('/api/staff/getAll');
        if (data.room && data.room == true) mutate('/api/room/getAll');
        if (data.lesson && data.lesson == true) mutate('/api/lesson/getAll');
        if (data.regular) {
            // if getAll mutate every room, staff member and weekday
            if (data.regular.getAll && data.regular.getAll == true) {
                if (allStaff) {
                    allStaff.forEach(member => mutate(`/api/schedule/regular/staff/${member._id}`));
                }
                if (allRooms) {
                    allRooms.forEach(room => mutate(`/api/schedule/regular/rooms/${room._id}`));
                }
                weekdaysArray.forEach(day => mutate(`/api/schedule/regular/day/${day._id}`));
            } else {
                // if NOT getAll, check any individual staff/days/rooms that have been provided
                if (data.regular.staff) {
                    data.regular.staff.forEach(member => mutate(`/api/schedule/regular/staff/${member}`));
                }
                if (data.regular.days) {
                    data.regular.days.forEach(day => mutate(`/api/schedule/regular/day/${day}`));
                }
                if (data.regular.rooms) {
                    data.regular.rooms.forEach(room => mutate(`/api/schedule/regular/rooms/${room}`));
                }
            }
        }
    });
    
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const theme = useTheme();
    const mediumScreenUp = useMediaQuery(theme.breakpoints.up('md'));

    const { data: session } = useSession();
    
    const messageSnackbar = (options) => {
        setSnackbarSeverity(options.severity || 'info');
        setSnackbarMessage(options.message || '');
        setSnackbarOpen(true);
    }

    function a11yProps(index) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
        };
    }

    const handleTabChange = (event, newActiveTabIndex) => {
        setActiveTabIndex(newActiveTabIndex);
    };  

    return (
        <div>
            <Head>
                <title>Staff Scheduling - Admin Panel</title>
                <meta name="description" content="Admin panel for staff scheduling app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ width: '100%' }}>
                { session && session.user.role == 'admin' && (
                    <div>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={activeTabIndex}
                                onChange={handleTabChange}
                                variant={mediumScreenUp ? "standard" : "scrollable"}
                                aria-label="basic tabs example"
                                centered={mediumScreenUp ? true : false}
                            >
                                <Tab label="Staff" {...a11yProps(0)} />
                                <Tab label="Lessons" {...a11yProps(1)} />
                                <Tab label="Rooms" {...a11yProps(2)} />
                                <Tab label="Schedule" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <TabPanel activeTabIndex={activeTabIndex} index={0}>
                            <StaffTab messageSnackbar={messageSnackbar}/>
                        </TabPanel>
                        <TabPanel activeTabIndex={activeTabIndex} index={1}>
                            <LessonTab messageSnackbar={messageSnackbar} />
                        </TabPanel>
                        <TabPanel activeTabIndex={activeTabIndex} index={2}>
                            <RoomTab messageSnackbar={messageSnackbar} />
                        </TabPanel>
                        <TabPanel activeTabIndex={activeTabIndex} index={3}>
                            <TransferTab messageSnackbar={messageSnackbar} />
                        </TabPanel>
                        <CustomSnackbar
                            openState={snackbarOpen}
                            setOpenState={setSnackbarOpen}
                            severity={snackbarSeverity}
                            message={snackbarMessage}
                        />
                    </div>
                )}
                { session && session.user.role != 'admin' && (
                    <Box sx={{ pt: 2, px: 3 }}>
                        <Typography gutterBottom variant="h4" component="h1">
                            Admin Panel
                        </Typography>
                        <Typography gutterBottom>
                            You are not authorised to use the Admin Panel.
                        </Typography>
                        <Typography style={{ fontStyle: 'italic'}}>
                            To see the Admin Panel in this demo, sign out and sign back in using
                            username &ldquo;Admin&rdquo;.
                        </Typography>
                    </Box>
                )}
                { !session && (
                    <Box sx={{ pt: 2, px: 3 }}>
                        <Typography gutterBottom variant="h4" component="h1">
                            Admin Panel
                        </Typography>
                        <Typography gutterBottom>
                            Please sign in to view this content.
                        </Typography>
                        <Typography style={{ fontStyle: 'italic' }}>
                            To see the Admin Panel in this demo,sign in using
                            username &ldquo;Admin&rdquo;.
                        </Typography>
                        <SignInPanel />
                    </Box>
                )}
            </Box>
        </div>
    )
}
