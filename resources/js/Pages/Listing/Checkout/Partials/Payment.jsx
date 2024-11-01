import React from 'react'

export default function Payment({
    paymentMethod,
    setPaymentMethod,

}) {
    return (
        <div> <div className="max-w-6xl mx-auto p-4 bg-zinc-100 rounded-lg shadow-lg font-sans">
            <div className=" ">
                {/* Sekcja Formularza */}
                <div className="space-y-8">



                    {/* Metoda Płatności */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment</h2>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="credit-card"
                                    checked={paymentMethod === "credit-card"}
                                    onChange={() => setPaymentMethod("credit-card")}
                                    className="mr-2"
                                />
                                Credit Card
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="paypal"
                                    checked={paymentMethod === "paypal"}
                                    onChange={() => setPaymentMethod("paypal")}
                                    className="mr-2"
                                />
                                PayPal
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="stripe"
                                    checked={paymentMethod === "stripe"}
                                    onChange={() => setPaymentMethod("stripe")}
                                    className="mr-2"
                                />
                                Stripe
                            </label>
                        </div>

                        {/* Karta Kredytowa */}
                        {paymentMethod === "credit-card" && (
                            <div className="mt-4 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Card number"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-indigo-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Name on card"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-indigo-500"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Expiration date (MM/YY)"
                                        value={expiration}
                                        onChange={(e) => setExpiration(e.target.value)}
                                        className="p-4 border border-gray-300 rounded-md focus:ring-indigo-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVC"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value)}
                                        className="p-4 border border-gray-300 rounded-md focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div></div>
    )
}
