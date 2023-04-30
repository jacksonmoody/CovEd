import UserHeader from '../components/UserHeader';
import Sidebar from '../components/Sidebar';
import Grid from '@mui/material/Grid';
import '../styling/Home.css'
import { CssBaseline } from '@mui/material';
import UserProfile  from '../components/UserProfile';
import Footer from '../components/Footer';
import Stack from  '@mui/material/Stack';

function MyProfile(props) {
    return (
        <Grid container width='100%' height='100%' spacing={0} display='flex' direction='column'>
            <CssBaseline/>
                <UserHeader/>
            <Grid item xs={12}>
                <Stack height="75vh" direction='row'>
                    <Sidebar/>
                    <UserProfile/>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Footer/>
            </Grid>
        </Grid>
    );
}

export default MyProfile;