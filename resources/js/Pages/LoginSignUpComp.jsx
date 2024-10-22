import React from 'react';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError"; // Importuj InputError
import Layout from "@/Layouts/Layout"; // Importuj Layout

function SignUp() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleInputChange = (e) => {
        setData(e.target.name, e.target.value); // Zaktualizuj stan formularza
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register', {
            onSuccess: () => {
                // Akcje po sukcesie, np. przekierowanie
                Inertia.visit('/HomePage');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full h-full p-10 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Account</h1>
            <div className="flex space-x-4 mb-4">
                <FaGooglePlusG className="text-gray-600 hover:text-red-500 cursor-pointer transition-colors duration-200" size="1.5em" />
                <FaFacebookF className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200" size="1.5em" />
                <FaGithub className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200" size="1.5em" />
                <FaLinkedinIn className="text-gray-600 hover:text-blue-800 cursor-pointer transition-colors duration-200" size="1.5em" />
            </div>
            <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="mb-3 p-3 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <InputError message={errors.name} className="mb-2" /> {/* Błąd dla imienia */}

            <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="mb-3 p-3 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <InputError message={errors.email} className="mb-2" /> {/* Błąd dla emaila */}

            <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="mb-3 p-3 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <InputError message={errors.password} className="mb-2" /> {/* Błąd dla hasła */}

            <input
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={handleInputChange}
                placeholder="Confirmation"
                required
                className="mb-3 p-3 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <InputError message={errors.password_confirmation} className="mb-2" /> {/* Błąd dla potwierdzenia hasła */}

            <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all"
                disabled={processing} // Zablokuj przycisk podczas przetwarzania
            >
                Sign Up
            </button>
        </form>
    );
}

export default SignUp;
