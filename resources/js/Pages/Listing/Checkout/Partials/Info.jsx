import React from 'react'

export default function Info({
    address, setAddress,
    apartment, setApartment,
    city, setCity,
    country, setCountry,
    state, setState,
    postalCode, setPostalCode,
    phone, setPhone,
}) {
    return (
        <div>


            {/* Dane Dostawy */}
            <div className="max-w-6xl mx-auto bg-zinc-100 rounded-lg shadow-lg font-sans p-4 space-y-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Adres dostawy</h2>


                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                />
                <input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="State / Province"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                    />
                    <input
                        type="text"
                        placeholder="Postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                    />
                </div>
                <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                />


            </div>

        </div>
    )
}
