import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Footer from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import "../styling/Layout.scss";

function Layout(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className="layout">
      <Grid container width="100%" height="100%" spacing={0} display="flex" direction="column">
        <CssBaseline />
        {!isMobile ? <Navbar loggedIn={props.loggedIn} /> : <Drawer loggedIn={props.loggedIn} />}
        <Outlet />
        <Footer />
      </Grid>
    </div>
  );
}

export default Layout;
