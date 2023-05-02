import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../helpers/theme';
import { Toolbar } from '@mui/material';
import { NavLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function Sidebar() {
    const drawerWidth = 240;
  
    const sidebaritems = [
      ['My Profile', '/profile'],
      ['Mentor Match', '/match'],
    ];

    const linkprops = {
      color: 'black',
      textDecoration:'none',
      fontSize: '1.25rem',
      underline:'none',
      marginLeft: '50px',
      marginBottom: '20px'
    }
  
    return (
      <ThemeProvider theme={theme}>
        <Box
          height="100%"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            backgroundColor: '#E8E8E8',
          }}
        >
          <Toolbar />
          <Stack mt={0}>
            {sidebaritems.map((link) => (
              <NavLink to={link[1]} 
                 style={linkprops}>{link[0]}</NavLink>
            ))}
          </Stack>
        </Box>
      </ThemeProvider>
    );
  }