import { Typography } from "@mui/material";
import React from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


export default function UserProfile(props) {
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
        image: 'image1.jpg',
        location: 'New York, NY'
      }
    // const currentUser = props.users.filter((user) => (user.uid === props.currentUser.uid))[0];

    return (
        <Stack direction='column' mt={4} ml={8} width="100%">
            <Box width="100%" height="140px" sx={{display: 'flex', direction: 'row'}}>
                <Avatar alt='User Profile' src={currentUser.image} sx={{height: '100px', width: '100px'}}/>
                <Stack spacing={1} ml={2}>
                    <Typography variant='h6'>
                        {currentUser.firstName + " " + currentUser.lastName}
                    </Typography>
                    <Typography variant='p'>
                        {currentUser.school}
                    </Typography>
                    <Typography variant='p'>
                        {currentUser.gradeLevel}
                    </Typography>
                </Stack>
            </Box>
            <Box width='75%'>
                <Stack spacing={1}>
                    <Typography variant='p' fontSize={14}>
                        Bio
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {currentUser.bio}
                    </Typography>
                </Stack>
            </Box>
            <Box display='flex' direction='row' justifyContent='space-between' width='75%' ml={1} mt={4}>
                <Grid container spacing={1} xs={4} display='flex' direction='column'>
                    <Typography variant='p' fontSize={14}>
                        Subjects
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {currentUser.subjects.join(', ')}
                    </Typography>
                    <Typography variant='p' fontSize={14} mt={2}>
                        Grade Levels
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {currentUser.gradeLevels.join(', ')}
                    </Typography>
                    <Typography variant='p' fontSize={14} mt={2}>
                        {"Language(s)"}
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {currentUser.languages.join(', ')}
                    </Typography>
                </Grid>
                <Grid item spacing={1} ml={2} xs={4} display='flex' direction='column' mr={2}>
                <Typography variant='p' fontSize={14}>
                        {"Location(s)"}
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {currentUser.location}
                    </Typography>
                    <Typography variant='p' fontSize={14} mt={2}>
                        Time Zone
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {currentUser.timeZone}
                    </Typography>
                    <Typography variant='p' fontSize={14} mt={2}>
                        Email
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {currentUser.email}
                    </Typography>
                </Grid>
            </Box>
                </Stack>
    )
}