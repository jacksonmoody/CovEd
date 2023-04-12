import React from 'react'
import UserCard from '../components/UserCard'
import Grid from '@mui/material/Grid'

export default function MentorGrid () {
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

    const gridprops ={
        display: 'flex',
        flexDirection: 'row',
        m: 0,
        ml: 2,
        mt: 30,

    }
    return (
        <Grid container spacing={2} sx={gridprops}>
            {users.map((user, index) => (
                <Grid item>
                    <UserCard key={index} user={user}/>
                </Grid>
            ))}
            {users.map((user, index) => (
                <Grid item>
                    <UserCard key={index} user={user}/>
                </Grid>
            ))}
            {users.map((user, index) => (
                <Grid item>
                    <UserCard key={index} user={user}/>
                </Grid>
            ))}
        </Grid>
    )

}