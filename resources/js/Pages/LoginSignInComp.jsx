import React from 'react';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Head, Link, useForm } from "@inertiajs/react";

function SignIn() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full h-full p-10 flex flex-col justify-center items-center">
            <Head title="Sign In" />

            <h1 className="text-3xl font-bold mb-6 text-gray-800">Sign In</h1>

            <div className="flex space-x-4 mb-4">
                <FaGooglePlusG className="text-gray-600 hover:text-red-500 cursor-pointer transition-colors duration-200" size="1.5em" />
                <FaFacebookF className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200" size="1.5em" />
                <FaGithub className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200" size="1.5em" />
                <FaLinkedinIn className="text-gray-600 hover:text-blue-800 cursor-pointer transition-colors duration-200" size="1.5em" />
            </div>

            <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="mb-3 p-3 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {errors.email && <div className="text-red-500 text-sm mb-2">{errors.email}</div>}

            <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="mb-3 p-3 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {errors.password && <div className="text-red-500 text-sm mb-2">{errors.password}</div>}

            <a href="#" className="text-sm text-purple-600 hover:underline block mb-6">Forgot your password?</a>

            <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all"
                disabled={processing}
            >
                {processing ? 'Signing In...' : 'Sign In'}
            </button>
        </form>
    );
}

export default SignIn;
