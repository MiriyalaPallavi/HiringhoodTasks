
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { Delete, Edit, PersonAdd, Search } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  photo: string;
}

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("https://via.placeholder.com/50");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [contacts, searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddOrUpdateContact = () => {
    if (!name || !phone) {
      setSnackbarMessage("Name and Phone are required!");
      setSnackbarOpen(true);
      return;
    }

    let updatedContacts;

    if (editingId) {
      updatedContacts = contacts.map((contact) =>
        contact.id === editingId ? { ...contact, name, phone, email, address, photo } : contact
      );
      setSnackbarMessage("Contact updated successfully!");
    } else {
      const newContact: Contact = { id: uuidv4(), name, phone, email, address, photo };
      updatedContacts = [...contacts, newContact];
      setSnackbarMessage("Contact added successfully!");
    }

    setContacts(updatedContacts);
    setIsAdding(false);
    setSnackbarOpen(true);
    resetForm();
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    setSnackbarMessage("Contact deleted successfully!");
    setSnackbarOpen(true);
  };

  const editContact = (contact: Contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email || "");
    setAddress(contact.address || "");
    setPhoto(contact.photo);
    setEditingId(contact.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setPhoto("https://via.placeholder.com/50");
    setEditingId(null);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#eef2f3", minHeight: "100vh" }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => setIsAdding(true)}
          sx={{ backgroundColor: "#16a085", color: "white", '&:hover': { backgroundColor: "#13876d" } }}
        >
          Add Contact
        </Button>
        <TextField
          variant="outlined"
          placeholder="Search Contacts"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{ startAdornment: <Search /> }}
          sx={{ flexGrow: 1 }}
        />
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: "10px", overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#34495e" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Photo</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell><Avatar src={contact.photo} /></TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.email || "N/A"}</TableCell>
                <TableCell>{contact.address || "N/A"}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => editContact(contact)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => deleteContact(contact.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isAdding} onClose={() => setIsAdding(false)}>
        <DialogTitle>{editingId ? "Edit Contact" : "Add Contact"}</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Phone" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Address" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAdding(false)}>Cancel</Button>
          <Button onClick={handleAddOrUpdateContact} variant="contained" color="primary">{editingId ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


