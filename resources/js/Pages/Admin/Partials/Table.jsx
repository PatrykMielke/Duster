import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { router } from "@inertiajs/react";
import Modal from "@/Pages/Admin/Partials/Modal";
import { disableTime } from "rsuite/esm/internals/utils/date";
import { DisabledByDefault } from "@mui/icons-material";
export default function Table({ products, statuses }) {

    const getListings = (listingList) => {
        return listingList.map((listing) => ({
            id: listing.id,
            title: listing.title,
            description: listing.description,
            price: listing.price,
            user_id: listing.user_id,
            status: listing.status.name,
            status_id: listing.status_id,
        }));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "title", headerName: "Tytuł", width: 200 },
        { field: "description", headerName: "Opis", width: 200 },
        { field: "price", headerName: "Cena", width: 150 },
        { field: "user_id", headerName: "ID użytkownika", width: 150 },
        { field: "status", headerName: "Status", width: 150 },
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
        pageSize: 20,
        hideNextButton: false,
        hidePrevButton: true,
    };


    const [modalOpen, setModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);

    const handleSaveListing = (updatedListing) => {
        router.post(route("admin.listingedit"), updatedListing, {
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

    const modalFields = [
        { key: "id", label: "ID", type: "static" },
        { key: "user_id", label: "ID użytkownika", type: "static" },
        { key: "title", label: "Tytuł", type: "static" },
        { key: "description", label: "Opis", type: "textarea", disabled: true },
        { key: "price", label: "Cena", type: "static" },
        { key: "status_id", label: "Status", type: "select", options: statuses },
    ];




    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid
                rows={getListings(products)}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 20, 50]}
                checkboxSelection
                sx={{ border: 0 }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />


            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                data={selectedListing}
                fields={modalFields}
                onSave={handleSaveListing}
                title="Szczegóły ogłoszenia"
            />

        </Paper>
    );
}
