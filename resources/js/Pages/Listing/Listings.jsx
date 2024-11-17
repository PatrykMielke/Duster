import ListingList from "@/Components/Listings";
import Layout from "@/Layouts/Layout";

export default function Listings({ products, breadcrumbs }) {
    return (
        <Layout>
            <ListingList products={products} breadcrumbs={breadcrumbs} />
        </Layout>
    );
}
