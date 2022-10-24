// import Head so that we can set the viewport for the entire app
import Head from 'next/head';

// imports from @mui to set theme for the entire app
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// imports from /styles/ to set theme and globals
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.scss';

// import from @fontsource so that Roboto font is globally available
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import Layout so it's consistent across the app
import Layout from '../components/layout/Layout';
import Box from '@mui/material/Box';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={lightTheme}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Box>
        </ThemeProvider>
    )
}

export default MyApp
