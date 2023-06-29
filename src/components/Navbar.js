import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { auth } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navbarprops = {
    backgroundColor: "#FFFFFF",
    color: "primary.main"
  };

  const covedprops = {
    fontFamily: "Abhaya Libre",
    fontWeight: 800,
    fontSize: "24px"
  };

  const linkprops = {
    textDecoration: "none",
    fontSize: "16px",
    underline: "none",
    marginLeft: "40px",
    marginBottom: "20px",
    color: "inherit",
    "&:visited": {
      color: "inherit"
    }
  };

  const registerprops = {
    backgroundColor: "#F2BE32",
    color: "white",
    textTransform: "none",
    fontSize: "16px",
    borderRadius: 1,
    width: "140px",
    height: "40px",
    p: 1,
    ml: 4
  };

  const navitems = [
    ["Programs", "https://www.coved.org/programs"],
    ["Resources", "/resources"],
    ["FAQ", "https://www.coved.org/faqs"],
    ["Meet Our Team", "https://www.coved.org/team"],
    ["Contact Us", "https://www.coved.org/contact"],
    ["Donate", "https://www.coved.org/donate"]
  ];

  const navigate = useNavigate();

  function logout() {
    auth.signOut();
    navigate("/register/login");
  }

  return (
    <AppBar sx={navbarprops} position="static">
      <Toolbar>
        <Typography variant="h6" sx={covedprops}>
          CovEd
        </Typography>
        <Box style={{ flex: 1 }}>
          {navitems?.map((link) => (
            <a
              key={link[0]}
              className="link"
              style={linkprops}
              href={link[1]}
              target="_blank"
              rel="noreferrer">
              {link[0]}
            </a>
          ))}
        </Box>
        <Box>
          {!props.loggedIn ? (
            <>
              <NavLink style={linkprops} to="/register/login">
                Login
              </NavLink>
              <Button
                onClick={() => navigate("/register/newaccount")}
                variant="contained"
                sx={registerprops}>
                Sign Up
              </Button>
            </>
          ) : (
            <Button onClick={logout} variant="contained" sx={registerprops}>
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
