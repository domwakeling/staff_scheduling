// import Head so that we can set the viewport for the entire app
import Head from 'next/head';

// imports from @mui to set theme for the entire app
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// imports from /styles/ to set theme and globals
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.scss';
import { ALT_BG_COL } from '../lib/constants';

// import from @fontsource so that Roboto font is globally available
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import Layout so it's consistent across the app
import Layout from '../components/layout/Layout';
import Box from '@mui/material/Box';

// auth
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
    return (
        <ThemeProvider theme={lightTheme}>
            <SessionProvider session={session}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                </Head>
                <Box sx={{ display: 'flex', backgroundColor: ALT_BG_COL }}>
                    <CssBaseline />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Box>
            </SessionProvider>
        </ThemeProvider>
    )
}

export default MyApp
