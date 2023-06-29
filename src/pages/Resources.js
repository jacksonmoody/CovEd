import { useState } from "react";
import { Link } from "react-router-dom";
import { loginWithEmailAndPassword, registerWithGoogle } from "../helpers/firebase";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GoogleIcon from "@mui/icons-material/Google";
import { Tab, Tabs } from "@mui/material";

function Resources() {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginBottom: 0,
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          bgcolor: ""
        }}>
        <Typography component="h1" variant="h3">
          CovEd Resources
        </Typography>
      </Box>
      <Box
        sx={{
          marginBottom: 5,
          marginTop: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 2,
          flexGrow: 1
        }}>
        <Typography component="h4" align="center">
          Welcome to our resources page! Here you will be able to find links to more online learning
          resources. Don&apos;t have a mentor yet, but need help in a particular subject? No
          problem! Check out our Piazza page! To join the piazza forum, simply follow these written
          instructions, or follow the instructions in this video.
        </Typography>
      </Box>
      <Box
        sx={{
          marginBottom: 5,
          marginTop: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 2
        }}>
        <Typography component="h4" align="center">
          Links
        </Typography>
      </Box>
    </Container>
  );
}
export default Resources;
