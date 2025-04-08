import React from "react";
import { CssBaseline, Container, Typography, Paper } from "@mui/material";
import ContactList from "./ContactList";

function App() {
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Contact Manager
        </Typography>
        <ContactList />
      </Paper>
    </Container>
  );
}

export default App;
