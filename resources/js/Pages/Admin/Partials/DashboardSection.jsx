import Box from "@mui/material/Box";
export default function DashboardItem(props) {
    return (
        <Box
            sx={{
                py: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            {props.component}
        </Box>
    );
}
