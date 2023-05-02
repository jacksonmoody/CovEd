import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../helpers/theme';
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


export default function UserHeader (props) {

    // const currentUser = props.users.filter((user) => (user.uid === props.currentUser.uid))[0];
    const currentUser = {
        email: 'mentor1@example.com',
        firstName: 'Mentor',
        lastName: 'One',
        phone: '123-456-7890',
        school: 'School 1',
        pronouns: 'She/Her',
        subjects: ['Math', 'Science'],
        timeZone: 'EST',
        daysAvailable: ['Monday', 'Wednesday'],
        gradeLevels: ['1st', '2nd'],
        collegePrep: true,
        languages: ['English', 'Spanish'],
        specialAssistance: true,
        communities: ['Community 1', 'Community 2'],
        bio: 'Bio for Mentor One',
        gradeLevel: '12th',
        image: 'image1.jpg'
      }

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
        fontFamily: 'Abhaya Libre',
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
                    <Avatar alt="Username" src={props.currentUser.image} sx={profilepicprops}/>
                </Grid>
                <Grid item>
                    <Stack>
                        <Typography variant='h3' sx={nameprops}>{props.currentUser.name}</Typography>
                        <Typography variant='h5' sx={subtextprops}>{props.currentUser.type} Dashboard</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </ThemeProvider>
     );
}
