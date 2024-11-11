import ReportListingForm from "./Misc/Forms/ReportListingForm";
import ReportUserForm from "./Misc/Forms/ReportUserForm";

import CommentForm from "./Misc/Forms/CommentForm";
import Comment from "../Components/Comment";
export default function Views() {
    return (
        <>
            Modale
            <ReportUserForm userName="Maciek" />
            <ReportListingForm title="Lui witą torebka" />
            <CommentForm userName="Matylda" />
            <br />
            Komentarz
            <Comment
                avatar="https://geex.x-kom.pl/wp-content/uploads/2022/08/andrew-tate.png"
                username="Andrew Tate"
                rating="5"
                comment="Super śliczna i słodka różowa torebka 😍😍. Dostawa na ten sam dzień. POLECAM!!! 🥰🥰🥰🥰😘😘😘😘😘😍"
            />
        </>
    );
}
