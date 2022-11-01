import Box from '@mui/material/Box';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import SignInPanel from '../../components/auth/SignInPanel';
import { useSession } from 'next-auth/react';

const SignIn = () => {

    const { data: session } = useSession();

    return (
        <div>
            <Head>
                <title>Sign In</title>
                <meta name="description" content="Staff scheduling app signin" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ pt: 2, px: 3 }}>
                <Typography gutterBottom variant="h4" component="h1">
                    Sign In
                </Typography>
                { session ? (
                    <Typography>
                        User is signed in.
                    </Typography>
                ) : (
                    <div>
                        <Typography>
                            For this demo, please enter any name into the &ldquo;username&rdquo; box below
                            to sign in as a normal user. Or enter &ldquo;Admin&rdquo; to sign in as an
                            administrator.
                        </Typography>
                        <SignInPanel />
                    </div>
                )}
            </Box>
        </div>
    )
}

export default SignIn;
