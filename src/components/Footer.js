import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../helpers/theme";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";

export default function Footer() {
  const footeritems = [
    ["Programs", "https://www.coved.org/programs"],
    ["Resources", "https://www.coved.org/resources"],
    ["FAQ", "https://www.coved.org/faqs"],
    ["Meet Our Team", "https://www.coved.org/team"],
    ["Contact Us", "https://www.coved.org/contact"],
    ["Donate", "https://www.coved.org/donate"]
  ];

  const footerprops = {
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    m: 0,
    pl: 8,
    pr: 8,
    alignItems: "center",
    backgroundColor: "primary.main",
    width: "100vw",
    height: "200px",
    justifyContent: "space-between",
    direction: "row"
  };

  const covedprops = {
    fontFamily: "Abhaya Libre",
    fontWeight: 800,
    color: "primary.contrastText",
    fontSize: "24px"
  };

  const linkprops = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    underline: "none",
    marginLeft: "50px",
    marginBottom: "20px"
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={footerprops}>
        <Grid item xs={2}>
          <Typography sx={covedprops}>CovEd</Typography>
        </Grid>
        <Grid item xs={8}>
          <Box justifyContent="space-between">
            {footeritems.map((link, index) => (
              <a key={index} href={link[1]} style={linkprops} target="_blank" rel="noreferrer">
                {link[0]}
              </a>
            ))}
          </Box>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="facebook.com"
            onClick={() => window.open("https://www.facebook.com/CovEducationInc")}>
            <FacebookIcon sx={{ fontSize: "40px", color: "white" }} />
          </IconButton>
          <IconButton
            aria-label="instagram.com"
            onClick={() => window.open("https://www.instagram.com/coveducation/")}>
            <InstagramIcon sx={{ fontSize: "40px", color: "white" }} />
          </IconButton>
          <IconButton
            aria-label="twitter.com"
            onClick={() => window.open("https://twitter.com/coveducation")}>
            <TwitterIcon sx={{ fontSize: "40px", color: "white" }} />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ color: "white", fontSize: "12px", textAlign: "center" }}>
            Made by ???
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
