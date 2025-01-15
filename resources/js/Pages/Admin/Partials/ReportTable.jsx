import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@/Pages/Admin/Partials/Modal";
import { router } from '@inertiajs/react'

export default function DataTable({ reports }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedReport, setselectedReport] = useState(null);

    const handleSaveModal = (updatedListing) => {
        router.get(route("admin"), updatedListing, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setselectedReport(null);
    };
    const handleButtonClick = (listing) => {
        setselectedReport(listing);
        setModalOpen(true);
    };
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "reporter", headerName: "Zgłaszający", width: 200 },
        { field: "created_at", headerName: "Zgłoszono", width: 160 },
        { field: "type", headerName: "Typ", width: 150 },
        { field: "reason", headerName: "Powód", width: 150 },
        { field: "description", headerName: "Treść", width: 100 },
        {
            field: "actions",
            headerName: "Akcje",
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button
                        color="primary"
                        onClick={() =>
                            params.row && handleButtonClick(params.row,)
                        }
                    >
                        Szczegóły
                    </Button>
                </div>
            ),
        },

    ];

    const getReports = (reportList) => {
        let lista = [];
        reportList.forEach((report) => {
            report = {
                id: report.id,
                reporter: report.reported_by,
                description: report.description,
                reference_id: report.reference_id,
                type: report.type,
                reason: report.reason.name,
                created_at: report.created_at,
            };
            lista.push(report);
        });
        return lista;
    };


    const paginationModel = {
        page: 0,
        pageSize: 20,
        hideNextButton: false,
        hidePrevButton: true,
    };
    const handleBlock = (selectedReport) => {
        router.post(route("report.block"), {
            selectedReport: selectedReport
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => handleCloseModal(),

        });
    };
    const handleWarn = (selectedReport) => {
        router.post(route("report.warn"), {
            selectedReport: selectedReport
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (selectedReport) => {
        router.post(route("report.delete"), {
            selectedReport: selectedReport
        }, {
            preserveState: true,
            preserveScroll: true,

        });
    };



    const modalFields = [
        { key: "id", label: "Numer zgłoszenia", type: "static" },
        { key: "reporter", label: "ID zgłaszajacego", type: "static" },
        { key: "description", label: "Opis", type: "textarea", disabled: true },
        { key: "reason", label: "Powód", type: "static" },
        { key: "type", label: "Obiekt", type: "static" },
        { key: "reference_id", label: "ID zgłaszanego obiektu", type: "static" },
        {
            key: "block", label: "Zablokuj autora", type: "button", className: " mr-5 text-red-500 hover:bg-red-500 hover:text-white",
            onClick: () => handleBlock(selectedReport)
        },
        // {
        //     key: "warn", label: "Wyślij ostrzeżenie", type: "button", className: "mr-5",
        //     onClick: () => handleWarn(selectedReport)

        // },
        {
            key: "nofin", label: "Usun zgłoszenie", type: "button", className: "",
            onClick: () => handleDelete(selectedReport)

        },

    ];




    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid
                rows={getReports(reports)}
                columns={columns}
                initialState={{
                    pagination: { paginationModel },
                    columns: {
                        columnVisibilityModel: {
                            id: false,
                        },
                    },
                }}
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
                data={selectedReport}
                fields={modalFields}
                onSave={handleSaveModal}
                title="Szczegóły zgłoszenia"
            />

        </Paper>
    );
}
