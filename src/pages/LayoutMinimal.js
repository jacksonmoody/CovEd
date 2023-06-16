import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Footer from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";

import "../styling/Layout.css";

function Layout(props) {
  return (
    <div className="layout">
      <Grid container width="100%" height="100%" spacing={0} display="flex" direction="column">
        <CssBaseline />
        <Navbar loggedIn={props.loggedIn} />
        <Outlet />
        <Footer />
      </Grid>
    </div>
  );
}

export default Layout;
