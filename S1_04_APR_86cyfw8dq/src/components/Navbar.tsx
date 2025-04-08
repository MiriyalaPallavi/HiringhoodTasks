import React from "react";
import { AppBar, Toolbar, Typography, Switch } from "@mui/material";
import { Link } from "react-router-dom";

interface NavbarProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, darkMode }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Weather App
          </Link>
        </Typography>
        <Link
          to="/search"
          style={{ textDecoration: "none", color: "inherit", marginRight: 20 }}
        >
          Search
        </Link>
        <Switch checked={darkMode} onChange={toggleTheme} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
