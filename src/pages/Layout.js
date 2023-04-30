import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import UserHeader from '../components/UserHeader';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Stack from  '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar';

import '../styling/Layout.css';


function Layout() {
  return (
    <>
        <Grid container width='100%' height='100%' spacing={0} display='flex' direction='column'>
          <CssBaseline/>
          <Navbar/>
          <UserHeader/>
            <Grid item xs={12}>
              <Stack height="70vh" direction='row'>
                <Sidebar/>
                <Outlet/>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Footer/>
            </Grid>
        </Grid>
    </>
  );
}

export default Layout;