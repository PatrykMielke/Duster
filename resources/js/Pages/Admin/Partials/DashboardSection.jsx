import Box from "@mui/material/Box";
export default function DashboardItem(props) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                pt: 2,
                pb: 10,
            }}
        >
            {props.component}
        </Box>
    );
}
