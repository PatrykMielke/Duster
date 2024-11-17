import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    FormControlLabel,
    Switch,
    TextField,
} from "@mui/material";

export default function Modal({
    open,
    onClose,
    data,
    fields,
    onSave,
    title,
}) {
    const [editedData, setEditedData] = useState(data || {});
    useEffect(() => {
        setEditedData(data || {});
    }, [data]);

    const handleFieldChange = (field, value) => {
        setEditedData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(editedData);
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {fields.map((field) => {
                    const { key, label, type, options, disabled } = field;
                    switch (type) {
                        case "select":
                            return (
                                <FormControl fullWidth key={key} margin="normal">
                                    <InputLabel>{label}</InputLabel>
                                    <Select
                                        value={editedData[key] || ''}
                                        onChange={(e) => handleFieldChange(key, e.target.value)}
                                        label={label}
                                    >
                                        {options.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            );

                        case "switch":
                            return (
                                <FormControlLabel
                                    key={key}
                                    control={
                                        <Switch
                                            checked={editedData[key] || false}
                                            onChange={(e) =>
                                                handleFieldChange(key, e.target.checked)
                                            }
                                        />
                                    }
                                    label={label}
                                />
                            );

                        case "text":
                            return (
                                <TextField
                                    key={key}
                                    fullWidth
                                    margin="normal"
                                    label={label}
                                    value={editedData[key] || ""}
                                    onChange={(e) =>
                                        handleFieldChange(key, e.target.value)
                                    }
                                    disabled={disabled}
                                />
                            );
                        case "textarea":
                            return (
                                <TextField
                                    key={key}
                                    fullWidth
                                    margin="normal"
                                    label={label}
                                    value={editedData[key] || ""}
                                    onChange={(e) => handleFieldChange(key, e.target.value)}
                                    multiline
                                    rows={10}
                                    disabled={disabled}

                                />
                            );
                        case "static":
                        default:
                            return (
                                <TextField
                                    key={key}
                                    fullWidth
                                    margin="normal"
                                    label={label}
                                    value={editedData[key] || ""}
                                    disabled
                                />
                            );
                    }
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
