import Box from '@mui/material/Box';
import Head from 'next/head';
import Link from '../components/common/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ pt: 2, px: 3 }}>
                <Typography gutterBottom component="h1" variant='h4'>
                    Welcome
                </Typography>
                <Typography gutterBottom>
                    This is a {"'"}work in progress{"'"} &mdash; at present the app allows members
                    of staff, lesson types and {"'"}rooms{"'"} to be added, edited and deleted via
                    the <Link href="/admin">Admin Panel</Link>.
                </Typography>
                <Typography gutterBottom>
                    When complete you will also be able to:
                    <ul>
                        <li>View/edit weekly schedule for each staff member</li>
                        <li>View/edit daily schedule across all rooms</li>
                    </ul>
                    Access to the admin panel and editing features will also be protected by a
                    user-authorisation system.
                </Typography>
            </Box>
        </div>
    )
}
