import React from 'react';

export default function Listing({ product }) {
    // Check if the product has galleries and get the first image if available
    const imageSrc = product.galleries.length > 0 ? product.galleries[0].image : 'default-image-url.jpg'; // Provide a default image URL if no images are available

    return (
        <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={imageSrc}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a
                            href={route("listing", product.id)}
                        >
                            <span
                                aria-hidden="true"
                                className="absolute inset-0"
                            />
                            {product.title}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {new Date(product.created_at).toLocaleDateString()}
                    </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                    {product.price}
                </p>
            </div>
        </div>
    );
}
