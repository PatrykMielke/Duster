import React from "react";
import Layout from "@/Layouts/Layout";

const App = () => {
    return (
        <Layout>
            <div className="flex h-screen">
                {/* Lewa czesc */}
                <div className="w-1/3 p-6 bg-gray-100 flex flex-col items-center">
                    <div className="w-60 h-60 rounded-full overflow-hidden mb-4 mt-5">
                        <img
                            src="./3.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold mb-2">John Doe</h2>
                        <p>Email: john.doe@example.com</p>
                        <p>Phone: 123-456-789</p>
                        <p>Location: New York, USA</p>
                    </div>
                </div>

                {/* Prawa czesc */}
                <div className="bg-blue-100 w-2/3 py-6">
                    {/* sort bar? */}
                    <div className="bg-white rounded-xl py-4 mx-4 mb-6 shadow-xl">
                        <div className="flex  mx-4 space-x-4">
                            <button className="bg-zinc-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
                                Home
                            </button>
                            <button className="bg-zinc-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
                                About
                            </button>
                            <button className="bg-zinc-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
                                Services
                            </button>
                            <button className="bg-zinc-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
                                Contact
                            </button>
                        </div>
                    </div>

                    <div className="mx-4 py-6">
                        <div className="grid grid-cols-3 grid-flow-rows gap-6 px-4">
                            <div className="bg-gray-200 hover:bg-gray-300 w-full aspect-[9/16] p-4 rounded-lg shadow">
                                <img
                                    src="./3.jpg"
                                    alt="Ogłoszenie 1"
                                    className="w-full  h-full object-cover " // Ustala wysokość obrazu i zaokrąglenie rogów
                                />
                                <h3 className="text-lg font-semibold mb-2">Ogłoszenie 1</h3>
                                <p>Opis ogłoszenia 1</p>
                            </div>
                            <div className="bg-gray-200 hover:bg-gray-300 w-full aspect-[9/16] p-4 rounded-lg shadow">
                                <img
                                    src="./3.jpg"
                                    alt="Ogłoszenie 1"
                                    className="w-full  h-full object-cover " // Ustala wysokość obrazu i zaokrąglenie rogów
                                />
                                <h3 className="text-lg font-semibold mb-2">Ogłoszenie 2</h3>
                                <p>Opis ogłoszenia 2</p>
                            </div>
                            <div className="bg-gray-200 hover:bg-gray-300 w-full aspect-[9/16] p-4 rounded-lg shadow">
                                <img
                                    src="./3.jpg"
                                    className="w-full h-full object-cover"
                                />
                                <h3 className="text-lg font-semibold mb-2">Ogłoszenie 3</h3>
                                <p>Opis ogłoszenia 3</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default App;
