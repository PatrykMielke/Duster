import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Zgłaszający", width: 200 },
    { field: "created_at", headerName: "Zgłoszono", width: 160 },
    { field: "solved", headerName: "Rozwiązane", width: 160 },
    { field: "type", headerName: "Typ", width: 150 },
    { field: "reason", headerName: "Powód", width: 150 },
    { field: "description", headerName: "Treść", width: 750 },
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
            created_at: user.created_at,
            role: user.role.name,
        };
        lista.push(user);
    });
    return lista;
};

const paginationModel = {
    page: 0,
    pageSize: 20,
    hideNextButton: false,
    hidePrevButton: true,
};

export default function DataTable({ users }) {
    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid
                rows={getUsers(users)}
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
        </Paper>
    );
}
