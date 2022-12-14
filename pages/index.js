import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Head from 'next/head';
import Link from '../components/common/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Staff Scheduling App</title>
                <meta name="description" content="Staff scheduling app homepage" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ pt: 2, px: 3 }}>
                <Typography gutterBottom component="h1" variant='h4'>
                    Welcome
                </Typography>
                <Typography gutterBottom>
                    This app helps you to schedule classes with a simple 3-step process:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar sx={{ backgroundColor: blue[700], width: 24, height: 24 }}>
                                1
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText>
                            Set up your staff, rooms/locations and lesson types in the
                            {" "}
                            <Link href="/admin">Admin panel</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar sx={{ backgroundColor: blue[700], width: 24, height: 24 }}>
                                2
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText>
                            Set up a recurring, regular weekly schedule across all staff and
                            locations in the
                            {" "}
                            <Link href="/schedule">Recurring Schedules panel</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar sx={{ width: 24, height: 24 }}>
                                3
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText sx={{ color: "gray" }}>
                            Generate a schedule for each week using the recurring schedule, with
                            the option to make one-off changes, in the
                            {" "}
                            <Link href="/">Weekly Schedules panel</Link>
                        </ListItemText>
                    </ListItem>
                </List>
                <Typography gutterBottom sx={{ fontStyle: 'italic' }}>
                    &ldquo;Bespoke&rdquo; weekly schedules are not available in this demo.
                </Typography>
                <br />
                <Typography gutterBottom>
                    Simple login is implemented in this demo. Sign in as user &ldquo;Admin&rdquo;
                    to have edit-rights to the recurring schedule and access the admin panel. Sign
                    in with any other username to get view-only access to the recurring schedule.
                </Typography>
                <Typography gutterBottom>
                    At the moment you can use any password (it&lsquo;s not being checked!)
                </Typography>
            </Box>
        </div>
    )
}
