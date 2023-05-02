import React from 'react';
import UserCard from './UserCard';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { db } from '../helpers/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export default function MentorGrid(props) {

  const [data, setData] = useState(null);

  useEffect(() => {

    if (props.userType === "Mentor") {
      onSnapshot(query(collection(db, "requests")), (snapshot) => {
        const requests = snapshot.docs.map((doc) => (doc.data()));
        const menteeIds = requests.filter((request) => (request.mentorId === props.currentUser.uid)).map((request) => (request.menteeId));
        onSnapshot(query(collection(db, "mentees")), (snapshot) => {
          const data = snapshot.docs.map((doc) => (doc.data()));
          const filteredData = data.filter((mentee) => (menteeIds.includes(mentee.uid)));
          setData(filteredData);
        });
      });
      } else if (props.userType === "Mentee") {
        onSnapshot(query(collection(db, "mentors")), (snapshot) => {
          const data = snapshot.docs.map((doc) => (doc.data()));
          setData(data);
        });
      }
    }, [props.userType, props.currentUser.uid])

  const users = [
    {
      name: 'Maria Mentor',
      timezone: 'GMT -08:00',
      subjects: ['Math', 'Science'],
      gradeLevels: ['9th', '10th']
    },
    {
      name: 'John Doe',
      timezone: 'GMT -05:00',
      subjects: ['English', 'History'],
      gradeLevels: ['11th', '12th']
    },
    {
      name: 'Jane Smith',
      timezone: 'GMT +01:00',
      subjects: ['French', 'Spanish'],
      gradeLevels: ['9th', '10th', '11th', '12th']
    }
  ]

  const gridprops = {
    display: 'flex',
    flexDirection: 'row',
    mt: 2,
    ml: 2,
    overflowY: 'scroll',
  }

  return (
    <Grid container spacing={2} sx={gridprops}>
      {users.map((user) => (
        <Grid item>
          <UserCard cardId={user.id} user={user} />
        </Grid>
      ))}
    </Grid>
  )

}