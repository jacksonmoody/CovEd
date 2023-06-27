import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import UserHeader from "../components/UserHeader";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";
import "../styling/Layout.css";

function Layout(props) {
  return (
    <div className="layout">
      <Grid container width="100%" height="100%" spacing={0} display="flex" direction="column">
        <CssBaseline />
        <Navbar loggedIn={props.loggedIn} />
        <UserHeader currentUser={props.currentUser} />
        <Grid item xs={12}>
          <Stack height="70vh" direction="row">
            <Sidebar />
            <Outlet />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Footer className="footer" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Layout;
