import { useState, forwardRef } from "react";
import { resetPassword } from "../helpers/firebase";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Tab, Tabs } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  async function submit_normal(e) {
    e.preventDefault();
    let message = await resetPassword(email);
    setMessage(message);
    setOpen(true);
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
            value={0}
            variant="fullWidth"
            sx={{ marginTop: 3 }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#F2BE32"
              }
            }}>
            <Tab label="Reset Password" />
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
          <Typography component="h2" variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>
            Forgot Password?
          </Typography>
          <Typography component="h1" variant="h6" sx={{ textAlign: "center" }}>
            Enter your email to reset it:
          </Typography>
          <Box component="form" onSubmit={submit_normal} sx={{ mt: 1 }}>
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
              Reset Password
            </Button>
          </Box>
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
          severity={message.includes("Success") ? "success" : "error"}
          sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
export default ForgotPassword;
