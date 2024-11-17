import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@/Pages/Admin/Partials/Modal";
import { router } from "@inertiajs/react";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nazwa", width: 200 },
    { field: "email", headerName: "E-mail", width: 200 },
    { field: "last_activity", headerName: "Aktywność", width: 160 },
    //{ field: "created_at", headerName: "Utworzono", width: 160 },
    // { field: "listings", headerName: "Ogłoszenia", width: 150 },
    // { field: "followed_listings", headerName: "Ulubione", width: 150 },
    // { field: "followed_users", headerName: "Obserwowani", width: 170 },
    // { field: "reviews", headerName: "Opinie", width: 150 },
    // { field: "reports", headerName: "Zgłoszenia", width: 150 },
    { field: "role", headerName: "Rola", width: 150 },
    {
        field: "actions",
        headerName: "Akcje",
        width: 150,
        renderCell: (params) => (
            <Button
                color="primary"
                onClick={() =>
                    params.row && params.row.handleDetailsClick(params.row)
                }
            >
                Szczegóły
            </Button>
        ),
    },
];

const getUsers = (userList) => {
    let lista = [];
    userList.forEach((user) => {
        user = {
            id: user.id,
            email: user.email,
            name: user.name,
            last_activity: user.session ? user.session?.last_activity : "Nigdy",
            //created_at: user.created_at,
            role: user.role.name,
            role_id: user.role.id,
            is_active: user.is_active,
        };
        lista.push(user);
    });
    return lista;
};

const paginationModel = {
    page: 0,
    pageSize: 20,
    hideNextButton: false,
    hidePrevButton: false,
};

export default function DataTable({ users, roles }) {
    //console.log(users);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const handleDetailsClick = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
    };

    const handleSaveModal = (updatedUser) => {
        router.post(route("admin.useredit"), updatedUser, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const detailFields = [
        { key: "id", label: "ID", type: "static" },
        { key: "name", label: "Nazwa", type: "static" },
        { key: "email", label: "E-mail", type: "static" },
        { key: "last_activity", label: "Aktywność", type: "static" },
        { key: "created_at", label: "Utworzono", type: "static" },
        { key: "role_id", label: "Rola", type: "select", options: roles },
        { key: "is_active", label: "Aktywny", type: "switch" },
    ];

    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid
                rows={getUsers(users).map((user) => ({
                    ...user,
                    handleDetailsClick,
                }))}
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
            {isModalOpen && (
                <Modal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    data={selectedUser}
                    fields={detailFields}
                    onSave={handleSaveModal}
                    title="Szczegóły użytkownika"
                />
            )}
        </Paper>
    );
}
