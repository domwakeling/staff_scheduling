import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CustomTextInput from '../../components/common/CustomTextInput';
import Grid from '@mui/material/Grid';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router'
import { useState } from 'react';

const SignInPanel = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isEmpty = (str) => str.replace(/\s/g, '').length == 0;

    const router = useRouter();

    const signinHandler = (event) => {
        event.preventDefault();
        signIn("credentials", { username, password, redirect: false });
        if (router.pathname == '/auth/signin') {
            router.push('/');
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box mx={2} sx={{ maxWidth: '400px' }}>
                    <form onSubmit={signinHandler}>
                        <CustomTextInput
                            errorMethod={isEmpty}
                            label="Username"
                            name="Username"
                            setValue={setUsername}
                            value={username}
                            sx={{ mt: 2, mb: 3 }}
                        />
                        <CustomTextInput
                            errorMethod={isEmpty}
                            label="Password"
                            name="Password"
                            setValue={setPassword}
                            value={password}
                            sx={{ mt: 2, mb: 3 }}
                            type="password"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                onClick={signinHandler}
                            >
                                Sign in
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SignInPanel;
