import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";

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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Selected Value:", rating);
        console.log("Description:", description);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Oceń użytkownika</Button>
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
