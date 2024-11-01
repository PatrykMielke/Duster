import { Link } from '@inertiajs/react'
import React from 'react'

export default function Summary({
    listing, shippingCost, total, currentStep, setCurrentStep
}) {
    const handleClick = (e) => {
        if (currentStep === 3) {
            // Zablokuj domyślne działanie Link, gdy przekierowujemy
            e.preventDefault();
            // Przekierowanie do ścieżki '/orders'
            window.location.href = route('orders.store', { listingId: listing.id });
        } else {
            // Zwiększ currentStep o jeden, jeśli nie jest równy 3
            setCurrentStep(currentStep + 1);
        }
    };
    return (
        <div>                    {/* Podsumowanie Zamówienia */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md ">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Podsumowanie</h2>

                <div className="space-y-4">

                    <div className="flex items-center justify-between">
                        <img src={listing.galleries[0].image} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1 ml-4">
                            <p className="font-medium text-gray-700">{listing.title}</p>
                            <p className="text-sm text-gray-500">Sprzedawca: {listing.user.name}</p>
                        </div>
                        <p className="font-medium text-gray-700">{listing.price}</p>

                    </div>
                </div>

                {/* Koszty */}
                <div className="mt-8 space-y-2">
                    <div className="flex justify-between text-gray-700">
                        <p>Subtotal</p>
                        <p>{listing.price}</p>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <p>Shipping</p>
                        <p>${shippingCost.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between font-semibold text-gray-800 border-t pt-4">
                        <p>Total</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                </div>

                {/* Przycisk Potwierdzenia */}
                {currentStep < 3 ? (
                    <button className='w-full mt-6 bg-indigo-600 text-center text-white font-medium py-3 rounded-md hover:bg-indigo-700 transition-colors' onClick={() => setCurrentStep(currentStep + 1)}>Przejdź do płatności</button>
                ) : (
                    <Link
                        className='block w-full mt-6 bg-indigo-600 text-center text-white font-medium py-3 rounded-md hover:bg-indigo-700 transition-colors'
                        href={route('orders.store', { listingId: listing.id })} method="post" as="button" // Add this to ensure correct accessibility for post requests
                    >Przejdź do płatności</Link>
                )}

            </div>
        </div>
    )
}
