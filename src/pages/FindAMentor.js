import UserHeader from '../components/UserHeader';
import Sidebar from '../components/Sidebar';
import Grid from '@mui/material/Grid';
import Stack from  '@mui/material/Stack';
import Footer from '../components/Footer';
import '../styling/Home.css'
import { CssBaseline } from '@mui/material';
import MentorGrid from '../components/UserGrid';

function Home(props) {

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

    return (
        <Grid container width='100%' height='100%' spacing={0} display='flex' direction='column'>
        <CssBaseline/>
            <UserHeader/>
        <Grid item xs={12}>
            <Stack height="75vh" direction='row'>
                <Sidebar/>
                <MentorGrid currentUser={currentUser} users={props.users}/>
            </Stack>
        </Grid>
        <Grid item xs={12}>
            <Footer/>
        </Grid>
    </Grid>
    );
}

export default Home;
