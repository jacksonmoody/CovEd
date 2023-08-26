import * as React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { doc, setDoc, updateDoc, getDocs } from "firebase/firestore";
import { db, sendEmail } from "../helpers/firebase";
import { collection, query, where } from "firebase/firestore";

export default function UserCard(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const cardprops = {
    width: "260px",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    p: 2,
    backgroundColor: "white"
  };

  const modalprops = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "700px",
    height: "528px",
    backgroundColor: "white",
    borderRadius: 4,
    boxShadow: 24,
    p: 6,
    display: "flex"
  };

  const [open, setOpen] = React.useState(false);
  const [requested, setRequested] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);

  const [status, setStatus] = React.useState("pending-mentor");

  React.useEffect(() => {
    async function fetchMatchStatus() {
      try {
        if (props.currentUser.type === "Mentor") {
          const matchesRef = collection(db, "matches");
          const q = query(
            matchesRef,
            where("mentorId", "==", props.currentUser.uid),
            where("menteeId", "==", props.user.uid)
          );
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            setStatus("no-action");
          } else {
            querySnapshot.forEach((doc) => {
              setStatus(doc.data().status);
            });
          }
        } else if (props.currentUser.type === "Mentee") {
          const matchesRef = collection(db, "matches");
          const q = query(
            matchesRef,
            where("mentorId", "==", props.user.uid),
            where("menteeId", "==", props.currentUser.uid)
          );

          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            setStatus("no-action");
          } else {
            querySnapshot.forEach((doc) => {
              setStatus(doc.data().status);
            });
          }
        }
      } catch (e) {
        console.error("Error fetching match status: ", e);
      }
    }

    fetchMatchStatus();
  }, [props.currentUser.type, props.currentUser.uid, props.user.uid]);

  async function handleRequest() {
    try {
      if (props.currentUser.type === "Mentee") {
        await setDoc(doc(db, "matches", props.currentUser.uid), {
          menteeId: props.currentUser.uid,
          mentorId: props.user.uid,
          status: "pending-mentor"
        });
        setStatus("pending-mentor");
        await sendEmail(
          props.user.email,
          "New Mentor Request",
          "Hey " +
            props.user.displayName +
            '! <br/><br/> A new mentee has requested you. <a href="https://dashboard.coved.org">Login to your dashboard now</a> to accept or reject the request. <br/><br/> If you have any questions, please reach out to our team at <a href="mailto:support@coved.org">support@coved.org</a>. <br/><br/> Kind regards, <br/> The CovEd Team'
        );
      } else if (props.currentUser.type === "Mentor") {
        const docRef = doc(db, "matches", props.user.uid);
        await updateDoc(docRef, {
          status: "pending-admin"
        });
        setStatus("pending-admin");
        await sendEmail(
          "support@coved.org",
          "Match Approval Required",
          "Hey CovEd Mentoring Team! <br/><br/> A new mentor/mentee match is ready for approval. <a href='https://dashboard.coved.org/register/admin/login'>Login to your dashboard now</a> to accept or reject the request. <br/><br/> If you run into any issues, please reach out to the tech team at <a href='mailto:tech@coved.org'>tech@coved.org</a>. <br/><br/> Kind regards, <br/> The CovEd Team"
        );
      }
    } catch (e) {
      console.error("Error with document: ", e);
    }
  }

  function checkRequest() {
    let requests;
    if (props.currentUser.type === "Mentor") {
      requests = props.requests.filter(
        (request) =>
          request.mentorId === props.currentUser.uid && request.menteeId === props.user.uid
      );
    } else if (props.currentUser.type === "Mentee") {
      requests = props.requests.filter(
        (request) =>
          request.mentorId === props.user.uid && request.menteeId === props.currentUser.uid
      );
    }
    if (requests.length > 0) {
      setRequested(true);
      setAccepted(requests[0].accepted);
    }
  }

  const handleOpen = () => {
    setOpen(true);
    checkRequest();
  };

  const handleClose = () => setOpen(false);

  const requestbuttonprops = {
    backgroundColor: "primary.main",
    color: "white",
    borderRadius: 4,
    height: "40px",
    mb: 2
  };

  const acceptedbuttonprops = {
    backgroundColor: "green",
    color: "white",
    borderRadius: 4,
    height: "40px",
    mb: 2,
    "&:hover": {
      backgroundColor: "green"
    },
    pointerEvents: "none"
  };

  return (
    <div className="root">
      <Card sx={cardprops} onClick={handleOpen}>
        <Stack spacing={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Avatar
            alt="User Profile"
            src={props.user.image}
            sx={{ height: "140px", width: "140px" }}
          />
          <Typography variant="h6" sx={{ padding: 0, margin: 2, textAlign: "center" }}>
            {props.user.displayName ? props.user.displayName : "No Name Provided"}
          </Typography>
          <Typography variant="p" sx={{ padding: 0, margin: 2, textAlign: "center" }}>
            {props.user.subjects.length > 0
              ? props.user.subjects.join(", ")
              : "No Subjects Provided"}
          </Typography>
          <Typography variant="p" sx={{ padding: 0, margin: 2, textAlign: "center" }}>
            {props.user.school ? props.user.school : "No School Provided"}
          </Typography>
        </Stack>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Grid container sx={modalprops}>
          <Grid item xs={9} sx={{ display: "flex", mt: 2 }}>
            {!isMobile && (
              <Avatar
                alt="User Profile"
                src={props.user.image}
                sx={{ height: "100px", width: "100px", marginRight: 2 }}
              />
            )}
            <Stack spacing={1}>
              <Typography variant="h6">
                {props.user.displayName ? props.user.displayName : "No Name Provided"}
              </Typography>
              <Typography variant="p">
                {props.user.school ? props.user.school : "No School Provided"}
              </Typography>
              <Typography variant="p">
                {props.user.gradeLevel >= 0
                  ? "Grade " + props.user.gradeLevel
                  : "No Grade Level Provided"}
              </Typography>
            </Stack>
          </Grid>
          <Grid container item xs={3} direction="column" display="flex" justifyContent="right">
            <CloseIcon fontSize="large" sx={{ color: "#C4C4C4", ml: 8 }} onClick={handleClose} />
            <Box flexGrow={0.3} />
            {props.user.type === "Mentor" ? (
              <Button
                variant="contained"
                disabled={requested && !accepted}
                onClick={handleRequest}
                sx={accepted ? acceptedbuttonprops : requestbuttonprops}>
                {status === "pending-mentor" || status === "pending-admin"
                  ? status == "pending-admin"
                    ? "Pending Approval"
                    : "Requested"
                  : "Request"}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleRequest}
                sx={accepted ? acceptedbuttonprops : requestbuttonprops}>
                {status === "pending-admin" ? "Pending Approval" : "Accept Request"}
              </Button>
            )}
          </Grid>
          <Grid item xs={12} mr={2}>
            <Stack spacing={1}>
              <Typography variant="p" fontSize={14} sx={{ fontWeight: "bold" }}>
                Bio
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.bio ? props.user.bio : "No Bio Provided"}
              </Typography>
            </Stack>
          </Grid>
          <Grid container display="flex" justifyContent="space-between" width="100%">
            <Grid container item xs={4} display="flex" direction="column">
              <Typography variant="p" fontSize={14} sx={{ fontWeight: "bold" }}>
                Subjects
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.subjects.length > 0
                  ? props.user.subjects.join(", ")
                  : "No Subjects Provided"}
              </Typography>
              {props.user.type === "Mentor" && (
                <>
                  <Typography variant="p" fontSize={14} mt={1} sx={{ fontWeight: "bold" }}>
                    Grade Levels
                  </Typography>
                  <Typography variant="p" fontSize={14}>
                    {props.user.gradeLevels.length > 0
                      ? props.user.gradeLevels.join(", ")
                      : "No Grade Levels Provided"}
                  </Typography>
                </>
              )}
              <Typography variant="p" fontSize={14} mt={1} sx={{ fontWeight: "bold" }}>
                {"Language(s)"}
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.languages.length > 0
                  ? props.user.languages.join(", ")
                  : "No Languages Provided"}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={4}
              display="flex"
              direction="column"
              sx={{ alignContent: "flex-end", textAlign: "right" }}>
              <Typography variant="p" fontSize={14} sx={{ fontWeight: "bold" }}>
                Location
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.location ? props.user.location : "No Location Provided"}
              </Typography>
              <Typography variant="p" fontSize={14} mt={1} sx={{ fontWeight: "bold" }}>
                Time Zone
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.timeZone ? props.user.timeZone : "No Time Zone Provided"}
              </Typography>
              <Typography variant="p" fontSize={14} mt={1} sx={{ fontWeight: "bold" }}>
                Email
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.email ? props.user.email : "No Email Provided"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
