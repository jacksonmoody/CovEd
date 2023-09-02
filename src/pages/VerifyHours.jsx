import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../helpers/firebase";
import { updateHours } from "../helpers/database";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Box, Button, Stack, Typography } from "@mui/material";

function VerifyHours(props) {
  const [hours, setHours] = useState(null);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    async function getHours() {
      let q = null;
      if (props.currentUser.type === "Mentee") {
        q = query(
          collection(db, "hours"),
          where("menteeId", "==", props.currentUser.uid),
          where("status", "==", "Pending"),
          where("type", "==", "mentoring")
        );
      } else if (props.currentUser.type === "Admin") {
        q = query(
          collection(db, "hours"),
          where("status", "==", "Pending"),
          where("type", "!=", "mentoring")
        );
      }
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setHours(data);
      setLoading(false);
    }
    getHours();
  }, []);

  async function handleVerify(id, status) {
    console.log("clicked");
    await updateHours(id, status);
    navigate(0);
  }

  return (
    <Stack direction="column" width="100%" alignItems="center" sx={{ overflowY: "scroll" }}>
      <h2 style={{ textAlign: "center" }}>Welcome, {props.currentUser.displayName}!</h2>
      {!loading &&
        (hours.length != 0 ? (
          <h3 style={{ textAlign: "center" }}>Please verify the hours below:</h3>
        ) : (
          <h3 style={{ textAlign: "center" }}>You have no hours to verify at this time.</h3>
        ))}
      {!loading &&
        hours.length != 0 &&
        hours.map((hour, i) => (
          <Box
            key={i}
            sx={{
              textAlign: "center",
              border: 1,
              borderColor: "#19568c",
              borderRadius: "16px",
              marginBottom: 4,
              width: "50%"
            }}>
            <Typography component="p" variant="p" sx={{ marginTop: 3, textAlign: "center" }}>
              {hour.hours} hours of {hour.type} on {new Date(hour.createdAt).toString()}
            </Typography>
            <Button
              variant="contained"
              sx={{
                textAlign: "center",
                marginTop: 3,
                marginBottom: 3,
                marginLeft: 1,
                marginRight: 1,
                width: "20%"
              }}
              onClick={() => handleVerify(hour.id, "Verified")}>
              Verify
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                textAlign: "center",
                marginTop: 3,
                marginBottom: 3,
                marginLeft: 1,
                marginRight: 1,
                width: "20%"
              }}
              onClick={() => handleVerify(hour.id, "Rejected")}>
              Reject
            </Button>
          </Box>
        ))}
    </Stack>
  );
}

export default VerifyHours;
