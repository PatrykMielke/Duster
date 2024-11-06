import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

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

const rows = [
    { id: 1, email: "Snow", name: "Jon", age: 35 },
    { id: 2, email: "Lannister", name: "Cersei", age: 42 },
    { id: 3, email: "Lannister", name: "Jaime", age: 45 },
    { id: 4, email: "Stark", name: "Arya", age: 16 },
    { id: 5, email: "Targaryen", name: "Daenerys", age: null },
    { id: 6, email: "Melisandre", name: null, age: 150 },
    { id: 7, email: "Clifford", name: "Ferrara", age: 44 },
    { id: 8, email: "Frances", name: "Rossini", age: 36 },
    { id: 9, email: "Roxie", name: "Harvey", age: 65 },
];

const getUsers = (userList) => {
    let lista = [];
    let user;
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
    console.log(getUsers(users));
    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid
                rows={getUsers(users)}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
