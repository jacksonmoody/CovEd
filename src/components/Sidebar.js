import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../helpers/theme';
import { Toolbar } from '@mui/material';
import { NavLink } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';




export default function Sidebar() {
    const drawerWidth = 240;
  
    const sidebaritems = [
      ['My Profile', '/myprofile'],
      ['Find a Mentor', '/findamentor'],
      ['Speaker Series', '/speakerseries'],
      ['Requests', '/requests'],
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
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#E8E8E8'
            },
          }}
        >
          <Toolbar />
          <Stack mt={24}>
            {sidebaritems.map((link) => (
              <NavLink to={link[1]} 
                 style={linkprops}>{link[0]}</NavLink>
            ))}
          </Stack>
        </Drawer>
      </ThemeProvider>
    );
  }