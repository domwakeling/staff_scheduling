import { DRAWER_WIDTH } from '../../lib/constants';
import Box from '@mui/material/Box';
import Header from './Header';
import { mutate } from 'swr';
import SideDrawer from './SideDrawer';
import Toolbar from '@mui/material/Toolbar';
import { useChannel } from "@ably-labs/react-hooks";
import useRooms from '../../hooks/rooms';
import { useState } from 'react';
import useStaff from '../../hooks/staff';
import { weekdaysArray } from '../../lib/weekdays';

const Layout = ({ children }) => {

    const { staff: allStaff } = useStaff();
    const { rooms } = useRooms();

    console.log(allStaff);
    
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
                allStaff.forEach(member => mutate(`/api/schedule/regular/staff/${member._id}`));
                rooms.forEach(room => mutate(`/api/schedule/regular/room/${room._id}`));
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
                    data.regular.rooms.forEach(room => mutate(`/api/schedule/regular/room/${room}`));
                }
            }
        }
    });

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    return (
        <Box sx={{ display: 'flex', width: '100%'}}>
            <Header
                drawerWidth={DRAWER_WIDTH}
                handleDrawerToggle={handleDrawerToggle}
            />
            <SideDrawer
                drawerWidth={DRAWER_WIDTH}
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
            />
            <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
                <Toolbar />
                <main>{children}</main>
        
            </Box>
        </Box>
    )
};

export default Layout;
