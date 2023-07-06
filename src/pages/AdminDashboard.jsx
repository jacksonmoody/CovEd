import React, { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../helpers/firebase"; // Assuming you have initialized Firebase and obtained the Firestore instance

const AdminDashboard = () => {
  const [pendingMatches, setPendingMatches] = useState([]);

  useEffect(() => {
    const matchesRef = collection(db, "matches");
    const querySnapshot = query(matchesRef, where("status", "==", "pending-admin"));
    const unsubscribe = onSnapshot(querySnapshot, async (snapshot) => {
      const matches = [];

      for (const docChange of snapshot.docChanges()) {
        if (docChange.type === "added") {
          const match = docChange.doc.data();

          // Fetch mentor details based on mentorId
          const mentorSnapshot = await getDoc(doc(db, "mentors", match.mentorId));
          const mentorData = mentorSnapshot.data();

          // Fetch mentee details based on menteeId
          const menteeSnapshot = await getDoc(doc(db, "mentees", match.menteeId));
          const menteeData = menteeSnapshot.data();

          // Combine mentor and mentee details with match data
          const matchWithDetails = {
            ...match,
            mentorName: mentorData.name,
            mentorEmail: mentorData.email,
            menteeName: menteeData.name,
            menteeEmail: menteeData.email
          };

          matches.push(matchWithDetails);
        }
      }

      setPendingMatches(matches);
    });

    return () => unsubscribe(); // Unsubscribe from the Firestore listener on component unmount
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Mentor</TableCell>
          <TableCell>Mentee</TableCell>
          <TableCell>Reject</TableCell>
          <TableCell>Edit</TableCell>
          <TableCell>Approve</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pendingMatches.map((match) => (
          <TableRow key={match.matchId}>
            <TableCell>
              {match.mentorName} ({match.mentorEmail})
            </TableCell>
            <TableCell>
              {match.menteeName} ({match.menteeEmail})
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error">
                Reject
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="primary">
                Edit
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="success">
                Approve
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminDashboard;
