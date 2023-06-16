import { Typography } from "@mui/material";
import React from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


export default function UserProfile(props) {
    return (
        <Stack direction='column' mt={4} ml={8} width="100%">
            <Box width="100%" height="140px" sx={{display: 'flex', direction: 'row'}}>
                <Avatar alt='User Profile' src={props.currentUser.image} sx={{height: '100px', width: '100px'}}/>
                <Stack spacing={1} ml={2}>
                    <Typography variant='h6'>
                        {props.currentUser.name ?? 'No Name Provided'}
                    </Typography>
                    <Typography variant='p'>
                        {props.currentUser.school ?? 'No School Provided'}
                    </Typography>
                    <Typography variant='p'>
                        {props.currentUser.gradeLevel ?? 'No Grade Level Provided'}
                    </Typography>
                </Stack>
            </Box>
            <Box width='75%'>
                <Stack spacing={1}>
                    <Typography variant='p' fontSize={14}>
                        Bio
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {props.currentUser.bio ?? "No Bio Provided"}
                    </Typography>
                </Stack>
            </Box>
            <Box display='flex' direction='row' justifyContent='space-between' width='75%' ml={1} mt={4}>
                <Grid container item display='flex' direction='column'>
                    <Typography variant='p' fontSize={14}>
                        Subjects
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {props.currentUser.subjects?.join(', ') ?? "No Subjects Provided"}
                    </Typography>
                    {props.currentUser.type === "Mentor" && 
                    <>
                    <Typography variant='p' fontSize={14} mt={2}>
                        Grade Levels
                    </Typography>
                     <Typography variant='p' fontSize={14}>
                        {props.currentUser.gradeLevels?.join(', ') ?? "No Grade Levels Provided"}
                    </Typography>
                    </>}
                    <Typography variant='p' fontSize={14} mt={2}>
                        {"Language(s)"}
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {props.currentUser.languages?.join(', ') ?? "No Languages Provided"}
                    </Typography>
                </Grid>
                <Grid container item ml={2} display='flex' direction='column' mr={2}>
                <Typography variant='p' fontSize={14}>
                        {"Location"}
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {props.currentUser.location ?? "Unknown Location"}
                    </Typography>
                    <Typography variant='p' fontSize={14} mt={2}>
                        Time Zone
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {props.currentUser.timeZone ?? "Unknown Time Zone"}
                    </Typography>
                    <Typography variant='p' fontSize={14} mt={2}>
                        Email
                    </Typography>
                    <Typography variant='p' fontSize={14}>
                        {props.currentUser.email}
                    </Typography>
                </Grid>
            </Box>
                </Stack>
    )
}