import React from 'react'

export default function Delivery(
    { deliveryMethod, setDeliveryMethod }
) {
    return (
        <div>                        {/* Metoda Dostawy */}
            <div className="ax-w-6xl mx-auto p-4 bg-zinc-100 rounded-lg shadow-lg font-sans">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Sposób dostawy</h2>
                <div className="flex gap-4 mb-3">
                    <label className="flex items-center w-full p-4 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">
                        <input
                            type="radio"
                            name="delivery"
                            value="standard"
                            checked={deliveryMethod === "standard"}
                            onChange={() => setDeliveryMethod("standard")}
                            className="mr-3"
                        />
                        <div>
                            <span className="font-medium">Standard</span>
                            <p className="text-sm text-gray-500">4-10 business days - $5.00</p>
                        </div>
                    </label>
                    <label className="flex items-center w-full p-4 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">
                        <input
                            type="radio"
                            name="delivery"
                            value="express"
                            checked={deliveryMethod === "express"}
                            onChange={() => setDeliveryMethod("express")}
                            className="mr-3"
                        />
                        <div>
                            <span className="font-medium">Express</span>
                            <p className="text-sm text-gray-500">2-5 business days - $16.00</p>
                        </div>
                    </label>
                </div>
            </div></div>
    )
}
