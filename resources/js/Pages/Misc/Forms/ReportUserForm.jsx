import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function ReportUserForm(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selectedValue, setSelectedValue] = useState("");
    const [description, setDescription] = useState("");

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Selected Value:", selectedValue);
        console.log("Description:", description);
    };

    const reportReasons = [
        { name: "Nękanie", value: 1 },
        { name: "Groźby", value: 2 },
        { name: "Dyskryminacja", value: 3 },
        { name: "Próba oszustwa", value: 4 },
        { name: "Sprzedaż podrobionych produktów", value: 5 },
        { name: "Niestosowne zdjęcia", value: 6 },
    ];

    return (
        <div>
            <Button onClick={handleOpen}>Zgłoś użytkownika</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box component="form" sx={style} onSubmit={handleSubmit}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Zgłoś użytkownika {props?.userName}
                        </Typography>

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="select-label">Powód</InputLabel>
                            <Select
                                labelId="select-label"
                                value={selectedValue}
                                onChange={handleSelectChange}
                                label="Powód"
                            >
                                {reportReasons.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Opis"
                            multiline
                            rows={4}
                            value={description}
                            onChange={handleDescriptionChange}
                            variant="outlined"
                            fullWidth
                            sx={{
                                mt: 2,
                                "& .MuiOutlinedInput-root": {
                                    "& textarea": {
                                        boxShadow: "none",
                                        outline: "none",
                                    },
                                },
                            }}
                        />

                        <Button
                            sx={{ mt: 3 }}
                            type="submit"
                            variant="contained"
                        >
                            Zgłoś
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
