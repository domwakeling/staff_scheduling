import { MODE_ADD, MODE_EDIT } from '../lib/constants';
import Box from '@mui/material/Box';
import CustomSnackbar from '../components/layout/CustomSnackbar';
import Head from 'next/head';
import DayRoomSchedule from '../components/schedule/DayRoomSchedule';
import DayStaffSchedule from '../components/schedule/DayStaffSchedule';
import RoomSchedule from '../components/schedule/RoomSchedule';
import ScheduleItemEditMenu from '../components/schedule/ScheduleItemEditMenu';
import ScheduleModal from '../components/schedule/ScheduleModal';
import ScheduleRemoveDialog from '../components/schedule/ScheduleRemoveDialog';
import StaffSchedule from '../components/schedule/StaffSchedule';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../components/layout/TabPanel';
import { useState } from 'react';

export default function Calendar() {

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

    // state & interaction - snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const snackbarSendMessage = (options) => {
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

    return (
        <div>
            <Head>
                <title>Staff Scheduling - Schedule</title>
                <meta name="description" content="Scheduling panel" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="By Room" {...a11yProps(0)} />
                        <Tab label="By Staff" {...a11yProps(1)} />
                        <Tab label="By Day & Room" {...a11yProps(2)} />
                        <Tab label="By Day & Staff" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel activeTabIndex={activeTabIndex} index={0}>
                    <RoomSchedule
                        addButtonHandler={addButtonHandler}
                        showMenu={showMenu}
                        prepareModal={prepareModal}
                        snackbarSendMessage={snackbarSendMessage}
                        prepareDialog={prepareDialog}
                        scheduleDay={scheduleDay}
                        setScheduleDay={setScheduleDay}
                        scheduleRoom={scheduleRoom}
                        setScheduleRoom={setScheduleRoom}
                        scheduleStaff={scheduleStaff}
                        setScheduleStaff={setScheduleStaff}
                        scheduleWeek={scheduleWeek}
                        setScheduleWeek={setScheduleWeek}
                    />
                </TabPanel>
                <TabPanel activeTabIndex={activeTabIndex} index={1}>
                    <StaffSchedule
                        addButtonHandler={addButtonHandler}
                        showMenu={showMenu}
                        prepareModal={prepareModal}
                        snackbarSendMessage={snackbarSendMessage}
                        prepareDialog={prepareDialog}
                        scheduleDay={scheduleDay}
                        setScheduleDay={setScheduleDay}
                        scheduleRoom={scheduleRoom}
                        setScheduleRoom={setScheduleRoom}
                        scheduleStaff={scheduleStaff}
                        setScheduleStaff={setScheduleStaff}
                        scheduleWeek={scheduleWeek}
                        setScheduleWeek={setScheduleWeek}
                    />
                </TabPanel>
                <TabPanel activeTabIndex={activeTabIndex} index={2}>
                    <DayRoomSchedule
                        addButtonHandler={addButtonHandler}
                        showMenu={showMenu}
                        prepareModal={prepareModal}
                        snackbarSendMessage={snackbarSendMessage}
                        prepareDialog={prepareDialog}
                        scheduleDay={scheduleDay}
                        setScheduleDay={setScheduleDay}
                        scheduleRoom={scheduleRoom}
                        setScheduleRoom={setScheduleRoom}
                        scheduleStaff={scheduleStaff}
                        setScheduleStaff={setScheduleStaff}
                        scheduleWeek={scheduleWeek}
                        setScheduleWeek={setScheduleWeek}
                    />
                </TabPanel>
                <TabPanel activeTabIndex={activeTabIndex} index={3}>
                    <DayStaffSchedule
                        addButtonHandler={addButtonHandler}
                        showMenu={showMenu}
                        prepareModal={prepareModal}
                        snackbarSendMessage={snackbarSendMessage}
                        prepareDialog={prepareDialog}
                        scheduleDay={scheduleDay}
                        setScheduleDay={setScheduleDay}
                        scheduleRoom={scheduleRoom}
                        setScheduleRoom={setScheduleRoom}
                        scheduleStaff={scheduleStaff}
                        setScheduleStaff={setScheduleStaff}
                        scheduleWeek={scheduleWeek}
                        setScheduleWeek={setScheduleWeek}
                    />
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
                    snackbarUse={snackbarSendMessage}
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
                    snackbarUse={snackbarSendMessage}
                    dialogCloseHandler={dialogCloseHandler}
                />
            </Box>
        </div>
    )
}
