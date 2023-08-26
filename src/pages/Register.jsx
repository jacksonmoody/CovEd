import { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { registerWithEmailAndPassword, registerWithGoogle } from "../helpers/firebase";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Tab, Tabs } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  function handleTabChange(e, newValue) {
    setTabIndex(newValue);
  }

  async function handleRegistration(e) {
    e.preventDefault();
    if (tabIndex === 0) {
      const newMessage = await registerWithEmailAndPassword(name, email, password, "Mentee");
      setMessage(newMessage);
      setOpen(true);
    } else {
      const newMessage = await registerWithEmailAndPassword(name, email, password, "Mentor");
      setMessage(newMessage);
      setOpen(true);
    }
  }

  async function submit_google(e) {
    e.preventDefault();
    let newMessage = "";
    if (tabIndex === 0) {
      newMessage = await registerWithGoogle("Mentee");
    } else {
      newMessage = await registerWithGoogle("Mentor");
    }
    if (newMessage != "Success") {
      setMessage(newMessage);
      setOpen(true);
    }
  }

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            bgcolor: "#E7F2FB",
            borderRadius: "10% 10% 0 0",
            marginTop: 8
          }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ marginTop: 3 }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#F2BE32"
              }
            }}>
            <Tab label="For Mentees" />
            <Tab label="For Mentors" />
          </Tabs>
        </Box>
        <Box
          sx={{
            marginBottom: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
            bgcolor: "white",
            borderRadius: "0 0 10% 10%"
          }}>
          <Typography component="h2" variant="h4" sx={{ textAlign: "center", fontWeight: 900 }}>
            Welcome to CovEd!
          </Typography>
          <Typography component="h1" variant="h6">
            Please Register {tabIndex === 0 ? "for Mentorship" : "to Mentor"} Below:
          </Typography>
          <Box component="form" onSubmit={handleRegistration} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id=""
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
            onClick={submit_google}
            startIcon={<GoogleIcon />}>
            Register With Google
          </Button>
          <Link to="/">Already have an account? Sign in</Link>
        </Box>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}>
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity={message === "Success" ? "success" : "error"}
          sx={{ width: "100%" }}>
          {message === "Success"
            ? "Success! Please check your email for a verification code, then login again."
            : message}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Register;
