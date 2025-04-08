import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "./redux/weatherSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import Home from "./pages/Home";
import Search from "./pages/Search";
// import Navbar from "./components/Navbar"; // ❌ Removed
import { GlobalStyles } from "./styles/GlobalStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchWeather({ lat: latitude, lon: longitude }) as any);
        },
        (error) => {
          console.error("Error fetching location:", error);
          toast.error("⚠️ Location access denied. Search a city manually.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles theme={theme} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Router>
        {/* ❌ Navbar removed */}
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;

