import Box from '@mui/material/Box';
import CustomSnackbar from '../components/layout/CustomSnackbar';
import Head from 'next/head';
import LessonTab from '../components/admin/lessons/LessonTab';
import RoomTab from '../components/admin/rooms/RoomTab';
import SignInPanel from '../components/auth/SignInPanel';
import StaffTab from '../components/admin/staff/StaffTab';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../components/layout/TabPanel';
import TransferTab from '../components/admin/transfer/TransferTab';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Admin() {
    
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const router = useRouter();

    const { data: session } = useSession();
    
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
                { session && session.user.name == 'Admin' && (
                    <div>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={activeTabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                                <Tab label="Staff" {...a11yProps(0)} />
                                <Tab label="Lessons" {...a11yProps(1)} />
                                <Tab label="Rooms" {...a11yProps(2)} />
                                <Tab label="Download/Upload" {...a11yProps(3)} />
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
                        <TabPanel activeTabIndex={activeTabIndex} index={3}>
                            <TransferTab snackbarUse={snackbarSendMessage} />
                        </TabPanel>
                        <CustomSnackbar
                            openState={snackbarOpen}
                            setOpenState={setSnackbarOpen}
                            severity={snackbarSeverity}
                            message={snackbarMessage}
                        />
                    </div>
                )}
                { session && session.user.name != 'Admin' && (
                    <Box sx={{ pt: 2, px: 3 }}>
                        <Typography gutterBottom variant="h4" component="h1">
                            Admin Panel
                        </Typography>
                        <Typography>
                            You are not authorised to use the Admin Panel.
                        </Typography>
                    </Box>
                )}
                { !session && (
                    <Box sx={{ pt: 2, px: 3 }}>
                        <Typography gutterBottom variant="h4" component="h1">
                            Admin Panel
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
