import { MODE_ADD, MODE_EDIT } from '../lib/constants';
import Box from '@mui/material/Box';
import CustomSnackbar from '../components/layout/CustomSnackbar';
import Head from 'next/head';
import DayRoomSchedule from '../components/schedule/DayRoomSchedule';
import DayStaffSchedule from '../components/schedule/DayStaffSchedule';
import { mutate } from 'swr';
import RoomSchedule from '../components/schedule/RoomSchedule';
import ScheduleItemEditMenu from '../components/schedule/ScheduleItemEditMenu';
import ScheduleModal from '../components/schedule/ScheduleModal';
import ScheduleRemoveDialog from '../components/schedule/ScheduleRemoveDialog';
import SignInPanel from '../components/auth/SignInPanel';
import StaffSchedule from '../components/schedule/StaffSchedule';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../components/layout/TabPanel';
import Typography from '@mui/material/Typography';
import { useChannel } from '../hooks/ably';
import useMediaQuery from '@mui/material/useMediaQuery';
import useRooms from '../hooks/rooms';
import { useSession } from 'next-auth/react';
import useStaff from '../hooks/staff';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { weekdaysArray } from '../lib/weekdays';

export default function Calendar() {

    const { staff: allStaff, isLoading: staffLoading } = useStaff();
    const { rooms: allRooms, isLoading: roomsLoading } = useRooms();

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

    // state & interaction - tab
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    function a11yProps(index) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
        };
    }

    const handleTabChange = (event, newActiveTabIndex) => {
        setActiveTabIndex(newActiveTabIndex);
    };

    const theme = useTheme();
    const mediumScreenUp = useMediaQuery(theme.breakpoints.up('md'));

    // secure page if not logged in
    const { data: session } = useSession();

    // state & interaction - snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const messageSnackbar = (options) => {
        setSnackbarSeverity(options.severity || 'info');
        setSnackbarMessage(options.message || '');
        setSnackbarOpen(true);
    }

    // state & interaction - modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(MODE_ADD);
    const [modalDay, setModalDay] = useState('');
    const [modalDayOld, setModalDayOld] = useState('');
    const [modalStart, setModalStart] = useState('');
    const [modalEnd, setModalEnd] = useState('');
    const [modalStaff, setModalStaff] = useState('');
    const [modalStaffOld, setModalStaffOld] = useState('');
    const [modalLesson, setModalLesson] = useState('');
    const [modalRoom, setModalRoom] = useState('');
    const [modalRoomOld, setModalRoomOld] = useState('');
    const [modalScheduleId, setModalScheduleId] = useState('');
    const [scheduleDay, setScheduleDay] = useState('Monday');
    const [scheduleStaff, setScheduleStaff] = useState('');
    const [scheduleRoom, setScheduleRoom] = useState('');
    const [scheduleWeek, setScheduleWeek] = useState('Week A');

    const clearModal = () => {
        setModalDay('');
        setModalDayOld('');
        setModalStart('');
        setModalEnd('');
        setModalStaff('');
        setModalStaffOld('');
        setModalLesson('');
        setModalRoom('');
        setModalRoomOld('');
        setModalScheduleId('');
    }

    const handleModalClose = () => {
        setModalOpen(false);
        clearModal();
    };

    const showModal = () => {
        setModalOpen(true);
    };

    const addButtonHandler = (event) => {
        event.preventDefault();
        if (modalMode == MODE_EDIT) {
            clearModal();
        }
        setModalMode(MODE_ADD);
        showModal();
    }

    // state & interaction - edit menu
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const menuOpen = menuAnchorEl ? true : false;

    const showMenu = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setMenuAnchorEl(null);
    };

    const prepareModal = (item) => {
        setModalDay(item.day);
        setModalStart(item.start);
        setModalEnd(item.end);
        setModalStaff(item.staff);
        setModalLesson(item.lesson);
        setModalRoom(item.room);
        setModalScheduleId(item._id);
        setModalMode(MODE_EDIT);
        setModalDayOld(item.day);
        setModalRoomOld(item.room);
        setModalStaffOld(item.staff);
    }

    const menuEditClick = (event) => {
        showModal();
    }

    // state & interaction - delete dialoig
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogScheduleItem, setDialogScheduleItem] = useState('');

    const dialogCloseHandler = () => {
        setDialogOpen(false);
        setDialogScheduleItem('');
        clearModal(); // because the modal will be prepared when the mini-Menu is shown
    }

    const prepareDialog = (item) => {
        setDialogScheduleItem(item);
    }

    const showDialog = () => {
        setDialogOpen(true);
    }

    const scheduleCommonProps = {
        addButtonHandler: addButtonHandler,
        showMenu: showMenu,
        prepareModal: prepareModal,
        messageSnackbar: messageSnackbar,
        prepareDialog: prepareDialog,
        scheduleDay: scheduleDay,
        setScheduleDay: setScheduleDay,
        scheduleRoom: scheduleRoom,
        setScheduleRoom: setScheduleRoom,
        scheduleStaff: scheduleStaff,
        setScheduleStaff: setScheduleStaff,
        scheduleWeek: scheduleWeek,
        setScheduleWeek: setScheduleWeek
    }

    return (
        <div>
            <Head>
                <title>Staff Scheduling - Schedule</title>
                <meta name="description" content="Scheduling panel" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ width: '100%' }}>
                { session ? (
                    <div>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                            <Tabs
                                value={activeTabIndex}
                                onChange={handleTabChange}
                                variant={mediumScreenUp ? "standard" : "scrollable"}
                                aria-label="basic tabs example"
                                centered={mediumScreenUp ? true : false}
                            >
                                <Tab label="By Room" {...a11yProps(0)} />
                                <Tab label="By Staff" {...a11yProps(1)} />
                                <Tab label="By Day & Room" {...a11yProps(2)} />
                                <Tab label="By Day & Staff" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <TabPanel activeTabIndex={activeTabIndex} notPadded index={0}>
                            <RoomSchedule {...scheduleCommonProps} />
                        </TabPanel>
                        <TabPanel activeTabIndex={activeTabIndex} notPadded index={1}>
                            <StaffSchedule {...scheduleCommonProps} />
                        </TabPanel>
                        <TabPanel activeTabIndex={activeTabIndex} notPadded index={2}>
                            <DayRoomSchedule {...scheduleCommonProps} />
                        </TabPanel>
                        <TabPanel activeTabIndex={activeTabIndex} notPadded index={3}>
                            <DayStaffSchedule {...scheduleCommonProps} />
                        </TabPanel>
                        <CustomSnackbar
                            openState={snackbarOpen}
                            setOpenState={setSnackbarOpen}
                            severity={snackbarSeverity}
                            message={snackbarMessage}
                        />
                        <ScheduleModal
                            closeHandler={handleModalClose}
                            modalOpen={modalOpen}
                            modalMode={modalMode}
                            messageSnackbar={messageSnackbar}
                            modalDay={modalDay}
                            setModalDay={setModalDay}
                            modalStart={modalStart}
                            setModalStart={setModalStart}
                            modalEnd={modalEnd}
                            setModalEnd={setModalEnd}
                            modalStaff={modalStaff}
                            setModalStaff={setModalStaff}
                            modalLesson={modalLesson}
                            setModalLesson={setModalLesson}
                            modalRoom={modalRoom}
                            setModalRoom={setModalRoom}
                            modalScheduleId={modalScheduleId}
                            setModalScheduleId={setModalScheduleId}
                            modalDayOld={modalDayOld}
                            modalRoomOld={modalRoomOld}
                            modalStaffOld={modalStaffOld}
                            scheduleWeek={scheduleWeek}
                        />
                        <ScheduleItemEditMenu
                            anchorEl={menuAnchorEl}
                            open={menuOpen}
                            handleClose={closeMenu}
                            handleEditClick={menuEditClick}
                            handleDeleteClick={showDialog}
                        />
                        <ScheduleRemoveDialog
                            scheduleItem={dialogScheduleItem}
                            dialogOpen={dialogOpen}
                            messageSnackbar={messageSnackbar}
                            dialogCloseHandler={dialogCloseHandler}
                        />
                </div>
            ) : (
                <Box sx={{ pt: 2, px: 3 }}>
                    <Typography gutterBottom variant="h4" component="h1">
                        Schedules
                    </Typography>
                    <Typography>
                        Please sign in to view this content.
                    </Typography>
                    <SignInPanel />
                </Box>
            )}
            </Box>
        </div>
    )
}
