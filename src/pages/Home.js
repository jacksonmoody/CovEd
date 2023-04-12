import UserHeader from '../components/UserHeader';
import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import '../styling/Home.css'
import { CssBaseline } from '@mui/material';
import MentorGrid from '../components/MentorGrid';

function Home() {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <UserHeader />
            </AppBar>
            <Sidebar/>
            <MentorGrid />
        </Box>
    );
}

export default Home;
