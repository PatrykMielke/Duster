import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ListingModal from "./Modal"; // Import the modal component
import { router } from "@inertiajs/react";

export default function Table({ products, statuses }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);

    const handleSaveListing = (updatedListing) => {
        router.post(route("admin.edit"), updatedListing, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedListing(null);
    };
    const handleButtonClick = (listing) => {
        setSelectedListing(listing);
        setModalOpen(true);
    };
    const getListings = (listingList) => {
        return listingList.map((listing) => ({
            id: listing.id,
            title: listing.title,
            description: listing.description,
            price: listing.price,
            user_id: listing.user_id,
            status_name: listing.status.name,
            status_id: listing.status_id,
        }));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "title", headerName: "Tytuł", width: 200 },
        { field: "description", headerName: "Opis", width: 200 },
        { field: "price", headerName: "Cena", width: 150 },
        { field: "user_id", headerName: "ID użytkownika", width: 150 },
        { field: "status_name", headerName: "Status", width: 150 },
        {
            field: "actions",
            headerName: "Akcje",
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button
                        color="primary"
                        onClick={() =>
                            params.row &&
                            handleButtonClick(params.row, statuses)
                        }
                    >
                        Szczegóły
                    </Button>
                </div>
            ),
        },
    ];

    const paginationModel = {
        page: 0,
        pageSize: 25,
        hideNextButton: false,
        hidePrevButton: true,
    };

    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid
                rows={getListings(products)}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[25, 50, 100]}
                checkboxSelection
                sx={{ border: 0 }}
            />
            <ListingModal
                open={modalOpen}
                onClose={handleCloseModal}
                listing={selectedListing}
                statuses={statuses}
                onSave={handleSaveListing}
            />
        </Paper>
    );
}
