import ListingList from "@/Components/Listings";
import Layout from "@/Layouts/Layout";

export default function Listings({ products, breadcrumbs, header }) {
    return (
        <Layout>
            <ListingList
                products={products}
                breadcrumbs={breadcrumbs}
                header={header}
            />
        </Layout>
    );
}
