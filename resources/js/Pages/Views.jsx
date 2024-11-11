import ReportListingForm from "./Misc/Forms/ReportListingForm";
import ReportUserForm from "./Misc/Forms/ReportUserForm";
import Layout from "@/Layouts/Layout";
import CommentForm from "./Misc/Forms/CommentForm";
import Comment from "@/Components/Comment";
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
            <Comment
                id={1}
                avatar="https://geex.x-kom.pl/wp-content/uploads/2022/08/andrew-tate.png"
                username="Andrew Tate"
                rating={5}
                comment="Super śliczna i słitaśna różowa torebka 😍😍. Dostawa na ten sam dzień. POLECAM!!! 🥰🥰🥰🥰😘😘😘😘😘😍"
                onReport={handleReportOpen}
            />
            <Comment
                id={2}
                avatar="https://v.wpimg.pl/NTMxMjM4YTUsGjtZYk9sIG9CbwMkFmJ2OFp3SGIFfGR9AHpSeRsoPSEdPw89W2AzPw09CzpEYCQhVywaJBs4ZWIcJBk9WC8tYh0gCChQYW0oQX0IfVJ8eX8afw5gAHZgfFUvDyxRY2UsTHhZfAZ9bCweekgw"
                username="Pudzian"
                rating={4}
                comment="Moja lewa ręka to śmierć, a prawej sam się boję."
                onReport={handleReportOpen}
            />
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
