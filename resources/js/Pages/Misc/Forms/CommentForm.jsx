import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

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
    pt: 2, // Dodatkowe miejsce na ikonę zamykania
};

export default function CommentForm(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");

    const handleRatingChange = (event, newValue) => {
        setRating(newValue); // newValue will be a number from the Rating component
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/comments", {
                profile_user_id: props.profileUserId, // ID użytkownika, do którego jest komentarz
                rating: rating,
                comment: description,
            });
            setRating(0); // Reset rating
            setDescription(""); // Reset description

            console.log("Komentarz został zapisany:", response.data);
            handleClose(); // Zamyka modal po zapisaniu
            props.onCommentAdded();
        } catch (error) {
            console.error(
                "Wystąpił błąd podczas zapisywania komentarza:",
                error,
            );
        }
    };

    return (
        <div>
            <Button onClick={handleOpen}>Oceń użytkownika</Button>
            <Modal
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
                        {/* Ikona X do zamykania */}
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        {/* Tytuł modala */}
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ mb: 2 }}
                        >
                            Oceń użytkownika {props?.userName}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>Ocena</Typography>
                        <Rating
                            name="user-rating"
                            value={rating} // Ensure this is a number
                            onChange={handleRatingChange}
                            size="large"
                        />

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

                        {/* Przyciski "Anuluj" i "Oceń" */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 3,
                                gap: 1,
                            }}
                        >
                            <Button onClick={handleClose} variant="outlined">
                                Anuluj
                            </Button>
                            <Button type="submit" variant="contained">
                                Oceń
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
