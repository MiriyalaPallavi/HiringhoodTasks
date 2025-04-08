

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { data, status, error } = useSelector((state: RootState) => state.weather);

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Typography variant="h6" align="center" color="error" sx={{ mt: 5 }}>
        ❌ Failed to fetch weather data: {error}
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        📡 No weather data available. Please search for a city.
      </Typography>
    );
  }

  const { current } = data;
  const timezone = data.forecast.city.name;

  // Group forecast data by day
  const forecastByDay: { [date: string]: any[] } = {};
  data.forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!forecastByDay[date]) {
      forecastByDay[date] = [];
    }
    forecastByDay[date].push(item);
  });

  const dailyForecast = Object.keys(forecastByDay)
    .slice(0, 5)
    .map((date) => {
      const items = forecastByDay[date];
      const avgTemp = (
        items.reduce((sum, item) => sum + item.main.temp, 0) / items.length
      ).toFixed(1);
      const icon = items[0].weather[0].icon;
      const humidity = items[0].main.humidity;
      return { date, avgTemp, icon, humidity };
    });

  return (
    <>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "#f57c00" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            WeatherApp
          </Typography>
          <Button color="inherit" component={Link} to="/search">
            Search
          </Button>
        </Toolbar>
      </AppBar>
      

      {/* Main Weather Display */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
          p: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Current Weather */}
          <Card
            sx={{
              maxWidth: 420,
              margin: "auto",
              mt: 5,
              p: 2,
              boxShadow: 6,
              textAlign: "center",
              bgcolor: "#fff3e0",
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                🌍 {timezone}
              </Typography>

              <CardMedia
                component="img"
                alt="weather-icon"
                src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                sx={{ width: 80, height: 80, mx: "auto", my: 1 }}
              />

              <Typography variant="h6">🌡️ {current.main.temp}°C</Typography>
              <Typography variant="body1">💧 Humidity: {current.main.humidity}%</Typography>
              <Typography variant="body1">🌬️ Wind: {current.wind.speed} m/s</Typography>
              <Typography variant="body1" textTransform="capitalize">
                ☁️ {current.weather[0].description}
              </Typography>
            </CardContent>
          </Card>

          {/* Forecast Section */}
          <Typography
            variant="h6"
            textAlign="center"
            mt={5}
            fontWeight="bold"
          >
            5-Day Forecast
          </Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            mt={3}
            px={2}
          >
            {dailyForecast.map((day, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    width: 140,
                    textAlign: "center",
                    p: 2,
                    borderRadius: 4,
                    boxShadow: 4,
                    bgcolor: "#fffde7",
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {new Date(day.date).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                  <CardMedia
                    component="img"
                    src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                    alt="weather-icon"
                    sx={{ width: 50, height: 50, mx: "auto", my: 1 }}
                  />
                  <Typography variant="body2">🌡 {day.avgTemp}°C</Typography>
                  <Typography variant="caption">💧 {day.humidity}%</Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default Home;
