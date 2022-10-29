import Box from '@mui/material/Box'
import Head from 'next/head';
import Link from '../components/common/Link';
import Typography from '@mui/material/Typography';

export default function About() {
    return (
        <div>
            <Head>
                <title>Staff Scheduling - About</title>
                <meta name="description" content="About and contact for scheduling app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ pt: 2, px: 3 }}>
                <Typography gutterBottom component="h1" variant='h4'>
                    About
                </Typography>
                <Typography gutterBottom>
                    <strong>Staff Scheduling App</strong> is a demonstration project; a complete
                    implementation includes sign-in/authenication and the ability to generate
                    &ldquo;bespoke&rdquo; weekly schedules, which can be emailed to staff members.
                </Typography>
                <Typography gutterBottom>
                    If you would like to discuss having this system run for your business/club,
                    please contact
                    {" "}
                    <Link href="mailto:domwakeling@gmail.com">Dom Wakeling</Link> to discuss options.
                </Typography>
            </Box>
        </div>
    )
}
