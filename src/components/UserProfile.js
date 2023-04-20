import { Typography } from "@mui/material";
import React from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


export default function UserProfile() {
    
    const samplebio = "Hi! I'm Maria Mentor. I'm a 4th year student at UCLA studying Computer Science. I'm passionate about helping students learn and grow. I've been tutoring for 3 years and have experience tutoring students in math, science, and English. I'm looking forward to working with you!"

    return (
        <Stack direction='column' mt={4} ml={8} width="100%">
            <Box width="100%" height="140px" sx={{display: 'flex', direction: 'row'}}>
                <Avatar alt='User Profile' src={'../static/placeholderpic.jpg'} sx={{height: '100px', width: '100px'}}/>
                <Stack spacing={1} ml={2}>
                    <Typography variant='h6'>
                        Maria Mentor
                    </Typography>
                    <Typography variant='p'>
                        University of California Los Angeles
                    </Typography>
                    <Typography variant='p'>
                        Class of 2021
                    </Typography>
                </Stack>
            </Box>
            <Box width='75%'>
                <Stack spacing={1}>
                    <Typography variant='p' fontSize={14}>
                        Bio
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {samplebio}
                    </Typography>
                </Stack>
            </Box>
            <Box display='flex' direction='row' justifyContent='space-between' width='75%' ml={1} mt={4}>
                <Grid container spacing={1} xs={4} display='flex' direction='column'>
                    <Typography variant='p' fontSize={14}>
                        Subjects
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        Math, Science
                    </Typography>
                    <Typography variant='p' fontSize={14} mt={2}>
                        Grade Levels
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        Middle School, High School
                    </Typography>
                    <Typography variant='p' fontSize={14} mt={2}>
                        {"Language(s)"}
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        English, Spanish
                    </Typography>
                </Grid>
                <Grid item spacing={1} ml={2} xs={4} display='flex' direction='column' mr={2}>
                <Typography variant='p' fontSize={14}>
                        Location
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        Los Angeles, California
                    </Typography>
                    <Typography variant='p' fontSize={14} mt={2}>
                        Time Zone
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {"Pacific Standard Time (GMT -08:00)"}
                    </Typography>
                    <Typography variant='p' fontSize={14} mt={2}>
                        Email
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        mariamentor@gmail.com
                    </Typography>
                </Grid>
            </Box>
                </Stack>
    )
}