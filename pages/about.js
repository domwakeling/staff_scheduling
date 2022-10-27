import Box from '@mui/material/Box'
import Head from 'next/head';
import Typography from '@mui/material/Typography';

export default function About() {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ pt: 2, px: 3 }}>
                <Typography component="h1" variant='h4'>
                    About
                </Typography>
                <Typography>
                    This is a {"'"}work in progress{"'"} &mdash; it aims to be a fully-featured
                    scheduling app.
                </Typography>
            </Box>
        </div>
    )
}
