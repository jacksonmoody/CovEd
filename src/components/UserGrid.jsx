import React from "react";
import UserCard from "./UserCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { db } from "../helpers/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

export default function MentorGrid(props) {
  const [filters, setFilters] = useState(null);
  const [data, setData] = useState(null);
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    async function getMatches(data) {
      try {
        const response = await fetch("https://match-v5pvmo3fca-uc.a.run.app", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();
        setFilters(result);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    let unsub1 = () => {};
    let unsub2 = () => {};
    if (props.currentUser.type === "Mentor") {
      unsub1 = onSnapshot(query(collection(db, "matches")), (snapshot) => {
        const newRequests = snapshot.docs.map((doc) => doc.data());
        setRequests(newRequests);
        if (newRequests) {
          const menteeIds = newRequests
            .filter((request) => request.mentorId === props.currentUser.uid)
            .map((request) => request.menteeId);
          unsub2 = onSnapshot(query(collection(db, "mentees")), (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            const filteredData = data.filter((mentee) => menteeIds.includes(mentee.uid));
            setData(filteredData);
          });
        }
      });
    } else if (props.currentUser.type === "Mentee") {
      unsub2 = onSnapshot(query(collection(db, "mentors")), (snapshot) => {
        const params = {
          uid: props.currentUser.uid,
          type: "Mentee"
        };
        getMatches(params);
        const data = snapshot.docs.map((doc) => doc.data());
        const filteredData = data.filter((mentor) => filters.includes(mentor.uid));
        setData(filteredData);
      });
    }
    return () => {
      unsub1();
      unsub2();
    };
  }, [props.currentUser]);

  const gridprops = {
    display: "flex",
    flexDirection: "row",
    mt: 2,
    mb: 2,
    overflowY: "scroll"
  };

  if (data?.length > 0) {
    return (
      <Grid container justifyContent="center" spacing={2} sx={gridprops}>
        {data?.map((user, id) => (
          <Grid item key={id}>
            <UserCard user={user} requests={requests} currentUser={props.currentUser} />
          </Grid>
        ))}
      </Grid>
    );
  } else if (!data) {
    return (
      <Container
        maxWidth="md"
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}>
        <Typography
          component="h5"
          variant="h5"
          sx={{ textAlign: "center", marginTop: 5, marginBottom: 3 }}>
          Loading your matches...
        </Typography>
        <CircularProgress />
        <br />
      </Container>
    );
  } else {
    return (
      <Container
        maxWidth="md"
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}>
        <Typography
          component="h5"
          variant="h5"
          sx={{ textAlign: "center", marginTop: 5, marginBottom: 3 }}>
          Sorry, there are no available matches at this time. Please check back later!
        </Typography>
        <Typography
          component="p"
          variant="p"
          sx={{ textAlign: "center", marginTop: 3, marginBottom: 3 }}>
          If you have been receiving this message for a while, please contact us below:
        </Typography>
        <Button
          variant="contained"
          sx={{ textAlign: "center", marginTop: 3, marginBottom: 3, width: "30%" }}
          onClick={() => window.open("mailto:support@coved.org")}>
          Contact Us
        </Button>
      </Container>
    );
  }
}
