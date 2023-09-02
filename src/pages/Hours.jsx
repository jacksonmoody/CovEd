import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addHours } from "../helpers/database";
import { db } from "../helpers/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import OnboardingCard from "../components/OnboardingCard";
import { sendEmail } from "../helpers/firebase";
import MuiAlert from "@mui/material/Alert";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Stack,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";

function Hours(props) {
  const [hours, setHours] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [meetingType, setMeetingType] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [menteeId, setMenteeId] = useState(null);
  const [attachment, setAttachment] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    async function getMatch() {
      const q = query(collection(db, "matches"), where("mentorId", "==", props.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setMenteeId(data[0].menteeId);
    }
    async function getHours() {
      const q = query(
        collection(db, "hours"),
        where("uid", "==", props.currentUser.uid),
        where("status", "==", "Verified")
      );
      const querySnapshot = await getDocs(q);
      let newHours = 0;
      querySnapshot.forEach((doc) => {
        newHours += parseFloat(doc.data().hours);
      });
      setHours(newHours);
      setLoading(false);
    }
    getHours();
    getMatch();
  }, [props.currentUser.uid]);

  async function handleSubmit(event) {
    event.preventDefault();
    await addHours(
      props.currentUser.uid,
      menteeId,
      meetingType,
      hoursWorked,
      description,
      attachment
    );
    if (meetingType === "mentoring") {
      const name = email.split("@")[0];
      await sendEmail(
        email.trim(),
        "Hours Verification Required",
        "Hey " +
          name +
          "! <br/><br/> " +
          props.currentUser.displayName +
          " has requested that you verify the hours that they have volunteered with CovEd. <a href='https://dashboard.coved.org/hours'>Login to your dashboard now</a> to verify them! <br/><br/> If you run into any issues, please reach out to the tech team at <a href='mailto:tech@coved.org'>tech@coved.org</a>. <br/><br/> Kind regards, <br/> The CovEd Team"
      );
    } else {
      await sendEmail(
        "support@coved.org",
        "Hours Verification Required",
        "Hi CovEd Team! <br/><br/> " +
          props.currentUser.displayName +
          " has requested that you verify the hours that they have volunteered with CovEd. <a href='https://dashboard.coved.org/hours'>Login to your dashboard now</a> to verify them! <br/><br/> If you run into any issues, please reach out to the tech team at <a href='mailto:tech@coved.org'>tech@coved.org</a>. <br/><br/> Kind regards, <br/> The CovEd Team"
      );
    }
    navigate("/");
  }

  function handleImage(e) {
    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `documentation/${props.currentUser.uid}/${e.target.files[0].name}`
    );
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      setUploading(false);
      if (snapshot.state !== "error") {
        getDownloadURL(storageRef).then((url) => {
          setAttachment(url);
          setSuccess(true);
        });
      }
    });
  }

  return (
    <Stack direction="column" width="100%" sx={{ overflowY: "scroll" }}>
      <h2 style={{ textAlign: "center" }}>Welcome, {props.currentUser.displayName}!</h2>
      {!loading &&
        (hours ? (
          <h3 style={{ textAlign: "center" }}>You have currently worked {hours} verified hours.</h3>
        ) : (
          <h3 style={{ textAlign: "center" }}>You have currently worked 0 verified hours.</h3>
        ))}
      <Box sx={{ mt: -9 }}>
        <OnboardingCard
          title="Document new hours"
          subtitle="Submit this form any time you have volunteered hours with CovEd">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Typography
                component="h2"
                sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
                What type of volunteer hours did you complete?
              </Typography>
              <RadioGroup
                row
                name="academicYear"
                value={meetingType}
                onChange={(event) => setMeetingType(event.target.value)}>
                <FormControlLabel value={"mentoring"} control={<Radio />} label="Mentoring" />
                <FormControlLabel value={"partnership"} control={<Radio />} label="Partnership" />
                <FormControlLabel value={"admin"} control={<Radio />} label="Admin" />
                <FormControlLabel value={"other"} control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            {meetingType === "mentoring" && (
              <>
                <Typography
                  component="h2"
                  sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
                  Who did you mentor?
                </Typography>
                <TextField
                  label="Please enter their email address"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  placeholder="Please enter their email address"
                  required
                  sx={{ width: "100%", marginTop: 3 }}
                />
              </>
            )}
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              How many hours did you volunteer?
            </Typography>
            <TextField
              label="Enter a number rounded to the nearest half"
              type="number"
              value={hoursWorked}
              onChange={(event) => {
                setHoursWorked(event.target.value);
              }}
              placeholder="How many hours did you work?"
              required
              sx={{ width: "100%", marginTop: 3 }}
            />
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              Please describe what you did for CovEd while you were your volunteering
            </Typography>
            <TextField
              label="Please describe your volunteering effort"
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Tell us about yourself!"
              required
              sx={{ width: "100%", marginTop: 3 }}
            />
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              (Optional) upload any supporting documentation below!
            </Typography>
            <Box textAlign="center">
              {!uploading && !success && (
                <Button variant="contained" color="primary" sx={{ mt: 3, mb: 1 }} component="label">
                  Upload Documentation
                  <input type="file" hidden onChange={(e) => handleImage(e)} />
                </Button>
              )}
              {uploading && <CircularProgress sx={{ marginTop: 3 }} />}
              <Collapse in={success} sx={{ marginTop: 3, marginBottom: 3 }}>
                <MuiAlert>File upload success!</MuiAlert>
              </Collapse>
              <Button variant="contained" type="submit">
                Submit for verification
              </Button>
            </Box>
          </form>
        </OnboardingCard>
      </Box>
    </Stack>
  );
}

export default Hours;
