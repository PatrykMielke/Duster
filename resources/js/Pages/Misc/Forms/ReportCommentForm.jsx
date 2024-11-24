import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@mui/material";
import { useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from "react";
function ReportModal({ open, onClose, header, title, referenceId, reportType, auth }) {

    const reportReasons = [
        { name: "Nękanie", value: 1 },
        { name: "Groźby", value: 2 },
        { name: "Dyskryminacja", value: 3 },
        { name: "Próba oszustwa", value: 4 },
        { name: "Sprzedaż podrobionych produktów", value: 5 },
        { name: "Niestosowne zdjęcia", value: 6 },
    ];
    console.log(referenceId, "modal");
    const { data, setData, post, processing, errors, reset } = useForm({
        report_reason: "",
        referenceId: "",
        reportType: "",
        additional_comments: "",
    });

    useEffect(() => {
    }), [];

    const handleReasonChange = (event) => {
        setData("report_reason", event.target.value);
    };

    const handleCommentsChange = (event) => {
        setData("additional_comments", event.target.value);
    };

    const handleConfirm = () => {
        data.referenceId = referenceId;
        data.reportType = reportType;

        post(route("report.store"), {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                onClose();
                reset();

            },
            onSuccess: () => {
                reset();
                onClose();
            },

        });
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="report-modal-title" aria-describedby="report-modal-description">
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
                    {title} {header}
                </Typography>

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="select-label">Powód</InputLabel>
                    <Select
                        labelId="select-label"
                        value={data.report_reason}
                        onChange={handleReasonChange}
                        label="Powód"
                    >
                        {reportReasons.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.report_reason && (
                        <FormHelperText error>{errors.report_reason}</FormHelperText>
                    )}
                </FormControl>

                <TextField
                    label="Opis"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={data.additional_comments}
                    onChange={handleCommentsChange}
                    margin="normal"
                    sx={{
                        mt: 2,
                        "& .MuiOutlinedInput-root": {
                            "& textarea": {
                                boxShadow: "none",
                                outline: "none",
                            },
                        },
                    }}
                    error={!!errors.additional_comments}
                    helperText={errors.additional_comments}
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                    <SecondaryButton onClick={onClose} color="secondary">
                        Anuluj
                    </SecondaryButton>
                    <PrimaryButton
                        onClick={handleConfirm}
                        color="primary"
                        variant="contained"
                        disabled={processing}
                    >
                        {processing ? "Wysyłanie..." : "Zgłoś"}
                    </PrimaryButton>
                </Box>
            </Box>
        </Modal>
    );
}

export default ReportModal;