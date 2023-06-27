import React from "react";
import UserCard from "./UserCard";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { db } from "../helpers/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

export default function MentorGrid(props) {
  const [data, setData] = useState(null);
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    onSnapshot(query(collection(db, "matches")), (snapshot) => {
      const requests = snapshot.docs.map((doc) => doc.data());
      setRequests(requests);
    });
    if (props.currentUser.type === "Mentor") {
      if (requests) {
        const menteeIds = requests
          .filter((request) => request.mentorId === props.currentUser.uid)
          .map((request) => request.menteeId);
        onSnapshot(query(collection(db, "mentees")), (snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          const filteredData = data.filter((mentee) => menteeIds.includes(mentee.uid));
          setData(filteredData);
        });
      }
    } else if (props.currentUser.type === "Mentee") {
      onSnapshot(query(collection(db, "mentors")), (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setData(data);
      });
    }
  }, [props.currentUser, requests]);

  const gridprops = {
    display: "flex",
    flexDirection: "row",
    mt: 2,
    ml: 2,
    overflowY: "scroll"
  };

  return (
    <Grid container spacing={2} sx={gridprops}>
      {data?.map((user, id) => (
        <Grid item key={id}>
          <UserCard user={user} requests={requests} currentUser={props.currentUser} />
        </Grid>
      ))}
    </Grid>
  );
}
