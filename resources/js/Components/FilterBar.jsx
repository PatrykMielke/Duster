import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function FilterBar({ onSortChange }) {
    const [sortOption, setSortOption] = useState("created_at:desc");

    const handleSortChange = (event) => {
        const [criteria, order] = event.target.value.split(":");
        setSortOption(event.target.value);
        onSortChange(criteria, order);
    };

    return (
        <FormControl
            sx={{ minWidth: 256 }}
            variant="outlined"
            className="sort-bar"
        >
            <InputLabel>Sortuj według</InputLabel>
            <Select
                value={sortOption}
                onChange={handleSortChange}
                label="Sortuj według"
                defaultValue="created_at:desc"
            >
                <MenuItem value="created_at:desc">Najnowsze</MenuItem>
                <MenuItem value="created_at:asc">Najstarsze</MenuItem>
                <MenuItem value="price:asc">Cena od najniższej</MenuItem>
                <MenuItem value="price:desc">Cena od najwyższej</MenuItem>
                <MenuItem value="follow_count:desc">
                    Najwięcej obserwowanych
                </MenuItem>
                <MenuItem value="follow_count:asc">
                    Najmniej obserwowanych
                </MenuItem>
            </Select>
        </FormControl>
    );
}
