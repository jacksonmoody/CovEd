import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#19568C',
      dark: '#0F3C61',
      light: '#E7F2FB',
    },
    secondary: {
      main: '#F2BE32',
    },
  },
  typography: {
    fontFamily: '"Raleway", "Montserrat", sans-serif',
  },
});