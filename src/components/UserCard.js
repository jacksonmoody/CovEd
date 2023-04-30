import * as React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../helpers/firebase';

export default function UserCard({ user, cardId }, props) {
    const samplebio = "Hi! I'm Maria Mentor. I'm a 4th year student at UCLA studying Computer Science. I'm passionate about helping students learn and grow. I've been tutoring for 3 years and have experience tutoring students in math, science, and English. I'm looking forward to working with you!"
    const menteeId = "abc123"
    const mentorId = "def456"
    // sampleIds to test db funcitonality
    // const currentUser = props.users.filter((user) => (user.uid === props.currentUser.uid))[0];

    const cardprops = {
        width: '260px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        p: 2,
        backgroundColor: 'white',
    }

    const modalprops = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '620px',
        height: '528px',
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: 24,
        p: 6,
        display: 'flex',
        direction: 'column',
    }

    const cardinfo = [user.name, user.timezone, user.subjects.join(', '), user.gradeLevels.join(', ')]

    const [open, setOpen] = React.useState(false);
    const [requested, setRequested] = React.useState(false);

    async function handleRequest() {
        try {
          const docRef = await addDoc(collection(db, "matches"), {
            menteeId: menteeId,
            mentorId: mentorId,
            accepted: false,
          });
          setRequested(true);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    function checkRequest() {
        // const requests = props.requests.filter((request) => (request.mentorId === cardId && request.menteeId === currentUser.id));
        // needs to pass in actual requests under props before using above line
        const requests = props.requests.filter((request) => (request.mentorId === mentorId && request.menteeId === menteeId));
        console.log("Requests:")
        console.log(requests)
        if (requests.length > 0) {
            setRequested(true);
        }
    }

    const handleOpen = () => {
        setOpen(true)
        checkRequest();
        // checkRequest(currentUser.id, cardId);
        // needs actual user log in and pass in 'opposite' user type to MentorGrid.js before using above
    };

    const handleClose = () => setOpen(false);
    
    const requestbuttonprops = {
        backgroundColor: 'primary.main',
        color: 'white',
        borderRadius: 4,
        width: '100px',
        height: '40px',
        mb: 2,
    };

    return (
        <div className='root'>
            <Card sx={cardprops} onClick={handleOpen}>
                <Stack spacing={1} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Avatar alt='User Profile' src={'../static/placeholderpic.jpg'} sx={{height: '140px', width: '140px'}}/>
                    {cardinfo.map((text, index) => (
                        <Typography key={index} variant={index === 0 ? 'h6' : 'p'} sx={{ padding: 0, margin: 2, textAlign: 'center' }}>
                            {text}
                        </Typography>
                    ))}
                </Stack>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid container sx={modalprops}>
                    <Grid item xs={10} sx={{display: 'flex', direction: 'row', mt: 2}}>
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
                    </Grid>
                    <Grid item xs={2} direction='column' display='flex' justifyContent='right'>
                        <CloseIcon fontSize='large' sx={{color: '#C4C4C4', ml: 8}} onClick={handleClose}/>
                        <Box flexGrow={1} />
                        <Button variant="contained" disabled={requested} onClick={handleRequest} sx={requestbuttonprops}>
                            {requested ? 'Requested' : 'Request'}
                        </Button>
                    </Grid>
                    <Grid item xs={12} mr={2}>
                        <Stack spacing={1}>
                            <Typography variant='p' fontSize={14}>
                                Bio
                            </Typography>
                            <Typography variant='p' fontSize={14}>
                                {samplebio}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid container display='flex' direction='row' justifyContent='space-between' width='100%'>
                        <Grid item spacing={1} xs={4} display='flex' direction='column'>
                            <Typography variant='p' fontSize={14}>
                                Subjects
                            </Typography>
                            <Typography variant='p' fontSize={14}>
                                Math, Science
                            </Typography>
                            <Typography variant='p' fontSize={14} mt={1}>
                                Grade Levels
                            </Typography>
                            <Typography variant='p' fontSize={14}>
                                Middle School, High School
                            </Typography>
                            <Typography variant='p' fontSize={14} mt={1}>
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
                            <Typography variant='p' fontSize={14} mt={1}>
                                   {"Pacific Standard Time (GMT -08:00)"}
                            </Typography>
                            <Typography variant='p' fontSize={14} mt={1}>
                                Email
                            </Typography>
                            <Typography variant='p' fontSize={14}>
                                mariamentor@gmail.com
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}
