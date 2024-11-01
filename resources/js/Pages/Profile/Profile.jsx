import React, { useState } from 'react';
import Tabs from './Tabs';
import Layout from '@/Layouts/Layout';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('profile'); // Manage state here

    return (
        <Layout>
            <div className="flex items-center border-b border-gray-300 p-4 bg-yellow-100 space-x-8">

                {/* Sekcja zdjęcia profilowego po lewej */}
                <div className="flex-shrink-0 border-r border-gray-300 pr-4">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                        alt="Profile"
                        className="w-24 h-24 object-cover rounded-full"
                    />
                </div>

                {/* Sekcja informacji o użytkowniku */}
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold">Nazwa Użytkownika</h2>
                    <p className="text-gray-500">@username</p>

                    <div className="flex space-x-8 mt-4">
                        <div>
                            <span className="font-bold">120</span>
                            <p className="text-gray-600">Followers</p>
                        </div>
                        <div>
                            <span className="font-bold">80</span>
                            <p className="text-gray-600">Following</p>
                        </div>
                        <div>
                            <span className="font-bold">30</span>
                            <p className="text-gray-600">Posts</p>
                        </div>
                    </div>
                </div>


            </div>
            <div className="self-end bg-red-100">
                {/* Sekcja z zakładkami */}

                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} /> {/* Pass props */}
            </div>
        </Layout>
    );
}
