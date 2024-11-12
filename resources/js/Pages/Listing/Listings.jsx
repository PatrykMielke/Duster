import ProductSection from "@/Components/FilterBar";
import Listing from "@/Pages/Listing/Partials/Listing";
export default function Listings({ products }) {
    return (
        <>
            {products && products.length > 0 ? (
                products.map((product) => (
                    <Listing key={product.id} product={product} />
                ))
            ) : (
                <p>Brak wystawionych przedmiotów.</p>
            )}
        </>
    );
}
