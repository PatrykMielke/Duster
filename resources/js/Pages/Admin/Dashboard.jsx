import * as React from "react";
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReportIcon from "@mui/icons-material/Report";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import UserTable from "./Partials/UserTable";
import DashboardSection from "./Partials/DashboardSection";
import Table from "./Partials/Table";

const NAVIGATION = [
    {
        segment: "panel",
        title: "Panel główny",
        icon: <DashboardIcon />,
    },
    {
        kind: "divider",
    },
    {
        segment: "uzytkownicy",
        title: "Użytkownicy",
        icon: <PersonIcon />,
    },
    {
        segment: "skargi",
        title: "Skargi",
        icon: <ReportIcon />,
    },
    {
        kind: "divider",
    },
    {
        segment: "ogloszenia",
        title: "Ogłoszenia",
        icon: <ShoppingCartIcon />,
    },
    {
        segment: "zamowienia",
        title: "Zamówienia",
        icon: <LocalShippingIcon />,
    },
    {
        segment: "faktury",
        title: "Faktury",
        icon: <ReceiptIcon />,
    },
    {
        kind: "divider",
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function PageContent({ pathname }) {
    switch (pathname) {
        case "/panel":
            return <DashboardSection component={<UserTable />} />;
        case "/uzytkownicy":
            return <DashboardSection component={<UserTable />} />;
        case "/skargi":
            return <DashboardSection component={<UserTable />} />;
        case "/ogloszenia":
            return <DashboardSection component={<Table />} />;
        case "/zamowienia":
            return <DashboardSection component={<UserTable />} />;
        case "/faktury":
            return <DashboardSection component={<UserTable />} />;
        default:
            console.log("error");
    }
}

PageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
    const { window } = props;

    const router = useDemoRouter("/panel");

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src="" alt="" />,
                title: "Duster",
            }}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <PageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}

DashboardLayoutBranding.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default DashboardLayoutBranding;
