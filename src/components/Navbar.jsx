import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { auth } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";
import { HEADERS } from "../helpers/constants";

const Navbar = (props) => {
  const navigate = useNavigate();

  function logout() {
    try {
      auth.signOut();
    } catch {
      // Error logging out (insufficient permissions)
    }
  }

  return (
    <AppBar className="navbar" position="static">
      <Toolbar>
        <a href="https://www.coved.org" target="_blank" rel="noreferrer">
          <img className="navbar__logo" src="/static/coved_logo.png" alt="CovEd Logo" />
        </a>
        <Box className="navbar__container">
          {HEADERS?.map((link) => (
            <a
              key={link[0]}
              className="navbar__link"
              href={link[1]}
              target="_blank"
              rel="noreferrer">
              {link[0]}
            </a>
          ))}
          {!props.loggedIn && (
            <NavLink className="navbar__link login" to="/register/login">
              Login
            </NavLink>
          )}
        </Box>
        <Box>
          {!props.loggedIn ? (
            <>
              <Button
                onClick={() => navigate("/register/newaccount")}
                variant="contained"
                className="navbar__button">
                Sign Up
              </Button>
            </>
          ) : (
            <Button onClick={logout} variant="contained" className="navbar__button">
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
