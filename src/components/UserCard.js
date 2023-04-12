import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default function UserCard({ user }) {
    const cardprops = {
        width: '260px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        p: 2,
        backgroundColor: 'white',
    }

    const cardinfo = [user.name, user.timezone, user.subjects.join(', '), user.gradeLevels.join(', ')]

    // When using db just replace above with user.name, user.timezone, user.subjects, user.gradelevels (or whatever you call them)

    return (

        <Card sx={cardprops}>
            <Stack spacing={1} sx={{display: 'flex', justifyContent: 'center'}}>
                <Avatar alt='User Profile' src={'../static/placeholderpic.jpg'} sx={{height: '140px', width: '140px'}}/>
                {cardinfo.map((text, index) => (
                    <Typography key={index} variant={index === 0 ? 'h6' : 'p'} sx={{ padding: 0, margin: 2, textAlign: 'center' }}>
                        {text}
                    </Typography>
                ))}
            </Stack>
        </Card>

    );
}

// Placeholders: user pfp (stored in db?), username (store in db), time zone, subjects, grade level (stored in db?)