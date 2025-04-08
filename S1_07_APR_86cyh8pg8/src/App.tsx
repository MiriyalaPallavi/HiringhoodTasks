import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { AddTransaction } from './pages/AddTransaction';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Switch, Button, Stack } from '@mui/material';
import { useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


export const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Finance Tracker
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <LightModeIcon />
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                inputProps={{ 'aria-label': 'toggle dark mode' }}
              />
              <DarkModeIcon />
            </Stack>

            <Button color="inherit" component={Link} to="/" sx={{ ml: 2 }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/add">
              Add
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTransaction />} />
          
          <Route path="/add/:id" element={<AddTransaction />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
};
