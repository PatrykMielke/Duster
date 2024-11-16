import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListingModal from "./Modal";
import { router } from "@inertiajs/react";
import { idID } from "@mui/material/locale";

export default function Table({ orders, statuses }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    /* const handleSaveListing = (updatedOrder) => {
        router.post(route("admin.edit"), updatedOrder, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedOrder(null);
    };
    const handleButtonClick = (order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    }; */
    const getListings = (listingList) => {
        return listingList.map((order) => ({
            id: order.id,
            title: order.listing.title,
            description: order.listing.description,
            price: order.listing.price,
            seller_id: order.listing.user.name,
            status_id: order.apartment,
            buyer_id: order.buyer.name,
            payment_method: order.payment_method.name,
            delivery_method: order.delivery_method.name,
            created_at: new Date(order.created_at).toLocaleString(),
        }));
    };
    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "title", headerName: "Tytuł", width: 250 },
        { field: "description", headerName: "Opis", width: 300 },
        { field: "price", headerName: "Cena", width: 120 },
        { field: "seller_id", headerName: "Sprzedający", width: 180 },
        { field: "buyer_id", headerName: "Kupujący", width: 180 },
        { field: "status_name", headerName: "Status", width: 150 },
        { field: "delivery_method", headerName: "Dostawa", width: 150 },
        { field: "payment_method", headerName: "Płatność", width: 150 },
        { field: "created_at", headerName: "Data zakupu", width: 160 },
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
        pageSize: 10,
        hideNextButton: false,
        hidePrevButton: true,
    };

    return (
        <Box sx={{ width: "95%" }}>
            <DataGrid
                rows={getListings(orders)}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 25, 50]}
                checkboxSelection
                sx={{ border: 0 }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />
            {/* <ListingModal
                open={modalOpen}
                onClose={handleCloseModal}
                order={selectedListing}
                statuses={statuses}
                onSave={handleSaveOrder}
            /> */}
        </Box>
    );
}
