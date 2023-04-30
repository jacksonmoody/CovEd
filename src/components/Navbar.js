import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';



const Navbar = () => {
    
    const navbarprops = {
        backgroundColor: '#FFFFFF',
        color: 'primary.main'
    }

    const covedprops = {
        fontFamily: 'Abhaya Libre',
        fontWeight: 800,
        fontSize: '24px'
    }

    const linkprops = {
        textDecoration:'none',
        fontSize: '16px',
        underline:'none',
        marginLeft: '40px',
        marginBottom: '20px',
        color: 'inherit',
        '&:visited': {
            color: 'inherit',
        },
    }

    const registerprops = {
        backgroundColor: '#F2BE32',
        color: 'white',
        textTransform: 'none',
        fontSize: '16px',
        borderRadius: 1, 
        width: '140px', 
        height: '40px', 
        p: 1, 
        ml: 4
    }

    const navitems = [['How It Works', '/howitworks'], ['Resources', '/resources'], ['FAQ', '/faq'], ['Meet Our Team', '/meetourteam'], ['Contact Us', '/contactus']];

    return (
        <AppBar sx={navbarprops}position="static">
            <Toolbar>
                <Typography variant="h6" sx={covedprops}>
                    CovEd
                </Typography>
                <Box>
                    {navitems.map((link) => (
                    <NavLink style={linkprops}  to={link[1]} >{link[0]}</NavLink>))}
                </Box>
                <Box ml={14}>
                    <NavLink style={linkprops} to='/login'>Login</NavLink>
                    <Button to='/register' variant="contained" sx={registerprops}>
                        Sign Up
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
    };

export default Navbar;