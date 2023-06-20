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
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../helpers/firebase";

export default function UserCard(props) {
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
    width: "620px",
    height: "528px",
    backgroundColor: "white",
    borderRadius: 4,
    boxShadow: 24,
    p: 6,
    display: "flex"
  };

  const cardinfo = [
    props.user.name,
    props.user.timezone,
    props.user.subjects?.join(", "),
    props.user.gradeLevels?.join(", ")
  ];

  const [open, setOpen] = React.useState(false);
  const [requested, setRequested] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);

  async function handleRequest() {
    try {
      if (props.currentUser.type === "Mentee") {
        await setDoc(doc(db, "matches", props.currentUser.uid), {
          menteeId: props.currentUser.uid,
          mentorId: props.user.uid,
          accepted: false
        });
        setRequested(true);
      } else if (props.currentUser.type === "Mentor") {
        const docRef = doc(db, "matches", props.user.uid);
        await updateDoc(docRef, {
          accepted: true
        });
        setAccepted(true);
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
    width: "170px",
    height: "40px",
    mb: 2
  };

  return (
    <div className="root">
      <Card sx={cardprops} onClick={handleOpen}>
        <Stack spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            alt="User Profile"
            src={props.user.image}
            sx={{ height: "140px", width: "140px" }}
          />
          {cardinfo.map((text, index) => (
            <Typography
              key={index}
              variant={index === 0 ? "h6" : "p"}
              sx={{ padding: 0, margin: 2, textAlign: "center" }}>
              {text}
            </Typography>
          ))}
        </Stack>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Grid container sx={modalprops}>
          <Grid item xs={9} sx={{ display: "flex", mt: 2 }}>
            <Avatar
              alt="User Profile"
              src={props.user.image}
              sx={{ height: "100px", width: "100px" }}
            />
            <Stack spacing={1} ml={2}>
              <Typography variant="h6">{props.user.name ?? "No Name Provided"}</Typography>
              <Typography variant="p">{props.user.school ?? "No School Provided"}</Typography>
              <Typography variant="p">
                {props.user.gradeLevel ?? "No Grade Level Provided"}
              </Typography>
            </Stack>
          </Grid>
          <Grid container item xs={3} direction="column" display="flex" justifyContent="right">
            <CloseIcon fontSize="large" sx={{ color: "#C4C4C4", ml: 8 }} onClick={handleClose} />
            <Box flexGrow={0.3} />
            {props.user.type === "Mentor" ? (
              <Button
                variant="contained"
                disabled={requested}
                onClick={handleRequest}
                sx={requestbuttonprops}>
                {requested ? "Requested" : "Request"}
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled={accepted}
                onClick={handleRequest}
                sx={requestbuttonprops}>
                {accepted ? "Accepted" : "Accept Request"}
              </Button>
            )}
          </Grid>
          <Grid item xs={12} mr={2}>
            <Stack spacing={1}>
              <Typography variant="p" fontSize={14}>
                Bio
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.bio ?? "No Bio Provided"}
              </Typography>
            </Stack>
          </Grid>
          <Grid container display="flex" justifyContent="space-between" width="100%">
            <Grid container item xs={4} display="flex" direction="column">
              <Typography variant="p" fontSize={14}>
                Subjects
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.subjects?.join(", ") ?? "No Subjects Provided"}
              </Typography>
              {props.user.type === "mentor" && (
                <>
                  <Typography variant="p" fontSize={14} mt={1}>
                    Grade Levels
                  </Typography>
                  <Typography variant="p" fontSize={14}>
                    {props.user.gradeLevels?.join(", ") ?? "No Grade Levels Provided"}
                  </Typography>
                </>
              )}
              <Typography variant="p" fontSize={14} mt={1}>
                {"Language(s)"}
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.languages?.join(", ") ?? "No Languages Provided"}
              </Typography>
            </Grid>
            <Grid container item ml={2} xs={4} display="flex" direction="column" mr={2}>
              <Typography variant="p" fontSize={14}>
                Location
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.location ?? "No Location Provided"}
              </Typography>
              <Typography variant="p" fontSize={14} mt={1}>
                Time Zone
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.timeZone ?? "No Time Zone Provided"}
              </Typography>
              <Typography variant="p" fontSize={14} mt={1}>
                Email
              </Typography>
              <Typography variant="p" fontSize={14}>
                {props.user.email ?? "No Email Provided"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
