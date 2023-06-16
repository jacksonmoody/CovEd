import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { addUser } from "../helpers/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";

function Onboarding(props) {
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleOnboarding() {
    props.setOnboarded(true);
    addUser(
      props.currentUser.uid,
      props.currentUser.type,
      props.currentUser.name,
      props.currentUser.authProvider,
      props.currentUser.email,
      image,
      true
    );
  }

  function handleImage(e) {
    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${props.currentUser.uid}`);
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      setUploading(false);
      if (snapshot.state !== "error") {
        getDownloadURL(storageRef).then((url) => {
          setImage(url);
          setSuccess(true);
        });
      }
    });
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 12,
          marginBottom: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
          bgcolor: "white",
          borderRadius: "20px"
        }}>
        <Typography component="h2" variant="h4">
          Welcome to CovEd!
        </Typography>
        {!uploading && !success && (
          <Button variant="contained" color="primary" sx={{ mt: 3, mb: 1 }} component="label">
            Upload Profile Picture
            <input type="file" accept="image/*" hidden onChange={(e) => handleImage(e)} />
          </Button>
        )}
        {uploading && <CircularProgress sx={{ marginTop: 3 }} />}
        <Collapse in={success} sx={{ marginTop: 3 }}>
          <Alert>Image upload success!</Alert>
        </Collapse>
        <Button variant="contained" onClick={handleOnboarding} sx={{ mt: 3, mb: 1 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}
export default Onboarding;
