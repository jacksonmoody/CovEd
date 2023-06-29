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

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit_normal(e) {
    e.preventDefault();
    loginWithEmailAndPassword(email, password);
  }

  async function submit_google(e) {
    e.preventDefault();
    await registerWithGoogle("Admin");
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "#E7F2FB",
          borderRadius: "10% 10% 0 0",
          marginTop: 8
        }}>
        <Tabs
          variant="fullWidth"
          sx={{ marginTop: 3 }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#F2BE32"
            }
          }}>
          <Tab label="For Admin" />
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
        <Typography component="h2" variant="h4">
          Welcome to CovEd!
        </Typography>
        <Typography component="h1" variant="h6">
          Please Login Below:
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
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
  );
}
export default AdminLogin;
