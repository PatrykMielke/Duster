import Layout from "@/Layouts/Layout";
import React, { useState } from "react";
import ProgressBar from './Partials/CheckoutProgress';
import Info from "./Partials/Info";
import Delivery from "./Partials/Delivery";
import Summary from "./Partials/Summary";
import Payment from "./Partials/Payment";


export default function CheckoutForm({ listing }) {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiration, setExpiration] = useState("");
    const [cvc, setCvc] = useState("");
    const [quantities, setQuantities] = useState([1, 1]);


    const [currentStep, setCurrentStep] = useState(1);



    const handleQuantityChange = (index, newQuantity) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = newQuantity;
        setQuantities(updatedQuantities);
    };


    const validateCurrentStep = () => {

        return true;
    };

    const handleStepChange = (stepId) => {
        if (stepId < currentStep || validateCurrentStep()) {
            setCurrentStep(stepId);
        }
    };


    const subtotal = 32 * quantities[0] + 32 * quantities[1];
    const shippingCost = deliveryMethod === "express" ? 16 : deliveryMethod === "standard" ? 5 : 0;
    const tax = (subtotal + shippingCost) * 0.085;
    const total = subtotal + shippingCost + tax;

    return (
        <Layout>
            <div className="">

                <div className="py-5">
                    <ProgressBar currentStep={currentStep} setCurrentStep={handleStepChange} />
                </div>

                {/* Sekcja Formularza */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">


                        {currentStep === 1 && (
                            <Info
                                address={address} setAddress={setAddress}
                                apartment={apartment} setApartment={setApartment}
                                city={city} setCity={setCity}
                                country={country} setCountry={setCountry}
                                state={state} setState={setState}
                                postalCode={postalCode} setPostalCode={setPostalCode}
                                phone={phone} setPhone={setPhone}
                            />
                        )}
                        {currentStep === 2 && (

                            < Delivery
                                deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod}
                            />
                        )}
                        {currentStep === 2 && (
                            <Payment
                                paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}

                            />
                        )}



                    </div>

                    {/* Podsumowanie */}
                    <Summary
                        listing={listing}
                        subtotal={subtotal}
                        shippingCost={shippingCost}
                        total={total}
                        currentStep={currentStep} setCurrentStep={setCurrentStep}
                    ></Summary>


                </div>

            </div>
        </Layout >
    );
};

