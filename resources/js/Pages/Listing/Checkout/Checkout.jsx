import Layout from "@/Layouts/Layout";
import React, { useEffect, useState } from "react";
import ProgressBar from './Partials/CheckoutProgress';
import { useForm } from "@inertiajs/react";


export default function CheckoutForm({ listing, auth, deliveryMethods, paymentMethods }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: auth.user.email,
        first_name: "",
        last_name: "",
        company: "",
        address: "",
        apartment: "",
        city: "",
        country: "",
        state: "",
        postal_code: "",
        phone: "",
        delivery_method: "",
        payment_method: "",
        card_number: "",
        card_name: "",
        expiration: "",
        cvc: "",
        listing_id: listing.id,
        user_id: listing.user_id,
        buyer_id: auth.user.id,
        total: "",

    });

    const [currentStep, setCurrentStep] = useState(3);

    const formSubmit = (e) => {


        e.preventDefault();
        const formData = new FormData();

        formData.append('email', data.email);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('company', data.company);
        formData.append('address', data.address);
        formData.append('apartment', data.apartment);
        formData.append('city', data.city);
        formData.append('country', data.country);
        formData.append('state', data.state);
        formData.append('postal_code', data.postal_code);
        formData.append('phone', data.phone);
        formData.append('delivery_method', data.delivery_method);
        formData.append('payment_method', data.payment_method);
        formData.append('card_number', data.card_number);
        formData.append('card_name', data.card_name);
        formData.append('expiration', data.expiration);
        formData.append('cvc', data.cvc);
        formData.append('listing_id', listing.id);
        formData.append('user_id', listing.user_id);
        formData.append('buyer_id', auth.user.id);
        formData.append('total', data.total);

        post(route("orders.store"), {
            data: formData,
            onFinish: () => reset(),
            forceFormData: true,
        });
    };


    const validateCurrentStep = () => {

        return true;
    };


    const handleStepChange = (stepId) => {
        if (stepId < currentStep || validateCurrentStep()) {
            setCurrentStep(stepId);
        }
    };
    let deliveryMethodPrice = data.delivery_method ? deliveryMethods.find((method) => method.id === data.delivery_method).price : "0.00 zł";

    useEffect(() => {
        let deliveryMethodPrice = data.delivery_method
            ? deliveryMethods.find((method) => method.id === data.delivery_method)?.price || 0
            : 0;

        let totalPrice = (parseFloat(listing.price) + parseFloat(deliveryMethodPrice)).toFixed(2);

        setData("total", totalPrice);
    }, [data.delivery_method, listing.price, deliveryMethods]);

    return (
        <Layout>
            <div className="">

                {/* Sekcja Formularza */}
                <form onSubmit={formSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="space-y-8">



                            <div className="max-w-6xl mx-auto bg-zinc-100 rounded-lg shadow-lg font-sans p-4 space-y-4">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">Adres dostawy</h2>

                                <input
                                    type="text"
                                    placeholder="Adres"
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Numer mieszkania (opcjonalnie)"
                                    value={data.apartment}
                                    onChange={(e) => setData("apartment", e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Miasto"
                                        value={data.city}
                                        onChange={(e) => setData("city", e.target.value)}
                                        className="p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                                        required />
                                    <input
                                        type="text"
                                        placeholder="Kraj"
                                        value={data.country}
                                        onChange={(e) => setData("country", e.target.value)}
                                        className="p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                                        required />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <input
                                        type="text"
                                        placeholder="Kod pocztowy"
                                        value={data.postal_code}
                                        onChange={(e) => setData("postal_code", e.target.value)}
                                        className="p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                                        required />
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Telefon"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-indigo-500 text-gray-700"
                                    required />


                            </div>



                            {/* Sposób dostawy */}
                            <div className="max-w-6xl mx-auto p-4 bg-zinc-100 rounded-lg shadow-lg font-sans">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">Sposób dostawy</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {deliveryMethods.map((method) => (
                                        <label
                                            key={method.name}
                                            className="flex items-center p-4 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name="delivery"
                                                value={method.id}
                                                checked={data.delivery_method === method.id}
                                                onChange={() => setData("delivery_method", method.id)}
                                                className="mr-3 shrink-0"
                                            />
                                            <div className="truncate">
                                                <span className="font-medium">{method.name}</span>
                                                <p className="text-sm text-gray-500 truncate">{method.price}zł</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>


                            {/* Sposób płatności */}
                            <div className="space-y-8">


                                <div className="max-w-6xl mx-auto p-4 bg-zinc-100 rounded-lg shadow-lg font-sans">
                                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Sposób płatności</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {paymentMethods.map((method) => (
                                            <label
                                                key={method.name}
                                                className="flex items-center w-full p-4 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value={method.id}
                                                    checked={data.payment_method === method.id}
                                                    onChange={() => setData("payment_method", method.id)}
                                                    className="mr-3"
                                                />
                                                <div>
                                                    <span className="font-medium">{method.name}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Podsumowanie */}
                        <div className="bg-gray-200 p-6 rounded-lg shadow-md ">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Podsumowanie</h2>

                            <div className="space-y-4">

                                <div className="flex items-center justify-between">
                                    <div className="flex-1 ml-4">
                                        <p className="font-medium text-gray-700">{listing.title}</p>
                                        <p className="text-sm text-gray-500">Sprzedawca: {listing.user.name}</p>
                                    </div>
                                    <p className="font-medium text-gray-700">{listing.price} zł</p>

                                </div>
                            </div>

                            {/* Koszty */}
                            <div className="mt-8 space-y-2">
                                <div className="flex justify-between text-gray-700">
                                    <p>Dostawa</p>
                                    {deliveryMethodPrice} zł
                                </div>

                                <div className="flex justify-between font-semibold text-gray-800 border-t pt-4">
                                    <p>Total</p>
                                    {data.total} zł
                                </div>
                            </div>

                            {/* Przycisk Potwierdzenia */}
                            {currentStep < 3 ? (
                                <button className='w-full mt-6 bg-indigo-600 text-center text-white font-medium py-3 rounded-md hover:bg-indigo-700 transition-colors'
                                    type="button"
                                    onClick={() => setCurrentStep(currentStep + 1)}>Przejdź do płatności</button>
                            ) : (
                                <button
                                    className='block w-full mt-6 bg-indigo-600 text-center text-white font-medium py-3 rounded-md hover:bg-indigo-700 transition-colors'
                                    type="submit"
                                >Zapłać teraz</button>
                            )}

                        </div>
                    </div>
                </form>
            </div >
        </Layout >
    );
};

