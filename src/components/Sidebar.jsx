import React from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../helpers/theme";
import { Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { SECONDARIES } from "../helpers/constants";

export default function Sidebar() {
  const drawerWidth = 240;

  return (
    <ThemeProvider theme={theme}>
      <Box
        height="100%"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          backgroundColor: "#E8E8E8"
        }}>
        <Toolbar />
        <Stack mt={0}>
          {SECONDARIES.map((link, index) => (
            <NavLink key={index} to={link[1]} className="navbar__link sidebar">
              {link[0]}
            </NavLink>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
