import ProductSection from "@/Components/FilterBar";
import Listing from "@/Pages/Listing/Partials/Listing";
import Layout from "@/Layouts/Layout";

export default function Listings({ products }) {
    return (
        <Layout>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6  lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <Listing key={product.id} product={product} />
                            ))
                        ) : (
                            <p>Brak wystawionych przedmiotów.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}


