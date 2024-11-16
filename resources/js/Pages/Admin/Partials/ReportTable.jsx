import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nazwa", width: 200 },
    { field: "email", headerName: "E-mail", width: 200 },
    { field: "last_activity", headerName: "Aktywność", width: 150 },
    { field: "listings", headerName: "Ogłoszenia", width: 150 },
    { field: "followed_listings", headerName: "Ulubione", width: 150 },
    { field: "followed_users", headerName: "Obserwowani", width: 170 },
    { field: "reviews", headerName: "Opinie", width: 150 },
    { field: "reports", headerName: "Zgłoszenia", width: 150 },
    { field: "role", headerName: "Rola", width: 150 },
    {
        field: "actions",
        headerName: "Akcje",
        width: 150,
        renderCell: (params) => (
            <div>
                <Button
                    color="primary"
                    onClick={() =>
                        params.row && handleButtonClick(params.row, statuses)
                    }
                >
                    Szczegóły
                </Button>
            </div>
        ),
    },
    /* {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 90,
    }, */
    /* {
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.name || ""} ${row.email || ""}`,
    }, */
];

const getUsers = (userList) => {
    let lista = [];
    userList.forEach((user) => {
        user = {
            id: user.id,
            email: user.email,
            name: user.name,
            last_activity: new Date(
                user.session?.last_activity,
            ).toLocaleDateString("pl-PL", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
            role: user.role.name,
        };
        lista.push(user);
    });
    return lista;
};

const paginationModel = {
    page: 0,
    pageSize: 5,
    hideNextButton: false,
    hidePrevButton: true,
};

export default function DataTable({ users }) {
    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid
                rows={getUsers(users)}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
                sx={{ border: 0 }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />
        </Paper>
    );
}
