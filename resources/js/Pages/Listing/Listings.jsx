import ListingList from "@/Components/Listings";
import Layout from "@/Layouts/Layout";

export default function Listings({ products, breadcrumbs, category }) {
    return (
        <Layout>
            <ListingList
                products={products}
                breadcrumbs={breadcrumbs}
                header={"z kategorii " + category}
            />
        </Layout>
    );
}
