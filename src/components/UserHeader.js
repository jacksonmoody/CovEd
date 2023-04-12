import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../helpers/theme';
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


export default function UserHeader () {

    const headerprops = {
        backgroundColor: 'primary.main',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        padding: 4,
        paddingLeft: 10,
    }

    const profilepicprops = {
        height: '120px',
        width: '120px',
        m: 2
    }

    const nameprops = {
        color: 'primary.contrastText',
        fontFamily: 'Times New Roman',
        fontWeight: 350,
        m: 2
    }

    const subtextprops = {
        color: 'primary.contrastText',
        ml: 2,
        mb: 2
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={headerprops} xs={12}>
                <Grid item>
                    <Avatar alt="Username" src={'../static/placeholderpic.jpg'} sx={profilepicprops}/>
                </Grid>
                <Grid item>
                    <Stack>
                        <Typography variant='h3' sx={nameprops}>Sally Student</Typography>
                        <Typography variant='h5' sx={subtextprops}>Mentee Dashboard</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </ThemeProvider>
     );
}
