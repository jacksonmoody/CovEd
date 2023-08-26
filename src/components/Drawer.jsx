import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { HEADERS } from "../helpers/constants";
import { SECONDARIES } from "../helpers/constants";
import { auth } from "../helpers/firebase";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DrawerComponent(props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  function logout() {
    try {
      auth.signOut();
      navigate("/register/login");
    } catch {
      // Error logging out (insufficient permissions)
    }
  }

  return (
    <>
      <Drawer
        open={openDrawer}
        PaperProps={{
          sx: {
            width: 240
          }
        }}
        onClose={() => setOpenDrawer(false)}>
        <List>
          <a href="https://www.coved.org" target="_blank" rel="noreferrer">
            <img className="navbar__logo-mobile" src="/static/coved_logo.png" alt="CovEd Logo" />
          </a>
          {HEADERS?.map((link) => (
            <ListItem key={link[0]} onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <NavLink className="navbar__link" to={link[1]}>
                  {link[0]}
                </NavLink>
              </ListItemText>
            </ListItem>
          ))}
          <hr />
          {!props.loggedIn ? (
            <>
              <ListItem key="login" onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <NavLink className="navbar__link login" to="/register/login">
                    Login
                  </NavLink>
                </ListItemText>
              </ListItem>
              <ListItem onClick={() => setOpenDrawer(false)}>
                <Button
                  onClick={() => navigate("/register/newaccount")}
                  variant="contained"
                  className="navbar__button">
                  Sign Up
                </Button>
              </ListItem>
            </>
          ) : (
            <>
              {SECONDARIES?.map((link) => (
                <ListItem key={link[0]} onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <NavLink className="navbar__link" to={link[1]}>
                      {link[0]}
                    </NavLink>
                  </ListItemText>
                </ListItem>
              ))}
              <ListItem onClick={() => setOpenDrawer(false)}>
                <Button onClick={() => logout()} variant="contained" className="navbar__button">
                  Log Out
                </Button>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>

      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
