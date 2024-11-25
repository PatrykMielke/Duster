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
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Modal({
    open,
    onClose,
    data,
    fields,
    onSave,
    title,
    onClick,
    className
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
                    const { key, label, type, options, disabled, className, onClick } = field;
                    switch (type) {
                        case "select":
                            return (
                                <FormControl fullWidth key={key} margin="normal">
                                    className={className}
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
                                    className={className}
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
                                    className={className}
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
                                    className={className}
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
                        case "button":
                            return (
                                <SecondaryButton
                                    key={key}
                                    className={className}
                                    onClick={onClick}
                                >
                                    {label}
                                </SecondaryButton>
                            )
                        default:
                            return (
                                <TextField
                                    className={className}
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
                <SecondaryButton onClick={onClose} color="secondary">
                    Zamknij
                </SecondaryButton>
                <PrimaryButton onClick={handleSave} color="primary">
                    Zapisz
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
}
