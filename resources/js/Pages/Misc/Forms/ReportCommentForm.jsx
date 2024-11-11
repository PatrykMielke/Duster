import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";

function ReportModal({ open, onClose, username, id }) {
    const reportReasons = [
        { name: "Nękanie", value: 1 },
        { name: "Groźby", value: 2 },
        { name: "Dyskryminacja", value: 3 },
        { name: "Próba oszustwa", value: 4 },
        { name: "Sprzedaż podrobionych produktów", value: 5 },
        { name: "Niestosowne zdjęcia", value: 6 },
    ];

    const [reportReason, setReportReason] = useState("");
    const [additionalComments, setAdditionalComments] = useState("");
    const [report_id, setId] = useState("");
    // Handle changes in the Select field (Reason)
    const handleReasonChange = (event) => {
        setReportReason(event.target.value);
    };

    // Handle changes in the TextField (Additional Comments)
    const handleCommentsChange = (event) => {
        setAdditionalComments(event.target.value);
    };

    // Handle confirm action
    const handleConfirm = () => {
        // Add logic to handle the report (e.g., send data to an API)
        console.log("Report Reason:", reportReason);
        console.log("Additional Comments:", additionalComments);
        console.log("ID:", id);
        console.log("Nazwa:", username);
        // Close the modal after submission
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="report-modal-title"
            aria-describedby="report-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "1px solid #000",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" id="report-modal-title">
                    Zgłoś komentarz {username}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                ></Typography>

                {/* Select Field for Report Reason */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="select-label">Powód</InputLabel>
                    <Select
                        labelId="select-label"
                        value={reportReason}
                        onChange={handleReasonChange}
                        label="Powód"
                    >
                        {reportReasons.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* TextField for Additional Comments */}
                <TextField
                    label="Additional Comments"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={additionalComments}
                    onChange={handleCommentsChange}
                    margin="normal"
                />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        color="primary"
                        variant="contained"
                    >
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ReportModal;
