import { useState } from 'react';
import Box from '@mui/material/Box';
import CustomSnackbar from '../components/layout/CustomSnackbar';
import Head from 'next/head';
import LessonTab from '../components/admin/lessons/LessonTab';
import RoomTab from '../components/admin/rooms/RoomTab';
import StaffTab from '../components/admin/staff/StaffTab';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../components/layout/TabPanel';

export default function Admin() {

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    
    const snackbarSendMessage = (options) => {
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
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="Staff" {...a11yProps(0)} />
                        <Tab label="Lessons" {...a11yProps(1)} />
                        <Tab label="Rooms" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel activeTabIndex={activeTabIndex} index={0}>
                    <StaffTab snackbarUse={snackbarSendMessage}/>
                </TabPanel>
                <TabPanel activeTabIndex={activeTabIndex} index={1}>
                    <LessonTab snackbarUse={snackbarSendMessage} />
                </TabPanel>
                <TabPanel activeTabIndex={activeTabIndex} index={2}>
                    <RoomTab snackbarUse={snackbarSendMessage} />
                </TabPanel>
                <CustomSnackbar
                    openState={snackbarOpen}
                    setOpenState={setSnackbarOpen}
                    severity={snackbarSeverity}
                    message={snackbarMessage}
                />
            </Box>
        </div>
    )
}
