/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

import Layout from "@/Layouts/Layout";
import ProductSection from "@/Components/FilterBar";
import Listing from "./Listing";
export default function Example({ products }) {
    return (
        <Layout>
            <div className="bg-white rounded-[2rem] p-4">
                <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6  lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    </h2>
                    <ProductSection />

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <Listing key={product.id} product={product} />

                        ))}
                    </div>
                </div>
            </div>

        </Layout>
    );
}


