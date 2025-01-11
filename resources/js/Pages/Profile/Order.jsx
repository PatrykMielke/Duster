// pseudo-faktura
import Layout from "@/Layouts/Layout";
import { Link } from "@inertiajs/react";
import React from "react";
const order = {
    id: 12345,
    sellerid: 12345,
    seller_name: "Jan Nowak",
    buyerid: 12345,
    buyer_name: "Jan Kowalski",
    listingid: 12345,
    listing_title: "Produkt A",
    listing_price: 100.0,
    payment_methodid: 12345,
    delivery_method_name: "Odbiór osobisty",
    delivery_price: 10.0,
    listing_gallery: "https://example.com/gallery.jpg",
    address: "Przykładowa 1",
    zipcode: "00-000",
    city: "Miasto",
    country: "Kraj",
    apartment: "1a",
    purchase_date: "2025-01-10T14:30:00Z",

    total: 310.0,
};

const OrderDetails = ({ order, buyer }) => {
    console.log(order.listing.galleries);
    return (
        <Layout>
            <div className="min-h-screen  py-10">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Nagłówek */}
                    <div className="bg-indigo-600 text-white text-center py-4">
                        <h1 className="text-2xl font-bold">Szczegóły Zamówienia</h1>
                    </div>

                    {/* Informacje o zamówieniu */}
                    <div className="p-6 space-y-6">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-lg font-semibold">Numer zamówienia:</h2>
                            <p className="text-indigo-600 font-bold">#{order.id}</p>
                        </div>
                        <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-lg font-semibold">Data zakupu:</h2>
                            <p>
                                {new Date(order.created_at).toLocaleString("pl-PL", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                })}
                            </p>
                        </div>
                        <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-lg font-semibold">Sprzedawca:</h2>
                            <p>{order.listing.user.name}</p>
                        </div>
                        <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-lg font-semibold">Kupujący:</h2>
                            <p>{buyer.name}</p>
                        </div>
                    </div>

                    {/* Informacje o produkcie */}
                    <div className="p-6 space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Szczegóły Produktu</h2>
                        <div className="flex items-center space-x-4">
                            <img
                                src={order.listing.galleries[0].image}
                                alt={order.listing_title}
                                className="w-24 h-24 object-cover rounded-md shadow"
                            />
                            <div>
                                <p className="text-lg font-bold">{order.listing_title}</p>
                                <p className="text-gray-600">Cena: {order.listing.price} zł</p>
                            </div>

                        </div>
                        <div >
                            <p className="text-lg font-bold">Sposób dostawy</p>

                            <p>   <p className="font-semibold">{order.delivery_method.name}</p>
                                Cena dostawy: {order.delivery_method.price} zł
                            </p>
                        </div>
                        <div className="flex  items-center  items-center border-b pb-4">

                            <h2 className="text-lg font-semibold p-1">Suma całkowita: </h2>
                            <p className="text-xl font-bold ">

                                {(parseFloat(order.delivery_method.price) + parseFloat(order.listing.price)).toFixed(2)} PLN
                            </p>
                        </div>

                    </div>

                    {/* Informacje o dostawie */}
                    <div className="px-6 pb-6 space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Dane Dostawy</h2>
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">Adres:</span> {order.address}, {order.apartment}
                            </p>
                            <p>
                                <span className="font-semibold">Kod pocztowy:</span> {order.zipcode}
                            </p>
                            <p>
                                <span className="font-semibold">Miasto:</span> {order.city}
                            </p>
                            <p>
                                <span className="font-semibold">Kraj:</span> {order.country}
                            </p>

                        </div>
                    </div>

                    {/* Podsumowanie */}
                    <div className="bg-gray-100 p-6">

                        <Link href={route("profile.userOrders")} >

                            <button
                                className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md shadow hover:bg-indigo-700   "
                            >
                                <p className="font-semibold"> Powrót do zamówień </p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderDetails;
