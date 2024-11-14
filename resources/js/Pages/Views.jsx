import ReportListingForm from "./Misc/Forms/ReportListingForm";
import ReportUserForm from "./Misc/Forms/ReportUserForm";
import Layout from "@/Layouts/Layout";
import CommentForm from "./Misc/Forms/CommentForm";
import ReportCommentForm from "./Misc/Forms/ReportCommentForm";
import { useState } from "react";

export default function Views() {
    const [open, setOpen] = useState(false);
    const [selectedUsername, setSelectedUsername] = useState("");
    const [selectedId, setSelectedId] = useState(0);
    // Function to open the dialog
    const handleReportOpen = (username, id) => {
        setSelectedUsername(username);
        setSelectedId(id);
        setOpen(true);
    };

    // Function to close the dialog
    const handleReportClose = () => {
        setOpen(false);
    };

    return (
        <Layout>
            Modale
            <ReportUserForm userName="Maciek" />
            <ReportListingForm title="Lui witą torebka" />
            <CommentForm userName="Matylda" />
            <br />
            Komentarz
            {/* Report Dialog */}
            <ReportCommentForm
                username={selectedUsername}
                id={selectedId}
                open={open}
                onClose={handleReportClose}
            />
        </Layout>
    );
}
