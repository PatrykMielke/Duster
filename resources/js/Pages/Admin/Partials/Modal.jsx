import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function ListingModal({ open, onClose, listing, onSave, statuses }) {
    if (!listing) return null;

    const [editedListing, setEditedListing] = useState(listing);

    // Mapa kluczy do nazw w języku polskim
    const fieldNames = {
        id: "ID",
        title: "Tytuł",
        description: "Opis",
        price: "Cena",
        user_id: "ID użytkownika",
        status_name: "Status",
    };

    const handleStatusChange = (event) => {
        setEditedListing({ ...editedListing, status_id: event.target.value });
    };

    const handleSave = () => {
        onSave({ id: listing.id, status_id: editedListing.status_id });
        onClose();
    };

    const listingKeys = Object.keys(editedListing);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edytuj Listing</DialogTitle>
            <DialogContent>
                {listingKeys.map((key) => {
                    if (key === 'status_id') {
                        return (
                            <FormControl fullWidth key={key} margin="normal">
                                <InputLabel>{fieldNames[key]}</InputLabel>
                                <Select
                                    value={editedListing[key]}
                                    onChange={handleStatusChange}
                                    label={fieldNames[key]}
                                >
                                    {statuses.map((status) => (
                                        <MenuItem key={status.id} value={status.id}>
                                            {status.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        );
                    }
                    return (
                        <Typography variant="body1" gutterBottom key={key}>
                            <strong>{fieldNames[key] || key}:</strong> {editedListing[key]}
                        </Typography>
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Zamknij
                </Button>
                <Button onClick={handleSave} color="primary">
                    Zapisz
                </Button>
            </DialogActions>
        </Dialog>
    );
}
