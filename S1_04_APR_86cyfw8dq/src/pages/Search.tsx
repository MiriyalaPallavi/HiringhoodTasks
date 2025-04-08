import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useAppDispatch } from "../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchWeather } from "../redux/weatherSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [city, setCity] = useState("");

  const weather = useSelector((state: RootState) => state.weather.data);
  const status = useSelector((state: RootState) => state.weather.status);
  const error = useSelector((state: RootState) => state.weather.error);

  const handleSearch = () => {
    if (city.trim() !== "") {
      dispatch(fetchWeather({ city }))
        .unwrap()
        .then(() => {
          navigate("/"); // Navigate after successful fetch
        })
        .catch((err) => {
          console.error("Search error:", err);
        });
    }
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            fetchWeather({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            })
          )
            .unwrap()
            .then(() => {
              navigate("/"); // Navigate after successful location fetch
            })
            .catch((err) => {
              console.error("Location fetch error:", err);
            });
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Location access denied or unavailable.");
        }
      );
    } else {
      alert("Geolocation not supported by this browser.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 3,
            borderRadius: 4,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#fff" }}
            >
              🌦️ Search Weather
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              label="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#ffffffcc",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" },
                },
              }}
              InputProps={{
                sx: { fontWeight: 500 },
              }}
            />

            <Box display="flex" justifyContent="center" gap={2} mt={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                disabled={!city.trim()}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                Search
              </Button>

              <IconButton
                color="secondary"
                onClick={handleLocationSearch}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  backdropFilter: "blur(4px)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.3)",
                    color: "#000",
                  },
                  borderRadius: 2,
                }}
              >
                <MyLocationIcon />
              </IconButton>
            </Box>

            {status === "loading" && (
              <Typography mt={2} color="white">
                ⏳ Loading weather...
              </Typography>
            )}

            {error && (
              <Typography mt={2} color="error.main">
                ❌ {error}
              </Typography>
            )}

            {weather && (
              <Box
                mt={3}
                p={2}
                bgcolor="rgba(255,255,255,0.3)"
                borderRadius={2}
              >
                <Typography variant="h6" color="white">
                  🌍 {weather.current.name}
                </Typography>
                <Typography color="white">
                  🌡️ Temp: {weather.current.main.temp}°C
                </Typography>
                <Typography color="white">
                  💧 Humidity: {weather.current.main.humidity}%
                </Typography>
                <Typography color="white">
                  🌬️ Wind: {weather.current.wind.speed} m/s
                </Typography>
                <Typography color="white">
                  ⛅ {weather.current.weather[0].description}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Search;
