import ListingList from "@/Components/Listings";
import Layout from "@/Layouts/Layout";

export default function Listings({ products, category }) {
    return (
        <Layout>
            <ListingList products={products} />
        </Layout>
    );
}
