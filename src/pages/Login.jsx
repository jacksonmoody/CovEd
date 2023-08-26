import { useState, forwardRef } from "react";
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function handleTabChange(e, newValue) {
    setTabIndex(newValue);
  }

  async function submit_normal(e) {
    e.preventDefault();
    const newMessage = await loginWithEmailAndPassword(email, password);
    if (newMessage != "Success") {
      setMessage(newMessage);
      setOpen(true);
    } else {
      window.location.reload();
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
            Please Login Below:
          </Typography>
          <Box component="form" onSubmit={submit_normal} sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/register/forgotpassword" style={{ display: "block", textAlign: "right" }}>
              Forgot Password?
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ display: "inline", mt: 3, mb: 1 }}>
              Sign In
            </Button>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
            onClick={submit_google}
            startIcon={<GoogleIcon />}>
            Sign In With Google
          </Button>
          <Link to="/register/newaccount">Don&#39;t have an account? Sign Up</Link>
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
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Login;
